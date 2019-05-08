import { ComponentOptions, PluginObject, VueConstructor } from 'vue'
import { Vue } from 'vue/types/vue'

declare enum MESSAGE_TYPE {
  error = 'error',
  warn = 'warn',
  info = 'info',
  success = 'success'
}

declare const VueNotifications: VueNotificationsPlugin
export interface NotificationsObject {
  readonly [key: string]: MessageData;
}
export interface MessageData {
  type: MESSAGE_TYPE | string;
  timeout?: number;
  message?: string;
  title?: string;
  cb?: () => any;

  [key: string]: any;
}
export interface VueNotificationsPlugin extends PluginObject<any> {
  types: MessageTypes;
  propertyName: string;
  config: MessageData;
  pluginOptions: VueNotificationsPluginOptions;
  installed: boolean;
  install: (vue: VueConstructor, pluginOptions: ComponentOptions<Vue>) => void;
  setPluginOptions: (options: ComponentOptions<Vue>) => void;
}
export interface VueNotificationsPluginOptions {
  [key: string]: any;
}
export interface MessageTypes {
  readonly [key: string]: MESSAGE_TYPE | string;
}

export default VueNotifications
