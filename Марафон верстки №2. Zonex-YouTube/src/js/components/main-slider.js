import Swiper from '../vendor/swiper.min.js';
import vars from '../_vars';

const bannerSlider = new Swiper(vars.$bannerSlider, {
  loop: true,
  containerModifierClass: 'banner-slider-',
  slidesPerView: 1,
  pagination: {
    el: '.banner-pag',
    type: 'bullets',
    clickable: true,
  },
});


