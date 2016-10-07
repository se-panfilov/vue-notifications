(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueNotifications", [], factory);
	else if(typeof exports === 'object')
		exports["VueNotifications"] = factory();
	else
		root["VueNotifications"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _override = __webpack_require__(1);

	var _override2 = _interopRequireDefault(_override);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var STYLE = {
	  error: '-error',
	  warn: '-warn',
	  info: '-info',
	  success: '-success'
	};

	var STATE = {
	  installed: false
	};
	var MESSAGES = {
	  alreadyInstalled: 'VueNotifications: plugin already installed'
	};

	function showMessage(msg, style) {
	  if (style === STYLE.error) return console.error(msg);
	  if (style === STYLE.warn) return console.warn(msg);
	  if (style === STYLE.info) return console.log(msg);
	  if (style === STYLE.success) return console.info(msg);
	}

	var install = function install(Vue, options) {
	  (0, _override2['default'])(Vue, 'notifications');

	  if (STATE.installed) throw console.error(MESSAGES.alreadyInstalled);

	  Vue.successMsg = function (msg) {
	    showMessage(msg, STYLE.success);
	  };

	  Vue.prototype.$infoMsg = function (msg) {
	    showMessage(msg, STYLE.success);
	  };

	  Vue.prototype.$errorMsg = function (msg) {
	    showMessage(msg, STYLE.success);
	  };

	  Vue.prototype.$warnMsg = function (msg) {
	    showMessage(msg, STYLE.success);
	  };

	  STATE.installed = true;

	  var p = Vue.prototype;
	  p.__callHook = p._callHook;
	  p._callHook = function (hook) {
	    if (hook == 'created') {
	      var self = this;

	      var notifications = this.$options['notifications'];
	      for (var k in notifications) {
	        if (notifications.hasOwnProperty(k)) {
	          console.info(notifications[k]);
	          // TODO (S.Panfilov)add methods here - show(), blink(), block(), etc
	        }
	      }

	      // On every object use the $sync function to get the value
	      // _.each(this.$options['notifications'], function (rxFunc, key) {
	      //   console.info(rxFunc)
	      //   console.log(key)
	      // });
	    }
	    this.__callHook(hook);
	  };

	  // setInterval(() => {
	  //   console.info(Vue['notifications'])
	  // }, 3000)
	};

	// if (typeof window !== 'undefined' && window.Vue) {
	//   window.Vue.use(VueNotifications)
	// }

	exports['default'] = install;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (Vue, key) {
	  var _this = this,
	      _arguments = arguments;

	  var _init = Vue.prototype._init;
	  var _destroy = Vue.prototype._destroy;

	  Vue.prototype._init = function () {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    options.init = options.init ? [customInit].concat(options.init) : customInit;
	    _init.call(this, options);
	  };

	  Vue.prototype._destroy = function () {
	    // if (this[key]) {
	    //   this[key] = undefined
	    //   delete this[key]
	    // }

	    _destroy.apply(_this, _arguments);
	  };

	  function customInit() {
	    if (this[key]) throw console.error("Override: property \"" + key + "\" is already defined");
	    this[key] = {};

	    var options = this.$options;
	    var keyOption = options[key];

	    if (keyOption) {
	      this[key] = keyOption;
	    } else if (options.parent && options.parent[key]) {
	      this[key] = options.parent[key];
	    }
	  }
	};

/***/ }
/******/ ])
});
;