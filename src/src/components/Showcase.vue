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
  </div>
</template>

<script>
  import VueNotifications from 'vue-notifications'

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
