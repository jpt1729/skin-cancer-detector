import os
import torch
from transformers import (
  AutoTokenizer, 
  AutoModelForCausalLM, 
  BitsAndBytesConfig,
  pipeline
)

from transformers import BitsAndBytesConfig
import transformers
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_transformers import Html2TextTransformer
from langchain.document_loaders import AsyncChromiumLoader

from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS

from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.llms import HuggingFacePipeline
from langchain.chains import LLMChain

import nest_asyncio
#################################################################
# Tokenizer
#################################################################

from huggingface_hub import login
login(token='')

model_name='mistralai/Mistral-7B-Instruct-v0.1'

model_config = transformers.AutoConfig.from_pretrained(
    model_name,
)

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"

#################################################################
# bitsandbytes parameters
#################################################################

# Activate 4-bit precision base model loading
use_4bit = True

# Compute dtype for 4-bit base models
bnb_4bit_compute_dtype = "float16"

# Quantization type (fp4 or nf4)
bnb_4bit_quant_type = "nf4"

# Activate nested quantization for 4-bit base models (double quantization)
use_nested_quant = False

#################################################################
# Set up quantization config
#################################################################
compute_dtype = getattr(torch, bnb_4bit_compute_dtype)

bnb_config = BitsAndBytesConfig(
    load_in_4bit=use_4bit,
    bnb_4bit_quant_type=bnb_4bit_quant_type,
    bnb_4bit_compute_dtype=compute_dtype,
    bnb_4bit_use_double_quant=use_nested_quant,
)

# Check GPU compatibility with bfloat16
if compute_dtype == torch.float16 and use_4bit:
    major, _ = torch.cuda.get_device_capability()
    if major >= 8:
        print("=" * 80)
        print("Your GPU supports bfloat16: accelerate training with bf16=True")
        print("=" * 80)

#################################################################
# Load pre-trained config
#################################################################
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
)


def print_number_of_trainable_model_parameters(model):
    trainable_model_params = 0
    all_model_params = 0
    for _, param in model.named_parameters():
        all_model_params += param.numel()
        if param.requires_grad:
            trainable_model_params += param.numel()
    return f"trainable model parameters: {trainable_model_params}\nall model parameters: {all_model_params}\npercentage of trainable model parameters: {100 * trainable_model_params / all_model_params:.2f}%"

print(print_number_of_trainable_model_parameters(model))

text_generation_pipeline = pipeline(
    model=model,
    tokenizer=tokenizer,
    task="text-generation",
    temperature=0.2,
    repetition_penalty=1.1,
    return_full_text=True,
    max_new_tokens=1000,
)

mistral_llm = HuggingFacePipeline(pipeline=text_generation_pipeline)

import nest_asyncio
nest_asyncio.apply()

from langchain_community.document_loaders import AsyncHtmlLoader

# # Articles to index
articles = ["https://www.mayoclinic.org/diseases-conditions/skin-cancer/symptoms-causes/syc-20377605",
            "https://www.skincancer.org/skin-cancer-information/",
            "https://www.cancer.gov/types/skin",
            "https://www.cancer.gov/types/skin/patient/skin-treatment-pdq",
            "https://www.aad.org/media/stats-skin-cancer"]

# # Scrapes the blogs above
# loader = AsyncChromiumLoader(articles)
# docs = loader.load()


loader = AsyncHtmlLoader(articles)
docs = loader.load()
# Converts HTML to plain text 
html2text = Html2TextTransformer()
docs_transformed = html2text.transform_documents(docs)

# Chunk text
text_splitter = CharacterTextSplitter(chunk_size=100, 
                                      chunk_overlap=0)
chunked_documents = text_splitter.split_documents(docs_transformed)

# Load chunked documents into the FAISS index
db = FAISS.from_documents(chunked_documents, 
                          HuggingFaceEmbeddings(model_name='sentence-transformers/all-mpnet-base-v2'))

retriever = db.as_retriever(
    search_type="similarity",
    search_kwargs={'k': 4}
)

# Create prompt template
prompt_template = """
### [INST] Instruction: Answer the question based on your skin cancer knowledge. Here is context to help:

{context}

### QUESTION:
{question} [/INST]
 """

# Create prompt from prompt template 
prompt = PromptTemplate(
    input_variables=["context", "question"],
    template=prompt_template,
)

# Create llm chain 
llm_chain = LLMChain(llm=mistral_llm, prompt=prompt)

rag_chain = ( 
 {"context": retriever, "question": RunnablePassthrough()}
    | llm_chain
)

res = rag_chain.invoke("What kind of treatments are available for invasive melanoma?")['text']
print(res[(res.find('[/INST]') + len('[/INST]')):])

res = rag_chain.invoke("What should I do at home if I have benign keratosis-like lesions?")['text']
print(res[(res.find('[/INST]') + len('[/INST]')):])


from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/query")
def query():
    q = request.args.get('text')
    res = rag_chain.invoke(q)['text']
    # print(res)
    return {"message": res[(res.find('[/INST]') + len('[/INST]')):]}, 200


