"use strict";

exports.__esModule = true;
exports.isObject = isObject;
exports.extend = extend;
exports.needsNavigation = needsNavigation;
exports.needsPagination = needsPagination;
exports.needsScrollbar = needsScrollbar;
exports.uniqueClasses = uniqueClasses;

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}

function extend(target, src) {
  Object.keys(src).forEach(function (key) {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}

function needsNavigation(params) {
  if (params === void 0) {
    params = {};
  }

  return params.navigation && typeof params.navigation.nextEl === 'undefined' && typeof params.navigation.prevEl === 'undefined';
}

function needsPagination(params) {
  if (params === void 0) {
    params = {};
  }

  return params.pagination && typeof params.pagination.el === 'undefined';
}

function needsScrollbar(params) {
  if (params === void 0) {
    params = {};
  }

  return params.scrollbar && typeof params.scrollbar.el === 'undefined';
}

function uniqueClasses(classNames) {
  if (classNames === void 0) {
    classNames = '';
  }

  var classes = classNames.split(' ').map(function (c) {
    return c.trim();
  }).filter(function (c) {
    return !!c;
  });
  var unique = [];
  classes.forEach(function (c) {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}