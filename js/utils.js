import {ErrorMessage} from './enums.js';
import { ESC_KEY_NAME } from './consts.js';

/**
 * Проверяет, не превышает ли длина строки указанное значение.
 * @param {string} str - Строка для проверки.
 * @param {number} maxLength - Максимально допустимая длина.
 * @returns {boolean} true, если строка короче или равна maxLength, иначе false.
 * @throws {Error} Если аргументы некорректного типа ИЛИ бесконечны ИЛИ меньше или равны 0.
 */
export const checkIsStringHasValidLength = (str, maxLength) => {
  if (typeof str !== 'string') {
    throw new Error(`${ErrorMessage.STRING} ${str}`);
  }

  if (typeof maxLength !== 'number' || !Number.isFinite(maxLength) || maxLength <= 0) {
    throw new Error(`${ErrorMessage.NUMBER} ${maxLength}`);
  }

  return str.length <= Math.floor(maxLength);
};

/**
 * Возвращает результат проверки нажатия пользователем на кнопку Ecs
 * @param {KeyboardEvent} evt
 * @returns {boolean}
 */
export const isEscKeydown = (evt) => evt.key === ESC_KEY_NAME;

/**
 * Преобразует строку с хэштегами в массив, удаляя пробелы и приводя к нижнему регистру.
 * @param {string} value - Строка из поля ввода.
 * @returns {string[]} - Массив хэштегов.
 */
export const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter((tag) => tag.length > 0);

/**
 * Проверяет, соответствует ли каждый хэштег заданному паттерну.
 * @param {string} value - Строка из поля ввода.
 * @param {RegExp} pattern - Регулярное выражение для проверки.
 * @returns {boolean} - True, если все хэштеги валидны.
 */
export const validateHashtagPattern = (value, pattern) => {
  if (!value) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.every((tag) => pattern.test(tag));
};

/**
 * Проверяет, не превышено ли максимальное количество хэштегов.
 * @param {string} value - Строка из поля ввода.
 * @param {number} maxCount - Максимальное количество хэштегов.
 * @returns {boolean} - True, если количество не превышено.
 */
export const validateHashtagCount = (value, maxCount) => {
  const hashtags = parseHashtags(value);
  return hashtags.length <= maxCount;
};

/**
 * Проверяет наличие дубликатов хэштегов.
 * @param {string} value - Строка из поля ввода.
 * @returns {boolean} - True, если дубликатов нет.
 */
export const validateHashtagDuplicates = (value) => {
  const hashtags = parseHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/**
 * Сортирует фотографии в случайном порядке.
 * @returns {number}
 */
export const sortRandomly = () => Math.random() - 0.5;

/**
 * Сортирует фотографии по количеству комментариев в порядке убывания.
 * @param {object} photoA - Первая фотография для сравнения.
 * @param {object} photoB - Вторая фотография для сравнения.
 * @returns {number} - Результат сравнения.
 */
export const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
