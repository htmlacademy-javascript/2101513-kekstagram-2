import { DATA_ERROR_SHOW_TIME } from './consts.js';

import { isEscKeydown } from './utils.js';

const bodyElement = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

let currentMessageElement = null;
let onDocumentKeydown = null;

const hideMessage = () => {
  if (currentMessageElement) {
    currentMessageElement.remove();

    currentMessageElement = null;
    onDocumentKeydown = null;

    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const documentKeydownHandler = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const messageClickHandler = (evt, innerSelector, buttonSelector) => {
  const innerElement = evt.target.closest(innerSelector);
  const closeButton = evt.target.closest(buttonSelector);

  if (closeButton || !innerElement) {
    hideMessage();
  }
};

const showMessage = (template, innerSelector, buttonSelector) => {
  if (currentMessageElement) {
    return;
  }

  currentMessageElement = template.cloneNode(true);
  bodyElement.append(currentMessageElement);

  onDocumentKeydown = documentKeydownHandler;
  document.addEventListener('keydown', onDocumentKeydown);

  currentMessageElement.addEventListener('click', (evt) => {
    messageClickHandler(evt, innerSelector, buttonSelector);
  });
};

export const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__inner', '.success__button');
};

export const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__inner', '.error__button');
};

export const showDataErrorMessage = () => {
  const dataErrorElement = dataErrorMessageTemplate.cloneNode(true);
  bodyElement.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};
