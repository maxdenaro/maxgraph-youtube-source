import * as React from 'react';

import { SwiperOptions } from './types/swiper-options';
import SwiperClass from './types/swiper-class';

interface Swiper extends SwiperOptions {
  /**
   * Swiper container tag
   *
   * @default 'div'
   */
  tag?: string;

  /**
   * Swiper wrapper tag
   *
   * @default 'div'
   */
  wrapperTag?: string;

  /**
   * Get Swiper instance
   */
  onSwiper?: (swiper: SwiperClass) => void;

  
  /**
   * Fired right after Swiper initialization.
   * @note Note that with swiper.on('init') syntax it will
   * work only in case you set init: false parameter.
   *
   * @example
   * var swiper = new Swiper('.swiper-container', {
   *   init: false,
   *   // other parameters
   * });
   * swiper.on('init', function() {
   *  // do something
   * });
   * // init Swiper
   * swiper.init();
   *
   * @example
   * // Otherwise use it as the parameter:
   * var swiper = new Swiper('.swiper-container', {
   *   // other parameters
   *   on: {
   *     init: function () {
   *       // do something
   *     },
   *   }
   * });
   */
  onInit?: (swiper: SwiperClass) => any;

  /**
   * Event will be fired right before Swiper destroyed
   */
  onBeforeDestroy?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when currently active slide is changed
   */
  onSlideChange?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired in the beginning of animation to other slide (next or previous).
   */
  onSlideChangeTransitionStart?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired after animation to other slide (next or previous).
   */
  onSlideChangeTransitionEnd?: (swiper: SwiperClass) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "forward" direction only
   */
  onSlideNextTransitionStart?: (swiper: SwiperClass) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "forward" direction only
   */
  onSlideNextTransitionEnd?: (swiper: SwiperClass) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "backward" direction only
   */
  onSlidePrevTransitionStart?: (swiper: SwiperClass) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "backward" direction only
   */
  onSlidePrevTransitionEnd?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired in the beginning of transition.
   */
  onTransitionStart?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired after transition.
   */
  onTransitionEnd?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when user touch Swiper. Receives 'touchstart' event as an arguments.
   */
  onTouchStart?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper. Receives 'touchmove' event as an arguments.
   */
  onTouchMove?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper in direction opposite to direction parameter. Receives 'touchmove' event as an arguments.
   */
  onTouchMoveOpposite?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper and move it. Receives 'touchmove' event as an arguments.
   */
  onSliderMove?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user release Swiper. Receives 'touchend' event as an arguments.
   */
  onTouchEnd?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.
   */
  onClick?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.
   */
  onTap?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user double tap on Swiper's container. Receives 'touchend' event as an arguments
   */
  onDoubleTap?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired right after all inner images are loaded. updateOnImagesReady should be also enabled
   */
  onImagesReady?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when Swiper progress is changed, as an arguments it receives progress that is always from 0 to 1
   */
  onProgress?: (swiper: SwiperClass, progress: number) => void;

  /**
   * Event will be fired when Swiper reach its beginning (initial position)
   */
  onReachBeginning?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when Swiper reach last slide
   */
  onReachEnd?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when Swiper goes to beginning or end position
   */
  onToEdge?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when Swiper goes from beginning or end position
   */
  onFromEdge?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired when swiper's wrapper change its position. Receives current translate value as an arguments
   */
  onSetTranslate?: (swiper: SwiperClass, translate: number) => void;

  /**
   * Event will be fired everytime when swiper starts animation. Receives current transition duration (in ms) as an arguments
   */
  onSetTransition?: (swiper: SwiperClass, transition: number) => void;

  /**
   * Event will be fired on window resize right before swiper's onresize manipulation
   */
  onResize?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired if observer is enabled and it detects DOM mutations
   */
  onObserverUpdate?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired right before "loop fix"
   */
  onBeforeLoopFix?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired after "loop fix"
   */
  onLoopFix?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired on breakpoint change
   */
  onBreakpoint?: (swiper: SwiperClass, breakpointParams: SwiperOptions) => void;
  
  /**
   * Event will be fired in when autoplay started
   */
  onAutoplayStart?: (swiper: SwiperClass) => void;
  /**
   * Event will be fired when autoplay stopped
   */
  onAutoplayStop?: (swiper: SwiperClass) => void;
  /**
   * Event will be fired when slide changed with autoplay
   */
  onAutoplay?: (swiper: SwiperClass) => void;/**
   * Event will be fired on window hash change
   */
  onHashChange?: (swiper: SwiperClass) => void;
  /**
   * Event will be fired when swiper updates the hash
   */
  onHashSet?: (swiper: SwiperClass) => void;/**
   * Event will be fired in the beginning of lazy loading of image
   */
  onLazyImageLoad?: (swiper: SwiperClass, slideEl: HTMLElement, imageEl: HTMLElement) => void;
  /**
   * Event will be fired when lazy loading image will be loaded
   */
  onLazyImageReady?: (swiper: SwiperClass, slideEl: HTMLElement, imageEl: HTMLElement) => void;/**
   * Event will be fired on navigation hide
   */
  onNavigationHide?: (swiper: SwiperClass) => void;
  /**
   * Event will be fired on navigation show
   */
  onNavigationShow?: (swiper: SwiperClass) => void;/**
   * Event will be fired after pagination rendered
   */
  onPaginationRender?: (swiper: SwiperClass, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired when pagination updated
   */
  onPaginationUpdate?: (swiper: SwiperClass, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired on pagination hide
   */
  onPaginationHide?: (swiper: SwiperClass) => void;

  /**
   * Event will be fired on pagination show
   */
  onPaginationShow?: (swiper: SwiperClass) => void;/**
   * Event will be fired on draggable scrollbar drag start
   */
  onScrollbarDragStart?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag move
   */
  onScrollbarDragMove?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag end
   */
  onScrollbarDragEnd?: (swiper: SwiperClass, event: MouseEvent | TouchEvent | PointerEvent) => void;/**
   * Event will be fired on zoom change
   */
  onZoomChange?: (swiper: SwiperClass, value: number, imageEl: HTMLElement, slideEl: HTMLElement) => void;
}

interface SwiperSlide {
  /**
   * Slide tag
   *
   * @default 'div'
   */
  tag?: string;

  /**
   * Enables additional wrapper required for zoom mode
   *
   * @default false
   */
  zoom?: boolean;

  /**
   * Slide's index in slides array/collection
   *
   * @default false
   */
  virtualIndex?: number;
}

interface Swiper
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'onProgress' | 'onClick' | 'onTouchEnd' | 'onTouchMove' | 'onTouchStart' | 'onTransitionEnd'
  > {}
interface SwiperSlide extends React.HTMLAttributes<HTMLElement> {}

declare const Swiper: React.FunctionComponent<Swiper>;
declare const SwiperSlide: React.FunctionComponent<SwiperSlide>;

export { Swiper, SwiperSlide };
