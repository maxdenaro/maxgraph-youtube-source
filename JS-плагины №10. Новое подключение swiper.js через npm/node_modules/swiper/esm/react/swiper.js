function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { getParams } from './get-params';
import { initSwiper } from './init-swiper';
import { needsScrollbar, needsNavigation, needsPagination, uniqueClasses } from './utils';
import { renderLoop, calcLoopedSlides } from './loop';
import { getChangedParams } from './get-changed-params';
import { getChildren } from './get-children';
import { updateSwiper } from './update-swiper';
import { renderVirtual, updateOnVirtualData } from './virtual';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
var Swiper = forwardRef(function (_temp, externalElRef) {
  var _ref = _temp === void 0 ? {} : _temp,
      className = _ref.className,
      _ref$tag = _ref.tag,
      Tag = _ref$tag === void 0 ? 'div' : _ref$tag,
      _ref$wrapperTag = _ref.wrapperTag,
      WrapperTag = _ref$wrapperTag === void 0 ? 'div' : _ref$wrapperTag,
      children = _ref.children,
      onSwiper = _ref.onSwiper,
      rest = _objectWithoutPropertiesLoose(_ref, ["className", "tag", "wrapperTag", "children", "onSwiper"]);

  var _useState = useState('swiper-container'),
      containerClasses = _useState[0],
      setContainerClasses = _useState[1];

  var _useState2 = useState(null),
      virtualData = _useState2[0],
      setVirtualData = _useState2[1];

  var _useState3 = useState(false),
      breakpointChanged = _useState3[0],
      setBreakpointChanged = _useState3[1];

  var initializedRef = useRef(false);
  var swiperElRef = useRef(null);
  var swiperRef = useRef(null);
  var oldPassedParamsRef = useRef(null);
  var oldSlides = useRef(null);
  var nextElRef = useRef(null);
  var prevElRef = useRef(null);
  var paginationElRef = useRef(null);
  var scrollbarElRef = useRef(null);

  var _getParams = getParams(rest),
      swiperParams = _getParams.params,
      passedParams = _getParams.passedParams,
      restProps = _getParams.rest;

  var _getChildren = getChildren(children),
      slides = _getChildren.slides,
      slots = _getChildren.slots;

  var changedParams = getChangedParams(passedParams, oldPassedParamsRef.current, slides, oldSlides.current);
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
        swiper.loopedSlides = calcLoopedSlides(slides, swiperParams);
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

  useEffect(function () {
    return function () {
      if (swiperRef.current) swiperRef.current.off('_beforeBreakpoint', onBeforeBreakpoint);
    };
  }); // set initialized flag

  useEffect(function () {
    if (!initializedRef.current && swiperRef.current) {
      swiperRef.current.emitSlidesClasses();
      initializedRef.current = true;
    }
  }); // watch for params change

  useIsomorphicLayoutEffect(function () {
    if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) {
      updateSwiper(swiperRef.current, slides, passedParams, changedParams);
    }
  }); // update on virtual update

  useIsomorphicLayoutEffect(function () {
    updateOnVirtualData(swiperRef.current);
  }, [virtualData]); // init swiper

  useIsomorphicLayoutEffect(function () {
    if (externalElRef) {
      externalElRef.current = swiperElRef.current;
    }

    if (!swiperElRef.current) return;
    initSwiper({
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
      return renderVirtual(swiperRef.current, slides, virtualData);
    }

    if (!swiperParams.loop || swiperRef.current && swiperRef.current.destroyed) {
      return slides.map(function (child) {
        return React.cloneElement(child, {
          swiper: swiperRef.current
        });
      });
    }

    return renderLoop(swiperRef.current, slides, swiperParams);
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: swiperElRef,
    className: uniqueClasses("" + containerClasses + (className ? " " + className : ''))
  }, restProps), slots['container-start'], needsNavigation(swiperParams) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: prevElRef,
    className: "swiper-button-prev"
  }), /*#__PURE__*/React.createElement("div", {
    ref: nextElRef,
    className: "swiper-button-next"
  })), needsScrollbar(swiperParams) && /*#__PURE__*/React.createElement("div", {
    ref: scrollbarElRef,
    className: "swiper-scrollbar"
  }), needsPagination(swiperParams) && /*#__PURE__*/React.createElement("div", {
    ref: paginationElRef,
    className: "swiper-pagination"
  }), /*#__PURE__*/React.createElement(WrapperTag, {
    className: "swiper-wrapper"
  }, slots['wrapper-start'], renderSlides(), slots['wrapper-end']), slots['container-end']);
});
Swiper.displayName = 'Swiper';
export { Swiper };