import createPhotoDescriptions from './create-photo-descriptions.js';
import renderThumbnails from './render-thumbnails.js';
import './form.js';

const photoDescriptions = createPhotoDescriptions();

renderThumbnails(photoDescriptions);
