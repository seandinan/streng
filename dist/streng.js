"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSentenceCase = toSentenceCase;
exports.toUpperCase = toUpperCase;
exports.toLowerCase = toLowerCase;
exports.toTitleCase = toTitleCase;
exports.toSnakeCase = toSnakeCase;
exports.snakeToCamel = snakeToCamel;
exports.camelToSnake = camelToSnake;
exports.snakeObjectToCamelObject = snakeObjectToCamelObject;
exports.camelObjectToSnakeObject = camelObjectToSnakeObject;
exports.shortenWithCenterEllipsis = shortenWithCenterEllipsis;
exports.toListFromArray = toListFromArray;
exports.splitTimeString = splitTimeString;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function toSentenceCase(str, index) {
  // https://en.wikipedia.org/wiki/Letter_case#Sentence_Case
  if (index !== 0 && str.length <= 3) return str;
  return "".concat(str).slice(0, 1).toUpperCase() + "".concat(str).slice(1);
}

function toUpperCase(str) {
  return "".concat(str).toUpperCase();
}

function toLowerCase(str) {
  return "".concat(str).toLowerCase();
}

function toTitleCase(str) {
  // https://en.wikipedia.org/wiki/Letter_case#Title_Case
  return "".concat(str).split(' ').map(toSentenceCase).join(' ');
}

function toSnakeCase(str) {
  return "".concat(str).toLowerCase().split(' ').join('_');
}

function snakeToCamel(str) {
  return str.split('_').reduce(function (a, b, i) {
    if (i === 0) return a + b;else if (toLowerCase(b) === 'id') return a + toUpperCase(b);else return a + toTitleCase(b);
  }, '');
}

function camelToSnake(str) {
  return str.replace(/ID/g, 'Id').split('').map(function (v, i) {
    var isNumber = function isNumber(char) {
      return !isNaN(parseInt(char));
    };

    if (i === 0) return v.toLowerCase();
    if (isNumber(v) && !isNumber(str[i - 1])) return "_".concat(v);
    if (v !== v.toLowerCase()) return "_".concat(v.toLowerCase());
    return v.toLowerCase();
  }).join('');
}

function snakeObjectToCamelObject(obj) {
  // Iterates through an object and converts all keys to camelCase
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (obj[key] == null) result[snakeToCamel(key)] = obj[key];else if (Array.isArray(obj[key])) {
      result[snakeToCamel(key)] = obj[key].map(function (val) {
        if (val.constructor.name === 'Object') {
          return snakeObjectToCamelObject(val);
        } else return val;
      });
    } else if (obj[key].constructor.name === 'Object') {
      result[snakeToCamel(key)] = snakeObjectToCamelObject(obj[key]);
    } else result[snakeToCamel(key)] = obj[key];
  });
  return result;
}

function camelObjectToSnakeObject(obj) {
  // Iterates through an object and converts all keys to camelCase
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (obj[key] == null) result[camelToSnake(key)] = obj[key];else if (Array.isArray(obj[key])) {
      result[camelToSnake(key)] = obj[key].map(function (val) {
        if (val.constructor.name === 'Object') {
          return camelObjectToSnakeObject(val);
        } else return val;
      });
    } else if (obj[key].constructor.name === 'Object') {
      result[camelToSnake(key)] = camelObjectToSnakeObject(obj[key]);
    } else result[camelToSnake(key)] = obj[key];
  });
  return result;
}

function shortenWithCenterEllipsis(str, length) {
  var amt = (length - 3) / 2;
  if (str.length <= length) return str;
  return "".concat(str.slice(0, amt), "...").concat(str.slice(-amt));
}

function toListFromArray() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var data = _toConsumableArray(arr);

  if (data.length <= 1) {
    return data[0];
  } else if (data.length === 2) {
    return data.join(' and ');
  } else {
    data[data.length - 1] = "and ".concat(data[data.length - 1]);
    return data.join(', ');
  }
}

function splitTimeString(str) {
  var result = {
    hours: 0,
    minutes: 0
  };

  var setFromSplitValues = function setFromSplitValues(values) {
    result.hours = parseInt(values[0]);
    result.minutes = parseInt(values[1]);
  };

  if (str.split(':').length > 1) setFromSplitValues(str.toLowerCase().split(':'));else if (str.split('.').length > 1) setFromSplitValues(str.toLowerCase().split('.'));else result.hours = parseInt(str);
  if (str.toLowerCase().includes('pm') && result.hours < 12) result.hours += 12;
  return result;
}