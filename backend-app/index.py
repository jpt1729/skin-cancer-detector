from flask import Flask, request, jsonify, abort
import os
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/binary-upload', methods=['PATCH'])
def binary_upload():
    print(request.files)
    if 'file' not in request.files:
        abort(400, description="No file part in the request")
    
    file = request.files['file']
    
    if file.filename == '':
        abort(400, description="No selected file")
    
    filename = f'image{datetime.now().strftime("%Y%m%d%H%M%S%f")}.png'
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    return jsonify({"message": "OK", "filename": filename})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    
    # Save the file or process it here
    file.save(f'.//{file.filename}')
    
    return jsonify({'message': 'File successfully uploaded'}), 200

if __name__ == '__main__':
    app.run(debug=True)
