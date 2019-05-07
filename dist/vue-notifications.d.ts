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
  type: string;
  message: string;
  title: string;
}
export interface VueNotificationsPlugin extends PluginObject<any> {
  types: {
    [key: string]: MESSAGE_TYPE | string;
  };
  propertyName: string;
  config: {
    type: MESSAGE_TYPE | string;
    timeout: number;
  };
  pluginOptions: ComponentOptions<Vue>;
  installed: boolean;
  install: (vue: VueConstructor, pluginOptions: ComponentOptions<Vue>) => void;
  setPluginOptions: (options: any) => void;
}
export interface Mixin {
  beforeCreate: () => any;
  beforeDestroy: () => any;
}

export default VueNotifications
