// eslint-disable-next-line
import Swiper from '../../core';
import { needsNavigation, needsPagination, needsScrollbar } from './utils';

function initSwiper(_ref, swiperParams) {
  var el = _ref.el,
      nextEl = _ref.nextEl,
      prevEl = _ref.prevEl,
      paginationEl = _ref.paginationEl,
      scrollbarEl = _ref.scrollbarEl;

  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    if (swiperParams.navigation === true) {
      swiperParams.navigation = {};
    }

    swiperParams.navigation.nextEl = nextEl;
    swiperParams.navigation.prevEl = prevEl;
  }

  if (needsPagination(swiperParams) && paginationEl) {
    if (swiperParams.pagination === true) {
      swiperParams.pagination = {};
    }

    swiperParams.pagination.el = paginationEl;
  }

  if (needsScrollbar(swiperParams) && scrollbarEl) {
    if (swiperParams.scrollbar === true) {
      swiperParams.scrollbar = {};
    }

    swiperParams.scrollbar.el = scrollbarEl;
  }

  return new Swiper(el, swiperParams);
}

export { initSwiper };