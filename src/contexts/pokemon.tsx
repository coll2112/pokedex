import React, {
  FunctionComponent,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { initState } from '~consts/pokemon'
import useCatchPokemon from '~hooks/useCatchPokemon'

const PokemonCtx = createContext(initState)

const PokemonProvider: FunctionComponent = ({ children }) => {
  const { data, isValidating, error } = useCatchPokemon(151)
  const [state, setState] = useState(initState)

  useMemo(() => {
    setState({
      ...state,
      data,
      isValidating,
      error,
      currentPage: 1,
      currentItems: data && data.length > 0 && data.slice(0, 12)
    })
  }, [data])

  const setPaginationPage = useCallback(
    (currentPage: number, itemsPerPage: number) => {
      const indexOfLastItem = currentPage * itemsPerPage
      const indexOfFirstItem = indexOfLastItem - itemsPerPage
      const currentItems = state.data.slice(indexOfFirstItem, indexOfLastItem)
      setState({ ...state, currentItems, currentPage })
    },
    [state.currentPage, state.currentItems]
  )

  const providerValue = {
    ...state,
    setPaginationPage
  }

  return (
    <PokemonCtx.Provider value={providerValue}>{children}</PokemonCtx.Provider>
  )
}

export default PokemonProvider
export const usePokemonProvider = () => useContext(PokemonCtx)
