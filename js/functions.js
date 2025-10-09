import {ErrorMessage} from './const.js';

/**
 * Проверяет, не превышает ли длина строки указанное значение.
 * @param {string} str - Строка для проверки.
 * @param {number} maxLength - Максимально допустимая длина.
 * @returns {boolean} true, если строка короче или равна maxLength, иначе false.
 * @throws {Error} Если аргументы некорректного типа.
 */
const checkIsStringHasValidLength = (str, maxLength) => {
  if (typeof str !== 'string' || !str.length) {
    throw new Error(`${ErrorMessage.STRING} ${str}`);
  }

  if (typeof maxLength !== 'number' || !Number.isFinite(maxLength) || maxLength <= 0) {
    throw new Error(`${ErrorMessage.NUMBER} ${maxLength}`);
  }

  return str.length <= Math.floor(maxLength);
};

// Строка короче 20 символов
checkIsStringHasValidLength('проверяемая строка', 20);
// Длина строки ровно 18 символов
checkIsStringHasValidLength('проверяемая строка', 18);
// Строка длиннее 10 символов
checkIsStringHasValidLength('проверяемая строка', 10);
