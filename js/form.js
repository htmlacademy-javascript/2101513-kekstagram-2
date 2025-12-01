import {
  isEscKeydown,
  validateHashtagPattern,
  validateHashtagCount,
  validateHashtagDuplicates,
  checkIsStringHasValidLength
} from './utils.js';

import {
  MAX_COMMENT_LENGTH,
  MAX_HASHTAG_COUNT,
  HASHTAG_PATTERN
} from './consts.js';

import {
  ValidateErrors
} from './enums.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const formCancelButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeForm = () => {
  formOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  formElement.reset();
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openForm = () => {
  formOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 * Обработчик нажатия Esc. Закрывает форму, если фокус не в полях ввода.
 * @param {KeyboardEvent} evt - Событие клавиатуры.
 */
function onDocumentKeydown(evt) {
  if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement) {
    return;
  }

  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

pristine.addValidator(hashtagsInputElement, (value) => validateHashtagPattern(value, HASHTAG_PATTERN), ValidateErrors.INVALID);
pristine.addValidator(hashtagsInputElement, (value) => validateHashtagCount(value, MAX_HASHTAG_COUNT), ValidateErrors.LIMIT);
pristine.addValidator(hashtagsInputElement, validateHashtagDuplicates, ValidateErrors.DUPLICATE);
pristine.addValidator(commentInputElement, (value) => checkIsStringHasValidLength(value, MAX_COMMENT_LENGTH), ValidateErrors.LENGTH);

uploadInputElement.addEventListener('change', openForm);
formCancelButtonElement.addEventListener('click', closeForm);

formElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});
