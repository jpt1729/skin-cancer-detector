from flask import Flask, request, jsonify
import time
from werkzeug.utils import secure_filename
import os
import tensorflow as tf

from utils import *

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Positive responses should be in the form { probability: 0.1 }, 200
# Errors should be in the form {error: "error message here"}, 400


@app.route("/upload", methods=["PATCH"])
async def upload():
    if "photo" not in request.files:
        return {"error": "No file part"}, 400

    file = request.files["photo"]

    if file.filename == "":
        return {"error": "No selected file"}, 400

    if not file:
        return {"error": "File does not exist"}, 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    localization = int(request.args.get("localizations"))
    age = int(request.args.get("age"))
    sex = int(request.args.get("sex"))

    if not (
        validate_answer("localizations", localization)
        and validate_answer("age", age)
        and validate_answer("sex", sex)
    ):
        return {"error": "Invalid answers"}, 400

    img = load_image(file)

    txt = [localization, age, sex]
    txt = tf.expand_dims(txt, axis=0)
    # Create a new model instance
    prediction = model_predict(img, txt)
    prediction_i = np.argmax(prediction)
    # Returns an array of seven probabilities
    return {"probability": float(max(prediction)), "type": skin_cancer_types[int(prediction_i)] }, 200


@app.route("/model-details", methods=["GET"])
def get_model_details():
    return jsonify(model_details), 200


@app.route("/questions", methods=["GET"])
def get_questions():
    return jsonify(questions), 200

@app.route("/rag-enabled", methods=["GET"])
def rag_status():
    return {}, 200

if __name__ == "__main__":
    app.run(port=5000, threaded = True, debug=True, host='0.0.0.0')
