export interface Pokemon {
  name: string
  url: string
  sprite?: string
}

export interface Sprites {
  // eslint-disable-next-line camelcase
  front_default?: string
  // eslint-disable-next-line camelcase
  front_shiny?: string
  // eslint-disable-next-line camelcase
  back_default?: string
  // eslint-disable-next-line camelcase
  back_shiny?: string
}

export interface PokemonType {
  type: {
    name: string
    url?: string
  }
}

export interface PokeDetails {
  name: string
  id: number
  sprites?: Sprites
  types: PokemonType[]
  weight: number
  height: number
}
