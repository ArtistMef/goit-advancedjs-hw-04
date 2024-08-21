// render-functions.js
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a');

export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    if (images.length === 0) {
        return; 
    }

    const markup = images.map(image => {
        return `
            <a href="${image.largeImageURL}" class="gallery-item">
                <img src="${image.webformatURL}" alt="${image.tags}" />
                <ul class="info">
                    <li class="gallery-info-item">
                        <strong>Likes</strong>
                        <span>${image.likes}</span>
                    </li>
                    <li class="gallery-info-item">
                        <strong>Views</strong>
                        <span>${image.views}</span>
                    </li>
                    <li class="gallery-info-item">
                        <strong>Comments</strong>
                        <span>${image.comments}</span>
                    </li>
                    <li class="gallery-info-item">
                        <strong>Downloads</strong>
                        <span>${image.downloads}</span>
                    </li>
                </ul>
            </a>
        `;
    }).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();


}

export function renderError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
    });
}

export function renderNoResults() {
    iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
    });
}

export function showLoadingIndicator() {
    document.querySelector('.loading-indicator').classList.remove('hidden');
}

export function hideLoadingIndicator() {
    document.querySelector('.loading-indicator').classList.add('hidden');
}
