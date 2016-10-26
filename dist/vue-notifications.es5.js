;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VueNotifications = factory();
  }
}(this, function() {
'use strict';

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
 * @return  {String}
 */
function showDefaultMessage(_ref) {
  var type = _ref.type,
      message = _ref.message,
      title = _ref.title,
      debugMsg = _ref.debugMsg;

  var msg = 'Title: ' + title + ', Message: ' + message + ', DebugMsg: ' + debugMsg + ', type: ' + type;

  if (type === TYPE.error) console.error(msg);else if (type === TYPE.warn) console.warn(msg);else if (type === TYPE.success) console.info(msg);else console.log(msg);

  return msg;
}

/**
 * @param  {Object} config
 * @return {Object}
 */
function getValues(config) {
  var result = {};

  Object.keys(config).forEach(function (v) {
    if (v !== 'cb') {
      result[v] = typeof config[v] === 'function' ? config[config]() : config[v];
    }
  });

  return result;
}

/**
 * @param  {Object} config
 * @param  {Object} options
 */
function showMessage(config, options) {
  var valuesObj = getValues(config);
  var method = options && options[valuesObj.type] ? options[valuesObj.type] : showDefaultMessage;
  method(valuesObj);

  if (config.cb) return config.cb();
}

/**
 * @param {Object} targetObj
 * @param {Object} typesObj
 * @param {Object} options
 * @return {undefined}
 * */
function addMethods(targetObj, typesObj, options) {
  Object.keys(typesObj).forEach(function (v) {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v];
      return showMessage(config, options);
    };
  });
}

/**
 * @param  {String} name
 * @param  {Object} options
 * @param  {Object} pluginOptions
 */
function setMethod(name, options, pluginOptions) {
  if (!options.methods) options.methods = {};

  if (options.methods[name]) {
    // TODO (S.Panfilov) not sure - throw error here or just warn
    // if (options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name)
    console.error(MESSAGES.methodNameConflict + name);
  } else {
    options.methods[name] = makeMethod(name, options, pluginOptions);
  }
}

/**
 * @param  {String} configName
 * @param  {Object} options
 * @param  {Object} pluginOptions
 * @return {Function}
 */
function makeMethod(configName, options, pluginOptions) {
  return function (config) {
    var newConfig = {};
    Object.assign(newConfig, VueNotifications.config);
    Object.assign(newConfig, options[VueNotifications.propertyName][configName]);
    Object.assign(newConfig, config);

    return showMessage(newConfig, pluginOptions);
  };
}

/**
 * @param  {Object} notifications
 * @param  {Object} pluginOptions
 */
function initVueNotificationPlugin(notifications, pluginOptions) {
  var _this = this;

  if (!notifications) return;
  Object.keys(notifications).forEach(function (name) {
    setMethod(name, _this.$options, pluginOptions);
  });

  this.$emit(PACKAGE_NAME + '-initiated');
}

var VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} Vue
   * @param  {Object} pluginOptions
   * @this VueNotifications
   */
  install: function install(Vue) {
    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mixin = {};
    var hook = void 0;

    // eslint-disable-next-line no-undef
    override(Vue, this.propertyName);

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);
    if (getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init';
    if (getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate';

    mixin[hook] = function () {
      initVueNotificationPlugin.call(this, this.$options[VueNotifications.propertyName], pluginOptions);
    };

    Vue.mixin(mixin);
    addMethods(this, this.type, pluginOptions);

    this.installed = true;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}

// eslint-disable-next-line no-unused-vars
function override(Vue, key) {
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
    if (this[key]) throw console.error('Override: property "' + key + '" is already defined');
    this[key] = {};

    var options = this.$options;
    var keyOption = options[key];

    if (keyOption) {
      this[key] = keyOption;
    } else if (options.parent && options.parent[key]) {
      this[key] = options.parent[key];
    }
  }
}
return VueNotifications;
}));
