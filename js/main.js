import renderThumbnails from './render-thumbnails.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './messages.js';
import './form.js';

try {
  const photoDescriptions = await getData();

  renderThumbnails(photoDescriptions);
} catch {
  showDataErrorMessage();
}
