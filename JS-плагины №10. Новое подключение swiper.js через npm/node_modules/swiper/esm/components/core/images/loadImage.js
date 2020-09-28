import { getWindow } from 'ssr-window';
import $ from '../../../utils/dom';
export default function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
  var window = getWindow();
  var image;

  function onReady() {
    if (callback) callback();
  }

  var isPicture = $(imageEl).parent('picture')[0];

  if (!isPicture && (!imageEl.complete || !checkForComplete)) {
    if (src) {
      image = new window.Image();
      image.onload = onReady;
      image.onerror = onReady;

      if (sizes) {
        image.sizes = sizes;
      }

      if (srcset) {
        image.srcset = srcset;
      }

      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
}