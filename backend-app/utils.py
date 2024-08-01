import tensorflow as tf
from PIL import Image
import numpy as np
import os

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

model_details = {"resolution": {
    "width": 256,
    "height": 256,
}}


def create_model():
    base_model = tf.keras.applications.VGG16(
        include_top=False,
        weights="imagenet",
        input_tensor=None,
        input_shape=None,
        pooling=None,
    )
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
    
    model = tf.keras.Model(inputs=[img_input, txt_input], outputs=merged)

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss="categorical_crossentropy",
        metrics=['accuracy'])
    return model


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
    img = img/255.0
    img = tf.expand_dims(img, axis=0)
    return img


def model_predict(img, txt):
    #model = create_model()
    # Load the previously saved weights
    #f = open('E:/BWSI/final-project/backend-app/models/test-model.keras', 'rb')
    model = tf.keras.models.load_model('./models/multimodal-base.keras')
    
    prediction = model.predict([img, txt])
    return list(prediction[0])
