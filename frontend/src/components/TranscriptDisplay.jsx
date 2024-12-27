import React from 'react';

const TranscriptDisplay = ({ transcript, onSelect }) => {
    return (
        <div>
            <h3>Transcript</h3>
            {transcript.map((entry, index) => (
                <p key={index} onClick={() => onSelect(entry)}>
                    {entry.timestamp} - {entry.text}
                </p>
            ))}
        </div>
    );
};

export default TranscriptDisplay;
