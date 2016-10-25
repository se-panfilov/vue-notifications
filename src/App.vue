<template>
  <div id="app">
    asdsd
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created () {
      this.errorMsg()
      this.warnMsg()
      this.infoMsg()
      this.successMsg()
    },
    methods: {},
    notifications: {
      errorMsg: {
        type: 'error',
        title: 'Error title',
        message: 'Some error msg'
      },
      warnMsg: {
        type: 'warn',
        title: 'Warning title',
        message: 'Some warn msg'
      },
      infoMsg: {
        type: 'info',
        title: 'Info title',
        message: 'Some info msg'
      },
      successMsg: {
        type: 'success',
        title: 'Success title',
        message: 'Some success msg'
      },
    }
  }
</script>
