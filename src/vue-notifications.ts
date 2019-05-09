import { ComponentOptions, PluginObject, VueConstructor } from 'vue'
// tslint:disable-next-line:no-submodule-imports
import { Vue } from 'vue/types/vue'

enum DEFAULT_MESSAGE_TYPES {
  error = 'error',
  warn = 'warn',
  info = 'info',
  success = 'success'
}

const VueNotifications: VueNotificationsPlugin = {
  types: {
    error: DEFAULT_MESSAGE_TYPES.error,
    warn: DEFAULT_MESSAGE_TYPES.warn,
    info: DEFAULT_MESSAGE_TYPES.info,
    success: DEFAULT_MESSAGE_TYPES.success
  },
  propertyName: 'notifications',
  config: {
    type: DEFAULT_MESSAGE_TYPES.info,
    timeout: 3000
  },
  pluginOptions: {},
  installed: false,
  install(vueConstructor: VueConstructor, pluginOptions: ComponentOptions<Vue>): void {
    if (this.installed) throw console.error('VueNotifications: plugin already installed')
    const mixin = makeMixin()
    vueConstructor.mixin(mixin)

    this.setPluginOptions(pluginOptions)
    this.installed = true
  },
  setPluginOptions(pluginOptions: ComponentOptions<Vue>): void {
    this.pluginOptions = pluginOptions
  }
}

function getValues(config: MessageData, vueApp: Vue): MessageData {
  let result: MessageData = { type: DEFAULT_MESSAGE_TYPES.info }

  Object.keys(config).forEach((field: string) => {
    if (field === 'cb') {
      result = { ...result, [field]: (<any>config[field]).bind(vueApp) }
    } else {
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
  const isMethodOverridden: boolean = (<any>VueNotifications).pluginOptions[valuesObj.type]
  const method = isMethodOverridden ? (<any>VueNotifications).pluginOptions[valuesObj.type] : console.log
  method(valuesObj, vueApp)

  if (config.cb) config.cb()
}

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
  type: DEFAULT_MESSAGE_TYPES | string,
  timeout?: number,
  message?: string,
  title?: string
  cb?: () => any,

  [key: string]: any
}

export interface VueNotificationsPlugin extends PluginObject<any> {
  types: {
    [key: string]: DEFAULT_MESSAGE_TYPES | string
  },
  propertyName: string,
  config: MessageData,
  pluginOptions: ComponentOptions<Vue>,
  installed: boolean,
  install: (vue: VueConstructor, pluginOptions: ComponentOptions<Vue>) => void,
  setPluginOptions: (options: ComponentOptions<Vue>) => void
}

interface Mixin {
  readonly beforeCreate: () => void
  readonly beforeDestroy: () => void
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueNotifications)
}

export default VueNotifications
