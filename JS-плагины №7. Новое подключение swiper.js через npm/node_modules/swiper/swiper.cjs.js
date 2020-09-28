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
var virtual = _interopDefault(require('./cjs/components/virtual/virtual'));
var keyboard = _interopDefault(require('./cjs/components/keyboard/keyboard'));
var mousewheel = _interopDefault(require('./cjs/components/mousewheel/mousewheel'));
var navigation = _interopDefault(require('./cjs/components/navigation/navigation'));
var pagination = _interopDefault(require('./cjs/components/pagination/pagination'));
var scrollbar = _interopDefault(require('./cjs/components/scrollbar/scrollbar'));
var parallax = _interopDefault(require('./cjs/components/parallax/parallax'));
var zoom = _interopDefault(require('./cjs/components/zoom/zoom'));
var lazy = _interopDefault(require('./cjs/components/lazy/lazy'));
var controller = _interopDefault(require('./cjs/components/controller/controller'));
var a11y = _interopDefault(require('./cjs/components/a11y/a11y'));
var history = _interopDefault(require('./cjs/components/history/history'));
var hashNavigation = _interopDefault(require('./cjs/components/hash-navigation/hash-navigation'));
var autoplay = _interopDefault(require('./cjs/components/autoplay/autoplay'));
var effectFade = _interopDefault(require('./cjs/components/effect-fade/effect-fade'));
var effectCube = _interopDefault(require('./cjs/components/effect-cube/effect-cube'));
var effectFlip = _interopDefault(require('./cjs/components/effect-flip/effect-flip'));
var effectCoverflow = _interopDefault(require('./cjs/components/effect-coverflow/effect-coverflow'));
var thumbs = _interopDefault(require('./cjs/components/thumbs/thumbs'));

// Swiper Class
var components = [];
Swiper.use(components);

exports.Swiper = Swiper;
exports.default = Swiper;
exports.Virtual = virtual;
exports.Keyboard = keyboard;
exports.Mousewheel = mousewheel;
exports.Navigation = navigation;
exports.Pagination = pagination;
exports.Scrollbar = scrollbar;
exports.Parallax = parallax;
exports.Zoom = zoom;
exports.Lazy = lazy;
exports.Controller = controller;
exports.A11y = a11y;
exports.History = history;
exports.HashNavigation = hashNavigation;
exports.Autoplay = autoplay;
exports.EffectFade = effectFade;
exports.EffectCube = effectCube;
exports.EffectFlip = effectFlip;
exports.EffectCoverflow = effectCoverflow;
exports.Thumbs = thumbs;
