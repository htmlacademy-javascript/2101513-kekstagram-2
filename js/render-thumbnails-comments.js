const createComment = ({ avatar, message, name }, template) => {
  const commentElement = template.cloneNode(true);
  const pictureElement = commentElement.querySelector('.social__picture');
  const textElement = commentElement.querySelector('.social__text');

  pictureElement.src = avatar;
  pictureElement.alt = name;
  textElement.textContent = message;

  return commentElement;
};

const createCommentsFragment = (comments, template) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(createComment(comment, template));
  });
  return fragment;
};

export default createCommentsFragment;
