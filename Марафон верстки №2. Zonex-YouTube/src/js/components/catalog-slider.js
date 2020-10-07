import Swiper from '../vendor/swiper.min.js';
import vars from '../_vars';

const catalogSlider = new Swiper(vars.$catalogSlider, {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.hero-next-btn',
    prevEl: '.hero-prev-btn',
  },
});

const relatedSlider = new Swiper(vars.$cardRelatedSlider, {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: '.related-pag',
    type: 'bullets',
    clickable: true,
  },
});


