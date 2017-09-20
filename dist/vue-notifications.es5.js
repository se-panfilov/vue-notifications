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

var TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
};

var EVANGELION = 1;
var GHOST_IN_THE_SHELL = 2;

var MESSAGES = {
  alreadyInstalled: PLUGIN_NAME + ': plugin already installed',
  methodNameConflict: PLUGIN_NAME + ': names conflict - '
};

function getMajorVersion(Vue) {
  var version = Vue.version.match(/(\d+)/g);
  return +version[0];
}

function showInConsole(msg, type, types) {
  if (type === types.error) console.error(msg);else if (type === types.warn) console.warn(msg);else console.log(msg);
}

function showDefaultMessage(_ref) {
  var type = _ref.type,
      message = _ref.message,
      title = _ref.title,
      debugMsg = _ref.debugMsg;

  var msg = 'Title: ' + title + ' Message: ' + message + ' DebugMsg: ' + debugMsg + ' type: ' + type;

  showInConsole(msg, type, TYPE);

  return msg;
}

function getValues(vueApp, config) {
  var result = {};
  var keepFnFields = ['cb'];

  Object.keys(config).forEach(function (field) {
    keepFnFields.forEach(function (fnField) {
      if (field === fnField) {
        result[field] = config[field].bind(vueApp);
      } else {
        result[field] = typeof config[field] === 'function' ? config[field].call(vueApp) : config[field];
      }
    });
  });

  return result;
}

function showMessage(config, options, vueApp) {
  var valuesObj = getValues(vueApp, config);
  var isMethodOverridden = options && options[valuesObj.type];
  var method = isMethodOverridden ? options[valuesObj.type] : showDefaultMessage;
  method(valuesObj, vueApp);

  if (config.cb) return config.cb();
}

function addMethods(targetObj, typesObj, options) {
  Object.keys(typesObj).forEach(function (v) {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v];

      return showMessage(config, options);
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
    var newConfig = {};
    Object.assign(newConfig, VueNotifications.config);
    Object.assign(newConfig, options[VueNotifications.propertyName][configName]);
    Object.assign(newConfig, config);

    return showMessage(newConfig, pluginOptions, vueApp);
  };
}

function initVueNotificationPlugin(vueApp, notifications, pluginOptions) {
  if (!notifications) return;
  Object.keys(notifications).forEach(function (name) {
    setMethod(vueApp, name, vueApp.$options, pluginOptions);
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

  var hooks = {
    init: '',
    destroy: 'beforeDestroy',
    mounted: ''
  };

  if (getMajorVersion(Vue) === EVANGELION) {
    hooks.init = 'init';
    hooks.mounted = 'compiled';
  }
  if (getMajorVersion(Vue) === GHOST_IN_THE_SHELL) {
    hooks.init = 'beforeCreate';
    hooks.mounted = 'mounted';
  }

  return _ref2 = {}, _defineProperty(_ref2, hooks.init, function () {
    var vueApp = this;
    var vueAppOptions = this.$options;
    var notificationsField = vueAppOptions[VueNotifications.propertyName];

    initVueNotificationPlugin(vueApp, notificationsField, pluginOptions);
  }), _defineProperty(_ref2, hooks.destroy, function () {
    var vueApp = this;
    var vueAppOptions = this.$options;
    var notificationsField = vueAppOptions[VueNotifications.propertyName];
    unlinkVueNotificationPlugin(vueApp, notificationsField);
  }), _ref2;
}

var VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  install: function install(Vue) {
    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);
    var mixin = makeMixin(Vue, pluginOptions);
    Vue.mixin(mixin);

    addMethods(this, this.type, pluginOptions);

    this.installed = true;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}
return VueNotifications;
}));
