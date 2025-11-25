import {PHOTOS_QUANTITY} from './consts.js';

import createPhotoDescriptions from './create-photo-descriptions.js';
import renderThumbnails from './render-thumbnails.js';

const photoDescriptions = createPhotoDescriptions(PHOTOS_QUANTITY);

renderThumbnails(photoDescriptions);
