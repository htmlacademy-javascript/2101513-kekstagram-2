import {
  debounce,
  sortRandomly,
  sortByComments
} from './utils.js';
import { Filter } from './enums.js';
import { RANDOM_PHOTOS_COUNT, DEBOUNCE_DELAY } from './consts.js';

const filtersContainer = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');

let currentFilter = Filter.DEFAULT;
let originalPhotos = [];

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...originalPhotos].sort(sortRandomly).slice(0, RANDOM_PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return [...originalPhotos].sort(sortByComments);
    default:
      return [...originalPhotos];
  }
};

const clearThumbnails = () => {
  const existingPictures = picturesContainer.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());
};

const setOnFilterClick = (callback) => {
  filtersContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.img-filters__button');
    if (!target) {
      return;
    }

    const activeButton = filtersContainer.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    target.classList.add('img-filters__button--active');
    currentFilter = target.id;

    // Вызываем колбэк (функцию отрисовки) с отфильтрованными фотографиями
    callback(getFilteredPhotos());
  });
};

const initFilters = (loadedPhotos, renderCallback) => {
  originalPhotos = [...loadedPhotos];
  filtersContainer.classList.remove('img-filters--inactive');

  const debouncedRender = debounce(renderCallback, DEBOUNCE_DELAY);

  setOnFilterClick(() => {
    clearThumbnails();
    debouncedRender(getFilteredPhotos());
  });
};

export default initFilters;
