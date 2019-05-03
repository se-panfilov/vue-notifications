import { ComponentOptions, PluginObject, VueConstructor } from 'vue'
// tslint:disable-next-line:no-submodule-imports
import { Vue } from 'vue/types/vue'
import { ALREADY_INSTALLED } from './message.constant'
import { PACKAGE } from './package.constant'
import { MESSAGE_TYPE } from './type.constant'
import { EVANGELION } from './version.constant'

function getVersion(vue: VueConstructor): number {
  const version = vue.version.match(/(\d+)/g)
  if (!isDefined(version)) throw new Error('Can\'t understand VueJS version')
  return Number(version[0])
}

function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null
}

function showDefaultMessage({ type, message, title }: Message): void {
  const msg = `Title: ${title}, Message: ${message}, Type: ${type}`
  // TODO (S.Panfilov) any
  if (type === MESSAGE_TYPE.error || type === MESSAGE_TYPE.warn) (<any>console)[type](msg)
  else console.log(msg)
}

export interface Message {
  type: string,
  message: string,
  title: string
}

// TODO (S.Panfilov) any
function getValues(vueApp: any, config: any): object {
  // TODO (S.Panfilov) any
  const result: any = {}

  Object.keys(config).forEach((field: string) => {
    if (field === 'cb') {
      result[field] = config[field].bind(vueApp)
    } else {
      result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
    }
  })

  return result
}

// TODO (S.Panfilov) any
function showMessage(config: any, vueApp: Vue): any {
  const valuesObj: any = getValues(vueApp, config)
  // TODO (S.Panfilov) any
  const isMethodOverridden: boolean = (<any>VueNotifications.pluginOptions)[valuesObj.type]
  // TODO (S.Panfilov) any
  const method = isMethodOverridden ? (<any>VueNotifications.pluginOptions)[valuesObj.type] : showDefaultMessage
  method(valuesObj, vueApp)

  if (config.cb) return config.cb()
}

// TODO (S.Panfilov) any
function addMethods(targetObj: any, typesObj: any, vueApp: Vue): void {
  // TODO (S.Panfilov) any
  Object.keys(typesObj).forEach((v: any) => {
    // TODO (S.Panfilov) any
    targetObj[typesObj[v]] = (config: any) => {
      config.type = typesObj[v]
      // TODO (S.Panfilov) fix 'vueApp' in param
      return showMessage(config, vueApp)
    }
  })
}

// TODO (S.Panfilov) any
function setMethod(vueApp: Vue, name: string, options: any): void {
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
    options.methods[name] = makeMethod(vueApp, name, options)
  }
}

// TODO (S.Panfilov) any
function makeMethod(vueApp: Vue, configName: string, options: any): (config: any) => any { // TODO (S.Panfilov) any
  // TODO (S.Panfilov) any
  return (config: any) => {
    // TODO (S.Panfilov) Object assign
    const newConfig = {
      ...VueNotifications.config,
      ...options[VueNotifications.propertyName][configName],
      ...config
    }

    return showMessage(newConfig, vueApp)
  }
}

// TODO (S.Panfilov) any
function initVueNotificationPlugin(vueApp: Vue, notifications: any): void {
  if (!notifications) return
  Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options))
  vueApp.$emit(`${PACKAGE.PACKAGE_NAME}-initiated`)
}

// TODO (S.Panfilov) any
function unlinkVueNotificationPlugin(vueApp: Vue, notifications: any): void {
  if (!notifications) return
  const { methods } = vueApp.$options
  if (!isDefined(methods)) return

  Object.keys(notifications).forEach(name => {
    if (methods[name]) {
      // TODO (S.Panfilov) this is not allowed, let's see if we can live without this string
      (<any>methods)[name] = undefined
      delete methods[name]
    }
  })

  vueApp.$emit(`${PACKAGE.PACKAGE_NAME}-unlinked`)
}

declare interface Mixin {
  // TODO (S.Panfilov) any
  init?: () => any
  // TODO (S.Panfilov) any
  beforeCreate?: () => any
  // TODO (S.Panfilov) any
  beforeDestroy: () => any
}

function makeMixin(vue: VueConstructor): Mixin {
  const init = getVersion(vue) === EVANGELION ? 'init' : 'beforeCreate'

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

// TODO (S.Panfilov)  any
declare interface VueNotificationsPlugin extends PluginObject<any> {
  types: { [key: string]: MESSAGE_TYPE },
  propertyName: string,
  config: {
    type: MESSAGE_TYPE,
    timeout: number
  },
  pluginOptions: ComponentOptions<Vue>,
  installed: boolean,
  install: (vue: typeof Vue, pluginOptions: ComponentOptions<Vue>) => void,
  // TODO (S.Panfilov) any
  setPluginOptions: (options: any) => void
}

const VueNotifications: VueNotificationsPlugin = {
  types: {
    error: MESSAGE_TYPE.error,
    warn: MESSAGE_TYPE.warn,
    info: MESSAGE_TYPE.info,
    success: MESSAGE_TYPE.success
  },
  propertyName: PACKAGE.PROPERTY_NAME,
  config: {
    type: MESSAGE_TYPE.info,
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
  install(vue: VueConstructor, pluginOptions: ComponentOptions<Vue>): void {
    if (this.installed) throw console.error(ALREADY_INSTALLED)
    const mixin = makeMixin(vue)
    vue.mixin(mixin)

    this.setPluginOptions(pluginOptions)
    // TODO (S.Panfilov) any
    addMethods(this, this.types, vue as any)

    this.installed = true
  },
  setPluginOptions(pluginOptions: ComponentOptions<Vue>): void {
    this.pluginOptions = pluginOptions
  }

  //TODO (S.Panfilov) add ability to access this.notifications.someError.message
  //TODO (S.Panfilov) add "noCall:true" property
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
(<any>VueNotifications)._private = {};
(<any>VueNotifications)._private.getVersion = getVersion;
(<any>VueNotifications)._private.showDefaultMessage = showDefaultMessage;
(<any>VueNotifications)._private.getValues = getValues;
(<any>VueNotifications)._private.showMessage = showMessage;
(<any>VueNotifications)._private.addMethods = addMethods;
(<any>VueNotifications)._private.setMethod = setMethod;
(<any>VueNotifications)._private.makeMethod = makeMethod;
(<any>VueNotifications)._private.initVueNotificationPlugin = initVueNotificationPlugin;
(<any>VueNotifications)._private.unlinkVueNotificationPlugin = unlinkVueNotificationPlugin;
(<any>VueNotifications)._private.makeMixin = makeMixin

export default VueNotifications
/*END.TESTS_ONLY*/
