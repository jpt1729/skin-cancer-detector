import os
import base64
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'  # Specify the upload folder

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    json_data = request.get_json()
    
    if 'image' not in json_data:
        return jsonify({"error": "No image data in JSON"}), 400
    
    image_data = json_data['image']
    
    try:
        # Decode the base64 image data
        image_data = base64.b64decode(image_data)
    except base64.binascii.Error:
        return jsonify({"error": "Invalid base64 image data"}), 400
    
    # Generate a filename and save the image
    filename = secure_filename("uploaded_image.png")
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    with open(image_path, "wb") as image_file:
        image_file.write(image_data)
    
    return jsonify({"message": "File and JSON received", "json": json_data}), 200

if __name__ == '__main__':
    app.run(debug=True)
