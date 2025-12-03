import {initImageEditor, resetImageEditor, updatePreviewImage} from './picture-editor.js';
import {
  isEscKeydown,
  validateHashtagPattern,
  validateHashtagCount,
  validateHashtagDuplicates,
  isStringHasValidLength
} from './utils.js';
import {
  MAX_COMMENT_LENGTH,
  MAX_HASHTAG_COUNT,
  HASHTAG_PATTERN,
  FILE_TYPES
} from './consts.js';
import {ValidateErrorMessage, LoadingMessage} from './enums.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const formCancelButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButton = formElement.querySelector('.img-upload__submit');

const pristineInstance = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeForm = () => {
  formOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  resetImageEditor();
  formElement.reset();
  pristineInstance.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openForm = () => {
  formOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  initImageEditor();
  document.addEventListener('keydown', onDocumentKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = LoadingMessage.LOAD;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = LoadingMessage.DEFAULT;
};

const onUploadInputChange = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const isImage = FILE_TYPES.some((ext) => fileName.endsWith(ext));

  if (isImage) {
    const imageUrl = URL.createObjectURL(file);
    updatePreviewImage(imageUrl);
    openForm();
  }
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

pristineInstance.addValidator(hashtagsInputElement, (value) => validateHashtagPattern(value, HASHTAG_PATTERN), ValidateErrorMessage.INVALID, 1, true);
pristineInstance.addValidator(hashtagsInputElement, (value) => validateHashtagCount(value, MAX_HASHTAG_COUNT), ValidateErrorMessage.LIMIT, 2, true);
pristineInstance.addValidator(hashtagsInputElement, validateHashtagDuplicates, ValidateErrorMessage.DUPLICATE, 3, true);
pristineInstance.addValidator(commentInputElement, (value) => isStringHasValidLength(value, MAX_COMMENT_LENGTH), ValidateErrorMessage.LENGTH);

formElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristineInstance.validate();

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
uploadInputElement.addEventListener('change', onUploadInputChange);
formCancelButtonElement.addEventListener('click', closeForm);
