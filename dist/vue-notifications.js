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

	var _assign = __webpack_require__(1);

	var _assign2 = _interopRequireDefault(_assign);

	var _keys = __webpack_require__(16);

	var _keys2 = _interopRequireDefault(_keys);

	var _override = __webpack_require__(20);

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
	 * @param  {String} type
	 * @param  {String} message
	 * @param  {String} title
	 * @param  {String} debugMsg
	 */
	function showDefaultMessage(_ref) {
	  var type = _ref.type;
	  var message = _ref.message;
	  var title = _ref.title;
	  var debugMsg = _ref.debugMsg;

	  var msg = 'Title: ' + title + ', Message: ' + message + ', DebugMsg: ' + debugMsg;

	  if (type === TYPE.error) return console.error(msg);
	  if (type === TYPE.warn) return console.warn(msg);
	  if (type === TYPE.success) return console.info(msg);

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

	var defaultConfig = {
	  type: TYPE.info,
	  timeOut: 3000
	};

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

	    /**
	     * @param  {Object} notifications
	     */
	    function _initVueNotificationPlugin(notifications) {
	      if (!notifications) return;
	      (0, _keys2['default'])(notifications).forEach(setMethod.bind(this));

	      this.$emit(PACKAGE_NAME + '-initiated');
	    }

	    /**
	     * @param  {String} name
	     */
	    function setMethod(name) {
	      if (this.$options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name);
	      this.$options.methods[name] = makeMethod(name);
	    }

	    /**
	     * @param  {String} configName
	     * @return {Function}
	     */
	    function makeMethod(configName) {
	      return function (config) {
	        var newConfig = {};
	        (0, _assign2['default'])(newConfig, defaultConfig);
	        (0, _assign2['default'])(newConfig, this.$options[PROPERTY_NAME][configName]);
	        (0, _assign2['default'])(newConfig, config);
	        showMessage(newConfig, options);
	      };
	    }

	    /**
	     * @param {Object} type
	     * */
	    function addProtoMethods(type) {
	      (0, _keys2['default'])(type).forEach(function (v) {
	        VueNotifications[type[v]] = function (config) {
	          config.type = type[v];
	          showMessage(config, options);
	        };
	      });
	    }

	    var mixin = {};
	    var hook = void 0;

	    if (getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init';
	    if (getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate';

	    mixin[hook] = function () {
	      _initVueNotificationPlugin.call(this, this.$options[PROPERTY_NAME]);
	    };

	    Vue.mixin(mixin);
	    addProtoMethods(TYPE);

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

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6).Object.assign;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(9)});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(7)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(8);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(10)
	  , toObject = __webpack_require__(11)
	  , IObject  = __webpack_require__(13);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(15)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(14);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(18);
	module.exports = __webpack_require__(6).Object.keys;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(11);

	__webpack_require__(19)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(15);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (Vue, key) {
	  var _init = Vue.prototype._init;
	  var _destroy = Vue.prototype._destroy;

	  Vue.prototype._init = function () {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    options.init = options.init ? [customInit].concat(options.init) : customInit;
	    _init.call(this, options);
	  };

	  Vue.prototype._destroy = function () {
	    if (this[key]) {
	      this[key] = undefined;
	      delete this[key];
	    }

	    _destroy.apply(this, arguments);
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