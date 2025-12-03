import { BASE_API_URL} from './consts.js';

import {Method, Route, ApiErrorMessage} from './enums.js';

/**
 * Базовая функция для отправки запросов на сервер.
 * @param {string} route - Путь к ресурсу на сервере.
 * @param {string} errorText - Текст ошибки для new Error().
 * @param {string} [method=Method.GET] - HTTP-метод.
 * @param {FormData|null} [body=null] - Тело запроса.
 * @returns {Promise<any>} - Promise, который разрешается с данными ответа.
 */
const load = async (route, errorText, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_API_URL}${route}`, { method, body });

  if (!response.ok) {
    throw new Error(errorText);
  }

  return response.json();
};

/**
 * Получает данные фотографий с сервера.
 * @returns {Promise<Array<object>>} - Promise с массивом данных.
 */
export const getData = async () => load(Route.GET, ApiErrorMessage.GET);

/**
 * Отправляет данные формы на сервер.
 * @param {FormData} body - FormData с данными формы.
 * @returns {Promise<any>} - Promise с результатом отправки.
 */
export const sendData = async (body) => load(Route.POST, ApiErrorMessage.POST, Method.POST, body);
