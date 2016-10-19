'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const main = require('../../src/main')
const privateMethods = main.default._private
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

// beforeEach(() => {
//
// })

describe('Main.', () => {

  describe('Check Private Methods.', () => {

    it('addProtoMethods.', () => {

      const targetObj = {}

      const typesObj = {
        typeOne: 'typeOne',
        typeTwo: 'typeTwo'
      }

      expect(Object.keys(targetObj).length).to.be.equal(0)
      const result = privateMethods.addProtoMethods(targetObj, typesObj)
      expect(result).to.be.undefined
      expect(Object.keys(targetObj).length).to.be.equal(Object.keys(typesObj).length)
      expect(targetObj[typesObj.typeOne]).to.be.a('function')
      expect(targetObj[typesObj.typeTwo]).to.be.a('function')

    })

    it('getVersion.', () => {

      const vue = {
        version: '1.0.12'
      }

      const result = privateMethods.getVersion(vue)
      expect(result).to.be.a('object')
      expect(result.major).to.be.equal(1)
      expect(result.regular).to.be.equal(0)
      expect(result.minor).to.be.equal(12)
    })

    describe('showDefaultMessages.', () => {
      const config = {}

      beforeEach( () => {
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
        const result = privateMethods.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.not.be.called
      })

      it('Info type to console.', () => {

        config.type = 'info'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = privateMethods.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.not.be.called
      })

      it('Error type to console.', () => {

        config.type = 'error'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = privateMethods.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.not.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.be.called
        expect(console.info).to.not.be.called
      })

      it('Success type to console.', () => {

        config.type = 'success'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = privateMethods.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.not.be.called
        expect(console.warn).to.not.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.be.called
      })

      it('Warn type to console.', () => {

        config.type = 'warn'

        const expectedMsg = `Title: ${config.title}, Message: ${config.message}, DebugMsg: ${config.debugMsg}, type: ${config.type}`
        const result = privateMethods.showDefaultMessage(config)
        expect(result).to.be.equal(expectedMsg)
        expect(console.log).to.not.be.called
        expect(console.warn).to.be.called
        expect(console.error).to.not.be.called
        expect(console.info).to.not.be.called
      })

    })


  })

})