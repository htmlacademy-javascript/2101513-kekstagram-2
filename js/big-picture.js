import { COMMENTS_PER_VIEW } from './consts.js';
import { isEscKeydown } from './utils.js';
import { createCommentsFragment } from './render-thumbnails-comments';

const bodyElement = document.querySelector('body');

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const imageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentTemplateElement = document.querySelector('.social__comment');

let allComments = [];
let commentsShown = 0;

const renderComments = () => {
  const commentsToRender = allComments.slice(commentsShown, commentsShown + COMMENTS_PER_VIEW);
  commentsShown += commentsToRender.length;

  const commentsFragment = createCommentsFragment(commentsToRender, commentTemplateElement);
  commentsListElement.append(commentsFragment);

  commentsShownCountElement.textContent = commentsShown;
  commentsTotalCountElement.textContent = String(allComments.length);
  commentsLoaderElement.classList.toggle('hidden', commentsShown >= allComments.length);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', renderComments);

  // Сброс состояния
  commentsShown = 0;
  allComments = [];
};

function onDocumentKeydown(evt) {
  if (isEscKeydown(evt)) {
    evt.preventDefault();

    closeBigPicture();
  }
}

export const openBigPicture = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  captionElement.textContent = description;
  likesCountElement.textContent = likes;
  allComments = comments;

  commentsListElement.replaceChildren();
  renderComments();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', renderComments);
  closeButtonElement.addEventListener('click', closeBigPicture);
};
