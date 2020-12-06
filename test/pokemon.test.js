const assert = require('assert');
const { expect } = require('chai')
const { stub, spy } = require('sinon')
const Pokemon = require('../src/pokemon.class')

let charmander
let squirtle
let bulbasaur
const charmanderConfig = {
  name: 'Charmander',
  type: 'fire',
  attackPower: 45
}
const squirtleConfig = {
  name: 'Squirtle',
  type: 'water',
  attackPower: 50
}
const bulbasaurConfig = {
  name: 'Bulbasaur',
  type: 'grass',
  attackPower: 55
}
describe.only('Pokemon class', function () {
  beforeEach(function(){
    charmander = new Pokemon(charmanderConfig)
    squirtle = new Pokemon(squirtleConfig)
    bulbasaur = new Pokemon(bulbasaurConfig)
  })
  describe('constructor', function () {
    it('should set the name', function () {
      expect(charmander.name).to.equal(charmanderConfig.name)
    })
    it('should set the type', function () {
      expect(charmander.type).to.equal(charmanderConfig.type)
    })
    it('should set the attackPower', function () {
      expect(charmander.attackPower).to.equal(charmanderConfig.attackPower)
    })
    it('should set the hp to 100', function () {
      expect(charmander.hp).to.equal(100)
    })
  })

  describe('#receiveDamage', function(){
    it(`should reduce the pokemon's hp by the given amount`, function(){
      const startingHP = charmander.hp
      const damageAmount = 50
      charmander.receiveDamage(damageAmount)
      expect(charmander.hp).to.equal(startingHP - damageAmount)
    })
    it(`should accumulate if damage is applied multiple times`, function(){
      const startingHP = charmander.hp
      const damageAmount = 10
      charmander.receiveDamage(damageAmount)
      charmander.receiveDamage(damageAmount)
      expect(charmander.hp).to.equal(startingHP - (damageAmount * 2))
    })
  })

  describe('#calculateTypeAdjustedAttackPower', function(){
    describe('fire', function(){
      it('should multiply by 1 when attacking a fire type', function(){
        const typeAdjustedAttackPower = charmander.calculateTypeAdjustedAttackPower('fire')
        expect(typeAdjustedAttackPower).to.equal(charmander.attackPower)
      })
      it('should multiply by 0.75 when attacking a water type', function(){
        const typeAdjustedAttackPower = charmander.calculateTypeAdjustedAttackPower('water')
        expect(typeAdjustedAttackPower).to.equal(charmander.attackPower * 0.75)
      })
      it('should multiply by 1.25 when attacking a grass type', function(){
        const typeAdjustedAttackPower = charmander.calculateTypeAdjustedAttackPower('grass')
        expect(typeAdjustedAttackPower).to.equal(charmander.attackPower * 1.25)
      })
    })
    describe('water', function(){
      it('should multiply by 1 when attacking a water type', function(){
        const typeAdjustedAttackPower = squirtle.calculateTypeAdjustedAttackPower('water')
        expect(typeAdjustedAttackPower).to.equal(squirtle.attackPower)
      })
      it('should multiply by 0.75 when attacking a grass type', function(){
        const typeAdjustedAttackPower = squirtle.calculateTypeAdjustedAttackPower('grass')
        expect(typeAdjustedAttackPower).to.equal(squirtle.attackPower * 0.75)
      })
      it('should multiply by 1.25 when attacking a fire type', function(){
        const typeAdjustedAttackPower = squirtle.calculateTypeAdjustedAttackPower('fire')
        expect(typeAdjustedAttackPower).to.equal(squirtle.attackPower * 1.25)
      })
    })
    describe('grass', function(){
      it('should multiply by 1 when attacking a grass type', function(){
        const typeAdjustedAttackPower = bulbasaur.calculateTypeAdjustedAttackPower('grass')
        expect(typeAdjustedAttackPower).to.equal(bulbasaur.attackPower)
      })
      it('should multiply by 0.75 when attacking a fire type', function(){
        const typeAdjustedAttackPower = bulbasaur.calculateTypeAdjustedAttackPower('fire')
        expect(typeAdjustedAttackPower).to.equal(bulbasaur.attackPower * 0.75)
      })
      it('should multiply by 1.25 when attacking a water type', function(){
        const typeAdjustedAttackPower = bulbasaur.calculateTypeAdjustedAttackPower('water')
        expect(typeAdjustedAttackPower).to.equal(bulbasaur.attackPower * 1.25)
      })
    })
  })

  describe('#attack()', function(){
    beforeEach(function(){
      // spy on and override the calculateTypeAdjustedAttackPower method to return 15
      stub(charmander, 'calculateTypeAdjustedAttackPower').returns(15)
      spy(squirtle, 'receiveDamage')
      charmander.attack(squirtle)
    })
    it(`should adjust the attack power using the defending pokemon's type`, function(){
      assert(charmander.calculateTypeAdjustedAttackPower.calledWith(squirtle.type))
    })
    it(`should trigger the defending pokemon to reveive damage`, function(){
      assert(squirtle.receiveDamage.calledWith(15))
    })
  })
})