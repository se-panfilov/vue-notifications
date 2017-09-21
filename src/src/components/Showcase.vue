<template>
  <div class="hello">
    <h1>Showcase</h1>
    <img src="../assets/logo.png">
    <h2><a href="https://vuejs.org">vue.js</a> agnostic non-blocking notifications library</h2>
    <p>
      VueNotifications connects your app with notification UI library. <br/>
      That's also means you can have any look and feel of notifications you want to! <br/>
      And it would be easy to replace it =)
    </p>
    <section>
      <p v-text="notificationsSetup"></p>
    </section>
    <ul class="msg-buttons">
      <li>
        <button type="button" class="msg-buttons__btn -success" @click="showSuccessMsg()">Success</button>
      </li>
      <li>
        <button type="button" class="msg-buttons__btn -info" @click="showInfoMsg()">Info</button>
      </li>
      <li>
        <button type="button" class="msg-buttons__btn -warn" @click="showWarnMsg()">Warning</button>
      </li>
      <li>
        <button type="button" class="msg-buttons__btn -error" @click="showErrorMsg()">Error</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNotifications from 'vue-notifications'

  //Third-party UI libs
  import VueEasyToast from 'vue-easy-toast' //https://github.com/noru/vue-easy-toast
  import miniToastr from 'mini-toastr' //https://github.com/se-panfilov/mini-toastr
  import VueToasted from 'vue-toasted' //https://github.com/shakee93/vue-toasted

  //toastr
  import 'jquery' // required by 'toastr'
  import toastr from 'toastr' //https://github.com/CodeSeven/toastr
  import 'toastr/build/toastr.min.css'
  //end toastr

  //iziToast
  import iziToast from 'izitoast' //https://github.com/dolce/iziToast
  import 'izitoast/dist/css/iziToast.min.css'
  //end iziToast

  //noty
  import Noty from 'noty' //https://github.com/needim/noty
  import 'noty/lib/noty.css'
  import swal from 'sweetalert' //https://github.com/t4t5/sweetalert
  //end noty

  Vue.config.productionTip = false

  miniToastr.init()

  const UI_LIBS = {
    miniToastr: 'miniToastr',
    VueToasted: 'VueToasted',
    VueEasyToast: 'VueEasyToast',
    toastr: 'toastr',
    iziToast: 'iziToast',
    Noty: 'Noty',
    swal: 'swal'
  }

  const currentLib = UI_LIBS.swal

  const TOASTS = {
    [UI_LIBS.miniToastr] ({title, message, type, timeout, cb, debugMsg}) {
      if (debugMsg) console[type](debugMsg)
      return miniToastr[type](message, title, timeout, cb)
    },
    [UI_LIBS.VueToasted] ({title, message, type, timeout, cb, debugMsg, position}) {
      if (debugMsg) console[type](debugMsg)

      if (type === VueNotifications.type.warn) type = 'show'
      return Vue.toasted[type]('hola billo', {duration: timeout})
    },
    [UI_LIBS.VueEasyToast] ({title, message, type, timeout, cb, debugMsg, position}) {
      if (debugMsg) console[type](debugMsg)

      if (type === VueNotifications.type.warn) type = 'show'
      return Vue.toasted[type](message, {duration: timeout})
    },
    [UI_LIBS.toastr] ({title, message, type, timeout, cb, debugMsg, position}) {
      if (debugMsg) console[type](debugMsg)

      // this shit requires jquery, lol
      if (type === VueNotifications.type.warn) type = 'warning'
      return toastr[type](message, title, {timeOut: timeout})
    },
    [UI_LIBS.iziToast] ({title, message, type, timeout, cb, debugMsg, position}) {
      if (debugMsg) console[type](debugMsg)

      if (type === VueNotifications.type.warn) type = 'warning'
      return iziToast[type]({title, message, timeout})
    },
    [UI_LIBS.Noty] ({title, message, type, timeout, cb, debugMsg, position}) {
      if (debugMsg) console[type](debugMsg)

      if (type === VueNotifications.type.warn) type = 'warning'

      return new Noty({text: message, timeout, type}).show()
    },
    [UI_LIBS.swal] ({title, message, type, timeout, cb, debugMsg, position}) {
      if (debugMsg) console[type](debugMsg)

      if (type === VueNotifications.type.warn) type = 'warning'
      return swal(title, message, type)
    }
  }

  const options = {
    success: TOASTS[currentLib],
    error: TOASTS[currentLib],
    info: TOASTS[currentLib],
    warn: TOASTS[currentLib]
  }

  Vue.use(VueNotifications, options)
  Vue.use(VueEasyToast)
  Vue.use(VueToasted)

  export default {
    name: 'showcase',
    data () {
      return {
        notificationsSetup: JSON.stringify(this.notifications)
      }
    },
    notifications: {
      showSuccessMsg: {
        type: VueNotifications.type.success,
        title: 'Hello there',
        message: 'That\'s the success!'
      },
      showInfoMsg: {
        type: VueNotifications.type.info,
        title: 'Hey you',
        message: 'Here is some info for you'
      },
      showWarnMsg: {
        type: VueNotifications.type.warn,
        title: 'Wow, man',
        message: 'That\'s the kind of warning'
      },
      showErrorMsg: {
        type: VueNotifications.type.error,
        title: 'Wow-wow',
        message: 'That\'s the error'
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  primary_color = #41b883

  h1, h2
    font-weight normal

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983

  .hello
    text-align center

  .msg-buttons
    margin 10px
    &__btn
      color white
      font-size 14px
      background-color primary_color
      border-radius 3px
      padding 7px 12px
      border 1px solid transparent
      transition background .4s ease
      cursor pointer
      &:hover
        background-color lighten(primary_color, 5)
</style>
