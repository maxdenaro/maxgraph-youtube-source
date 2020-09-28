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

function needsNavigation(props) {
  if (props === void 0) {
    props = {};
  }

  return props.navigation && typeof props.navigation.nextEl === 'undefined' && typeof props.navigation.prevEl === 'undefined';
}

function needsPagination(props) {
  if (props === void 0) {
    props = {};
  }

  return props.pagination && typeof props.pagination.el === 'undefined';
}

function needsScrollbar(props) {
  if (props === void 0) {
    props = {};
  }

  return props.scrollbar && typeof props.scrollbar.el === 'undefined';
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

export { isObject, extend, needsNavigation, needsPagination, needsScrollbar, uniqueClasses };