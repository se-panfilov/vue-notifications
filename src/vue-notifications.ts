import { ComponentOptions, PluginObject, VueConstructor } from 'vue'
// tslint:disable-next-line:no-submodule-imports
import { Vue } from 'vue/types/vue'

enum MESSAGE_TYPE {
  error = 'error',
  warn = 'warn',
  info = 'info',
  success = 'success'
}

function getValues(config: MessageData, vueApp: Vue): MessageData {
  const result: MessageData = { type: MESSAGE_TYPE.info }

  Object.keys(config).forEach((field: string) => {
    if (field === 'cb') {
      // TODO (S.Panfilov) tslint ignore
      // @ts-ignore
      result[field] = config[field].bind(vueApp)
    } else {
      // TODO (S.Panfilov) tslint ignore
      // @ts-ignore
      result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
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
  if (!componentOptions.methods) componentOptions.methods = {}

  if (!componentOptions.methods[name]) {
    componentOptions.methods[name] = makeMethod(vueApp, name, componentOptions)
  }
}

function makeMethod(vueApp: Vue, methodName: string, componentOptions: ComponentOptions<Vue>): (config: MessageData) => void {
  return (config: MessageData): void => {
    const newConfig: MessageData = {
      ...VueNotifications.config,
      // TODO (S.Panfilov)  ts ignore
      // @ts-ignore
      ...componentOptions[VueNotifications.propertyName][methodName],
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
    // TODO (S.Panfilov) I'm not sure now how to solve issue with "this" properly
    // tslint:disable-next-line:object-literal-shorthand
    beforeCreate: function(): void {
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      const notificationsField: NotificationsObject = this.$options[VueNotifications.propertyName]
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      if (notificationsField) initVueNotificationPlugin(this, notificationsField)
    },
    // tslint:disable-next-line:object-literal-shorthand
    beforeDestroy: function(): void {
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      const notificationsField = this.$options[VueNotifications.propertyName]
      // TODO (S.Panfilov) ts-ignore
      // @ts-ignore
      unlinkVueNotificationPlugin(this, notificationsField)
    }
  }
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

export interface NotificationsObject {
  readonly [key: string]: MessageData
}

export interface MessageData {
  type: MESSAGE_TYPE | string,
  timeout?: number,
  message?: string,
  title?: string
  cb?: () => any
}

// TODO (S.Panfilov)  any
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
  readonly [key: string]: any
}

export interface MessageTypes {
  readonly [key: string]: MESSAGE_TYPE | string
}

export interface Mixin {
  beforeCreate: () => void
  beforeDestroy: () => void
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueNotifications)
}

export default VueNotifications
