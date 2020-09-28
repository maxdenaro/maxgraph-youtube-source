"use strict";

exports.__esModule = true;
exports.renderVirtual = renderVirtual;
exports.updateOnVirtualData = updateOnVirtualData;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();

  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
}

function renderVirtual(swiper, slides, virtualData) {
  var _ref;

  if (!virtualData) return null;
  var style = swiper.isHorizontal() ? (_ref = {}, _ref[swiper.rtlTranslate ? 'right' : 'left'] = virtualData.offset + "px", _ref) : {
    top: virtualData.offset + "px"
  };
  return slides.filter(function (child, index) {
    return index >= virtualData.from && index <= virtualData.to;
  }).map(function (child) {
    return _react.default.cloneElement(child, {
      swiper: swiper,
      style: style
    });
  });
}