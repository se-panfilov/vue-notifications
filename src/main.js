exports.install = (Vue, options = {}) => {

  const STYLE = {
    error: '-error',
    warn: '-warn',
    info: '-info',
    success: '-success'
  }

  Vue.prototype.$successMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  Vue.prototype.infoMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  Vue.prototype.$errorMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  Vue.prototype.$warnMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  function showMessage (msg, style) {
    if (style === STYLE.error) return console.error(msg)
    if (style === STYLE.warn) return console.warn(msg)
    if (style === STYLE.info) return console.info(msg)
    if (style === STYLE.success) return console.success(msg)
  }

}