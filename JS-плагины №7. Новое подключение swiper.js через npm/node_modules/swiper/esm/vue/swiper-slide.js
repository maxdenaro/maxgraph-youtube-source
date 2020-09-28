import { h, ref, onMounted, onUpdated, onBeforeUpdate, computed, onBeforeUnmount } from 'vue';
import { uniqueClasses } from './utils';
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
    var slideElRef = ref(null);
    var slideClasses = ref('swiper-slide');

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }

    onMounted(function () {
      if (!swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });
    onBeforeUpdate(function () {
      if (eventAttached || !swiperRef || !swiperRef.value) return;
      swiperRef.value.on('_slideClass', updateClasses);
      eventAttached = true;
    });
    onUpdated(function () {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) return;

      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }
      }
    });
    onBeforeUnmount(function () {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
    });
    var slideData = computed(function () {
      return {
        isActive: slideClasses.value.indexOf('swiper-slide-active') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-active') >= 0,
        isVisible: slideClasses.value.indexOf('swiper-slide-visible') >= 0,
        isDuplicate: slideClasses.value.indexOf('swiper-slide-duplicate') >= 0,
        isPrev: slideClasses.value.indexOf('swiper-slide-prev') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-prev') >= 0,
        isNext: slideClasses.value.indexOf('swiper-slide-next') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate next') >= 0
      };
    });
    return function () {
      return h(props.tag, {
        class: uniqueClasses("" + slideClasses.value),
        ref: slideElRef,
        'data-swiper-slide-index': props.virtualIndex
      }, props.zoom ? h('div', {
        class: 'swiper-zoom-container',
        'data-swiper-zoom': typeof props.zoom === 'number' ? props.zoom : undefined
      }, slots.default && slots.default(slideData.value)) : slots.default && slots.default(slideData.value));
    };
  }
};
export { SwiperSlide };