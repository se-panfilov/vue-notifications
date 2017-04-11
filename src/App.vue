<template>
  <div id="app">
    <section>
      <h5>Predefined messages</h5>
      <button type="button" @click="errorMsg()">Error</button>
      <button type="button" @click="warnMsg()">Warning</button>
      <button type="button" @click="infoMsg()">Info</button>
      <button type="button" @click="successMsg()">Success</button>
    </section>

    <section>
      <h5>Dynamic messages</h5>
      <label> Title:
        <input type="text" v-model="title">
      </label>
      <label> Message:
        <textarea v-model="msg"></textarea>
      </label>
      <div>
        <div v-for="t in types">
          <label>
            <input type="radio" name="type" :value="t" v-model="type"/>
            <span v-text="t"></span>
          </label>
        </div>
      </div>
      <div>
        <button type="button" @click="dynamicMsg()">Success</button>
      </div>
    </section>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        switchVal: true,
        types: [
          'error',
          'warn',
          'info',
          'success',
        ],
        title: 'Your title',
        msg: 'Your message',
        type: 'error'
      }
    },
    created () {
      this.errorMsg()
      this.warnMsg()
      this.infoMsg()
      this.successMsg()
    },
    methods: {
      switchLinkedVal () {
        this.switchVal = !this.switchVal
//        console.info(this.switchVal)
      }
    },
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
      dynamicMsg: {
        type () {
          return this.type
        },
        title () {
          return this.title
        },
        message () {
          return this.msg
        }
      }
    }
  }
</script>

<style>

  .base_msg {
    display: block;
    min-height: 20px;
    background-color: #0b97c4;
  }

  .-in_class {
    background-color: red;
  }

  .-out_class {
    background-color: green;
  }
</style>