import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1/products';
const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url='; // cuma, best practicenya pakai .env. KENAPA?

export const fetchGames = async () => {
    try {
    const response = await axios.get(`${CORS_PROXY_URL}${encodeURIComponent(`${API_BASE_URL}/games`)}`);
    return response.data; 
    } catch (error) {
    console.error('Error fetching games:', error);
    throw new Error('Failed to fetch games');
    }
};
