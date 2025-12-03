import {debounce, sortRandomly, sortByComments} from './utils.js';
import {Filter} from './enums.js';
import {RANDOM_PHOTOS_COUNT, DEBOUNCE_DELAY} from './consts.js';

const filtersElement = document.querySelector('.img-filters');
const photosElement = document.querySelector('.pictures');

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

const clearPhotos = () => {
  photosElement.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const setActiveButton = (targetButton) => {
  const activeButton = filtersElement.querySelector('.img-filters__button--active');

  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }

  targetButton.classList.add('img-filters__button--active');
};

const setOnFilterClick = (onFilterChange) => {
  filtersElement.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button) {
      return;
    }

    setActiveButton(button);
    currentFilter = button.id;

    onFilterChange();
  });
};

const initFilters = (loadedPhotos, renderCallback) => {
  originalPhotos = loadedPhotos.slice();
  filtersElement.classList.remove('img-filters--inactive');

  const debouncedRender = debounce(() => {
    clearPhotos();
    renderCallback(getFilteredPhotos());
  }, DEBOUNCE_DELAY);

  setOnFilterClick(debouncedRender);
};

export default initFilters;
