import React, { FunctionComponent, createContext, useContext } from 'react'
import { PokeDetails } from '~interfaces/pokemon'

const initState: PokeDetails = {
  name: '',
  height: 0,
  weight: 0,
  id: 0,
  types: [{ type: { name: '' } }],
  sprites: { front_default: '' }
}

const PokemonCtx = createContext(initState)

const PokemonProvider: FunctionComponent = ({ children }) => (
  <PokemonCtx.Provider value={initState}>{children}</PokemonCtx.Provider>
)

export default PokemonProvider
export const usePokemonProvider = () => useContext(PokemonCtx)
