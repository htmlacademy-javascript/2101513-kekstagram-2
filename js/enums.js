import {MAX_COMMENT_LENGTH, MAX_HASHTAG_COUNT} from './consts.js';

export const ValidateError = {
  INVALID: 'Введён невалидный хэштег',
  LIMIT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов.`,
  DUPLICATE: 'Один и тот же хэштег не может быть использован дважды.',
  LENGTH: `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов.`
};

export const EffectsConfig = {
  none: {
    slider: {
      range: { min: 0, max: 100 },
      step: 1,
      start: 100,
    },
    filter: () => 'none',
  },
  chrome: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
      start: 1,
    },
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
      start: 1,
    },
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    slider: {
      range: { min: 0, max: 100 },
      step: 1,
      start: 100,
    },
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    slider: {
      range: { min: 0, max: 3 },
      step: 0.1,
      start: 3,
    },
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    slider: {
      range: { min: 1, max: 3 },
      step: 0.1,
      start: 3,
    },
    filter: (value) => `brightness(${value})`,
  },
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const Route = {
  GET: '/data',
  POST: '/',
};

export const ErrorMessage = {
  STRING: 'Ожидается не пустая строка, получено ',
  NUMBER: 'Ожидается положительное конечное число, получено ',
  STRING_OR_NUMBER: 'Ожидается не пустая строка или положительное конечно число, получено ',
  ARRAY: 'Ожидается массив, получен ',
};

export const LoadingMessage = {
  DEFAULT: 'Опубликовать',
  LOAD: 'Публикую...'
};

export const ApiErrorMessage = {
  GET: 'Ошибка загрузки данных. Попробуйте обновить страницу или зайти позже.',
  POST: 'Ошибка отправки формы. Попробуйте отправить форму ещё раз или воспользуйтесь ею позже.',
};

export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
