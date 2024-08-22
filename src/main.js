// main.js
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, renderError, renderNoResults, showLoadingIndicator, hideLoadingIndicator, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    currentQuery = searchInput.value.trim();
    currentPage = 1;

    if (!currentQuery) {
        renderError('Please enter a search query.');
        return;
    }
    hideLoadMoreButton();
    showLoadingIndicator();

    try {
        const { images, totalHits: hits } = await fetchImages(currentQuery, currentPage);
        totalHits = hits;
        hideLoadingIndicator();

        if (images.length === 0) {
            renderImages([]);
            renderNoResults();
        } else {
            renderImages(images);
            if (images.length < totalHits) {
                showLoadMoreButton();
            }
        }
    } catch (error) {
        hideLoadingIndicator();
        renderError('An error occurred while fetching images. Please try again later.');
    }
});

loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    showLoadingIndicator();

    try {
        const { images } = await fetchImages(currentQuery, currentPage);
        hideLoadingIndicator();

        renderImages(images, false); 

        const galleryItems = document.querySelectorAll('.gallery-item');
        const loadedImagesCount = galleryItems.length;

        const lastItem = galleryItems[galleryItems.length - 1];
        const cardHeight = lastItem.getBoundingClientRect().height;

        setTimeout(() => {
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }, 100);

        if (loadedImagesCount >= totalHits) {
            hideLoadMoreButton();
            renderError("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        hideLoadingIndicator();
        renderError('An error occurred while fetching more images. Please try again later.');
    }
});


