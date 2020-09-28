"use strict";

exports.__esModule = true;
exports.getParams = getParams;

var _core = _interopRequireDefault(require("../../core"));

var _utils = require("./utils");

var _paramsList = require("./params-list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
function getParams(obj) {
  if (obj === void 0) {
    obj = {};
  }

  var params = {
    on: {}
  };
  var passedParams = {};
  (0, _utils.extend)(params, _core.default.defaults);
  (0, _utils.extend)(params, _core.default.extendedDefaults);
  params._emitClasses = true;
  var rest = {};

  var allowedParams = _paramsList.paramsList.map(function (key) {
    return key.replace(/_/, '');
  });

  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === 'undefined') return;

    if (allowedParams.indexOf(key) >= 0) {
      if ((0, _utils.isObject)(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        (0, _utils.extend)(params[key], obj[key]);
        (0, _utils.extend)(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      params.on["" + key[2].toLowerCase() + key.substr(3)] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  return {
    params: params,
    passedParams: passedParams,
    rest: rest
  };
}