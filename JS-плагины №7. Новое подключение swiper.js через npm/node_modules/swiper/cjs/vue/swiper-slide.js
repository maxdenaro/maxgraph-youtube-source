"use strict";

exports.__esModule = true;
exports.SwiperSlide = void 0;

var _vue = require("vue");

var _utils = require("./utils");

var SwiperSlide = {
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    swiperRef: Object,
    zoom: {
      type: Boolean,
      default: undefined
    },
    virtualIndex: {
      type: [String, Number],
      default: undefined
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var eventAttached = false;
    var swiperRef = props.swiperRef;
    var slideElRef = (0, _vue.ref)(null);
    var slideClasses = (0, _vue.ref)('swiper-slide');

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }

    (0, _vue.onMounted)(function () {
      if (!swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });
    (0, _vue.onBeforeUpdate)(function () {
      if (eventAttached || !swiperRef || !swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });
    (0, _vue.onUpdated)(function () {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) return;

      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }
      }
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
    });
    var slideData = (0, _vue.computed)(function () {
      return {
        isActive: slideClasses.value.indexOf('swiper-slide-active') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-active') >= 0,
        isVisible: slideClasses.value.indexOf('swiper-slide-visible') >= 0,
        isDuplicate: slideClasses.value.indexOf('swiper-slide-duplicate') >= 0,
        isPrev: slideClasses.value.indexOf('swiper-slide-prev') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-prev') >= 0,
        isNext: slideClasses.value.indexOf('swiper-slide-next') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate next') >= 0
      };
    });
    return function () {
      return (0, _vue.h)(props.tag, {
        class: (0, _utils.uniqueClasses)("" + slideClasses.value),
        ref: slideElRef,
        'data-swiper-slide-index': props.virtualIndex
      }, props.zoom ? (0, _vue.h)('div', {
        class: 'swiper-zoom-container',
        'data-swiper-zoom': typeof props.zoom === 'number' ? props.zoom : undefined
      }, slots.default && slots.default(slideData.value)) : slots.default && slots.default(slideData.value));
    };
  }
};
exports.SwiperSlide = SwiperSlide;