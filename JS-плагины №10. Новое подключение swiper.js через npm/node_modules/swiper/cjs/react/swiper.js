"use strict";

exports.__esModule = true;
exports.Swiper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _getParams2 = require("./get-params");

var _initSwiper = require("./init-swiper");

var _utils = require("./utils");

var _loop = require("./loop");

var _getChangedParams = require("./get-changed-params");

var _getChildren2 = require("./get-children");

var _updateSwiper = require("./update-swiper");

var _virtual = require("./virtual");

var _useIsomorphicLayoutEffect = require("./use-isomorphic-layout-effect");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Swiper = (0, _react.forwardRef)(function (_temp, externalElRef) {
  var _ref = _temp === void 0 ? {} : _temp,
      className = _ref.className,
      _ref$tag = _ref.tag,
      Tag = _ref$tag === void 0 ? 'div' : _ref$tag,
      _ref$wrapperTag = _ref.wrapperTag,
      WrapperTag = _ref$wrapperTag === void 0 ? 'div' : _ref$wrapperTag,
      children = _ref.children,
      onSwiper = _ref.onSwiper,
      rest = _objectWithoutPropertiesLoose(_ref, ["className", "tag", "wrapperTag", "children", "onSwiper"]);

  var _useState = (0, _react.useState)('swiper-container'),
      containerClasses = _useState[0],
      setContainerClasses = _useState[1];

  var _useState2 = (0, _react.useState)(null),
      virtualData = _useState2[0],
      setVirtualData = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      breakpointChanged = _useState3[0],
      setBreakpointChanged = _useState3[1];

  var initializedRef = (0, _react.useRef)(false);
  var swiperElRef = (0, _react.useRef)(null);
  var swiperRef = (0, _react.useRef)(null);
  var oldPassedParamsRef = (0, _react.useRef)(null);
  var oldSlides = (0, _react.useRef)(null);
  var nextElRef = (0, _react.useRef)(null);
  var prevElRef = (0, _react.useRef)(null);
  var paginationElRef = (0, _react.useRef)(null);
  var scrollbarElRef = (0, _react.useRef)(null);

  var _getParams = (0, _getParams2.getParams)(rest),
      swiperParams = _getParams.params,
      passedParams = _getParams.passedParams,
      restProps = _getParams.rest;

  var _getChildren = (0, _getChildren2.getChildren)(children),
      slides = _getChildren.slides,
      slots = _getChildren.slots;

  var changedParams = (0, _getChangedParams.getChangedParams)(passedParams, oldPassedParamsRef.current, slides, oldSlides.current);
  oldPassedParamsRef.current = passedParams;
  oldSlides.current = slides;

  var onBeforeBreakpoint = function onBeforeBreakpoint() {
    setBreakpointChanged(!breakpointChanged);
  };

  Object.assign(swiperParams.on, {
    _containerClasses: function _containerClasses(swiper, classes) {
      setContainerClasses(classes);
    },
    _swiper: function _swiper(swiper) {
      swiper.loopCreate = function () {};

      swiper.loopDestroy = function () {};

      if (swiperParams.loop) {
        swiper.loopedSlides = (0, _loop.calcLoopedSlides)(slides, swiperParams);
      }

      swiperRef.current = swiper;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.virtual.slides = slides;
        swiper.params.virtual.cache = false;
        swiper.params.virtual.renderExternal = setVirtualData;
        swiper.params.virtual.renderExternalUpdate = false;
      }
    }
  });

  if (swiperRef.current) {
    swiperRef.current.on('_beforeBreakpoint', onBeforeBreakpoint);
  }

  (0, _react.useEffect)(function () {
    return function () {
      if (swiperRef.current) swiperRef.current.off('_beforeBreakpoint', onBeforeBreakpoint);
    };
  }); // set initialized flag

  (0, _react.useEffect)(function () {
    if (!initializedRef.current && swiperRef.current) {
      swiperRef.current.emitSlidesClasses();
      initializedRef.current = true;
    }
  }); // watch for params change

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) {
      (0, _updateSwiper.updateSwiper)(swiperRef.current, slides, passedParams, changedParams);
    }
  }); // update on virtual update

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    (0, _virtual.updateOnVirtualData)(swiperRef.current);
  }, [virtualData]); // init swiper

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (externalElRef) {
      externalElRef.current = swiperElRef.current;
    }

    if (!swiperElRef.current) return;
    (0, _initSwiper.initSwiper)({
      el: swiperElRef.current,
      nextEl: nextElRef.current,
      prevEl: prevElRef.current,
      paginationEl: paginationElRef.current,
      scrollbarEl: scrollbarElRef.current
    }, swiperParams);
    if (onSwiper) onSwiper(swiperRef.current); // eslint-disable-next-line

    return function () {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.destroy();
      }
    };
  }, []); // bypass swiper instance to slides

  function renderSlides() {
    if (swiperParams.virtual) {
      return (0, _virtual.renderVirtual)(swiperRef.current, slides, virtualData);
    }

    if (!swiperParams.loop || swiperRef.current && swiperRef.current.destroyed) {
      return slides.map(function (child) {
        return _react.default.cloneElement(child, {
          swiper: swiperRef.current
        });
      });
    }

    return (0, _loop.renderLoop)(swiperRef.current, slides, swiperParams);
  }

  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    ref: swiperElRef,
    className: (0, _utils.uniqueClasses)("" + containerClasses + (className ? " " + className : ''))
  }, restProps), slots['container-start'], (0, _utils.needsNavigation)(swiperParams) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    ref: prevElRef,
    className: "swiper-button-prev"
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: nextElRef,
    className: "swiper-button-next"
  })), (0, _utils.needsScrollbar)(swiperParams) && /*#__PURE__*/_react.default.createElement("div", {
    ref: scrollbarElRef,
    className: "swiper-scrollbar"
  }), (0, _utils.needsPagination)(swiperParams) && /*#__PURE__*/_react.default.createElement("div", {
    ref: paginationElRef,
    className: "swiper-pagination"
  }), /*#__PURE__*/_react.default.createElement(WrapperTag, {
    className: "swiper-wrapper"
  }, slots['wrapper-start'], renderSlides(), slots['wrapper-end']), slots['container-end']);
});
exports.Swiper = Swiper;
Swiper.displayName = 'Swiper';