"use strict";

exports.__esModule = true;
exports.updateSwiper = updateSwiper;

var _utils = require("./utils");

function updateSwiper(swiper, slides, passedParams, changedParams) {
  var updateParams = changedParams.filter(function (key) {
    return key !== 'children' && key !== 'direction';
  });
  var currentParams = swiper.params,
      pagination = swiper.pagination,
      navigation = swiper.navigation,
      scrollbar = swiper.scrollbar,
      virtual = swiper.virtual,
      thumbs = swiper.thumbs;
  var needThumbsInit;
  var needControllerInit;
  var needPaginationInit;
  var needScrollbarInit;
  var needNavigationInit;

  if (changedParams.includes('thumbs') && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
    needThumbsInit = true;
  }

  if (changedParams.includes('controller') && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }

  if (changedParams.includes('pagination') && passedParams.pagination && passedParams.pagination.el && currentParams.pagination && pagination && !pagination.el) {
    needPaginationInit = true;
  }

  if (changedParams.includes('scrollbar') && passedParams.scrollbar && passedParams.scrollbar.el && currentParams.scrollbar && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }

  if (changedParams.includes('navigation') && passedParams.navigation && passedParams.navigation.prevEl && passedParams.navigation.nextEl && currentParams.navigation && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }

  updateParams.forEach(function (key) {
    if ((0, _utils.isObject)(currentParams[key]) && (0, _utils.isObject)(passedParams[key])) {
      (0, _utils.extend)(currentParams[key], passedParams[key]);
    } else {
      currentParams[key] = passedParams[key];
    }
  });

  if (changedParams.includes('children') && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  }

  if (needThumbsInit) {
    var initialized = thumbs.init();
    if (initialized) thumbs.update(true);
  }

  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }

  if (needPaginationInit) {
    pagination.init();
    pagination.render();
    pagination.update();
  }

  if (needScrollbarInit) {
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }

  if (needNavigationInit) {
    navigation.init();
    navigation.update();
  }

  if (changedParams.includes('allowSlideNext')) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }

  if (changedParams.includes('allowSlidePrev')) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }

  if (changedParams.includes('direction')) {
    swiper.changeDirection(passedParams.direction, false);
  }

  swiper.update();
}