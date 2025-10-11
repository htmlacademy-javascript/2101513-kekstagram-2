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

/**
 * Проверяет, является ли строка палиндромом
 * @param {string} str
 * @return {boolean} true, если строка является палиндромом, иначе false
 * @throws {Error} Если аргументы некорректного типа.
 */
const checkIsPalindrome = (str = '') => {
  if (typeof str !== 'string' || !str.length) {
    throw new Error(`${ErrorMessage.STRING} ${str}`);
  }

  const normalizedString = str.toLowerCase().replace(/[^a-яёa-z0-9]/gi, '');
  const reversedNormalizedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedNormalizedString;
};

// Строка является палиндромом
checkIsPalindrome('топот');
// Несмотря на разный регистр, тоже палиндром
checkIsPalindrome('ДовОд');
// Это не палиндром
checkIsPalindrome('Кекс');

/**
 * Извлекает из входящего параметра цифры от 0 до 9 и возвращает их в виде целого положительного числа
 * @param {string | number} value
 * @return {number | NaN} При наличии цифр озвращает целое положительное число, иначе NaN.
 * @throws {Error} Если аргументы некорректного типа.
 */
const extractNumbers = (value) => {
  const str = String(value);

  if (!str.length) {
    throw new Error(`${ErrorMessage.STRING} ${value}`);
  }

  const digitsWithoutOperators = str.match(/\d/g);

  return digitsWithoutOperators ? Number(digitsWithoutOperators.join('')) : NaN;
};

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN

extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15
