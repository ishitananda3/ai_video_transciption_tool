import subprocess

def extract_clip(input_file, start_time, end_time, output_file):
    command = [
        'ffmpeg', '-i', input_file,
        '-ss', start_time, '-to', end_time,
        '-c', 'copy', output_file
    ]
    subprocess.run(command, check=True)
