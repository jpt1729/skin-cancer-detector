from flask import Flask, request, jsonify
import time
from werkzeug.utils import secure_filename
import os
from PIL import Image
import tensorflow as tf

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

questions = {
    "questions": [
        {
            "title": "What part of the body is this?",
            "name": "localizations",
            "options": [
                {
                    "name": "lower extremity (leg, hip, thigh, etc.)",
                    "value": 3
                },
                {
                    "name": "upper extremity (biceps, forearm, etc.)",
                    "value": 4
                },
                {
                    "name": "palm/soles",
                    "value": 8,
                },
                {
                    "name": "anterior torso (front chest, stomach, etc.)",
                    "value": 6
                },
                {
                    "name": "posterior torso (back, shoulders, etc.)",
                    "value": 7
                },
                {
                    "name": 'lateral torso (side ribcage, "fish gills")',
                    "value": 8
                },
                {
                    "name": "scalp",
                    "value": 1
                }
            ]
        },
        {
            "title": "Age group",
            "name": "age",
            "options": [
                {
                    "name": "0-19",
                    "value": 10
                },
                {
                    "name": "20-39",
                    "value": 30
                },
                {
                    "name": "40-59",
                    "value": 50
                },
                {
                    "name": "60-79",
                    "value": 70
                },
                {
                    "name": "80-99",
                    "value": 90
                }
            ]
        },
        {
            "title": "Sex",
            "name": "sex",
            "options": [
                {
                    "name": "male",
                    "value": 0
                },
                {
                    "name": "female",
                    "value": 1
                }
            ]
        }
    ]
}

# Positive responses should be in the form { probability: 0.1 }, 200
# Errors should be in the form {error: "error message here"}, 400

model_details = {"resolution": {
    "width": 256,
    "height": 256,
}}


def create_model():
    model_txt = tf.keras.Sequential([
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dense(256, activation='relu'),
    ])


    model_img = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(None, None, 3)),
        tf.keras.layers.RandomFlip(),
        base_model,
        tf.keras.layers.Conv2D(128, (3, 3), activation='gelu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Conv2D(256, (3, 3), activation='gelu'),
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(256, activation='gelu'),
    ])
    txt_input = tf.keras.layers.Input(shape=(3,), name="txt")
    img_input = tf.keras.layers.Input(shape=(256, 256, 3), name="img")
    txt_side = model_txt(txt_input)
    img_side = model_img(img_input)
    merged = tf.keras.layers.Concatenate()([img_side, txt_side])
    merged = tf.keras.layers.Dense(128, activation='gelu')(merged)
    merged = tf.keras.layers.Dense(7, activation='softmax')(merged)

    return tf.keras.Model(inputs=[img_input, txt_input], outputs=merged)


def process_data(file_path, answers):
    img = tf.io.read_file(file_path)
    img = tf.io.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, [256, 256])/255.0
    fn = tf.strings.split(file_path, sep='/')[-1]
    fn = tf.strings.split(fn, sep='.')[0]
    label = table.lookup(fn)
    label = tf.strings.to_number(
        tf.strings.split(label), out_type=tf.dtypes.int32)
    features = feature_table.lookup(fn)
    features = tf.strings.to_number(
        tf.strings.split(features), out_type=tf.dtypes.int32)
    feature = (img, features)
    return feature, label


def validate_answer(param_name, param_value):
    for question in questions["questions"]:
        if question["name"] == param_name:
            for option in question["options"]:
                if option["value"] == param_value:
                    return True
    return False


@app.route('/upload', methods=['PATCH'])
def upload():
    if 'photo' not in request.files:
        return {"error": 'No file part'}, 400

    file = request.files['photo']

    if file.filename == '':
        return {"error": 'No selected file'}, 400

    if not file:
        return {"error": "File does not exist"}, 400

    body_part = request.args.get('body-part')
    age = request.args.get('age')
    sex = request.args.get('sex')

    if not (validate_answer('body-part', body_part) and
            validate_answer('age', age) and
            validate_answer('sex', sex)):
        return {"error": 'Invalid answers'}, 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # process_path(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    img = tf.io.read_file(file_path)
    img = tf.io.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, [256, 256])/255.0

    txt = [body_part, age, sex]

    # Create a new model instance
    model = create_model()

    # Load the previously saved weights
    model.load_weights('/models/multimodal-base.keras')

    model.predict()
    # Returns an array of seven probabilities
    return {"probability": 0.1}, 200


@app.route('/model-details', methods=['GET'])
def get_model_details():
    return jsonify(model_details), 200


@app.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(questions), 200


if __name__ == '__main__':
    app.run(port=3000)
