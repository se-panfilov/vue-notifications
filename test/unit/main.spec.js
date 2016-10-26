'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const main = require('../../src/main')
console.info('========')
console.log(Object.keys(main))
console.info('========')
const _private = main.default._private
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

describe('Main.', () => {

  describe('Check Private Methods.', () => {

    it('addMethods.', () => {

      const targetObj = {}

      const typesObj = {
        typeOne: 'typeOne',
        typeTwo: 'typeTwo'
      }

      expect(Object.keys(targetObj).length).to.be.equal(0)
      const result = _private.addMethods(targetObj, typesObj)
      expect(result).to.be.undefined
      expect(Object.keys(targetObj).length).to.be.equal(Object.keys(typesObj).length)
      expect(targetObj[typesObj.typeOne]).to.be.a('function')
      expect(targetObj[typesObj.typeTwo]).to.be.a('function')

    })

    it('getVersion.', () => {

      const vue = {
        version: '1.0.12'
      }

      const result = _private.getVersion(vue)
      expect(result).to.be.a('object')
      expect(result.major).to.be.equal(1)
      expect(result.regular).to.be.equal(0)
      expect(result.minor).to.be.equal(12)
    })

    describe('showDefaultMessages.', () => {
      const config = {}

      beforeEach(() => {
        config.message = 'somemessage'
        config.title = 'sometitle'
        config.debugMsg = 'somedebugmsg'
        config.type = null

        sinon.spy(console, 'log')
        sinon.spy(console, 'error')
        sinon.spy(console, 'warn')
        sinon.spy(console, 'info')
      })

      afterEach(() => {
        console.log.restore()
        console.error.restore()
        console.warn.restore()
        console.info.restore()
      })

      it('Random type to console.', () => {

        config.type = 'sometype'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = _private.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.not.be.called
      })

      it('Info type to console.', () => {

        config.type = 'info'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = _private.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.not.be.called
      })

      it('Error type to console.', () => {

        config.type = 'error'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = _private.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.not.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.be.called
        expect(console.info).to.not.be.called
      })

      it('Success type to console.', () => {

        config.type = 'success'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = _private.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.not.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.be.called
      })

      it('Warn type to console.', () => {

        config.type = 'warn'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = _private.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.not.be.called
        expect(console.warn).to.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.not.be.called
      })

    })

    describe('showMessage.', () => {

      it('Config\'s function.', () => {

        const config = {
          type: 'error'
        }

        const options = {
          error: function origin () {
          }
        }

        sinon.spy(options, 'error')

        const result = _private.showMessage(config, options)
        expect(result).to.be.undefined
        expect(options.error).to.be.called

        options.error.restore()
      })

      // it('Default function.', () => {
      //
      //   const config = {
      //     type: 'error'
      //   }
      //
      //   const options = {
      //     error: null
      //   }
      //
      //   sinon.spy(_private, 'showDefaultMessage')
      //
      //   const result = _private.showMessage(config, options)
      //   expect(result).to.be.undefined
      //   expect(_private.showDefaultMessage).to.be.called
      //
      //   _private.showDefaultMessage.restore()
      // })

      it('Callback showMessage.', () => {

        const config = {
          cb: function () {
            return true
          }
        }

        const result = _private.showMessage(config)
        expect(result).to.be.true

      })

    })

    describe('showMessage.', () => {

      it('method already exist.', () => {
        const name = 'someName'
        const options = {
          methods: {
            someName: function () {
            }
          }
        }
        const pluginOptions = {}

        const expectedMsg = _private.MESSAGES.methodNameConflict + name
        sinon.spy(console, 'error')

        _private.setMethod(name, options, pluginOptions)
        expect(console.error).to.be.calledWith(expectedMsg)

        console.error.restore()
      })

      it('method not exist.', () => {
        const name = 'someName'
        const options = {
          methods: {
          }
        }
        const pluginOptions = {}

        const expectedMsg = _private.MESSAGES.methodNameConflict + name
        sinon.spy(console, 'error')
        sinon.spy(_private, 'makeMethod')

        _private.setMethod(name, options, pluginOptions)
        expect(console.error).to.not.be.called
        expect(_private.makeMethod).to.not.be.calledWith(name, options, pluginOptions)

        console.error.restore()
        _private.makeMethod.restore()
      })

    })

    describe('makeMethod.', () => {

      it('happy path.', () => {
        const configName = 'someName'

        const config = {
          val2: 'val2'
        }

        const options = {
          [main.default.propertyName]: {
            [configName]: {
              val1: 'val1'
            }
          }
        }

        const pluginOptions = {}

        const VueNotificationsConfig = main.default.config
        const optionsConfig = options[main.default.propertyName][configName]

        const expectedObj = {}
        Object.assign(expectedObj, VueNotificationsConfig)
        Object.assign(expectedObj, optionsConfig)
        Object.assign(expectedObj, config)

        sinon.spy(_private, 'showMessage')

        const result = _private.makeMethod(configName, options, pluginOptions)
        expect(result).to.be.a('function')
        result(config)
        // TODO (S.Panfilov) fix this test
        // expect(_private.showMessage).to.be.calledWith(expectedObj, pluginOptions)

        _private.showMessage.restore()
      })


    })

  })

})