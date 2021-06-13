import { InitState, Pokemon } from '~interfaces/pokemon'

export const mockPokemon: Pokemon = {
  name: 'name',
  id: 0,
  sprites: {
    front: 'front',
    back: 'back'
  }
}

export const initState: InitState = {
  data: [
    {
      name: '',
      id: 0,
      sprites: {
        front: '',
        back: ''
      }
    }
  ],
  isValidating: true,
  error: {
    errorMessage: '',
    status: ''
  },
  setPaginationPage: () => null,
  currentPage: 0,
  currentItems: []
}
