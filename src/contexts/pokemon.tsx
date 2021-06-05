import React, {
  FunctionComponent,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react'
import { initState } from '~consts/pokemon'
import { InitState } from '~interfaces/pokemon'
import useCatchPokemon from '~hooks/useCatchPokemon'

const PokemonCtx = createContext(initState)

const PokemonProvider: FunctionComponent = ({ children }) => {
  const response = useCatchPokemon(151)
  const [state, setState] = useState<InitState>(initState)
  const { data, isValidating, error } = { ...response }

  useMemo(() => {
    if (response) {
      setState({ data, isValidating, error })
    }
  }, [response.data])

  return <PokemonCtx.Provider value={state}>{children}</PokemonCtx.Provider>
}

export default PokemonProvider
export const usePokemonProvider = () => useContext(PokemonCtx)
