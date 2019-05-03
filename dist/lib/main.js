'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const message_constant_1 = require('./message.constant')
const package_constant_1 = require('./package.constant')
const type_constant_1 = require('./type.constant')
const version_constant_1 = require('./version.constant')

function getVersion (vue) {
  const version = vue.version.match(/(\d+)/g)
  if (!isDefined(version))
    throw new Error('Can\'t understand VueJS version')
  return Number(version[0])
}

function isDefined (value) {
  return value !== undefined && value !== null
}

function showDefaultMessage ({ type, message, title }) {
  const msg = `Title: ${title}, Message: ${message}, Type: ${type}`
  // TODO (S.Panfilov) any
  if (type === type_constant_1.MESSAGE_TYPE.error || type === type_constant_1.MESSAGE_TYPE.warn)
    console[type](msg)
  else
    console.log(msg)
}

// TODO (S.Panfilov) any
function getValues (vueApp, config) {
  // TODO (S.Panfilov) any
  const result = {}
  Object.keys(config).forEach((field) => {
    if (field === 'cb') {
      result[field] = config[field].bind(vueApp)
    } else {
      result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
    }
  })
  return result
}

// TODO (S.Panfilov) any
function showMessage (config, vueApp) {
  const valuesObj = getValues(vueApp, config)
  // TODO (S.Panfilov) any
  const isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type]
  // TODO (S.Panfilov) any
  const method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : showDefaultMessage
  method(valuesObj, vueApp)
  if (config.cb)
    return config.cb()
}

// TODO (S.Panfilov) any
function addMethods (targetObj, typesObj, vueApp) {
  // TODO (S.Panfilov) any
  Object.keys(typesObj).forEach((v) => {
    // TODO (S.Panfilov) any
    targetObj[typesObj[v]] = (config) => {
      config.type = typesObj[v]
      // TODO (S.Panfilov) fix 'vueApp' in param
      return showMessage(config, vueApp)
    }
  })
}

// TODO (S.Panfilov) any
function setMethod (vueApp, name, options) {
  if (!options.methods)
    options.methods = {}
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
    options.methods[name] = makeMethod(vueApp, name, options)
  }
}

// TODO (S.Panfilov) any
function makeMethod (vueApp, configName, options) {
  // TODO (S.Panfilov) any
  return (config) => {
    // TODO (S.Panfilov) Object assign
    const newConfig = Object.assign({}, VueNotifications.config, options[VueNotifications.propertyName][configName], config)
    return showMessage(newConfig, vueApp)
  }
}

// TODO (S.Panfilov) any
function initVueNotificationPlugin (vueApp, notifications) {
  if (!notifications)
    return
  Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options))
  vueApp.$emit(`${package_constant_1.PACKAGE.PACKAGE_NAME}-initiated`)
}

// TODO (S.Panfilov) any
function unlinkVueNotificationPlugin (vueApp, notifications) {
  if (!notifications)
    return
  const { methods } = vueApp.$options
  if (!isDefined(methods))
    return
  Object.keys(notifications).forEach(name => {
    if (methods[name]) {
      // TODO (S.Panfilov) this is not allowed, let's see if we can live without this string
      methods[name] = undefined
      delete methods[name]
    }
  })
  vueApp.$emit(`${package_constant_1.PACKAGE.PACKAGE_NAME}-unlinked`)
}

function makeMixin (vue) {
  const init = getVersion(vue) === version_constant_1.EVANGELION ? 'init' : 'beforeCreate'
  return {
    [init]: () => {
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      const notificationsField = this.$options[VueNotifications.propertyName]
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      initVueNotificationPlugin(this, notificationsField)
    },
    'beforeDestroy': () => {
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      const notificationsField = this.$options[VueNotifications.propertyName]
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      unlinkVueNotificationPlugin(this, notificationsField)
    }
  }
}

const VueNotifications = {
  types: {
    error: type_constant_1.MESSAGE_TYPE.error,
    warn: type_constant_1.MESSAGE_TYPE.warn,
    info: type_constant_1.MESSAGE_TYPE.info,
    success: type_constant_1.MESSAGE_TYPE.success
  },
  propertyName: package_constant_1.PACKAGE.PROPERTY_NAME,
  config: {
    type: type_constant_1.MESSAGE_TYPE.info,
    timeout: 3000
  },
  pluginOptions: {},
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} vue
   * @param  {Object} pluginOptions
   * @this VueNotifications
   */
  install (vue, pluginOptions) {
    if (this.installed)
      throw console.error(message_constant_1.ALREADY_INSTALLED)
    const mixin = makeMixin(vue)
    vue.mixin(mixin)
    this.setPluginOptions(pluginOptions)
    // TODO (S.Panfilov) any
    addMethods(this, this.types, vue)
    this.installed = true
  },
  setPluginOptions (pluginOptions) {
    this.pluginOptions = pluginOptions
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
exports.default = VueNotifications
/*END.TESTS_ONLY*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHlEQUFzRDtBQUN0RCx5REFBNEM7QUFDNUMsbURBQThDO0FBQzlDLHlEQUErQztBQUUvQyxvQkFBb0IsR0FBbUI7SUFDckMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7SUFDM0UsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0IsQ0FBQztBQUVELG1CQUFzQixLQUEyQjtJQUMvQyxPQUFVLEtBQUssS0FBSyxTQUFTLElBQU8sS0FBSyxLQUFLLElBQUksQ0FBQTtBQUNwRCxDQUFDO0FBRUQsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQVc7SUFDM0QsTUFBTSxHQUFHLEdBQUcsVUFBVSxLQUFLLGNBQWMsT0FBTyxXQUFXLElBQUksRUFBRSxDQUFBO0lBQ2pFLHdCQUF3QjtJQUN4QixJQUFJLElBQUksS0FBSyw0QkFBWSxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssNEJBQVksQ0FBQyxJQUFJO1FBQVEsT0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBOztRQUNuRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZCLENBQUM7QUFRRCx3QkFBd0I7QUFDeEIsbUJBQW1CLE1BQVcsRUFBRSxNQUFXO0lBQ3pDLHdCQUF3QjtJQUN4QixNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUE7SUFFdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUs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