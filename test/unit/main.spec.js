'use strict'

const expect = require('chai').expect
const main = require('../../src/main')
const privateMethods = main.default._private

beforeEach(() => {

})

describe('Main.', () => {

  describe('Check Private Methods.', () => {

    it('addProtoMethods.', () => {

      const typesObj = {
        typeOne: 'typeOne',
        typeTwo: 'typeTwo'
      }

      // TODO (S.Panfilov) mock VueNotifications here
      const result = privateMethods.addProtoMethods(typesObj)
      expect(result).to.be.undefined //ask question
    })

  })

})