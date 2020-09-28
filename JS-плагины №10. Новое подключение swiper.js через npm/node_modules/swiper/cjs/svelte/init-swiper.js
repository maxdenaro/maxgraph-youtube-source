"use strict";

exports.__esModule = true;
exports.initSwiper = initSwiper;

var _core = _interopRequireDefault(require("../../core"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
function initSwiper(_ref, swiperParams) {
  var el = _ref.el,
      nextEl = _ref.nextEl,
      prevEl = _ref.prevEl,
      paginationEl = _ref.paginationEl,
      scrollbarEl = _ref.scrollbarEl;

  if ((0, _utils.needsNavigation)(swiperParams) && nextEl && prevEl) {
    if (swiperParams.navigation === true) {
      swiperParams.navigation = {};
    }

    swiperParams.navigation.nextEl = nextEl;
    swiperParams.navigation.prevEl = prevEl;
  }

  if ((0, _utils.needsPagination)(swiperParams) && paginationEl) {
    if (swiperParams.pagination === true) {
      swiperParams.pagination = {};
    }

    swiperParams.pagination.el = paginationEl;
  }

  if ((0, _utils.needsScrollbar)(swiperParams) && scrollbarEl) {
    if (swiperParams.scrollbar === true) {
      swiperParams.scrollbar = {};
    }

    swiperParams.scrollbar.el = scrollbarEl;
  }

  return new _core.default(el, swiperParams);
}