import tensorflow as tf

model = tf.keras.models.load_model("./models/new-model.keras")

print(model.summary())