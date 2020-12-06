const prompts = require('prompts')
const Battle = require('./battle.class')
const Pokemon = require('./pokemon.class')
const Player = require('./player.class')

// data used to create a new instance of each pokemon
const POKEMON_DATA = {
  charmander: {
    name: 'Charmander',
    type: 'fire',
    attackPower: 30
  },
  squirtle: {
    name: 'Squirtle',
    type: 'water',
    attackPower: 35
  },
  bulbasaur: {
    name: 'Bulbasaur',
    type: 'grass',
    attackPower: 32
  }
}

async function setupPlayer(){
  const responses = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'select',
      name: 'chosenPokemon',
      message: 'Which pokemon would you like to catch?',
      choices: [
        {
          title: 'Charmander',
          value: POKEMON_DATA.charmander
        },
        {
          title: 'Squirtle',
          value: POKEMON_DATA.squirtle
        },
        {
          title: 'Bulbasaur',
          value: POKEMON_DATA.bulbasaur
        },
      ]
    }
  ])

  const player = new Player({
    name: responses.name
  })
  const pokemon = new Pokemon(responses.chosenPokemon)
  player.catchPokemon(pokemon)
  return player
}

async function main(){
  console.log('PLAYER ONE')
  const playerOne = await setupPlayer()
  console.log('PLAYER TWO')
  const playerTwo = await setupPlayer()
  console.log('START BATTLE')
  const battle = new Battle({
    players: [
      playerOne,
      playerTwo
    ]
  })
  await battle.setupBattle()
  while(!battle.winner) {
    await battle.takeTurn()
  }
  console.log('GAME OVER')
}

main()
