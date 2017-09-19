<template>
  <div class="hello">
    <h1>Vue-Notifications</h1>
    <img src="../assets/logo.png">
    <h2><a href="https://vuejs.org">vue.js</a> agnostic non-blocking notifications library</h2>
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
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
  </div>
</template>

<script>
  import VueNotifications from '../../../vue-notifications/src/main'

  export default {
    name: 'hello',
    data () {
      return {}
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" type="text/stylus" scoped>
  primary_color = #41b883

  h1, h2
    font-weight normal
    margin 0

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983

  .msg-buttons
    &__btn
      color white
      font-size 14px
      background-color primary_color
      border-radius 3px
      padding 5px 10px
      border 1px solid transparent
      transition background .4s ease
      &:hover
        background-color lighten(primary_color, 5)
</style>
