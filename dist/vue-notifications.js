var MESSAGE_TYPE;
(function(MESSAGE_TYPE) {
  MESSAGE_TYPE['error'] = 'error'
  MESSAGE_TYPE['warn'] = 'warn'
  MESSAGE_TYPE['info'] = 'info'
  MESSAGE_TYPE['success'] = 'success'
})(MESSAGE_TYPE || (MESSAGE_TYPE = {}))

// TODO (S.Panfilov) return type object
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
  const method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : console.log
  method(valuesObj, vueApp)
  if (config.cb)
    return config.cb()
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
  vueApp.$emit('vue-notifications-initiated')
}
// TODO (S.Panfilov) any
function unlinkVueNotificationPlugin (vueApp, notifications) {
  if (!notifications)
    return
  const { methods } = vueApp.$options
  if (!methods)
    return
  Object.keys(notifications).forEach(name => {
    if (methods[name]) {
      // TODO (S.Panfilov) this is not allowed, let's see if we can live without this string
      methods[name] = undefined
      delete methods[name]
    }
  })
  vueApp.$emit('vue-notifications-unlinked')
}

function makeMixin () {
  return {
    // TODO (S.Panfilov) I'm not sure nw how to solve issue with "this" properly
    // tslint:disable-next-line:object-literal-shorthand
    beforeCreate: function() {
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      const notificationsField = this.$options[VueNotifications.propertyName]
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      initVueNotificationPlugin(this, notificationsField)
    },
    beforeDestroy: () => {
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
  //TODO (S.Panfilov) add ability to access this.notifications.someError.message
  //TODO (S.Panfilov) add "noCall:true" property
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}
export default VueNotifications
