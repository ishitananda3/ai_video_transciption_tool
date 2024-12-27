import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(null);

  const videoRef = useRef(null);
  const transcriptRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setMessage("");
      setTranscription([]);
      setTranscriptionStarted(false);
    }
  };

  const startTranscription = async () => {
    if (!selectedFile || transcriptionStarted) return;

    setLoading(true);
    setTranscriptionStarted(true);
    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setMessage("Transcription complete.");
        setTranscription(response.data.transcription);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to generate transcription, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTimestampClick = (timestamp, index) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      videoRef.current.play();
      setActiveTranscriptIndex(index);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;

      const currentIndex = transcription.findIndex(
        (entry) => currentTime >= entry.timestamp && currentTime < entry.timestamp + 1
      );

      if (currentIndex !== -1 && currentIndex !== activeTranscriptIndex) {
        setActiveTranscriptIndex(currentIndex);

        const activeElement = document.getElementById(`transcript-${currentIndex}`);
        if (activeElement && transcriptRef.current) {
          transcriptRef.current.scrollTo({
            top: activeElement.offsetTop - transcriptRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        minHeight: "100vh",
        bgcolor: "#f0f4f8",
        padding: "30px",
        boxSizing: "border-box",
        gap: "20px",
      }}
    >
      {/* Video Section */}
      <Box
        sx={{
          flex: 1,
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", marginBottom: "15px" }}>
          Video Preview
        </Typography>
        {previewUrl ? (
          <video
            ref={videoRef}
            src={previewUrl}
            controls
            onPlay={startTranscription}
            onTimeUpdate={handleVideoTimeUpdate}
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          />
        ) : (
          <Box>
            <Typography variant="body1" sx={{ color: "#fff", marginBottom: "10px" }}>
              Choose a video to preview and upload.
            </Typography>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                color: "#333",
                marginTop: "10px",
              }}
            />
          </Box>
        )}
        {message && (
          <Typography
            variant="body2"
            color={message.includes("complete") ? "green" : "red"}
            sx={{ marginTop: "10px", color: "#fff" }}
          >
            {message}
          </Typography>
        )}
      </Box>

      {/* Transcription Section */}
      <Card
        sx={{
          flex: 1,
          maxWidth: "45%",
          height: "400px",
          overflowY: "auto",
          padding: "20px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          background: "linear-gradient(135deg,rgb(170, 221, 222),rgb(246, 247, 242))",
          color: "rgb(0,0,0)",
          boxSizing: "border-box",
        }}
        ref={transcriptRef}
      >
        <Typography variant="h6" sx={{ color: "rgb(0,0,0)", marginBottom: "10px" }}>
          Transcription:
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress size={50} sx={{ color: "#fff" }} />
          </Box>
        ) : (
          <>
            {transcription.length > 0 ? (
              <ul style={{ paddingLeft: "20px", color: "#fff" }}>
                {transcription.map((entry, index) => (
                  <li
                    key={index}
                    id={`transcript-${index}`}
                    style={{
                      cursor: "pointer",
                      margin: "10px 0",
                      color: activeTranscriptIndex === index ? "#fff" : "#2196F3",
                      backgroundColor: activeTranscriptIndex === index ? "#2196F3" : "transparent",
                      padding: "8px",
                      borderRadius: "4px",
                      textDecoration: activeTranscriptIndex === index ? "none" : "underline",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onClick={() => handleTimestampClick(entry.timestamp, index)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2196F3";
                      e.target.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (activeTranscriptIndex !== index) {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#2196F3";
                      }
                    }}
                  >
                    <strong>[{entry.timestamp.toFixed(2)}]</strong>: {entry.text}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" sx={{ color: "rgb(0,0,0)" }}>
                Transcription will appear here...
              </Typography>
            )}
          </>
        )}
      </Card>
    </Box>
  );
};

export default FileUpload;
