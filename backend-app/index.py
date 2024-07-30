from flask import Flask, request, jsonify
import time
from werkzeug.utils import secure_filename
import os
from PIL import Image

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

questions = {
    "questions": [
        {
            "title": "What part of the body is this?",
            "name": "body-part",
            "options": [
                {
                    "name": "lower extremity (leg, hip, thigh, etc.)",
                    "value": "lower-extremity"
                },
                {
                    "name": "upper extremity (arm, wrist, hand, etc.)",
                    "value": "upper-extremity"
                },
                {
                    "name": "anterior torso (front chest, stomach, etc.)",
                    "value": "anterior-torso"
                },
                {
                    "name": "posterior torso (back, shoulders, etc.)",
                    "value": "posterior-torso"
                },
                {
                    "name": "head/neck",
                    "value": "head"
                }
            ]
        },
        {
            "title": "Age group",
            "name": "age",
            "options": [
                {
                    "name": "0-19",
                    "value": "0-19"
                },
                {
                    "name": "20-39",
                    "value": "20-39"
                },
                {
                    "name": "40-59",
                    "value": "40-59"
                },
                {
                    "name": "60-79",
                    "value": "60-79"
                },
                {
                    "name": "80-99",
                    "value": "80-99"
                }
            ]
        },
        {
            "title": "Sex",
            "name": "sex",
            "options": [
                {
                    "name": "male",
                    "value": "male"
                },
                {
                    "name": "female",
                    "value": "female"
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

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    img = Image.open(file)
    width, height = img.size

    if model_details["resolution"] != {"height": height, "width": width}:
        return {"error": "Incorrect resolution"}, 400

    body_part = request.args.get('body-part')
    age = request.args.get('age')
    sex = request.args.get('sex')

    if not (validate_answer('body-part', body_part) and
            validate_answer('age', age) and
            validate_answer('sex', sex)):
        return {"error": 'Invalid answers'}, 400
    
    return {"probability": 0.1}, 200


@app.route('/model-details', methods=['GET'])
def get_model_details():
    return jsonify(model_details), 200


@app.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(questions), 200


if __name__ == '__main__':
    app.run(port=3000)
