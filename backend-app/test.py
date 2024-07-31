import tensorflow as tf

def load_image(file_path):
    img = tf.io.read_file(file_path)
    img = tf.io.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, [256, 256])/255.0
    return img

def create_model():
    base_model = tf.keras.applications.VGG16(
        include_top=False,
        weights="imagenet",
        input_tensor=None,
        input_shape=None,
        pooling=None,
        # classes=2,
        # classifier_activation="softmax",
    )

    base_model.trainable = False

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


#model = create_model()

# Load the previously saved weights
#model.load_weights('./models/multimodal-base.keras')

print(load_image('E:/BWSI/final-project/backend-app/uploads/1c363da7-10b9-413e-9c52-ad419ba4077e.jpg').shape)
