const assert = require('assert');
const { expect } = require('chai')
const Player = require('../src/player.class')

let player
describe('Player class', function () {
  beforeEach(function(){
    player = new Player({
      name: 'Luis'
    })
  })
  describe('constructor', function () {
    it('should set the name', function () {
      expect(player.name).to.equal('Luis')
    })
    it('should set caughtPokemon to an empty array by default', function () {
      expect(player.caughtPokemon).to.be.a('array')
      expect(player.caughtPokemon).to.have.lengthOf(0)
    })
  })
  describe('#catchPokemon', function(){
    it(`should increas the number of caught pokemon by one`, function(){
      const pokemon = 'Charmander'
      player.catchPokemon(pokemon)
      expect(player.caughtPokemon).to.have.lengthOf(1)
    })
    it(`should add the given pokemon to the player's caught pokemon`, function(){
      const pokemon = 'Charmander'
      player.catchPokemon(pokemon)
      expect(player.caughtPokemon[0]).to.equal(pokemon)
    })
    it(`should retain any previously caught pokemon`, function(){
      const pokemonOne = 'Charmander'
      const pokemonTwo = 'Bulbasaur'
      player.catchPokemon(pokemonOne)
      player.catchPokemon(pokemonTwo)
      expect(player.caughtPokemon[0]).to.equal(pokemonOne)
    })
  })
})