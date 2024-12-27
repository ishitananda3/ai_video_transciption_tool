import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.transcription import transcribe_audio

app = Flask(__name__)
CORS(app)

# Define the upload folder path
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        # Check if the video file is in the request
        if "video" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files["video"]
        # Check if a file is selected
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        # Save the file to the uploads folder
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)
        print(f"File saved to {file_path}")

        # Transcribe the audio
        transcript = transcribe_audio(file_path)
        print(f"Transcription: {transcript}")

        # Return the transcription to the frontend
        return jsonify({"message": "Upload successful, transcription complete", "transcription": transcript}), 200

    except Exception as e:
        print(f"Error during upload: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
