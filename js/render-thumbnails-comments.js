/**
 * Создает DOM-элемент для одного комментария на основе шаблона.
 * @param {object} data - Данные комментария ({ avatar, message, name }).
 * @param {HTMLElement} template - Шаблон элемента комментария для клонирования.
 * @returns {HTMLElement} - Готовый li-элемент комментария.
 */
const createComment = ({ avatar, message, name }, template) => {
  const commentElement = template.cloneNode(true);
  const pictureElement = commentElement.querySelector('.social__picture');
  const textElement = commentElement.querySelector('.social__text');

  pictureElement.src = avatar;
  pictureElement.alt = name;
  textElement.textContent = message;

  return commentElement;
};

/**
 * Создает DocumentFragment со списком комментариев.
 * @param {Array<object>} comments - Массив объектов с данными комментариев.
 * @param {HTMLElement} template - Шаблон элемента комментария.
 * @returns {DocumentFragment} - Фрагмент с готовыми DOM-элементами комментариев.
 */
const createCommentsFragment = (comments, template) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(createComment(comment, template));
  });
  return fragment;
};

export { createCommentsFragment };
