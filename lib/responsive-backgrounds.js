(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ResponsiveBackgrounds", [], factory);
	else if(typeof exports === 'object')
		exports["ResponsiveBackgrounds"] = factory();
	else
		root["ResponsiveBackgrounds"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponsiveBackgrounds = function () {
  function ResponsiveBackgrounds() {
    var _this = this;

    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.cover';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ResponsiveBackgrounds);

    if (selector instanceof Array) {
      this.usingSelector = false;
      this.elements = selector;
      selector = null;
    } else {
      this.usingSelector = true;
    }
    if (selector instanceof Object) {
      options = selector;
      selector = '.cover';
    }
    var defaultOptions = { xxs: 320, xs: 480, sm: 768, md: 992, lg: 1200, xl: 1920 };
    this.selector = selector;
    this.options = Object.assign(defaultOptions, options);
    this.currentBreakpoints = [];
    this.resizeDebounceTime = 20;
    this.resizeTimeout = null;
    // process cover images on page load
    this.processCoverBackgrounds();
    // update cover images on browser resize
    window.addEventListener('resize', function () {
      clearTimeout(_this.resizeTimeout);
      _this.resizeTimeout = setTimeout(function () {
        _this.processCoverBackgrounds();
      }, _this.resizeDebounceTime);
    });
  }

  _createClass(ResponsiveBackgrounds, [{
    key: 'processCoverBackgrounds',
    value: function processCoverBackgrounds() {
      // get all of the cover images that need to be processed
      var images = this.usingSelector ? document.querySelectorAll(this.selector) : this.elements;

      // process all cover images
      for (var i = 0; i < images.length; i++) {
        var sources = this.getElSources(images[i]);
        var src = this.getBgSource(sources, images[i].clientWidth);
        this.setSource(images[i], src, i);
      }
    }
  }, {
    key: 'getElSources',
    value: function getElSources(element) {
      var sources = [];
      if (element.getAttribute('data-src-xxs')) sources.push({ url: element.getAttribute('data-src-xxs'), breakpoint: this.options.xxs });
      if (element.getAttribute('data-src-xs')) sources.push({ url: element.getAttribute('data-src-xs'), breakpoint: this.options.xs });
      if (element.getAttribute('data-src-sm')) sources.push({ url: element.getAttribute('data-src-sm'), breakpoint: this.options.sm });
      if (element.getAttribute('data-src-md')) sources.push({ url: element.getAttribute('data-src-md'), breakpoint: this.options.md });
      if (element.getAttribute('data-src-lg')) sources.push({ url: element.getAttribute('data-src-lg'), breakpoint: this.options.lg });
      if (element.getAttribute('data-src-xl')) sources.push({ url: element.getAttribute('data-src-xl'), breakpoint: this.options.xl });
      if (sources.length === 0) throw new Error('No sources found on cover element:', element);else return sources;
    }
  }, {
    key: 'getBgSource',
    value: function getBgSource(sources, elWidth) {
      // find the smallest source that will cover the elements width
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].breakpoint >= elWidth) {
          return sources[i];
        } else if (i + 1 === sources.length) {
          // there is not a source large enough
          return sources[i];
        }
      }
    }
  }, {
    key: 'setSource',
    value: function setSource(el, src, i) {
      if (!this.currentBreakpoints[i] || src.breakpoint > this.currentBreakpoints[i]) {
        el.style.backgroundImage = 'url(' + src.url + ')';
        this.currentBreakpoints[i] = src.breakpoint;
      }
    }
  }]);

  return ResponsiveBackgrounds;
}();

exports.default = ResponsiveBackgrounds;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=responsive-backgrounds.js.map