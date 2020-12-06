module.exports = class Player {
  constructor ({
    name
  }) {
    this.name = name
    this.caughtPokemon = []
  }

  catchPokemon(pokemon) {
    this.caughtPokemon.push(pokemon)
  }
}