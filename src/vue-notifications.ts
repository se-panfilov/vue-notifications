import { ComponentOptions, PluginObject, VueConstructor } from 'vue'
// tslint:disable-next-line:no-submodule-imports
import { Vue } from 'vue/types/vue'

enum MESSAGE_TYPE {
  error = 'error',
  warn = 'warn',
  info = 'info',
  success = 'success'
}

const VueNotifications: VueNotificationsPlugin = {
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
  install(vueConstructor: VueConstructor, pluginOptions: VueNotificationsPluginOptions): void {
    if (this.installed) throw console.error('VueNotifications: plugin already installed')
    const mixin = makeMixin()
    vueConstructor.mixin(mixin)

    this.setPluginOptions(pluginOptions)
    // TODO (S.Panfilov) do we need addMethods method?
    // addMethods(this, this.types, vueConstructor)

    this.installed = true
  },
  setPluginOptions(pluginOptions: VueNotificationsPluginOptions): void {
    this.pluginOptions = pluginOptions
  }
}

function getValues(config: MessageData, vueApp: Vue): MessageData {
  let result: MessageData = { type: MESSAGE_TYPE.info }

  Object.keys(config).forEach((field: string) => {
    if (field === 'cb') {
      // result[field] = (<any>config[field]).bind(vueApp)
      result = { ...result, [field]: (<any>config[field]).bind(vueApp) }
    } else {
      // result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
      result = {
        ...result,
        [field]: (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
      }
    }
  })

  return result
}

function showMessage(config: MessageData, vueApp: Vue): void {
  const valuesObj: MessageData = getValues(config, vueApp)
  const isMethodOverridden: boolean = VueNotifications.pluginOptions[valuesObj.type]
  const method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : console.log
  method(valuesObj, vueApp)

  if (config.cb) config.cb()
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

function setMethod(vueApp: Vue, name: string, componentOptions: ComponentOptions<Vue>): void {
  let { methods } = componentOptions
  if (!methods) methods = {}

  if (!methods[name]) {
    methods[name] = makeMethod(vueApp, name, componentOptions)
  } else {
    console.warn(`VueNotifications: trying to create method which is already exist: ${name}`)
  }
}

function makeMethod(vueApp: Vue, methodName: string, componentOptions: ComponentOptions<Vue>): (config: MessageData) => void {
  return (config: MessageData): void => {
    // TODO (S.Panfilov) 'componentOptions' is an extended 'ComponentOptions' with our 'VueNotifications.propertyName'
    const pluginOptions: NotificationsObject = (<any>componentOptions)[VueNotifications.propertyName as string]
    const methodConfig = pluginOptions ? pluginOptions[methodName] : {}

    const newConfig: MessageData = {
      ...VueNotifications.config,
      ...methodConfig,
      ...config
    }

    showMessage(newConfig, vueApp)
  }
}

function initVueNotificationPlugin(vueApp: Vue, notifications: NotificationsObject): void {
  if (!notifications) return
  Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options))
  vueApp.$emit('vue-notifications-initiated')
}

function unlinkVueNotificationPlugin(vueApp: Vue, notifications: NotificationsObject): void {
  if (!notifications) return
  const { methods } = vueApp.$options
  if (!methods) return

  Object.keys(notifications).forEach(name => {
    if (methods[name]) {
      (<any>methods)[name] = undefined
      delete methods[name]
    }
  })

  vueApp.$emit('vue-notifications-unlinked')
}

function makeMixin(): Mixin {

  return {
    beforeCreate(): void {
      const notificationsField: NotificationsObject = (<any>this).$options[VueNotifications.propertyName]
      if (notificationsField) initVueNotificationPlugin((<any>this), notificationsField)
    },
    beforeDestroy: function(): void {
      const notificationsField = (<any>this).$options[VueNotifications.propertyName]
      unlinkVueNotificationPlugin((<any>this), notificationsField)
    }
  }
}

export interface NotificationsObject {
  readonly [key: string]: MessageData
}

export interface MessageData {
  type: MESSAGE_TYPE | string,
  timeout?: number,
  message?: string,
  title?: string
  cb?: () => any,

  [key: string]: any
}

export interface VueNotificationsPlugin extends PluginObject<any> {
  types: MessageTypes,
  propertyName: string,
  config: MessageData,
  pluginOptions: VueNotificationsPluginOptions,
  installed: boolean,
  install: (vue: VueConstructor, pluginOptions: ComponentOptions<Vue>) => void,
  setPluginOptions: (options: ComponentOptions<Vue>) => void
}

export interface VueNotificationsPluginOptions {
  // TODO (S.Panfilov) any
  [key: string]: any
}

export interface MessageTypes {
  readonly [key: string]: MESSAGE_TYPE | string
}

interface Mixin {
  readonly beforeCreate: () => void
  readonly beforeDestroy: () => void
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueNotifications)
}

export default VueNotifications
