import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';

const movieApiInstance = axios.create({
    baseURL: 'https://wgw6hvpuj7.execute-api.us-east-2.amazonaws.com'
});

movieApiInstance.interceptors.request.use(async (config) => {
    try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else {
            console.log('No Token!')
        }
    } catch (error) {
        console.error('Error fetching token', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});