<template>
  <div class="showcase">

    <section class="hello">
      <h1>Showcase</h1>
      <img src="../assets/logo.png">
      <h2><a href="https://vuejs.org">vue.js</a> agnostic non-blocking notifications library</h2>
      <p>
        VueNotifications connects your app with notification UI library. <br/>
        That's also means you can have any look and feel of notifications you want to! <br/>
        And it would be easy to replace it =)
      </p>
    </section>

    <section>
      <pre v-highlightjs="ExampleFuncSetup[currentLib]">
        <code class="javascript"></code>
      </pre>
    </section>

    <section>
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
      <ul>
        <li v-for="lib in libs" @change="setCurrentLib(lib)">
          <label>
            <input type="radio" name="lib"/>
            <span v-text="lib"></span>
          </label>

        </li>
      </ul>
    </section>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNotifications from 'vue-notifications'
  import VueHighlightJS from 'vue-highlightjs'
  import 'highlight.js/styles/atom-one-light.css'
  import ExampleFuncSetup from '../misc/example_setup'

  //Third-party UI libs
  import VueEasyToast from 'vue-easy-toast' // https://github.com/noru/vue-easy-toast
  import miniToastr from 'mini-toastr' // https://github.com/se-panfilov/mini-toastr
  import VueToasted from 'vue-toasted' // https://github.com/shakee93/vue-toasted

  //toastr
  import 'jquery' // required by 'toastr'
  import toastr from 'toastr' // https://github.com/CodeSeven/toastr
  import 'toastr/build/toastr.min.css'
  //end toastr

  //iziToast
  import iziToast from 'izitoast' // https://github.com/dolce/iziToast
  import 'izitoast/dist/css/iziToast.min.css'
  //end iziToast

  //noty
  import Noty from 'noty' // https://github.com/needim/noty
  import 'noty/lib/noty.css'
  //end noty

  //sweetalert
  import swal from 'sweetalert' // https://github.com/t4t5/sweetalert

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

  const TOASTS = {
    [UI_LIBS.miniToastr] ({title, message, type, timeout, cb}) {
      return miniToastr[type](message, title, timeout, cb)
    },
    [UI_LIBS.VueToasted] ({title, message, type, timeout, cb}) {
      if (type === VueNotifications.types.warn) type = 'show'
      return Vue.toasted[type](message, {duration: timeout})
    },
    [UI_LIBS.VueEasyToast] ({title, message, type, timeout, cb}) {
      let className = 'et-info'
      if (type === VueNotifications.types.warn) className = 'et-warn'
      else if (type === VueNotifications.types.error) className = 'et-alert'

      return Vue.toast(message, {duration: timeout, className})
    },
    [UI_LIBS.toastr] ({title, message, type, timeout, cb}) {
      // this shit requires jquery, lol
      if (type === VueNotifications.types.warn) type = 'warning'
      return toastr[type](message, title, {timeOut: timeout})
    },
    [UI_LIBS.iziToast] ({title, message, type, timeout, cb}) {
      if (type === VueNotifications.types.warn) type = 'warning'
      return iziToast[type]({title, message, timeout})
    },
    [UI_LIBS.Noty] ({title, message, type, timeout, cb}) {
      if (type === VueNotifications.types.warn) type = 'warning'

      return new Noty({text: message, timeout, type}).show()
    },
    [UI_LIBS.swal] ({title, message, type, timeout, cb}) {
      if (type === VueNotifications.types.warn) type = 'warning'
      return swal(title, message, type)
    }
  }

  Vue.use(VueEasyToast)
  Vue.use(VueToasted)
  //  Vue.use(VueNotifications, options)
  Vue.use(VueHighlightJS)

  export default {
    name: 'showcase',
    data () {
      return {
        ExampleFuncSetup: ExampleFuncSetup,
        libs: UI_LIBS,
        currentLib: UI_LIBS.VueEasyToast
      }
    },
//    init () {
//      console.info(12312)
//    },
    notifications: {
      showSuccessMsg: {
        type: VueNotifications.types.success,
        title: 'Hello there',
        message: 'That\'s the success!'
      },
      showInfoMsg: {
        type: VueNotifications.types.info,
        title: 'Hey you',
        message: 'Here is some info for you'
      },
      showWarnMsg: {
        type: VueNotifications.types.warn,
        title: 'Wow, man',
        message: 'That\'s the kind of warning'
      },
      showErrorMsg: {
        type: VueNotifications.types.error,
        title: 'Wow-wow',
        message: 'That\'s the error'
      }
    },
    methods: {
      setCurrentLib (lib) {
        this.currentLib = lib

        const options = {
          success: TOASTS[this.currentLib],
          error: TOASTS[this.currentLib],
          info: TOASTS[this.currentLib],
          warn: TOASTS[this.currentLib]
        }

        console.dir(this)
        VueNotifications.setPluginOptions(options)
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
