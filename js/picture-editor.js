import {
  SCALE_STEP,
  MIN_SCALE,
  MAX_SCALE,
  DEFAULT_SCALE
} from './consts.js';

import {
  EffectsConfig
} from './enums.js';

const formElement = document.querySelector('.img-upload__form');
const previewImageElement = formElement.querySelector('.img-upload__preview img');
const scaleControlValueElement = formElement.querySelector('.scale__control--value');
const smallerButtonElement = formElement.querySelector('.scale__control--smaller');
const biggerButtonElement = formElement.querySelector('.scale__control--bigger');

const effectsListElement = formElement.querySelector('.effects__list');
const effectPreviewElements = effectsListElement.querySelectorAll('.effects__preview');
const sliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const sliderElement = formElement.querySelector('.effect-level__slider');
const effectLevelValueElement = formElement.querySelector('.effect-level__value');

let currentEffect = 'none';
let objectUrl = null;

const applyScale = (value) => {
  scaleControlValueElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${value / 100})`;
};

const onDecreaseSizeButtonClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, MIN_SCALE);

  applyScale(newValue);
};

const onIncreaseSizeButtonClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, MAX_SCALE);

  applyScale(newValue);
};

const updateSlider = () => {
  const { slider } = EffectsConfig[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: slider.range,
    step: slider.step,
    start: slider.start,
  });
};

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    sliderContainerElement.classList.add('hidden');
    previewImageElement.style.filter = 'none';
    effectLevelValueElement.value = '';
  } else {
    sliderContainerElement.classList.remove('hidden');

    updateSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  effectLevelValueElement.value = sliderValue;
  previewImageElement.style.filter = EffectsConfig[currentEffect].filter(sliderValue);
};

const initSlider = () => {
  if (sliderElement.noUiSlider) {
    return;
  }

  noUiSlider.create(sliderElement, {
    ...EffectsConfig.none.slider,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

export const updatePreviewImage = (url) => {
  objectUrl = url;
  previewImageElement.src = url;

  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url(${url})`;
  });
};

export const initImageEditor = () => {
  currentEffect = 'none';
  sliderContainerElement.classList.add('hidden');

  applyScale(DEFAULT_SCALE);
  initSlider();

  smallerButtonElement.addEventListener('click', onDecreaseSizeButtonClick);
  biggerButtonElement.addEventListener('click', onIncreaseSizeButtonClick);
  effectsListElement.addEventListener('change', onEffectChange);
};

export const resetImageEditor = () => {
  currentEffect = 'none';
  previewImageElement.style.filter = 'none';
  sliderContainerElement.classList.add('hidden');

  applyScale(DEFAULT_SCALE);

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  }

  smallerButtonElement.removeEventListener('click', onDecreaseSizeButtonClick);
  biggerButtonElement.removeEventListener('click', onIncreaseSizeButtonClick);
  effectsListElement.removeEventListener('change', onEffectChange);
};

