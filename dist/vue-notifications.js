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
/***/ function(module, exports) {

	const STYLE = {
	  error: '-error',
	  warn: '-warn',
	  info: '-info',
	  success: '-success'
	}

	const STATE = {
	  installed: false
	}
	const MESSAGES = {
	  alreadyInstalled: 'VueNotifications plugin already installed'
	}

	function showMessage (msg, style) {
	  if (style === STYLE.error) return console.error(msg)
	  if (style === STYLE.warn) return console.warn(msg)
	  if (style === STYLE.info) return console.log(msg)
	  if (style === STYLE.success) return console.info(msg)
	}

	exports.install = (Vue, options) => {
	  if (STATE.installed) throw console.error(MESSAGES.alreadyInstalled)
	    STATE.installed = true

	    Vue.prototype.$successMsg = (msg) => {
	      showMessage(msg, STYLE.success)
	    }

	    Vue.prototype.$infoMsg = (msg) => {
	      showMessage(msg, STYLE.success)
	    }

	    Vue.prototype.$errorMsg = (msg) => {
	      showMessage(msg, STYLE.success)
	    }

	    Vue.prototype.$warnMsg = (msg) => {
	      showMessage(msg, STYLE.success)
	    }
	}

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(VueNotifications)
	}

/***/ }
/******/ ])
});
;