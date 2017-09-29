<template>
  <div class="showcase-page">

    <section class="hello">
      <h1>Showcase</h1>
      <img src="../assets/logo.png">
      <h2><a href="https://vuejs.org">vue.js</a> agnostic non-blocking notifications library</h2>
      <p>
        VueNotifications connects your app with notification UI library. <br />
        That's also means you can have any look and feel of notifications you want to! <br />
        And it would be easy to replace it =)
      </p>
    </section>

    <section class="showcase">
      <ol class="showcase__list">
        <li class="showcase__item">
          <h3 class="showcase__header">Setup VueNotifications</h3>
          <div class="code-samples__sample -func">
            <pre v-highlightjs="ExampleSetup[currentLib]">
              <code class="javascript"></code>
            </pre>
          </div>
        </li>
        <li>
          <h3 class="showcase__header">Define your notifications</h3>
          <pre v-highlightjs="ExampleConfig.config">
            <code class="javascript"></code>
          </pre>
        </li>
        <li class="showcase__item">
          <h3 class="showcase__header">Try it live</h3>
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
          <ul class="showcase-lib">
            <li v-for="(value, key) in libs"
                class="showcase-lib__item"
                @change="setCurrentLib(key)">
              <label>
                <input type="radio" v-model="checked" :value="key" name="lib"/>
                <span v-text="value"></span>
              </label>

            </li>
          </ul>
        </li>
      </ol>
    </section>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNotifications from 'vue-notifications'
  import VueHighlightJS from 'vue-highlightjs'
  import 'highlight.js/styles/atom-one-light.css'
  import ExampleSetup from '../misc/example_setup'
  import ExampleConfig from '../misc/example_config'

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
        ExampleSetup: ExampleSetup,
        ExampleConfig: ExampleConfig,
        libs: UI_LIBS,
        currentLib: UI_LIBS.VueEasyToast,
        checked: ''
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
      setCurrentLib (libKey) {
        this.currentLib = libKey
        this.checked = libKey

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

  h1, h2, h3
    font-weight normal

  a
    color #42b983

  .hello
    text-align center

  ul
    padding 0
    list-style-type none

  .msg-buttons
    list-style-type none
    padding 0
    margin 10px
    &__btn
      display inline-block
      margin 5px 10px
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

  .showcase
    &__list
      justify-content space-around
      flex-direction row
      display flex
    &showcase__item
      flex-basis: 350px
      background-color #fafafa
</style>
