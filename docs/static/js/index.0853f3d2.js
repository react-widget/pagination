/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

// import Demo2 from './demos/Demo2';
// import Demo3 from './demos/Demo3';
// import Demo4 from './demos/Demo4';
var _default = [{
  label: '基本功能',
  component: _demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: 1,
      pageSize: 10
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          current = _this$state.current,
          pageSize = _this$state.pageSize;
      return _react.default.createElement("div", null, _react.default.createElement(_src.default, {
        total: 1000,
        style: {
          width: 260,
          height: 300
        }
      }), _react.default.createElement("br", null), _react.default.createElement(_src.default, {
        total: 1000,
        current: 100,
        style: {
          width: 260,
          height: 300
        }
      }), _react.default.createElement("br", null), _react.default.createElement(_src.default, {
        total: 1000,
        current: current,
        pageSize: pageSize,
        onChange: function onChange(num) {
          return _this2.setState({
            current: num
          });
        },
        onPageSizeChange: function onPageSizeChange(current, pageSize) {
          return _this2.setState({
            current: current,
            pageSize: pageSize
          });
        },
        style: {
          width: 260,
          height: 300
        }
      }), _react.default.createElement("br", null), _react.default.createElement(_src.default, {
        total: 1000,
        layout: ['pager'],
        style: {
          width: 260,
          height: 300
        }
      }), _react.default.createElement("br", null), _react.default.createElement(_src.default, {
        total: 1000,
        pageSize: 50,
        layout: ['prev', 'next', function (_ref) {
          var total = _ref.total,
              pageSize = _ref.pageSize,
              current = _ref.current;
          return "\u5F53\u524D\u663E\u793A\uFF1A".concat((current - 1) * pageSize + 1, " \u5230 ").concat(current * pageSize, " \u6761\uFF0C \u5171 ").concat(total, " \u6761 ");
        }],
        style: {
          width: 260,
          height: 300
        }
      }));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! ../src/style/index.scss */ "./src/style/index.scss");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _parseInt2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

function Select(props) {
  return _react.default.createElement("select", {
    className: props.className,
    value: props.value,
    onChange: function onChange(e) {
      props.onChange(e.target.value);
    }
  }, props.options.map(function (item) {
    return _react.default.createElement("option", {
      key: item.value,
      value: item.value
    }, item.label);
  }));
}

var Pagination =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Pagination, _React$Component);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: _this.props.defaultCurrent || 1,
      pageSize: _this.props.defaultPageSize || 10,
      currentInputVaule: '' // constructor(props, ...args) {
      //     super(props, ...args);
      //     this.state = {
      //         current: props.current || props.defaultCurrent || 1,
      //         pageSize: props.pageSize || props.defaultPageSize || 10,
      //     };
      // }
      // componentWillReceiveProps(props) {
      //     if (!isUndefined(props.current)) {
      //         this.setState({
      //             current: props.current
      //         });
      //     }
      //     if (!isUndefined(props.pageSize)) {
      //         this.setState({
      //             pageSize: props.pageSize
      //         });
      //     }
      // }

    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePageSizeChange", function (pageSize) {
      pageSize = (0, _parseInt2.default)(pageSize);
      var props = _this.props;
      var onPageSizeChange = props.onPageSizeChange;
      var current = _this.state.current;

      var totalPages = _this.getTotalPages(pageSize);

      var newCurrent = current > totalPages ? totalPages : current;

      if (!('pageSize' in props)) {
        _this.setState({
          pageSize: pageSize
        });
      }

      if (!('current' in props)) {
        _this.setState({
          current: newCurrent,
          currentInputValue: ''
        });
      }

      if (onPageSizeChange) onPageSizeChange(newCurrent, pageSize);
    });
    return _this;
  }

  (0, _createClass2.default)(Pagination, [{
    key: "toPage",
    value: function toPage(num, fromJumper) {
      var props = this.props;
      var current = this.state.current;
      if (num === current) return;
      var pageCount = this.getTotalPages();
      num = Math.max(Math.min(num, pageCount), 1);

      if (!('current' in props)) {
        this.setState({
          current: num,
          currentInputVaule: ''
        });
      } else if (fromJumper) {
        this.setState({
          currentInputVaule: ''
        });
      }

      if (props.onChange) props.onChange(num);
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      var current = this.state.current;
      this.toPage(--current);
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var current = this.state.current;
      this.toPage(++current);
    }
    /**
     * 获取总页数
     */

  }, {
    key: "getTotalPages",
    value: function getTotalPages() {
      var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.pageSize;
      return Math.max(Math.ceil(this.props.total / pageSize), 1);
    }
    /**
     * 获取当前页码的样式
     */

  }, {
    key: "getPageItemCls",
    value: function getPageItemCls(pn) {
      var _classNames;

      var prefixCls = this.props.prefixCls;
      var current = this.state.current;
      var pageCount = this.getTotalPages();
      return (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-item"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-item-first"), pn == 1), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-item-last"), pn == pageCount), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-item-active"), current == pn), _classNames));
    }
  }, {
    key: "renderPagination",
    value: function renderPagination(key) {
      var _this2 = this;

      //  this.state.current = this.state.current < 1 ? 1 : this.state.current;
      var _this$state = this.state,
          pageSize = _this$state.pageSize,
          current = _this$state.current;
      var pageNumber = current;
      var _this$props = this.props,
          total = _this$props.total,
          prefixCls = _this$props.prefixCls,
          pageRange = _this$props.pageRange,
          itemRender = _this$props.itemRender,
          showPrevMore = _this$props.showPrevMore,
          showNextMore = _this$props.showNextMore;
      var pageCount = this.getTotalPages();
      var p = ~~(pageRange / 2);
      var prevPage = pageNumber - 1;
      var nextPage = pageNumber + 1;

      var toPage = function toPage(pn) {
        return function () {
          return _this2.toPage(pn);
        };
      };

      var _itemRender = function _itemRender(pn) {
        return itemRender ? itemRender(pn) : pn;
      };

      var loopPage = function loopPage() {
        var list = [];
        var end = Math.min(pageNumber + p, pageCount - 1);
        var start = Math.max(end - pageRange + 1, 2);
        list.push(_react.default.createElement("a", {
          key: "".concat(key, "_1"),
          className: this.getPageItemCls(1),
          onClick: toPage(1)
        }, _itemRender(1)));
        list.push(showPrevMore && start > 2 ? _react.default.createElement("span", {
          key: "".concat(key, "_prev"),
          className: "".concat(prefixCls, "-item ").concat(prefixCls, "-item-more")
        }, "...") : null);
        var cpn = end - start + 1;

        if (cpn < pageRange) {
          end = Math.min(pageCount - 1, end + pageRange - cpn);
        }

        for (var page = start; page <= end; page++) {
          list.push(_react.default.createElement("a", {
            key: "".concat(key, "_").concat(page),
            className: this.getPageItemCls(page),
            onClick: toPage(page)
          }, _itemRender(page)));
        }

        list.push(showNextMore && end < pageCount - 1 ? _react.default.createElement("span", {
          key: "".concat(key, "_next"),
          className: "".concat(prefixCls, "-item ").concat(prefixCls, "-item-more")
        }, "...") : null);
        list.push(pageCount > 1 ? _react.default.createElement("a", {
          key: "".concat(key, "_").concat(pageCount),
          className: this.getPageItemCls(pageCount),
          onClick: toPage(pageCount)
        }, _itemRender(pageCount)) : null);
        return list;
      };

      return loopPage.call(this);
    }
  }, {
    key: "renderLayoutTotal",
    value: function renderLayoutTotal(key) {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          totalRender = _this$props2.totalRender,
          total = _this$props2.total;
      var _this$state2 = this.state,
          current = _this$state2.current,
          pageSize = _this$state2.pageSize;
      return _react.default.createElement("span", {
        key: key,
        className: "".concat(prefixCls, "-total-text")
      }, totalRender(total, current, pageSize));
    }
  }, {
    key: "renderLayoutSizes",
    value: function renderLayoutSizes(key) {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          pageSizeOptions = _this$props3.pageSizeOptions,
          pageSizeOptionRender = _this$props3.pageSizeOptionRender,
          small = _this$props3.small,
          Select = _this$props3.selectComponent;
      var list = pageSizeOptions.map(function (v) {
        return {
          label: pageSizeOptionRender(v),
          value: v
        };
      });
      return _react.default.createElement("span", {
        key: key,
        className: "".concat(prefixCls, "-pagesize")
      }, _react.default.createElement(Select, {
        options: list,
        size: small ? 'small' : 'default',
        value: this.state.pageSize,
        onChange: this.handlePageSizeChange,
        className: "".concat(prefixCls, "-changer")
      }));
    }
  }, {
    key: "renderLayoutPrev",
    value: function renderLayoutPrev(key) {
      var _classNames2,
          _this3 = this;

      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          prevBtnRender = _this$props4.prevBtnRender;
      var current = this.state.current;
      var btnCls = (0, _classnames.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-btn"), true), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-prev"), true), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-btn-disabled"), current == 1), _classNames2));
      return _react.default.createElement("a", {
        key: key,
        className: btnCls,
        onClick: function onClick() {
          return _this3.prevPage();
        }
      }, prevBtnRender());
    }
  }, {
    key: "renderLayoutPager",
    value: function renderLayoutPager(key) {
      return this.renderPagination(key);
    }
  }, {
    key: "renderLayoutNext",
    value: function renderLayoutNext(key) {
      var _classNames3,
          _this4 = this;

      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          nextBtnRender = _this$props5.nextBtnRender;
      var current = this.state.current;
      var totalPages = this.getTotalPages();
      var btnCls = (0, _classnames.default)((_classNames3 = {}, (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-btn"), true), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-next"), true), (0, _defineProperty2.default)(_classNames3, "".concat(prefixCls, "-btn-disabled"), totalPages == current), _classNames3));
      return _react.default.createElement("a", {
        key: key,
        className: btnCls,
        onClick: function onClick() {
          return _this4.nextPage();
        }
      }, nextBtnRender());
    }
  }, {
    key: "renderLayoutJumper",
    value: function renderLayoutJumper(key) {
      var _this5 = this;

      var _this$props6 = this.props,
          prefixCls = _this$props6.prefixCls,
          jumperRender = _this$props6.jumperRender;
      var currentInputVaule = this.state.currentInputVaule;

      var onInputChange = function onInputChange(value) {
        _this5.setState({
          currentInputVaule: value
        });
      };

      var onPressEnter = function onPressEnter() {
        var value = (0, _parseInt2.default)(currentInputVaule);

        if (!value || value < 1) {
          _this5.setState({
            currentInputVaule: ''
          });
        } else {
          _this5.toPage(value, true);
        }
      };

      var jumperProps = {
        className: "".concat(prefixCls, "-jumper"),
        value: currentInputVaule,
        onChange: function onChange(e) {
          return onInputChange(e.target.value);
        },
        onKeyDown: function onKeyDown(e) {
          return e.keyCode === 13 && onPressEnter();
        }
      };

      var jumper = _react.default.createElement("input", (0, _extends2.default)({
        key: "jumper_input"
      }, jumperProps));

      return _react.default.createElement("span", {
        key: key,
        className: "".concat(prefixCls, "-quick-jumper")
      }, jumperRender ? jumperRender(jumperProps) : ['跳至', jumper, '页']);
    }
  }, {
    key: "renderCustomRender",
    value: function renderCustomRender(layout, key) {
      var _this$props7 = this.props,
          prefixCls = _this$props7.prefixCls,
          total = _this$props7.total;
      var _this$state3 = this.state,
          current = _this$state3.current,
          pageSize = _this$state3.pageSize;
      var props = {
        prefixCls: prefixCls,
        total: total,
        current: current,
        pageSize: pageSize
      };
      return _react.default.createElement("span", {
        key: key
      }, layout(props));
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames4,
          _this6 = this;

      var _this$props8 = this.props,
          prefixCls = _this$props8.prefixCls,
          className = _this$props8.className,
          layout = _this$props8.layout,
          small = _this$props8.small,
          total = _this$props8.total;
      var classes = (0, _classnames.default)((_classNames4 = {}, (0, _defineProperty2.default)(_classNames4, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classNames4, "".concat(prefixCls, "-sm"), small), _classNames4), className);
      return _react.default.createElement("div", {
        className: classes
      }, layout.map(function (layout, key) {
        switch (layout) {
          case 'total':
            return _this6.renderLayoutTotal(key);

          case 'sizes':
            return _this6.renderLayoutSizes(key);

          case 'prev':
            return _this6.renderLayoutPrev(key);

          case 'pager':
            return _this6.renderLayoutPager(key);

          case 'next':
            return _this6.renderLayoutNext(key);

          case 'jumper':
            return _this6.renderLayoutJumper(key);

          default:
            if (typeof layout !== 'function') return null;
            return _this6.renderCustomRender(layout, key);
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        current: Math.max(props.current || state.current, 1),
        pageSize: props.pageSize || state.pageSize
      };
    }
  }]);
  return Pagination;
}(_react.default.Component);

exports.default = Pagination;
(0, _defineProperty2.default)(Pagination, "propTypes", {
  className: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  small: _propTypes.default.bool,
  total: _propTypes.default.number.isRequired,
  defaultCurrent: _propTypes.default.number,
  current: _propTypes.default.number,
  defaultPageSize: _propTypes.default.number,
  pageSize: _propTypes.default.number,
  pageRange: _propTypes.default.number,
  pageSizeOptions: _propTypes.default.array,
  onPageSizeChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  layout: _propTypes.default.array,
  totalRender: _propTypes.default.func,
  prevBtnRender: _propTypes.default.func,
  nextBtnRender: _propTypes.default.func,
  itemRender: _propTypes.default.func,
  pageSizeOptionRender: _propTypes.default.func,
  jumperRender: _propTypes.default.func,
  showPrevMore: _propTypes.default.bool,
  showNextMore: _propTypes.default.bool,
  selectComponent: _propTypes.default.any
});
(0, _defineProperty2.default)(Pagination, "defaultProps", {
  prefixCls: 'rw-pagination',
  small: false,
  total: 0,
  showSizeChanger: false,
  pageSizeOptions: [10, 20, 30, 40],
  pageRange: 5,
  //必须是奇数，界面上最多显示7页
  //total, sizes, prev, pager, next, jumper
  layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
  totalRender: function totalRender(total, pn, ps) {
    return "\u5171 ".concat(total, " \u6761");
  },
  pageSizeOptionRender: function pageSizeOptionRender(v) {
    return "".concat(v, " \u6761/\u9875");
  },
  jumperRender: null,
  prevBtnRender: function prevBtnRender() {
    return '上一页';
  },
  nextBtnRender: function nextBtnRender() {
    return '下一页';
  },
  itemRender: null,
  showPrevMore: true,
  showNextMore: true,
  selectComponent: Select
});

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\pagination\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\pagination\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\react-widget\pagination\examples\index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.0853f3d2.js.map