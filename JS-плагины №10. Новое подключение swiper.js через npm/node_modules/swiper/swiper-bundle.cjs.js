/**
 * Swiper 6.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 25, 2020
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Swiper = _interopDefault(require('./cjs/components/core/core-class'));
var Virtual = _interopDefault(require('./cjs/components/virtual/virtual'));
var Keyboard = _interopDefault(require('./cjs/components/keyboard/keyboard'));
var Mousewheel = _interopDefault(require('./cjs/components/mousewheel/mousewheel'));
var Navigation = _interopDefault(require('./cjs/components/navigation/navigation'));
var Pagination = _interopDefault(require('./cjs/components/pagination/pagination'));
var Scrollbar = _interopDefault(require('./cjs/components/scrollbar/scrollbar'));
var Parallax = _interopDefault(require('./cjs/components/parallax/parallax'));
var Zoom = _interopDefault(require('./cjs/components/zoom/zoom'));
var Lazy = _interopDefault(require('./cjs/components/lazy/lazy'));
var Controller = _interopDefault(require('./cjs/components/controller/controller'));
var A11y = _interopDefault(require('./cjs/components/a11y/a11y'));
var History = _interopDefault(require('./cjs/components/history/history'));
var HashNavigation = _interopDefault(require('./cjs/components/hash-navigation/hash-navigation'));
var Autoplay = _interopDefault(require('./cjs/components/autoplay/autoplay'));
var EffectFade = _interopDefault(require('./cjs/components/effect-fade/effect-fade'));
var EffectCube = _interopDefault(require('./cjs/components/effect-cube/effect-cube'));
var EffectFlip = _interopDefault(require('./cjs/components/effect-flip/effect-flip'));
var EffectCoverflow = _interopDefault(require('./cjs/components/effect-coverflow/effect-coverflow'));
var Thumbs = _interopDefault(require('./cjs/components/thumbs/thumbs'));

// Swiper Class
var components = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs];
Swiper.use(components);

exports.Swiper = Swiper;
exports.default = Swiper;
