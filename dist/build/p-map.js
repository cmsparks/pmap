var p-map =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Map/Map.js":
/*!************************!*\
  !*** ./src/Map/Map.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Map =\n/*#__PURE__*/\nfunction () {\n  function Map(url, root) {\n    _classCallCheck(this, Map);\n\n    this.root = root;\n    this.mapGroup = root.append('g');\n    this.colorScale = d3.scaleLinear().domain([-.20, 0, .20]).range([\"#7777ff\", \"#ffffff\", \"#ff7777\"]);\n    d3.json(url, function (data) {\n      this.mapData = data;\n      this.projection = d3.geoMercator().fitSize([root.width, root.height], {\n        type: \"FeatureCollection\",\n        features: geoData\n      });\n      this.path = d3.geoPath(projection);\n    });\n  }\n\n  _createClass(Map, [{\n    key: \"draw\",\n    value: function draw() {\n      this.mapGroup.selectAll(\"path\").data(this.mapData).enter().append(\"path\").on(\"click\", this.clicked).attr(\"d\", this.path).attr(\"stroke\", \"black\").attr(\"stroke-width\", \"0.25\").attr(\"county\", function (d) {\n        d.properties.NAME;\n      }).attr(\"fill\", fillCounty);\n    }\n  }, {\n    key: \"clicked\",\n    value: function clicked(d) {\n      if (d === this.selected) {\n        this.selected = null;\n        this.mapGroup.transition().duration(750).call(zoom.transform, d3.zoomIdentity);\n      } else {\n        var _this$path$bounds = this.path.bounds(d),\n            _this$path$bounds2 = _slicedToArray(_this$path$bounds, 2),\n            _this$path$bounds2$ = _slicedToArray(_this$path$bounds2[0], 2),\n            x0 = _this$path$bounds2$[0],\n            y0 = _this$path$bounds2$[1],\n            _this$path$bounds2$2 = _slicedToArray(_this$path$bounds2[1], 2),\n            x1 = _this$path$bounds2$2[0],\n            y1 = _this$path$bounds2$2[1];\n\n        d3.event.stopPropogation();\n        this.mapGroup.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(this.root.width / 2, this.root.height / 2).scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.root.width), (y1 - y0) / this.root.height)).translate(-(x0 + x1) / 2, -(y0 + y1) / 2), d3.mouse(svg.node()));\n      }\n    }\n  }, {\n    key: \"fillCounty\",\n    value: function fillCounty(d) {\n      var demvotes = parseInt(d.properties.DemVotes.replace(/,/g, ''));\n      var repvotes = parseInt(d.properties.RepVotes.replace(/,/g, ''));\n\n      if (this.selected != null && this.selected == d) {\n        return \"#ffffff\";\n      }\n\n      return this.colorScale((repvotes - demvotes) / (demvotes + repvotes));\n    }\n  }]);\n\n  return Map;\n}();\n\n//# sourceURL=webpack://p-map/./src/Map/Map.js?");

/***/ }),

/***/ "./src/Table/Table.js":
/*!****************************!*\
  !*** ./src/Table/Table.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Table = function Table() {\n  _classCallCheck(this, Table);\n};\n\n//# sourceURL=webpack://p-map/./src/Table/Table.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Map, Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Map_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map/Map */ \"./src/Map/Map.js\");\n/* harmony import */ var _Map_Map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Map_Map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return _Map_Map__WEBPACK_IMPORTED_MODULE_0___default.a; });\n/* harmony import */ var _Table_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table/Table */ \"./src/Table/Table.js\");\n/* harmony import */ var _Table_Table__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Table_Table__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Table\", function() { return _Table_Table__WEBPACK_IMPORTED_MODULE_1___default.a; });\n\n\n\n\n//# sourceURL=webpack://p-map/./src/index.js?");

/***/ })

/******/ });