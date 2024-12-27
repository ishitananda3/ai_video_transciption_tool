# AI Video Transcription Tool

This project allows users to upload a video, preview it, and get an AI-generated transcription of the video content. The transcription is interactive, allowing users to click on specific timestamps to jump to that section of the video.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

To get started with the project, you need to have the following installed:

- **Node.js** and **npm** (or **Yarn**)
- **Python** for the backend (Flask/FastAPI server)
- **ffmpeg** (if required by the transcription model)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature.

## Features

- **Video Upload & Preview**: Upload a video and preview it inside the app.
- **Automatic Transcription**: Transcribe the audio from the video using an AI-powered transcription engine.
- **Interactive Transcription**: Click on transcription timestamps to jump to the corresponding sections in the video.
- **Real-time Synchronization**: Transcription highlights change dynamically as the video plays.
- **User-Friendly UI**: The interface is designed to be intuitive and visually appealing.

## Tech Stack

- **Frontend**:
  - React.js
  - Material-UI for UI components
  - Axios for API communication

- **Backend**:
  - Python (Flask/FastAPI)
  - AI transcription model (Deepgram, Whisper, etc.)

## Installation

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone  https://github.com/ishitananda3/ai_video_transciption_tool.git
   cd ai-video-transcription-tool
