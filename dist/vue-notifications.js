var MESSAGE_TYPE;
(function(MESSAGE_TYPE) {
  MESSAGE_TYPE['error'] = 'error'
  MESSAGE_TYPE['warn'] = 'warn'
  MESSAGE_TYPE['info'] = 'info'
  MESSAGE_TYPE['success'] = 'success'
})(MESSAGE_TYPE || (MESSAGE_TYPE = {}))
const VueNotifications = {
  types: {
    error: MESSAGE_TYPE.error,
    warn: MESSAGE_TYPE.warn,
    info: MESSAGE_TYPE.info,
    success: MESSAGE_TYPE.success
  },
  propertyName: 'notifications',
  config: {
    type: MESSAGE_TYPE.info,
    timeout: 3000
  },
  pluginOptions: {},
  installed: false,
  install (vueConstructor, pluginOptions) {
    if (this.installed)
      throw console.error('VueNotifications: plugin already installed')
    const mixin = makeMixin()
    vueConstructor.mixin(mixin)
    this.setPluginOptions(pluginOptions)
    // TODO (S.Panfilov) do we need addMethods method?
    // addMethods(this, this.types, vueConstructor)
    this.installed = true
  },
  setPluginOptions (pluginOptions) {
    this.pluginOptions = pluginOptions
  }
}

function getValues (config, vueApp) {
  let result = { type: MESSAGE_TYPE.info }
  Object.keys(config).forEach((field) => {
    if (field === 'cb') {
      // result[field] = (<any>config[field]).bind(vueApp)
      result = Object.assign({}, result, { [field]: config[field].bind(vueApp) })
    } else {
      // result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
      result = Object.assign({}, result, { [field]: (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field] })
    }
  })
  return result
}

function showMessage (config, vueApp) {
  const valuesObj = getValues(config, vueApp)
  const isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type]
  const method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : console.log
  method(valuesObj, vueApp)
  if (config.cb)
    config.cb()
}
// TODO (S.Panfilov) do we need this method?
// TODO (S.Panfilov) any
// function addMethods(targetObj: any, typesObj: any, vueConstructor: VueConstructor): void {
//   // TODO (S.Panfilov) any
//   Object.keys(typesObj).forEach((v: any) => {
//     // TODO (S.Panfilov) any
//     targetObj[typesObj[v]] = (config: any) => {
//       config.type = typesObj[v]
//       return showMessage(config, vueConstructor as any)
//     }
//   })
// }
function setMethod (vueApp, name, componentOptions) {
  let { methods } = componentOptions
  if (!methods)
    methods = {}
  if (!methods[name]) {
    methods[name] = makeMethod(vueApp, name, componentOptions)
  } else {
    console.warn(`VueNotifications: trying to create method which is already exist: ${name}`)
  }
}

function makeMethod (vueApp, methodName, componentOptions) {
  return (config) => {
    // TODO (S.Panfilov) 'componentOptions' is an extended 'ComponentOptions' with our 'VueNotifications.propertyName'
    const pluginOptions = componentOptions[VueNotifications.propertyName]
    const methodConfig = pluginOptions ? pluginOptions[methodName] : {}
    const newConfig = Object.assign({}, VueNotifications.config, methodConfig, config)
    showMessage(newConfig, vueApp)
  }
}

function initVueNotificationPlugin (vueApp, notifications) {
  if (!notifications)
    return
  Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options))
  vueApp.$emit('vue-notifications-initiated')
}

function unlinkVueNotificationPlugin (vueApp, notifications) {
  if (!notifications)
    return
  const { methods } = vueApp.$options
  if (!methods)
    return
  Object.keys(notifications).forEach(name => {
    if (methods[name]) {
      methods[name] = undefined
      delete methods[name]
    }
  })
  vueApp.$emit('vue-notifications-unlinked')
}

function makeMixin () {
  return {
    beforeCreate () {
      const notificationsField = this.$options[VueNotifications.propertyName]
      if (notificationsField)
        initVueNotificationPlugin(this, notificationsField)
    },
    beforeDestroy: function() {
      const notificationsField = this.$options[VueNotifications.propertyName]
      unlinkVueNotificationPlugin(this, notificationsField)
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}
export default VueNotifications
