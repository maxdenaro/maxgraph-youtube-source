"use strict";

exports.__esModule = true;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;

var _react = require("react");

function useIsomorphicLayoutEffect(callback, deps) {
  // eslint-disable-next-line
  if (typeof window === 'undefined') return (0, _react.useEffect)(callback, deps);
  return (0, _react.useLayoutEffect)(callback, deps);
}