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

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _override = __webpack_require__(13);

	var _override2 = _interopRequireDefault(_override);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var PLUGIN_NAME = 'VueNotifications';
	var PACKAGE_NAME = 'vue-notifications';
	var PROPERTY_NAME = 'notifications';

	var TYPE = {
	  error: 'error',
	  warn: 'warn',
	  info: 'info',
	  success: 'success'
	};

	var VUE_VERSION = {
	  evangelion: 1,
	  ghostInTheShell: 2
	};

	var MESSAGES = {
	  alreadyInstalled: PLUGIN_NAME + ': plugin already installed',
	  methodNameConflict: PLUGIN_NAME + ': names conflict - '
	};

	var EVENTS = {
	  initiated: PACKAGE_NAME + '-initiated'
	};

	/**
	 * @param  {Object} Vue
	 * @return {Object}
	 */
	function getVersion(Vue) {
	  var version = Vue.version.match(/(\d+)/g);
	  return {
	    major: +version[0],
	    regular: +version[1],
	    minor: +version[2]
	  };
	}

	/**
	 * @param  {String} elemType
	 * @param  {String} elemClass
	 * @param  {String} title
	 * @param  {String} msg
	 * @return  {Node}
	 */
	function createElement(elemType, elemClass, title, msg) {
	  var elem = document.createElement(elemType);
	  // elem.id = `${elemType}_${new Date().getTime()}`
	  elem.className = elemClass;
	  elem.innerHTML = msg;
	  elem.style = 'position: fixed; z-index: 999999; top: 12px; right: 12px;position: relative;overflow: hidden;margin: 0 0 6px;padding: 15px 15px 15px 50px;width: 300px;border-radius: 3px;background-position: 15px center;background-repeat: no-repeat;box-shadow: 0 0 12px #999; color: #fff; opacity: .8;';
	  return elem;
	}

	var PARENT_ELEM = document.body;

	/**
	 * @param  {String} type
	 * @return  {String}
	 */
	function getNotificationClass(type) {
	  return 'notification -' + type.toLowerCase();
	}

	/**
	 * @param  {String} type
	 * @param  {String} title
	 * @param  {String} msg
	 * @return  {Node}
	 */
	function createNotification(type, title, msg) {
	  var nodeType = 'div';
	  var elClass = getNotificationClass(type);
	  var elNotificationContainer = createElement(nodeType, elClass, title, msg);
	  var elNotification = createElement(nodeType, elClass, title, msg);
	  elNotificationContainer.appendChild(elNotification);
	  return elNotificationContainer;
	}

	var notifications = [];

	/**
	 * @param  {Node} node
	 */
	function addNotification(node) {
	  PARENT_ELEM.appendChild(node);
	  notifications.push(node);
	}

	/**
	 * @param  {Object} config
	 */
	function showDefaultMessage(config) {
	  var msg = 'Title: ' + config.title + ', Message: ' + config.message;

	  // const elem = showNotification()
	  // setTimeout(() => {
	  //   PARENT_ELEM.removeChild(elem)
	  //   // }, config.timeOut || 3000)
	  // }, config.timeOut || 3000)
	  if (config.type === TYPE.error) return console.error(msg);
	  if (config.type === TYPE.warn) return console.warn(msg);
	  if (config.type === TYPE.success) return console.info(msg);

	  return console.log(msg);
	}

	/**
	 * @param  {Object} config
	 * @param  {Object} options
	 */
	function showMessage(config, options) {
	  var method = options[config.type] || showDefaultMessage;
	  method(config);

	  if (config.cb) config.cb();
	}

	var VueNotifications = {
	  type: TYPE,
	  installed: false,
	  /**
	   * Plugin | vue-notifications
	   * @param  {Function} Vue
	   * @param  {Object} options
	   * @this VueNotifications
	   */
	  install: function install(Vue) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    (0, _override2['default'])(Vue, PROPERTY_NAME);

	    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);

	    function _initVueNotificationPlugin() {
	      var notifications = this.$options[PROPERTY_NAME];
	      if (!notifications) return;

	      (0, _keys2['default'])(notifications).forEach(setMethod.bind(this));

	      this.$emit(EVENTS.initiated);
	    }

	    /**
	     * @param  {String} name
	     * @param  {Number} index
	     * @param  {Array} arr
	     */
	    function setMethod(name, index, arr) {
	      if (this.$options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name);
	      this.$options.methods[name] = makeMethod(name);
	    }

	    /**
	     * @param  {String} configName
	     * @return {Function}
	     */
	    function makeMethod(configName) {
	      return function (config) {
	        config = config || this.$options[PROPERTY_NAME][configName];
	        showMessage(config, options);
	      };
	    }

	    var mixin = {};
	    var hook = void 0;

	    if (getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init';
	    if (getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate';

	    mixin[hook] = function () {
	      _initVueNotificationPlugin.call(this);
	    };

	    Vue.mixin(mixin);

	    this.installed = true;
	  }
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(VueNotifications);
	}

	exports['default'] = VueNotifications;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(3);
	module.exports = __webpack_require__(9).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(4);

	__webpack_require__(6)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(7),
	    core = __webpack_require__(9),
	    fails = __webpack_require__(12);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(8),
	    core = __webpack_require__(9),
	    ctx = __webpack_require__(10),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.6' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 13 */
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
	    if (_this[key]) {
	      _this[key] = undefined;
	      delete _this[key];
	    }

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