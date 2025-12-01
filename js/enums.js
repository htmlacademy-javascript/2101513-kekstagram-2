import {
  MAX_COMMENT_LENGTH,
  MAX_HASHTAG_COUNT
} from './consts.js';

export const ErrorMessage = {
  STRING: 'Expected a not empty string, got a',
  NUMBER: 'Expected a positive finite number, got a',
  STRING_OR_NUMBER: 'Expected a not empty string or a positive finite number, got a',
  ARRAY: 'Expected an array, got a',
};

export const ValidateErrors = {
  INVALID: 'Введён невалидный хэштег',
  LIMIT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов.`,
  DUPLICATE: 'Один и тот же хэштег не может быть использован дважды.',
  LENGTH: `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов.`
};
