import { ComponentOptions, PluginObject, VueConstructor } from 'vue'
import { Vue } from 'vue/types/vue'

declare enum DEFAULT_MESSAGE_TYPES {
    error = "error",
    warn = "warn",
    info = "info",
    success = "success"
}
declare const VueNotifications: VueNotificationsPlugin;
export interface NotificationsObject {
    readonly [key: string]: MessageData;
}
export interface MessageData {
    type: DEFAULT_MESSAGE_TYPES | string;
    timeout?: number;
    message?: string;
    title?: string;
    cb?: () => any;
    [key: string]: any;
}
export interface VueNotificationsPlugin extends PluginObject<any> {
    types: {
        [key: string]: DEFAULT_MESSAGE_TYPES | string;
    };
    propertyName: string;
    config: MessageData;
    pluginOptions: ComponentOptions<Vue>;
    installed: boolean;
    install: (vue: VueConstructor, pluginOptions: ComponentOptions<Vue>) => void;
    setPluginOptions: (options: ComponentOptions<Vue>) => void;
}
export default VueNotifications;
