"use strict";

exports.__esModule = true;
exports.SwiperSlide = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _useIsomorphicLayoutEffect = require("./use-isomorphic-layout-effect");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SwiperSlide = (0, _react.forwardRef)(function (_temp, externalRef) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$tag = _ref.tag,
      Tag = _ref$tag === void 0 ? 'div' : _ref$tag,
      children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      swiper = _ref.swiper,
      zoom = _ref.zoom,
      virtualIndex = _ref.virtualIndex,
      rest = _objectWithoutPropertiesLoose(_ref, ["tag", "children", "className", "swiper", "zoom", "virtualIndex"]);

  var slideElRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)('swiper-slide'),
      slideClasses = _useState[0],
      setSlideClasses = _useState[1];

  function updateClasses(swiper, el, classNames) {
    if (el === slideElRef.current) {
      setSlideClasses(classNames);
    }
  }

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (externalRef) {
      externalRef.current = slideElRef.current;
    }

    if (!slideElRef.current || !swiper) return;

    if (swiper.destroyed) {
      if (slideClasses !== 'swiper-slide') {
        setSlideClasses('swiper-slide');
      }

      return;
    }

    swiper.on('_slideClass', updateClasses); // eslint-disable-next-line

    return function () {
      if (!swiper) return;
      swiper.off('_slideClass', updateClasses);
    };
  });
  var slideData;

  if (typeof children === 'function') {
    slideData = {
      isActive: slideClasses.indexOf('swiper-slide-active') >= 0 || slideClasses.indexOf('swiper-slide-duplicate-active') >= 0,
      isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
      isDuplicate: slideClasses.indexOf('swiper-slide-duplicate') >= 0,
      isPrev: slideClasses.indexOf('swiper-slide-prev') >= 0 || slideClasses.indexOf('swiper-slide-duplicate-prev') >= 0,
      isNext: slideClasses.indexOf('swiper-slide-next') >= 0 || slideClasses.indexOf('swiper-slide-duplicate next') >= 0
    };
  }

  var renderChildren = function renderChildren() {
    return typeof children === 'function' ? children(slideData) : children;
  };

  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    ref: slideElRef,
    className: (0, _utils.uniqueClasses)("" + slideClasses + (className ? " " + className : '')),
    "data-swiper-slide-index": virtualIndex
  }, rest), zoom ? /*#__PURE__*/_react.default.createElement("div", {
    className: "swiper-zoom-container",
    "data-swiper-zoom": typeof zoom === 'number' ? zoom : undefined
  }, renderChildren()) : renderChildren());
});
exports.SwiperSlide = SwiperSlide;
SwiperSlide.displayName = 'SwiperSlide';