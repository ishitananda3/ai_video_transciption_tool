import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import TranscriptDisplay from '../components/TranscriptDisplay';

const Home = () => {
    const [transcript, setTranscript] = useState([]);

    const handleUploadSuccess = (data) => {
        setTranscript(data);
    };

    return (
        <div>
            <h1>AI Video Editing Tool</h1>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            {transcript.length > 0 && (
                <TranscriptDisplay transcript={transcript} onSelect={(entry) => console.log(entry)} />
            )}
        </div>
    );
};

export default Home;
