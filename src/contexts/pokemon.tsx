import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { initState } from '~consts/pokemon'
import useCatchPokemon from '~hooks/useCatchPokemon'
import { Pokemon } from '~interfaces/pokemon'

const PokemonCtx = createContext(initState)

const PokemonProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState(initState)
  // const [offset] = useState(initState.offset)
  const [page, setPage] = useState(initState.page)
  const [pageItems, setPageItems] = useState<Pokemon[]>([])

  const response = useCatchPokemon(151)
  const { data, isValidating, error } = response

  useEffect(() => {
    setState({ ...state, data, isValidating, error })
  }, [response.data, pageItems])

  useMemo(() => {
    if (state.data) {
      const items = state.data.slice(0, 12)
      setPageItems(items)
    }
  }, [state.data])

  const setPaginationPage = (p: number) => {
    setPage(p)
    const items = state.data.slice(p * 12, 12 * (p + 1))
    setPageItems(items)
  }

  const providerValue = {
    ...state,
    page,
    pageItems,
    setPaginationPage
  }

  return (
    <PokemonCtx.Provider value={providerValue}>{children}</PokemonCtx.Provider>
  )
}

export default PokemonProvider
export const usePokemonProvider = () => useContext(PokemonCtx)
