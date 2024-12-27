import axios from 'axios';

export const extractClips = async (clips) => {
    try {
        const response = await axios.post('http://localhost:5000/extract', { clips });
        return response.data;
    } catch (error) {
        console.error('Error extracting clips:', error);
        throw error;
    }
};
