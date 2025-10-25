import {ErrorMessage} from './enums.js';

/**
 * Проверяет, не превышает ли длина строки указанное значение.
 * @param {string} str - Строка для проверки.
 * @param {number} maxLength - Максимально допустимая длина.
 * @returns {boolean} true, если строка короче или равна maxLength, иначе false.
 * @throws {Error} Если аргументы некорректного типа ИЛИ бесконечны ИЛИ меньше или равны 0.
 */
export const checkIsStringHasValidLength = (str, maxLength) => {
  if (typeof str !== 'string' || !str.length) {
    throw new Error(`${ErrorMessage.STRING} ${str}`);
  }

  if (typeof maxLength !== 'number' || !Number.isFinite(maxLength) || maxLength <= 0) {
    throw new Error(`${ErrorMessage.NUMBER} ${maxLength}`);
  }

  return str.length <= Math.floor(maxLength);
};

/**
 * Проверяет, является ли строка палиндромом
 * @param {string} str - Строка для проверки.
 * @return {boolean} true, если строка является палиндромом, иначе false.
 * @throws {Error} Если аргументы некорректного типа ИЛИ длина строки равна 0.
 */
export const checkIsPalindrome = (str = '') => {
  if (typeof str !== 'string' || !str.length) {
    throw new Error(`${ErrorMessage.STRING} ${str}`);
  }

  const normalizedString = str.toLowerCase().replace(/[^a-яёa-z0-9]/gi, '');
  const reversedNormalizedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedNormalizedString;
};

/**
 * Извлекает из входящего параметра цифры от 0 до 9 и возвращает их в виде целого положительного числа
 * @param {string | number} value - Значение, впоследствие приводящееся к строке.
 * @return {number | NaN} При наличии цифр озвращает целое положительное число, иначе NaN.
 * @throws {Error} Если переданный аргумент пуст.
 */
export const extractNumbers = (value) => {
  const str = String(value);

  if (!str.length) {
    throw new Error(`${ErrorMessage.STRING} ${value}`);
  }

  const digitsWithoutOperators = str.match(/\d/g);

  return digitsWithoutOperators ? Number(digitsWithoutOperators.join('')) : NaN;
};

/**
 * Возвращает случайное числовое значение между min и max включительно
 * @param min {number} - Минимальное числовое значение.
 * @param max {number} - Максимальное числовое значение.
 * @return {number} - Случайное числовое значение.
 * @throws {Error} Если аргументы некорректного типа ИЛИ бесконечны.
 */
export const getRandomIntegerBetweenRange = (min, max) => {
  if (
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    !Number.isFinite(min) ||
    !Number.isFinite(max)
  ) {
    throw new Error(`${ErrorMessage.NUMBER} ${min}, ${max}`);
  }

  const minValue = Math.floor(Math.min(min, max));
  const maxValue = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

/**
 * Возвращает случайный элемент массива
 * @param array {array}
 * @return {any}
 * @throws {Error} Если аргумент некорректного типа ИЛИ пустой
 */
export const getRandomArrayElement = (array) => {
  if (!Array.isArray(array) || !array.length) {
    throw new Error(`${ErrorMessage.ARRAY} ${array}`);
  }

  return array[getRandomIntegerBetweenRange(0, array.length - 1)];
};

/**
 * Возвращает функцию для создания случайного неповторяющегося числового значения
 * @return {Function}
 */
export const getUniqueIntegerGenerator = () => {
  let currentId = 1;

  return () => currentId++;
};
