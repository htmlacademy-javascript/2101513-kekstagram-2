const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = pictureTemplateElement.cloneNode(true);

  const imageElement = thumbnail.querySelector('.picture__img');
  const likesElement = thumbnail.querySelector('.picture__likes');
  const commentsElement = thumbnail.querySelector('.picture__comments');

  imageElement.src = url;
  imageElement.alt = description;
  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);

    fragment.append(thumbnail);
  });

  picturesContainerElement.append(fragment);
};

export default renderThumbnails;
