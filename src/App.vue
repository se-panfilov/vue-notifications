<template>
  <div id="app">
    <section>
      <h5>Predefined messages</h5>
      <button type="button" @click="errorMsg()">Error</button>
      <button type="button" @click="warnMsg()">Warning</button>
      <button type="button" @click="infoMsg()">Info</button>
      <button type="button" @click="successMsg()">Success</button>
      <button type="button" @click="inlineMsg()">Inline message</button>
      <button type="button" @click="inlineAndComputedMsg()">Inline and computed message</button>
    </section>

    <section>

      <button type="button" @click="switchLinkedVal()">Switch for computed</button>

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

    <div id="msg_elem"></div>
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
        console.info(this.switchVal)
      }
    },
//    computed: {
//      someVal () {
//        console.info(this.switchVal)
//        return this.switchVal
//      }
//    },
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
      inlineMsg: {
        id: 'msg_elem',
        type: 'success',
        title: 'Success title',
        message: 'Some success msg',
        cb (elem, clearFn) {
//          console.info(elem)
//          console.info(clearFn)
          setTimeout(() => clearFn(), 2000)

        }
      },
      inlineAndComputedMsg: {
        id: 'msg_elem',
        type: 'success',
        title: 'Success title',
        message: 'Some success msg',
        computed () {
          console.info(this.switchVal)
          return this.switchVal
        },
        cb (elem, clearFn) {
          console.log('==switchVal')
          console.info(this)
          console.info(this.switchVal)
          console.log('switchVal==')
          console.info(elem)
          console.info(clearFn)
          setTimeout(() => clearFn(), 2000)
        }
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
