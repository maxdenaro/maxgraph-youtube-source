"use strict";

exports.__esModule = true;
exports.renderVirtual = renderVirtual;
exports.updateOnVirtualData = updateOnVirtualData;

var _vue = require("vue");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();

  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
}

function renderVirtual(swiperRef, slides, virtualData) {
  var _ref;

  if (!virtualData) return null;
  var style = swiperRef.value.isHorizontal() ? (_ref = {}, _ref[swiperRef.value.rtlTranslate ? 'right' : 'left'] = virtualData.offset + "px", _ref) : {
    top: virtualData.offset + "px"
  };
  return slides.filter(function (slide, index) {
    return index >= virtualData.from && index <= virtualData.to;
  }).map(function (slide) {
    if (!slide.props) slide.props = {};
    if (!slide.props.style) slide.props.style = {};
    slide.props.swiperRef = swiperRef;
    slide.props.style = style;
    return (0, _vue.h)(slide.type, _extends({}, slide.props), slide.children);
  });
}