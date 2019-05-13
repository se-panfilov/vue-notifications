<template>
  <section class="header">
    <a href="https://se-panfilov.github.io/vue-notifications/" class="header__logo">
      <img src="../assets/logo.png">
      <span>VueNotifications</span>
    </a>
    <ul class="nav">
      <li class="nav__item">
        <a href="https://se-panfilov.github.io/vue-notifications/docs/html/index.html" title="Docs">
          <i class="fa fa-book" aria-hidden="true"></i>
          Documentation
        </a>
      </li>
      <li class="nav__item">
        <a href="https://github.com/se-panfilov/vue-notifications" title="source code">
          <i class="fa fa-github" aria-hidden="true"></i>
          GitHub
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
  .header
    background-color #fff
    height 40px
    padding 10px 60px
    z-index 2
    position fixed
    width 100%
    top 0
    &__logo
      display inline-block
      font-size 1.5em
      line-height 40px
      color #2c3e50
      font-weight 500
      text-decoration none
      cursor auto
      img
        vertical-align middle
        margin-right 6px
        width 40px
        height 40px
        border none

  .nav
    position fixed
    list-style-type none
    margin 0
    padding 0
    right 30px
    top 10px
    height 40px
    line-height 40px
    &__item
      display inline-block
      position relative
      margin 0 0.6em
      a
        padding 3px
        text-decoration none
        color #34495e
</style>
