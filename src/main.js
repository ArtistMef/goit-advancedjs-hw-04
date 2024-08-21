// main.js
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, renderError, renderNoResults, showLoadingIndicator, hideLoadingIndicator } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        renderError('Please enter a search query.');
        return;
    }

    showLoadingIndicator();

    fetchImages(query)
        .then(images => {
            hideLoadingIndicator();
            if (images.length === 0) {
                renderImages([]);
                renderNoResults();
            } else {
                renderImages(images);
            }
        })
        .catch(error => {
            hideLoadingIndicator();
            renderError('An error occurred while fetching images. Please try again later.');
        });
});

