import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = pictureTemplateElement.cloneNode(true);
  const imageElement = thumbnail.querySelector('.picture__img');

  thumbnail.dataset.thumbnailId = id;
  imageElement.src = url;
  imageElement.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });

  picturesContainerElement.append(fragment);

  picturesContainerElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();

    const photoData = photos.find(
      (photo) => photo.id === Number(thumbnail.dataset.thumbnailId)
    );

    if (photoData) {
      openBigPicture(photoData);
    }
  });
};

export default renderThumbnails;
