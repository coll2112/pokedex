import React, {
  FunctionComponent,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react'
import { initState } from '~consts/pokemon'
import useCatchPokemon from '~hooks/useCatchPokemon'

const PokemonCtx = createContext(initState)

const PokemonProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState(initState)
  const [offset, setOffset] = useState(initState.offset)
  const response = useCatchPokemon(10, offset)
  const { data, isValidating, error } = { ...response }

  const setPaginationPage = (o: number) => {
    setOffset(o)
  }

  const providerValue = {
    ...state,
    offset,
    setPaginationPage
  }

  useMemo(() => {
    setState({
      ...state,
      data,
      isValidating,
      error
    })
  }, [response.data])

  return (
    <PokemonCtx.Provider value={providerValue}>{children}</PokemonCtx.Provider>
  )
}

export default PokemonProvider
export const usePokemonProvider = () => useContext(PokemonCtx)
