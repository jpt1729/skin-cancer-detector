import tensorflow as tf
from PIL import Image
import numpy as np

questions = {
    "questions": [
        {
            "title": "What part of the body is this?",
            "name": "localizations",
            "options": [
                {"name": "lower extremity (leg, hip, thigh, etc.)", "value": 3},
                {"name": "upper extremity (biceps, forearm, etc.)", "value": 4},
                {"name": "anterior torso (front chest, stomach, etc.)", "value": 6},
                {"name": "posterior torso (back, shoulders, etc.)", "value": 7},
                {"name": 'lateral torso (side ribcage, "fish gills")', "value": 8},
                {"name": "scalp", "value": 1},
            ],
        },
        {
            "title": "Age group",
            "name": "age",
            "options": [
                {"name": "0-19", "value": 10},
                {"name": "20-39", "value": 30},
                {"name": "40-59", "value": 50},
                {"name": "60-79", "value": 70},
                {"name": "80-99", "value": 90},
            ],
        },
        {
            "title": "Sex",
            "name": "sex",
            "options": [{"name": "male", "value": 0}, {"name": "female", "value": 1}],
        },
    ]
}

model_details = {
    "resolution": {
        "width": 256,
        "height": 256,
    }
}


def validate_answer(param_name, param_value):
    for question in questions["questions"]:
        if question["name"] == param_name:
            for option in question["options"]:
                if option["value"] == param_value:
                    return True
    return False


def load_image(file):
    img = Image.open(file)
    img = np.array(img)
    img = img / 255.0
    img = tf.expand_dims(img, axis=0)
    return img


def model_predict(img, txt):
    model = tf.keras.models.load_model("./models/multimodal-base.keras")
    prediction = model.predict([img, txt])
    print("PREDICTED")
    prediction = prediction[0]
    print(prediction)
    return prediction
