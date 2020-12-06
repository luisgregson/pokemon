/**
 * {
 *   attackingPokemonType: {
 *     defednginPokemonType: damageModifier
 *   }
 * }
 */
const DAMAGE_TYPE_MODIFIER = {
  fire: {
    fire: 1,
    water: 0.75,
    grass: 1.25,
  },
  water: {
    fire: 1.25,
    water: 1,
    grass: 0.75,
  },
  grass: {
    fire: 0.75,
    water: 1.25,
    grass: 1,
  },
}

module.exports = class Pokemon {
  constructor({
    name,
    type,
    attackPower
  }) {
    this.name = name
    this.type = type
    this.attackPower = attackPower
    this.hp = 100
  }

  receiveDamage (damageAmount) {
    this.hp -= damageAmount
  }

  attack (defendingPokemon) {
    const typeModifiedDamageAmount = this.attackPower * DAMAGE_TYPE_MODIFIER[this.type][defendingPokemon.type]
    defendingPokemon.receiveDamage(typeModifiedDamageAmount)
  }
}