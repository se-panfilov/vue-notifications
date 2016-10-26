const PLUGIN_NAME = 'VueNotifications'
const PACKAGE_NAME = 'vue-notifications'
const PROPERTY_NAME = 'notifications'

const TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
}

const VUE_VERSION = {
  evangelion: 1,
  ghostInTheShell: 2
}

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`,
  methodNameConflict: `${PLUGIN_NAME}: names conflict - `
}

/**
 * @param  {Object} Vue
 * @return {Object}
 */
function getVersion (Vue) {
  const version = Vue.version.match(/(\d+)/g)
  return {
    major: +version[0],
    regular: +version[1],
    minor: +version[2]
  }
}

/**
 * @param  {String} type
 * @param  {String} message
 * @param  {String} title
 * @param  {String} debugMsg
 * @return  {String}
 */
function showDefaultMessage ({ type, message, title, debugMsg }) {
  let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}, type: ${type}`

  if (type === TYPE.error) console.error(msg)
  else if (type === TYPE.warn) console.warn(msg)
  else if (type === TYPE.success) console.info(msg)
  else console.log(msg)

  return msg
}

/**
 * @param  {Object} config
 * @return {Object}
 */
function getValues (config) {
  const result = {}

  Object.keys(config).forEach(v => {
    if (v !== 'cb') {
      result[v] = (typeof config[v] === 'function') ? config[config]() : config[v]
    }
  })

  return result
}

/**
 * @param  {Object} config
 * @param  {Object} options
 */
function showMessage (config, options) {
  const valuesObj = getValues(config)
  const method = (options && options[valuesObj.type]) ? options[valuesObj.type] : showDefaultMessage
  method(valuesObj)

  if (config.cb) return config.cb()
}

/**
 * @param {Object} targetObj
 * @param {Object} typesObj
 * @param {Object} options
 * @return {undefined}
 * */
function addMethods (targetObj, typesObj, options) {
  Object.keys(typesObj).forEach(v => {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v]
      return showMessage(config, options)
    }
  })
}

/**
 * @param  {String} name
 * @param  {Object} options
 * @param  {Object} pluginOptions
 */
function setMethod (name, options, pluginOptions) {
  if (!options.methods) options.methods = {}

  if (options.methods[name]) {
    // TODO (S.Panfilov) not sure - throw error here or just warn
    // if (options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name)
    console.error(MESSAGES.methodNameConflict + name)
  } else {
    options.methods[name] = makeMethod(name, options, pluginOptions)
  }
}

/**
 * @param  {String} configName
 * @param  {Object} options
 * @param  {Object} pluginOptions
 * @return {Function}
 */
function makeMethod (configName, options, pluginOptions) {
  return function (config) {
    const newConfig = {}
    Object.assign(newConfig, VueNotifications.config)
    Object.assign(newConfig, options[VueNotifications.propertyName][configName])
    Object.assign(newConfig, config)

    return showMessage(newConfig, pluginOptions)
  }
}

/**
 * @param  {Object} notifications
 * @param  {Object} pluginOptions
 */
function initVueNotificationPlugin (notifications, pluginOptions) {
  if (!notifications) return
  Object.keys(notifications).forEach(name => {
    setMethod(name, this.$options, pluginOptions)
  })

  this.$emit(`${PACKAGE_NAME}-initiated`)
}

const VueNotifications = {
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
  install (Vue, pluginOptions = {}) {
    const mixin = {}
    let hook

    // eslint-disable-next-line no-undef
    override(Vue, this.propertyName)

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)
    if (getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init'
    if (getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate'

    mixin[hook] = function () {
      initVueNotificationPlugin.call(this, this.$options[VueNotifications.propertyName], pluginOptions)
    }

    Vue.mixin(mixin)
    addMethods(this, this.type, pluginOptions)

    this.installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}


// eslint-disable-next-line no-unused-vars
function override (Vue, key) {
  const _init = Vue.prototype._init
  const _destroy = Vue.prototype._destroy

  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [customInit].concat(options.init)
      : customInit
    _init.call(this, options)
  }

  Vue.prototype._destroy = function () {
    if (this[key]) {
      this[key] = undefined
      delete this[key]
    }

    _destroy.apply(this, arguments)
  }

  function customInit () {
    if (this[key]) throw console.error(`Override: property "${key}" is already defined`)
    this[key] = {}

    const options = this.$options
    const keyOption = options[key]

    if (keyOption) {
      this[key] = keyOption
    } else if (options.parent && options.parent[key]) {
      this[key] = options.parent[key]
    }
  }
}
