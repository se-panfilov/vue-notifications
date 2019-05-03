import { ComponentOptions, PluginObject } from 'vue'
import { Vue } from 'vue/types/vue'
import { MESSAGE_TYPE } from './type.constant'

export interface Message {
  type: string;
  message: string;
  title: string;
}

declare interface VueNotificationsPlugin extends PluginObject<any> {
  types: {
    [key: string]: MESSAGE_TYPE;
  };
  propertyName: string;
  config: {
    type: MESSAGE_TYPE;
    timeout: number;
  };
  pluginOptions: ComponentOptions<Vue>;
  installed: boolean;
  install: (vue: typeof Vue, pluginOptions: ComponentOptions<Vue>) => void;
  setPluginOptions: (options: any) => void;
}

declare const VueNotifications: VueNotificationsPlugin
export default VueNotifications
