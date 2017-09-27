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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PLUGIN_NAME = 'VueNotifications';
var PACKAGE_NAME = 'vue-notifications';
var PROPERTY_NAME = 'notifications';

var TYPES = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
};

var EVANGELION = 1;

var MESSAGES = {
  alreadyInstalled: PLUGIN_NAME + ': plugin already installed',
  methodNameConflict: PLUGIN_NAME + ': names conflict - '
};

function getVersion(Vue) {
  var version = Vue.version.match(/(\d+)/g);
  return +version[0];
}

function showDefaultMessage(_ref) {
  var type = _ref.type,
      message = _ref.message,
      title = _ref.title;

  var msg = 'Title: ' + title + ', Message: ' + message + ', Type: ' + type;
  if (type === TYPES.error) console.error(msg);else if (type === TYPES.warn) console.warn(msg);else console.log(msg);
}

function getValues(vueApp, config) {
  var result = {};

  Object.keys(config).forEach(function (field) {
    if (field === 'cb') {
      result[field] = config[field].bind(vueApp);
    } else {
      result[field] = typeof config[field] === 'function' ? config[field].call(vueApp) : config[field];
    }
  });

  return result;
}

function showMessage(config, vueApp) {
  var valuesObj = getValues(vueApp, config);
  var isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type];
  var method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : showDefaultMessage;
  method(valuesObj, vueApp);

  if (config.cb) return config.cb();
}

function addMethods(targetObj, typesObj) {
  Object.keys(typesObj).forEach(function (v) {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v];

      return showMessage(config);
    };
  });
}

function setMethod(vueApp, name, options, pluginOptions) {
  if (!options.methods) options.methods = {};

  if (!options.methods[name]) {
    options.methods[name] = makeMethod(vueApp, name, options, pluginOptions);
  }
}

function makeMethod(vueApp, configName, options, pluginOptions) {
  return function (config) {
    var newConfig = Object.assign({}, VueNotifications.config, options[VueNotifications.propertyName][configName], config);

    return showMessage(newConfig, pluginOptions, vueApp);
  };
}

function initVueNotificationPlugin(vueApp, notifications, pluginOptions) {
  if (!notifications) return;
  Object.keys(notifications).forEach(function (name) {
    return setMethod(vueApp, name, vueApp.$options, pluginOptions);
  });
  vueApp.$emit(PACKAGE_NAME + '-initiated');
}

function unlinkVueNotificationPlugin(vueApp, notifications) {
  if (!notifications) return;
  var attachedMethods = vueApp.$options.methods;
  Object.keys(notifications).forEach(function (name) {
    if (attachedMethods[name]) {
      attachedMethods[name] = undefined;
      delete attachedMethods[name];
    }
  });

  vueApp.$emit(PACKAGE_NAME + '-unlinked');
}

function makeMixin(Vue, pluginOptions) {
  var _ref2;

  var init = getVersion(Vue) === EVANGELION ? 'init' : 'beforeCreate';

  return _ref2 = {}, _defineProperty(_ref2, init, function () {
    var notificationsField = this.$options[VueNotifications.propertyName];
    initVueNotificationPlugin(this, notificationsField, pluginOptions);
  }), _defineProperty(_ref2, 'beforeDestroy', function beforeDestroy() {
    var notificationsField = this.$options[VueNotifications.propertyName];
    unlinkVueNotificationPlugin(this, notificationsField);
  }), _ref2;
}

var VueNotifications = {
  types: TYPES,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPES.info,
    timeout: 3000
  },
  pluginOptions: {},
  installed: false,
  install: function install(Vue) {
    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);
    var mixin = makeMixin(Vue, pluginOptions);
    Vue.mixin(mixin);

    this.setPluginOptions(pluginOptions);
    addMethods(this, this.types);

    this.installed = true;
  },
  setPluginOptions: function setPluginOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.pluginOptions = options;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}
return VueNotifications;
}));
