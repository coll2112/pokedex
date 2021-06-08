export interface Pokemon {
  name: string
  id: number
  sprites: {
    front: string
    back: string
  }
}

export interface Sprites {
  // eslint-disable-next-line camelcase
  front_default: string
  // eslint-disable-next-line camelcase
  front_shiny?: string
  // eslint-disable-next-line camelcase
  back_default?: string
  // eslint-disable-next-line camelcase
  back_shiny?: string
}

export interface Types {
  type: {
    name: string
  }
}

export interface PokeDetails {
  name: string
  id: number
  sprites: Sprites
  types: Types[]
  weight: number
  height: number
}

export interface InitState {
  data: Pokemon[]
  isValidating: boolean
  error: {
    errorMessage: string
    status: string
  }
  setPaginationPage: (currentPage: number, itemsPerPage: number) => void
  currentPage: number
  currentItems: Pokemon[]
}
