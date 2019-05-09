<template>
  <div id="app">
    <header-menu></header-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeaderMenu from './components/HeaderMenu'

  export default {
    name: 'app',
    components: {
      HeaderMenu
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    margin-top 60px
</style>
