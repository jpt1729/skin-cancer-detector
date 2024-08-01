import tensorflow as tf
print('STARTING')
model = tf.keras.models.load_model('./models/multimodal-base.keras')
print('OVER')
print(model.summary())