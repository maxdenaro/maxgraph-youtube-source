"use strict";

exports.__esModule = true;
exports.Swiper = void 0;

var _vue = require("vue");

var _getParams3 = require("./get-params");

var _initSwiper = require("./init-swiper");

var _utils = require("./utils");

var _loop = require("./loop");

var _getChangedParams = require("./get-changed-params");

var _getChildren2 = require("./get-children");

var _updateSwiper = require("./update-swiper");

var _virtual = require("./virtual");

var Swiper = {
  name: 'Swiper',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    wrapperTag: {
      type: String,
      default: 'div'
    },
    init: {
      type: Boolean,
      default: undefined
    },
    direction: {
      type: String,
      default: undefined
    },
    touchEventsTarget: {
      type: String,
      default: undefined
    },
    initialSlide: {
      type: Number,
      default: undefined
    },
    speed: {
      type: Number,
      default: undefined
    },
    cssMode: {
      type: Boolean,
      default: undefined
    },
    updateOnWindowResize: {
      type: Boolean,
      default: undefined
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    preventInteractionOnTransition: {
      type: Boolean,
      default: undefined
    },
    userAgent: {
      type: String,
      default: undefined
    },
    url: {
      type: String,
      default: undefined
    },
    edgeSwipeDetection: {
      type: Boolean,
      default: undefined
    },
    edgeSwipeThreshold: {
      type: Number,
      default: undefined
    },
    freeMode: {
      type: Boolean,
      default: undefined
    },
    freeModeMomentum: {
      type: Boolean,
      default: undefined
    },
    freeModeMomentumRatio: {
      type: Number,
      default: undefined
    },
    freeModeMomentumBounce: {
      type: Boolean,
      default: undefined
    },
    freeModeMomentumBounceRatio: {
      type: Number,
      default: undefined
    },
    freeModeMomentumVelocityRatio: {
      type: Number,
      default: undefined
    },
    freeModeSticky: {
      type: Boolean,
      default: undefined
    },
    freeModeMinimumVelocity: {
      type: Number,
      default: undefined
    },
    autoHeight: {
      type: Boolean,
      default: undefined
    },
    setWrapperSize: {
      type: Boolean,
      default: undefined
    },
    virtualTranslate: {
      type: Boolean,
      default: undefined
    },
    effect: {
      type: String,
      default: undefined
    },
    breakpoints: {
      type: Object,
      default: undefined
    },
    spaceBetween: {
      type: Number,
      default: undefined
    },
    slidesPerView: {
      type: [Number, String],
      default: undefined
    },
    slidesPerColumn: {
      type: Number,
      default: undefined
    },
    slidesPerColumnFill: {
      type: String,
      default: undefined
    },
    slidesPerGroup: {
      type: Number,
      default: undefined
    },
    slidesPerGroupSkip: {
      type: Number,
      default: undefined
    },
    centeredSlides: {
      type: Boolean,
      default: undefined
    },
    centeredSlidesBounds: {
      type: Boolean,
      default: undefined
    },
    slidesOffsetBefore: {
      type: Number,
      default: undefined
    },
    slidesOffsetAfter: {
      type: Number,
      default: undefined
    },
    normalizeSlideIndex: {
      type: Boolean,
      default: undefined
    },
    centerInsufficientSlides: {
      type: Boolean,
      default: undefined
    },
    watchOverflow: {
      type: Boolean,
      default: undefined
    },
    roundLengths: {
      type: Boolean,
      default: undefined
    },
    touchRatio: {
      type: Number,
      default: undefined
    },
    touchAngle: {
      type: Number,
      default: undefined
    },
    simulateTouch: {
      type: Boolean,
      default: undefined
    },
    shortSwipes: {
      type: Boolean,
      default: undefined
    },
    longSwipes: {
      type: Boolean,
      default: undefined
    },
    longSwipesRatio: {
      type: Number,
      default: undefined
    },
    longSwipesMs: {
      type: Number,
      default: undefined
    },
    followFinger: {
      type: Boolean,
      default: undefined
    },
    allowTouchMove: {
      type: Boolean,
      default: undefined
    },
    threshold: {
      type: Number,
      default: undefined
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: undefined
    },
    touchStartPreventDefault: {
      type: Boolean,
      default: undefined
    },
    touchStartForcePreventDefault: {
      type: Boolean,
      default: undefined
    },
    touchReleaseOnEdges: {
      type: Boolean,
      default: undefined
    },
    uniqueNavElements: {
      type: Boolean,
      default: undefined
    },
    resistance: {
      type: Boolean,
      default: undefined
    },
    resistanceRatio: {
      type: Number,
      default: undefined
    },
    watchSlidesProgress: {
      type: Boolean,
      default: undefined
    },
    watchSlidesVisibility: {
      type: Boolean,
      default: undefined
    },
    grabCursor: {
      type: Boolean,
      default: undefined
    },
    preventClicks: {
      type: Boolean,
      default: undefined
    },
    preventClicksPropagation: {
      type: Boolean,
      default: undefined
    },
    slideToClickedSlide: {
      type: Boolean,
      default: undefined
    },
    preloadImages: {
      type: Boolean,
      default: undefined
    },
    updateOnImagesReady: {
      type: Boolean,
      default: undefined
    },
    loop: {
      type: Boolean,
      default: undefined
    },
    loopAdditionalSlides: {
      type: Number,
      default: undefined
    },
    loopedSlides: {
      type: Number,
      default: undefined
    },
    loopFillGroupWithBlank: {
      type: Boolean,
      default: undefined
    },
    loopPreventsSlide: {
      type: Boolean,
      default: undefined
    },
    allowSlidePrev: {
      type: Boolean,
      default: undefined
    },
    allowSlideNext: {
      type: Boolean,
      default: undefined
    },
    swipeHandler: {
      type: Boolean,
      default: undefined
    },
    noSwiping: {
      type: Boolean,
      default: undefined
    },
    noSwipingClass: {
      type: String,
      default: undefined
    },
    noSwipingSelector: {
      type: String,
      default: undefined
    },
    passiveListeners: {
      type: Boolean,
      default: undefined
    },
    containerModifierClass: {
      type: String,
      default: undefined
    },
    slideClass: {
      type: String,
      default: undefined
    },
    slideBlankClass: {
      type: String,
      default: undefined
    },
    slideActiveClass: {
      type: String,
      default: undefined
    },
    slideDuplicateActiveClass: {
      type: String,
      default: undefined
    },
    slideVisibleClass: {
      type: String,
      default: undefined
    },
    slideDuplicateClass: {
      type: String,
      default: undefined
    },
    slideNextClass: {
      type: String,
      default: undefined
    },
    slideDuplicateNextClass: {
      type: String,
      default: undefined
    },
    slidePrevClass: {
      type: String,
      default: undefined
    },
    slideDuplicatePrevClass: {
      type: String,
      default: undefined
    },
    wrapperClass: {
      type: String,
      default: undefined
    },
    runCallbacksOnInit: {
      type: Boolean,
      default: undefined
    },
    a11y: {
      type: [Boolean, Object],
      default: undefined
    },
    autoplay: {
      type: [Boolean, Object],
      default: undefined
    },
    controller: {
      type: Object,
      default: undefined
    },
    coverflowEffect: {
      type: Object,
      default: undefined
    },
    cubeEffect: {
      type: Object,
      default: undefined
    },
    fadeEffect: {
      type: Object,
      default: undefined
    },
    flipEffect: {
      type: Object,
      default: undefined
    },
    hashNavigation: {
      type: [Boolean, Object],
      default: undefined
    },
    history: {
      type: [Boolean, Object],
      default: undefined
    },
    keyboard: {
      type: [Boolean, Object],
      default: undefined
    },
    lazy: {
      type: [Boolean, Object],
      default: undefined
    },
    mousewheel: {
      type: [Boolean, Object],
      default: undefined
    },
    navigation: {
      type: [Boolean, Object],
      default: undefined
    },
    pagination: {
      type: [Boolean, Object],
      default: undefined
    },
    parallax: {
      type: [Boolean, Object],
      default: undefined
    },
    scrollbar: {
      type: [Boolean, Object],
      default: undefined
    },
    thumbs: {
      type: Object,
      default: undefined
    },
    virtual: {
      type: [Boolean, Object],
      default: undefined
    },
    zoom: {
      type: [Boolean, Object],
      default: undefined
    }
  },
  setup: function setup(props, _ref) {
    var originalSlots = _ref.slots,
        emit = _ref.emit;
    var Tag = props.tag,
        WrapperTag = props.wrapperTag;
    var containerClasses = (0, _vue.ref)('swiper-container');
    var virtualData = (0, _vue.ref)(null);
    var breakpointChanged = (0, _vue.ref)(false);
    var initializedRef = (0, _vue.ref)(false);
    var swiperElRef = (0, _vue.ref)(null);
    var swiperRef = (0, _vue.ref)(null);
    var oldPassedParamsRef = (0, _vue.ref)(null);
    var slidesRef = (0, _vue.ref)([]);
    var oldSlidesRef = (0, _vue.ref)([]);
    var nextElRef = (0, _vue.ref)(null);
    var prevElRef = (0, _vue.ref)(null);
    var paginationElRef = (0, _vue.ref)(null);
    var scrollbarElRef = (0, _vue.ref)(null);

    var _getParams = (0, _getParams3.getParams)(props),
        swiperParams = _getParams.params,
        passedParams = _getParams.passedParams;

    (0, _getChildren2.getChildren)(originalSlots, slidesRef, oldSlidesRef);
    oldPassedParamsRef.value = passedParams;
    oldSlidesRef.value = slidesRef.value;

    var onBeforeBreakpoint = function onBeforeBreakpoint() {
      (0, _getChildren2.getChildren)(originalSlots, slidesRef, oldSlidesRef);
      breakpointChanged.value = true;
    };

    swiperParams.onAny = function (event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      emit.apply(void 0, [event].concat(args));
    };

    Object.assign(swiperParams.on, {
      _beforeBreakpoint: onBeforeBreakpoint,
      _containerClasses: function _containerClasses(swiper, classes) {
        containerClasses.value = classes;
      },
      _swiper: function _swiper(swiper) {
        swiper.loopCreate = function () {};

        swiper.loopDestroy = function () {};

        if (swiperParams.loop) {
          swiper.loopedSlides = (0, _loop.calcLoopedSlides)(slidesRef.value, swiperParams);
        }

        swiperRef.value = swiper;

        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.virtual.slides = slidesRef.value;
          swiper.params.virtual.cache = false;

          swiper.params.virtual.renderExternal = function (data) {
            virtualData.value = data;
          };

          swiper.params.virtual.renderExternalUpdate = false;
        }
      }
    });
    (0, _vue.onUpdated)(function () {
      // set initialized flag
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      } // watch for params change


      var _getParams2 = (0, _getParams3.getParams)(props),
          newPassedParams = _getParams2.passedParams;

      var changedParams = (0, _getChangedParams.getChangedParams)(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value);
      oldPassedParamsRef.value = newPassedParams;

      if ((changedParams.length || breakpointChanged.value) && swiperRef.value && !swiperRef.value.destroyed) {
        (0, _updateSwiper.updateSwiper)(swiperRef.value, slidesRef.value, newPassedParams, changedParams);
      }

      breakpointChanged.value = false;
    }); // update on virtual update

    (0, _vue.watch)(virtualData, function () {
      (0, _virtual.updateOnVirtualData)(swiperRef.value);
    }); // init swiper

    (0, _vue.onMounted)(function () {
      if (!swiperElRef.value) return;
      (0, _initSwiper.initSwiper)({
        el: swiperElRef.value,
        nextEl: nextElRef.value,
        prevEl: prevElRef.value,
        paginationEl: paginationElRef.value,
        scrollbarEl: scrollbarElRef.value
      }, swiperParams);
      emit('swiper', swiperRef.value);
    });
    (0, _vue.onBeforeUnmount)(function () {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy();
      }
    }); // bypass swiper instance to slides

    function renderSlides(slides) {
      if (swiperParams.virtual) {
        return (0, _virtual.renderVirtual)(swiperRef, slides, virtualData.value);
      }

      if (!swiperParams.loop || swiperRef.value && swiperRef.value.destroyed) {
        slides.forEach(function (slide) {
          if (!slide.props) slide.props = {};
          slide.props.swiperRef = swiperRef;
        });
        return slides;
      }

      return (0, _loop.renderLoop)(swiperRef, slides, swiperParams);
    }

    return function () {
      var _getChildren = (0, _getChildren2.getChildren)(originalSlots, slidesRef, oldSlidesRef),
          slides = _getChildren.slides,
          slots = _getChildren.slots;

      return (0, _vue.h)(Tag, {
        ref: swiperElRef,
        class: (0, _utils.uniqueClasses)(containerClasses.value)
      }, [slots['container-start'], (0, _utils.needsNavigation)(props) && [(0, _vue.h)('div', {
        ref: prevElRef,
        class: 'swiper-button-prev'
      }), (0, _vue.h)('div', {
        ref: nextElRef,
        class: 'swiper-button-next'
      })], (0, _utils.needsScrollbar)(props) && (0, _vue.h)('div', {
        ref: scrollbarElRef,
        class: 'swiper-scrollbar'
      }), (0, _utils.needsPagination)(props) && (0, _vue.h)('div', {
        ref: paginationElRef,
        class: 'swiper-pagination'
      }), (0, _vue.h)(WrapperTag, {
        class: 'swiper-wrapper'
      }, [slots['wrapper-start'], renderSlides(slides), slots['wrapper-end']]), slots['container-end']]);
    };
  }
};
exports.Swiper = Swiper;