const prompts = require('prompts')

module.exports = class Battle {
  constructor ({
    players
  }) {
    this.players = players
    this.winner = null
    this.attackingPlayer = this.players[0]
    this.defendingPlayer = this.players[1]
    this.winner = null
  }

  togglePlayer() {
    const newAttackingPlayer = this.defendingPlayer
    const newDefendingPlayer = this.attackingPlayer
    this.attackingPlayer = newAttackingPlayer
    this.defendingPlayer = newDefendingPlayer
  }

  async setupBattle() {
    for (const player of this.players) {
      const response = await prompts({
        type: 'select',
        name: 'chosenPokemon',
        message: `${player.name}, please select your pokemon`,
        choices: player.caughtPokemon.map(pokemon => {
          return {
            title: pokemon.name,
            value: pokemon
          }
        })
      })
      player.chosenPokemon = response.chosenPokemon

      console.log(`${player.name} chose ${player.chosenPokemon.name}`)
    }
  }

  async takeTurn() {
    console.log(`${this.attackingPlayer.name.toUpperCase()}'s TURN`)
    const response = await prompts({
      type: 'select',
      name: 'shouldAttack',
      message: `Should ${this.attackingPlayer.chosenPokemon.name} attack?`,
      choices: [{
        title: 'Yes',
        value: true
      },{
        title: 'No',
        value: false
      }]
    })
    if (response.shouldAttack) {
      this.attackingPlayer.chosenPokemon.attack(this.defendingPlayer.chosenPokemon)
      if (this.defendingPlayer.chosenPokemon.hp <= 0) {
        this.winner = this.attackingPlayer
        console.log(`${this.defendingPlayer.name}'s ${this.defendingPlayer.chosenPokemon.name} fainted. ${this.winner.name} is the winner!`)
      } else {
        console.log(
          `${this.attackingPlayer.name}'s ${this.attackingPlayer.chosenPokemon.name} hit ${this.defendingPlayer.name}'s ${this.defendingPlayer.chosenPokemon.name}.`,
          `${this.defendingPlayer.name}'s ${this.defendingPlayer.chosenPokemon.name}'s HP is now ${this.defendingPlayer.chosenPokemon.hp}`
        )
      }
    } else {
      this.winner = this.defendingPlayer
      console.log(`${this.attackingPlayer.name} became a pacifist. ${this.winner.name} is the winner by default!`)
    }
    this.togglePlayer()
  }
}