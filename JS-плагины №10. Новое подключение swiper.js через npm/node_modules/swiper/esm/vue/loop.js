function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { h } from 'vue'; // eslint-disable-next-line

import Swiper from '../../core';

function calcLoopedSlides(slides, swiperParams) {
  var slidesPerViewParams = swiperParams.slidesPerView;

  if (swiperParams.breakpoints) {
    var breakpoint = Swiper.prototype.getBreakpoint(swiperParams.breakpoints);
    var breakpointOnlyParams = breakpoint in swiperParams.breakpoints ? swiperParams.breakpoints[breakpoint] : undefined;

    if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
      slidesPerViewParams = breakpointOnlyParams.slidesPerView;
    }
  }

  var loopedSlides = Math.ceil(parseFloat(swiperParams.loopedSlides || slidesPerViewParams, 10));
  loopedSlides += swiperParams.loopAdditionalSlides;

  if (loopedSlides > slides.length) {
    loopedSlides = slides.length;
  }

  return loopedSlides;
}

function renderLoop(swiperRef, slides, swiperParams) {
  var modifiedSlides = slides.map(function (child, index) {
    if (!child.props) child.props = {};
    child.props.swiperRef = swiperRef;
    child.props['data-swiper-slide-index'] = index;
    return child;
  });

  function duplicateSlide(child, index, position) {
    if (!child.props) child.props = {};
    return h(child.type, _extends(_extends({}, child.props), {}, {
      key: child.key + "-duplicate-" + index + "-" + position,
      class: (child.props.className || '') + " " + swiperParams.slideDuplicateClass + " " + (child.props.class || '')
    }), child.children);
  }

  if (swiperParams.loopFillGroupWithBlank) {
    var blankSlidesNum = swiperParams.slidesPerGroup - modifiedSlides.length % swiperParams.slidesPerGroup;

    if (blankSlidesNum !== swiperParams.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankSlide = h('div', {
          class: swiperParams.slideClass + " " + swiperParams.slideBlankClass
        });
        modifiedSlides.push(blankSlide);
      }
    }
  }

  if (swiperParams.slidesPerView === 'auto' && !swiperParams.loopedSlides) {
    swiperParams.loopedSlides = modifiedSlides.length;
  }

  var loopedSlides = calcLoopedSlides(modifiedSlides, swiperParams);
  var prependSlides = [];
  var appendSlides = [];
  modifiedSlides.forEach(function (child, index) {
    if (index < loopedSlides) {
      appendSlides.push(duplicateSlide(child, index, 'prepend'));
    }

    if (index < modifiedSlides.length && index >= modifiedSlides.length - loopedSlides) {
      prependSlides.push(duplicateSlide(child, index, 'append'));
    }
  });

  if (swiperRef.value) {
    swiperRef.value.loopedSlides = loopedSlides;
  }

  return [].concat(prependSlides, modifiedSlides, appendSlides);
}

export { calcLoopedSlides, renderLoop };