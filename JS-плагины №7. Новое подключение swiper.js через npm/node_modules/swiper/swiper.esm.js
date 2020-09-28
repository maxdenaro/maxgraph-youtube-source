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

import Swiper from './esm/components/core/core-class';
export { default as Swiper, default } from './esm/components/core/core-class';
export { default as Virtual } from './esm/components/virtual/virtual';
export { default as Keyboard } from './esm/components/keyboard/keyboard';
export { default as Mousewheel } from './esm/components/mousewheel/mousewheel';
export { default as Navigation } from './esm/components/navigation/navigation';
export { default as Pagination } from './esm/components/pagination/pagination';
export { default as Scrollbar } from './esm/components/scrollbar/scrollbar';
export { default as Parallax } from './esm/components/parallax/parallax';
export { default as Zoom } from './esm/components/zoom/zoom';
export { default as Lazy } from './esm/components/lazy/lazy';
export { default as Controller } from './esm/components/controller/controller';
export { default as A11y } from './esm/components/a11y/a11y';
export { default as History } from './esm/components/history/history';
export { default as HashNavigation } from './esm/components/hash-navigation/hash-navigation';
export { default as Autoplay } from './esm/components/autoplay/autoplay';
export { default as EffectFade } from './esm/components/effect-fade/effect-fade';
export { default as EffectCube } from './esm/components/effect-cube/effect-cube';
export { default as EffectFlip } from './esm/components/effect-flip/effect-flip';
export { default as EffectCoverflow } from './esm/components/effect-coverflow/effect-coverflow';
export { default as Thumbs } from './esm/components/thumbs/thumbs';

// Swiper Class
var components = [];
Swiper.use(components);
