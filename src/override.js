// eslint-disable-next-line no-unused-vars
function override (Vue, key) {
  const _init = Vue.prototype._init
  const _destroy = Vue.prototype._destroy

  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [customInit].concat(options.init)
      : customInit
    _init.call(this, options)
  }

  Vue.prototype._destroy = function () {
    if (this[key]) {
      this[key] = undefined
      delete this[key]
    }

    _destroy.apply(this, arguments)
  }

  function customInit () {
    if (this[key]) throw console.error(`Override: property "${key}" is already defined`)
    this[key] = {}

    const options = this.$options
    const keyOption = options[key]

    if (keyOption) {
      this[key] = keyOption
    } else if (options.parent && options.parent[key]) {
      this[key] = options.parent[key]
    }
  }
}
