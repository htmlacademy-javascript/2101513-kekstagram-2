import {getRandomArrayElement, getRandomIntegerBetweenRange, getUniqueInteger} from './utils.js';
import {
  AVATAR_MIN_ID, AVATAR_MAX_ID,
  COMMENT_MESSAGES, COMMENT_MESSAGES_MIN_QUANTITY, COMMENT_MESSAGES_MAX_QUANTITY,
  COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY,
  NAMES,
  DESCRIPTIONS,
  LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY,
  PHOTOS_QUANTITY
} from './consts.js';

const getUniqueCommentId = getUniqueInteger();
const getUniquePhotoDescriptionId = getUniqueInteger();

const createCommentMessage = () => {
  const commentMessagesQuantity = getRandomIntegerBetweenRange(COMMENT_MESSAGES_MIN_QUANTITY, COMMENT_MESSAGES_MAX_QUANTITY);
  const commentMessages = Array.from({length: commentMessagesQuantity}, () => getRandomArrayElement(COMMENT_MESSAGES));

  return commentMessages.join(' ');
};

const createComment = () => {
  const message = createCommentMessage();
  const avatarId = getRandomIntegerBetweenRange(AVATAR_MIN_ID, AVATAR_MAX_ID);
  const name = getRandomArrayElement(NAMES);

  return {
    id: getUniqueCommentId(),
    avatar: `img/avatar-${avatarId}.svg`,
    message,
    name
  };
};

const createComments = () => {
  const commentsQuantity = getRandomIntegerBetweenRange(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY);

  return Array.from({length: commentsQuantity}, createComment);
};

const createPhotoDescription = () => {
  const id = getUniquePhotoDescriptionId();
  const description = getRandomArrayElement(DESCRIPTIONS);
  const likes = getRandomIntegerBetweenRange(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY);
  const comments = createComments();

  return {
    id,
    url: `photos/${id}.jpg`,
    description,
    likes,
    comments
  };
};

export const createPhotoDescriptions = (quantity = PHOTOS_QUANTITY) => Array.from({length: quantity}, createPhotoDescription);
