'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('form');
const photosList = document.querySelector('ul');
const loadMoreButton = document.querySelector('.button-load-more');
let page = 1;
let perPage = 15;
let inputContent;
let totalHits;
let totalPages;

const louder = `<div class="loader"></div>`;
photosList.insertAdjacentHTML('afterend', louder);
const loaderBox = document.querySelector('.loader');

form.addEventListener('submit', searchImages);

async function searchImages(event) {
  try {
    event.preventDefault();
    page = 1;
    photosList.innerHTML = '';
    loadMoreButton.style.display = 'none';
    loaderBox.style.display = 'block';

    inputContent = event.currentTarget.text.value.trim();
    if (inputContent === '') {
      return iziToast.info({
        title: 'Attention',
        message: 'Please enter a request',
      });
    }

    const photos = await fetchPhotos();
    fetchThen(photos);
    loadMoreButton.addEventListener('click', searchMoreImages);
  } catch (error) {
    console.log(error);
  }
}
const fetchPhotos = async () => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '42277642-5b5e0c3e2383e813180f7c1aa',
      q: inputContent,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  });
  return response.data;
};

function fetchThen(photos) {
  const markupGalleryPhotos = photos.hits
    .map(photo => {
      return `
        <li class="gallery-item">
          <a href="${photo.largeImageURL}">
          <img src="${photo.webformatURL}" alt="${photo.tags}">
          <ul class="photo-info">
            <li>
                <h3>Likes</h3>
                <p>${photo.likes}</p>
            </li>
            <li>
                <h3>Views</h3>
                <p>${photo.views}</p>
            </li>
            <li>
                <h3>Comments</h3>
                <p>${photo.comments}</p>
            </li>
            <li>
                <h3>Downloads</h3>
                <p>${photo.downloads}</p>
            </li>
          </ul>
          </a>
        </li>
      `;
    })
    .join('');

  setTimeout(() => {
    loaderBox.style.display = 'none';
    if (photos.totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    photosList.insertAdjacentHTML('beforeend', markupGalleryPhotos);
    const galleryItem = document.querySelector('.gallery-item');
    let sizesGalleryBox = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: sizesGalleryBox.width * 2,
      behavior: 'smooth',
    });

    loadMoreButton.style.display = 'inline-block';

    let lightbox = new SimpleLightbox('.gallery-list a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    totalHits = photos.totalHits;
    totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      loadMoreButton.style.display = 'none';

      return iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }, 1000);
}

async function searchMoreImages() {
  try {
    page += 1;
    loadMoreButton.style.display = 'none';
    loaderBox.style.display = 'block';
    const photos = await fetchPhotos();
    fetchThen(photos);
  } catch (error) {
    console.log(error);
  }
}
