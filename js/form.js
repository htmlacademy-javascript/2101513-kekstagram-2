// src/form.js

import { initImageEditor, resetImageEditor } from './picture-editor.js';
import { isEscKeydown, validateHashtagPattern, validateHashtagCount, validateHashtagDuplicates, checkIsStringHasValidLength } from './utils.js';
import { MAX_COMMENT_LENGTH, MAX_HASHTAG_COUNT, HASHTAG_PATTERN } from './consts.js';
import { ValidateError, LoadingMessage } from './enums.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const formCancelButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButton = formElement.querySelector('.img-upload__submit');

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
  resetImageEditor();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openForm = () => {
  formOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  initImageEditor();
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKeydown(evt)) {
    if (document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement || document.querySelector('.error')) {
      return;
    }

    evt.preventDefault();

    closeForm();
  }
}

pristine.addValidator(hashtagsInputElement, (value) => validateHashtagPattern(value, HASHTAG_PATTERN), ValidateError.INVALID, 1, true);
pristine.addValidator(hashtagsInputElement, (value) => validateHashtagCount(value, MAX_HASHTAG_COUNT), ValidateError.LIMIT, 2, true);
pristine.addValidator(hashtagsInputElement, validateHashtagDuplicates, ValidateError.DUPLICATE, 3, true);
pristine.addValidator(commentInputElement, (value) => checkIsStringHasValidLength(value, MAX_COMMENT_LENGTH), ValidateError.LENGTH);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = LoadingMessage.LOAD;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = LoadingMessage.DEFAULT;
};

formElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();

    try {
      await sendData(new FormData(evt.target));
      closeForm();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  }
});

uploadInputElement.addEventListener('change', openForm);
formCancelButtonElement.addEventListener('click', closeForm);
