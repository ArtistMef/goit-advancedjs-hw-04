// pixabay-api.js
import axios from 'axios';

const PER_PAGE = 15;
const API_KEY = '45505943-42661f72ea61112ff146e0896';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;
    

    try {
        const response = await axios.get(url);
        return {
            images: response.data.hits,
            totalHits: response.data.totalHits,
        };
    }
    catch (error) {
        throw new Error('Error fetching images');
    }
    
}
