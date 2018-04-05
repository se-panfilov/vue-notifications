import {error, info, success, warn} from './type.constant'
import {PACKAGE_NAME, PROPERTY_NAME} from './package.constant'
import {EVANGELION} from './version.constant'
import {ALREADY_INSTALLED} from './message.constant'

function getVersion (Vue): Number {
  const version = Vue.version.match(/(\d+)/g)
  return +version[0]
}

function showDefaultMessage ({type, message, title}: { type: string, message: string, title: string }): void {
  let msg = `Title: ${title}, Message: ${message}, Type: ${type}`
  if (type === error) console.error(msg)
  else if (type === warn) console.warn(msg)
  else console.log(msg)
}

function getValues (vueApp, config): Object {
  const result = {}

  Object.keys(config).forEach(field => {
    if (field === 'cb') {
      result[field] = config[field].bind(vueApp)
    } else {
      result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
    }
  })

  return result
}

// TODO (S.Panfilov) type
function showMessage (config, vueApp) {
  const valuesObj = getValues(vueApp, config)
  const isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type]
  const method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : showDefaultMessage
  method(valuesObj, vueApp)

  if (config.cb) return config.cb()
}

function addMethods (targetObj, typesObj): void {
  Object.keys(typesObj).forEach(v => {
    targetObj[typesObj[v]] = function (config) {
      config.type = typesObj[v]
      // TODO (S.Panfilov) fix 'vueApp' in param
      return showMessage(config)
    }
  })
}

function setMethod (vueApp, name: string, options, pluginOptions): void {
  if (!options.methods) options.methods = {}

  // ///////////////////////////////////////////////////////////////////////
  // TODO (S.Panfilov) We can't check if method already exist,
  // cause it won't allow us to use same component more then one tine in the same page
  // But it would be good to check somehow if it's already exist a method that was created not from this plugin

  // if (options.methods[name]) {
  // console.error(MESSAGES.methodNameConflict + name)
  // } else {
  //   options.methods[name] = makeMethod(vueApp, name, options, pluginOptions)
  // }

  // ///////////////////////////////////////////////////////////////////////

  if (!options.methods[name]) {
    options.methods[name] = makeMethod(vueApp, name, options, pluginOptions)
  }
}

// TODO (S.Panfilov) type
function makeMethod (vueApp, configName: string, options, pluginOptions): Function {
  return function (config) {
    const newConfig = Object.assign({},
      VueNotifications.config,
      options[VueNotifications.propertyName][configName],
      config)

    return showMessage(newConfig, pluginOptions, vueApp)
  }
}

function initVueNotificationPlugin (vueApp, notifications, pluginOptions): void {
  if (!notifications) return
  Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options, pluginOptions))
  vueApp.$emit(`${PACKAGE_NAME}-initiated`)
}

function unlinkVueNotificationPlugin (vueApp, notifications): void {
  if (!notifications) return
  const attachedMethods = vueApp.$options.methods
  Object.keys(notifications).forEach(name => {
    if (attachedMethods[name]) {
      attachedMethods[name] = undefined
      delete attachedMethods[name]
    }
  })

  vueApp.$emit(`${PACKAGE_NAME}-unlinked`)
}

declare interface Mixin {
  ['init' | 'beforeCreate']: Function
  beforeDestroy: Function
}

function makeMixin (Vue, pluginOptions): Mixin {
  const init = getVersion(Vue) === EVANGELION ? 'init' : 'beforeCreate'

  return {
    [init]: function () {
      //this === vueApp
      const notificationsField = this.$options[VueNotifications.propertyName]
      initVueNotificationPlugin(this, notificationsField, pluginOptions)
    },
    'beforeDestroy': function () {
      //this === vueApp
      const notificationsField = this.$options[VueNotifications.propertyName]
      unlinkVueNotificationPlugin(this, notificationsField)
    }
  }
}

const VueNotifications = {
  types: {error, warn, info, success},
  propertyName: PROPERTY_NAME,
  config: {
    type: info,
    timeout: 3000
  },
  pluginOptions: {},
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} Vue
   * @param  {Object} pluginOptions
   * @this VueNotifications
   */
  install (Vue, pluginOptions = {}) {
    if (this.installed) throw console.error(ALREADY_INSTALLED)
    const mixin = makeMixin(Vue, pluginOptions)
    Vue.mixin(mixin)

    this.setPluginOptions(pluginOptions)
    addMethods(this, this.types)

    this.installed = true
  },
  setPluginOptions (options = {}) {
    this.pluginOptions = options
  }

  //TODO (S.Panfilov) add ability to access this.notifications.someError.message
  //TODO (S.Panfilov) add "noCall:true" property
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
VueNotifications._private = {}
VueNotifications._private.getVersion = getVersion
VueNotifications._private.showDefaultMessage = showDefaultMessage
VueNotifications._private.getValues = getValues
VueNotifications._private.showMessage = showMessage
VueNotifications._private.addMethods = addMethods
VueNotifications._private.setMethod = setMethod
VueNotifications._private.makeMethod = makeMethod
VueNotifications._private.initVueNotificationPlugin = initVueNotificationPlugin
VueNotifications._private.unlinkVueNotificationPlugin = unlinkVueNotificationPlugin
VueNotifications._private.makeMixin = makeMixin

export default VueNotifications
/*END.TESTS_ONLY*/
