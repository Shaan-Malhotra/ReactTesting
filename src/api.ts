import axios from 'axios';

const API_BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

export const fetchMovies = async (title: String): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}&t=${title}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};