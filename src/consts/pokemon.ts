import { InitState } from '~interfaces/pokemon'

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
  offset: 0,
  page: 0,
  pageItems: []
}
