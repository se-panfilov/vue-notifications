var DEFAULT_MESSAGE_TYPES;
(function (DEFAULT_MESSAGE_TYPES) {
    DEFAULT_MESSAGE_TYPES["error"] = "error";
    DEFAULT_MESSAGE_TYPES["warn"] = "warn";
    DEFAULT_MESSAGE_TYPES["info"] = "info";
    DEFAULT_MESSAGE_TYPES["success"] = "success";
})(DEFAULT_MESSAGE_TYPES || (DEFAULT_MESSAGE_TYPES = {}));
const VueNotifications = {
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
    install(vueConstructor, pluginOptions) {
        if (this.installed)
            throw console.error('VueNotifications: plugin already installed');
        const mixin = makeMixin();
        vueConstructor.mixin(mixin);
        this.setPluginOptions(pluginOptions);
        this.installed = true;
    },
    setPluginOptions(pluginOptions) {
        this.pluginOptions = pluginOptions;
    }
};
function getValues(config, vueApp) {
    let result = { type: DEFAULT_MESSAGE_TYPES.info };
    Object.keys(config).forEach((field) => {
        if (field === 'cb') {
            result = { ...result, [field]: config[field].bind(vueApp) };
        }
        else {
            result = {
                ...result,
                [field]: (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
            };
        }
    });
    return result;
}
function showMessage(config, vueApp) {
    const valuesObj = getValues(config, vueApp);
    const isMethodOverridden = VueNotifications.pluginOptions[valuesObj.type];
    const method = isMethodOverridden ? VueNotifications.pluginOptions[valuesObj.type] : console.log;
    method(valuesObj, vueApp);
    if (config.cb)
        config.cb();
}
function setMethod(vueApp, name, componentOptions) {
    let { methods } = componentOptions;
    if (!methods)
        methods = {};
    if (!methods[name]) {
        methods[name] = makeMethod(vueApp, name, componentOptions);
    }
    else {
        console.warn(`VueNotifications: trying to create method which is already exist: ${name}`);
    }
}
function makeMethod(vueApp, methodName, componentOptions) {
    return (config) => {
        // TODO (S.Panfilov) 'componentOptions' is an extended 'ComponentOptions' with our 'VueNotifications.propertyName'
        const pluginOptions = componentOptions[VueNotifications.propertyName];
        const methodConfig = pluginOptions ? pluginOptions[methodName] : {};
        const newConfig = {
            ...VueNotifications.config,
            ...methodConfig,
            ...config
        };
        showMessage(newConfig, vueApp);
    };
}
function initVueNotificationPlugin(vueApp, notifications) {
    if (!notifications)
        return;
    Object.keys(notifications).forEach(name => setMethod(vueApp, name, vueApp.$options));
    vueApp.$emit('vue-notifications-initiated');
}
function unlinkVueNotificationPlugin(vueApp, notifications) {
    if (!notifications)
        return;
    const { methods } = vueApp.$options;
    if (!methods)
        return;
    Object.keys(notifications).forEach(name => {
        if (methods[name]) {
            methods[name] = undefined;
            delete methods[name];
        }
    });
    vueApp.$emit('vue-notifications-unlinked');
}
function makeMixin() {
    return {
        beforeCreate() {
            const notificationsField = this.$options[VueNotifications.propertyName];
            if (notificationsField)
                initVueNotificationPlugin(this, notificationsField);
        },
        beforeDestroy: function () {
            const notificationsField = this.$options[VueNotifications.propertyName];
            unlinkVueNotificationPlugin(this, notificationsField);
        }
    };
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueNotifications);
}
export default VueNotifications;
