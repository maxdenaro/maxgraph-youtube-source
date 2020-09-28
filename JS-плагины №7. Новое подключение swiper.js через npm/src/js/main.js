import './vendor/focus-visible.min.js';
import './_vars';
import {resizeContent} from './functions/resize';
import {scrollTo} from './functions/smooth-scroll';
import {disableScroll, enableScroll} from './functions/stop-scroll';

//disableScroll(fix) // fix -> class of element with position: fixed

import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const mySwiper = new Swiper('.swiper-container', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
