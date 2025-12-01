import createPhotoDescriptions from './create-photo-descriptions.js';
import renderThumbnails from './render-thumbnails.js';

const photoDescriptions = createPhotoDescriptions();

renderThumbnails(photoDescriptions);
