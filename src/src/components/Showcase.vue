<template>
  <div class="showcase-page">

    <section class="overview">
      <img src="../assets/logo.png">
      <h2><a href="https://vuejs.org">vue.js</a> agnostic library for non-blocking notifications</h2>
      <p>
        <span class="highlighted-text">VueNotifications</span> connects your app with notification UI library. <br />
        That's also means you can have any look and feel of notifications you want to! <br />
        And it would be easy to replace it =)
      </p>
    </section>

    <hr />

    <h2>Showcase: See it in action</h2>
    <div>
      <span>You have to do 3 things</span>
      <ol>
        <li>Config <span class="highlighted-text">VueNotifications</span> to work with third-party lib you want (you may
          try this one: <a
            href="https://github.com/se-panfilov/mini-toastr">mini-toastr</a>)
        </li>
        <li>Add notifications to any component at your choice</li>
        <li>Enjoy!</li>
      </ol>

      <span>Examples below</span>
    </div>

    <section class="showcase">

      <section class="showcase__entry -try-live">
        <h3 class="showcase__header">Try it live</h3>
        <p>We have 4 predefined types of messages:
          <span class="highlighted-text">error</span>,
          <span class="highlighted-text">success</span>,
          <span class="highlighted-text">warn</span> and
          <span class="highlighted-text">info</span>,
          but you can specify your owns</p>

        <section class="showcase__actions">
          <ul class="showcase__actions-item msg-buttons">
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -success" @click="showSuccessMsg()">Success</button>
            </li>
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -info" @click="showInfoMsg()">Info</button>
            </li>
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -warn" @click="showWarnMsg()">Warning</button>
            </li>
            <li class="msg-buttons__list-item">
              <button type="button" class="msg-buttons__btn -error" @click="showErrorMsg()">Error</button>
            </li>
          </ul>

          <ul class="showcase__actions-item showcase-lib">
            <li v-for="(value, key) in libs"
                class="showcase-lib__items"
                @change="setCurrentLib(key)">
              <label>
                <input type="radio" :checked="currentLib === value" :value="key" name="lib" />
                <span v-text="value"></span>
                <span class="showcase-lib__third-party-home-ling">
                  <a v-bind:href="ExampleSetup[key].home" v-bind:title="'go to ' + value + ' home'" target="_blank">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </a>
                </span>
              </label>

            </li>
          </ul>
        </section>

        <p>You can easily replace any <span class="highlighted-text">UI third-party</span> that draws notifications for
          you. And here you can switch between
          any of them easily.
          <br /><br /> <strong>P.S.</strong> Pay attention: Initial config will be changed.<br />
          But Notification definition will be the same.</p>
      </section>

      <section class="showcase__entry -setup">
        <h3 class="showcase__header">Config VueNotifications</h3>
        <div class="code-samples__sample -func">
          <pre id="toast_func">
            <code class="javascript" v-text="ExampleSetup[currentLib].code"></code>
          </pre>
        </div>
      </section>

      <section class="showcase__entry -definition">
        <h3 class="showcase__header">Define your notifications</h3>
        <pre>
          <code class="javascript" v-text="ExampleConfig.config"></code>
        </pre>
      </section>

    </section>

    <hr />

    <section class="getting-started">
      <h1>Getting started</h1>

      <ol>
        <li>
          <h3>Install</h3>
          <pre>
            <code class="shell">npm i vue-notifications --save</code>
          </pre>
          <p>check the documentation for other options:
            <a href="https://se-panfilov.github.io/vue-notifications/docs/html/installation.html">Installation</a></p>

          <p>
            And install UI third-party library, for example <a href="https://github.com/se-panfilov/mini-toastr">miniToastr</a>
            (<span class="highlighted-text">npm i mini-toastr --save</span>).
          </p>
          <p>But you are free to use any other, like the libs above (VueToasted, iziToast, etc).</p>
        </li>
        <li>
          <h3>Setup & config</h3>
          <p>Check the one of examples above (in "Showcase" section), or check the docs:
            <a href="https://se-panfilov.github.io/vue-notifications/docs/html/getting-started.html">Getting Started</a>
          </p>
          <p>It's gonna be something like this:</p>
          <pre>
            <code class="javascript" v-text="ExampleSetup.miniToastr.code"></code>
          </pre>
        </li>
        <li>
          <h3>Add actual notifications to any component:</h3>
          <pre>
            <code class="javascript" v-text="ExampleConfig.config"></code>
          </pre>
          <p>Now you can call any of this configs like a common vue method: via <span
            class="highlighted-text">this</span>, like
            <span class="highlighted-text">this.showSuccessMsg()</span>, <span class="highlighted-text">this.showInfoMsg()</span>
            and etc.
            Don't forget that you can override them, like <span class="highlighted-text">this.showWarnMsg({message:
              'Brand new message'})</span>
          </p>
          <p>Check the docs for more info: <a
            href="https://se-panfilov.github.io/vue-notifications/docs/html/usage.html">Usage</a></p>
        </li>
      </ol>

    </section>

    <hr />

    <section class="misc">
      <a class="misc__item" href="https://github.com/se-panfilov/vue-notifications">
        <i class="fa fa-github" aria-hidden="true"></i>
        Source code
      </a> |
      <a class="misc__item" href="https://se-panfilov.github.io/vue-notifications/docs/html/index.html">
        <i class="fa fa-book" aria-hidden="true"></i>
        Docs
      </a> |
      <a class="misc__item" href="https://github.com/se-panfilov/vue-notifications/tree/master/examples">
        <i class="fa fa-free-code-camp" aria-hidden="true"></i>
        Examples
      </a> |
      <a class="misc__item" href="https://github.com/se-panfilov/vue-notifications/blob/master/LICENSE">
        <i class="fa fa-balance-scale" aria-hidden="true"></i>
        MIT Licence
      </a>
      <br />
      <a class="misc__item" href="https://github.com/se-panfilov/vue-notifications/releases">
        <i class="fa fa-rocket" aria-hidden="true"></i>
        Release notes
      </a> |
      <a class="misc__item" href="https://se-panfilov.github.io/vue-notifications/docs/html/browsers-support.html">
        <i class="fa fa-search" aria-hidden="true"></i>
        Browsers support
      </a> |
      <a class="misc__item" href="https://se-panfilov.github.io/vue-notifications/docs/html/vuejs-versions-support.html">Vue.js versions
        support</a> |
      <a class="misc__item" href="https://github.com/se-panfilov/vue-notifications/issues">
        <i class="fa fa-bolt" aria-hidden="true"></i>
        Issues
      </a>
      <br />
      Author: <a href="https://se-panfilov.github.io/">
      <i class="fa fa-globe" aria-hidden="true"></i>
      Sergei Panfilov</a> |
      Email: <a href="mailto:se-panfilov@ya.ru">
      <i class="fa fa-envelope-o" aria-hidden="true"></i> se-panfilov@ya.ru
    </a>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNotifications from 'vue-notifications'
  import HighlightJS from 'highlight.js/lib/highlight'
  import JsLang from 'highlight.js/lib/languages/javascript'
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

  HighlightJS.registerLanguage('javascript', JsLang)
  HighlightJS.initHighlightingOnLoad()

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

  export default {
    name: 'showcase',
    data () {
      return {
        ExampleSetup: ExampleSetup,
        ExampleConfig: ExampleConfig,
        libs: UI_LIBS,
        currentLib: UI_LIBS.miniToastr,
        checked: ''
      }
    },
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

        HighlightJS.highlightBlock(document.getElementById('toast_func'))
        VueNotifications.setPluginOptions(options)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  primary_color = #41b883

  .showcase-page
    padding 15px

  hr
    border-color #bfbfbf
    border-style dashed

  h1, h2, h3
    font-weight normal

  a
    color #42b983

  .overview
    text-align center

  ul
    padding 0
    list-style-type none

  .highlighted-text
    background-color #f1f1ed
    border 1px dotted #d0d0d0
    padding 0 3px
    border-radius 2px

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
      min-width 85px
      &:hover
        background-color lighten(primary_color, 5)

  .showcase
    justify-content space-around
    flex-direction row
    display flex
    &__entry
      flex-basis: 350px
      background-color #fafafa
      min-width 1px
      flex-grow 1
      &.-try-live
        flex-basis: 280px
      &.-setup
        flex-basis: 350px
        flex-grow 2
      &.-definition
        flex-basis: 300px
        flex-grow 1.2
    &__actions-item
      display inline-block
      max-width 50%

  .showcase-lib
    &__third-party-home-ling
      font-size 14px

  .misc
    text-align center
    padding 15px 25%
    font-size 14px
    &__item
      text-decoration none
      padding 5px
</style>
