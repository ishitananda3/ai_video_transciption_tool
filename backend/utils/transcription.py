import whisper

def transcribe_audio(video_path):
    model = whisper.load_model("base")
    result = model.transcribe(video_path)
    return [{'timestamp': segment['start'], 'text': segment['text']} for segment in result['segments']]
