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

var innerMethods = {
  /**
   * @param  {Object} Vue
   * @return {Object}
   */
  getVersion: function getVersion(Vue) {
    var version = Vue.version.match(/(\d+)/g);
    return {
      major: +version[0],
      regular: +version[1],
      minor: +version[2]
    };
  },


  /**
   * @param  {String} msg
   * @param  {String} type
   * @param  {Object} types
   */
  showInConsole: function showInConsole(msg, type, types) {
    if (type === types.error) console.error(msg);else if (type === types.warn) console.warn(msg);else if (type === types.success) console.info(msg);else console.log(msg);
  },


  /**
   * @param  {String} type
   * @param  {String} message
   * @param  {String} title
   * @param  {String} debugMsg
   * @param  {Object} vueApp
   * @return  {String}
   */
  showDefaultMessage: function showDefaultMessage(_ref, vueApp) {
    var type = _ref.type,
        message = _ref.message,
        title = _ref.title,
        debugMsg = _ref.debugMsg;

    var msg = 'Title: ' + title + ', Message: ' + message + ', DebugMsg: ' + debugMsg + ', type: ' + type;

    innerMethods.showInConsole(msg, type, TYPE);

    return msg;
  },

  /**
   * @param  {Object} elem
   */
  clearFn: function clearFn(elem) {
    elem.innerText = '';
  },

  /**
   * @param  {String} id
   * @param  {String} type
   * @param  {String} timeout
   * @param  {String} title
   * @param  {String} message
   * @param  {Function} computed // TODO (S.Panfilov) or not fn?
   * @param  {String} debugMsg
   * @param  {Function} cb
   * @param  {Object} vueApp
   * @return  {String}
   */
  showInlineMessage: function showInlineMessage(_ref2, vueApp) {
    var id = _ref2.id,
        type = _ref2.type,
        timeout = _ref2.timeout,
        title = _ref2.title,
        message = _ref2.message,
        computed = _ref2.computed,
        debugMsg = _ref2.debugMsg,
        cb = _ref2.cb;

    // TODO (S.Panfilov) handle class add and remove here
    if (debugMsg) innerMethods.showInConsole(debugMsg, type, TYPE);
    var elem = document.getElementById(id);

    var msg = message;
    if (title) msg = title + ': ' + msg;

    elem.innerText = msg;

    if (timeout && !computed) {
      setTimeout(function () {
        innerMethods.clearFn.call(vueApp, elem);
      }, timeout);
    } else {}
    // TODO (S.Panfilov) Computed property doesn't work yet
    // const interval = setInterval(() => {
    // console.info(computed)
    // if (!computed) clearInterval(interval)
    // }, 50)


    // TODO (S.Panfilov) BUG: Weird behaviour: cb calls 2 times
    if (cb) {
      // TODO (S.Panfilov) bug here
      cb.call(vueApp, elem, function () {
        return innerMethods.clearFn.call(innerMethods, elem);
      });
    }

    return msg;
  },


  /**
   * @param  {Object} vueApp
   * @param  {Object} config
   * @return {Object}
   */
  getValues: function getValues(vueApp, config) {
    var result = {};

    Object.keys(config).forEach(function (field) {
      if (field !== 'cb') {
        result[field] = typeof config[field] === 'function' ? config[field].call(vueApp) : config[field];
      } else {
        console.info(vueApp);
        result[field] = config[field].bind(vueApp);
      }
    });

    return result;
  },


  /**
   * @param  {Object} config
   * @param  {Object} options
   * @param  {Object} vueApp
   */
  showMessage: function showMessage(config, options, vueApp) {
    var valuesObj = innerMethods.getValues(vueApp, config);
    var isLinkedToElem = !!valuesObj.id;

    if (isLinkedToElem) {
      innerMethods.showInlineMessage(valuesObj, vueApp);
    } else {
      var isMethodOverridden = options && options[valuesObj.type];
      var method = isMethodOverridden ? options[valuesObj.type] : innerMethods.showDefaultMessage;
      method(valuesObj, vueApp);
    }

    if (config.cb) return config.cb();
  },


  /**
   * @param {Object} targetObj
   * @param {Object} typesObj
   * @param {Object} options
   * @return {undefined}
   * */
  addMethods: function addMethods(targetObj, typesObj, options) {
    Object.keys(typesObj).forEach(function (v) {
      targetObj[typesObj[v]] = function (config) {
        config.type = typesObj[v];
        // TODO (S.Panfilov)fix 'vueApp' in param
        return innerMethods.showMessage(config, options);
      };
    });
  },


  /**
   * @param  {Object} vueApp
   * @param  {String} name
   * @param  {Object} options
   * @param  {Object} pluginOptions
   */
  setMethod: function setMethod(vueApp, name, options, pluginOptions) {
    if (!options.methods) options.methods = {};

    if (options.methods[name]) {
      // TODO (S.Panfilov) not sure - throw error here or just warn
      // if (options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name)
      console.error(MESSAGES.methodNameConflict + name);
    } else {
      options.methods[name] = innerMethods.makeMethod(vueApp, name, options, pluginOptions);
    }
  },


  /**
   * @param  {Object} vueApp
   * @param  {String} configName
   * @param  {Object} options
   * @param  {Object} pluginOptions
   * @return {Function}
   */
  makeMethod: function makeMethod(vueApp, configName, options, pluginOptions) {
    return function (config) {
      var newConfig = {};
      Object.assign(newConfig, VueNotifications.config);
      Object.assign(newConfig, options[VueNotifications.propertyName][configName]);
      Object.assign(newConfig, config);

      return innerMethods.showMessage(newConfig, pluginOptions, vueApp);
    };
  },

  /**
   * @param  {Object} vueApp
   * @param  {Object} notifications
   * @param  {Object} pluginOptions
   */
  initVueNotificationPlugin: function initVueNotificationPlugin(vueApp, notifications, pluginOptions) {
    if (!notifications) return;
    Object.keys(notifications).forEach(function (name) {
      innerMethods.setMethod(vueApp, name, vueApp.$options, pluginOptions);
    });

    vueApp.$emit(PACKAGE_NAME + '-initiated');
  }
};

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

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled);
    if (innerMethods.getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init';
    if (innerMethods.getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate';

    mixin[hook] = function () {
      var vueApp = this;
      var vueAppOptions = this.$options;
      var notificationsField = vueAppOptions[VueNotifications.propertyName];

      innerMethods.initVueNotificationPlugin(vueApp, notificationsField, pluginOptions);
    };

    Vue.mixin(mixin);
    innerMethods.addMethods(this, this.type, pluginOptions);

    this.installed = true;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications);
}
return VueNotifications;
}));
