import { Pokemon } from '~interfaces/pokemon'

const filterPokemon = (data: Pokemon[], searchInput: string) => {
  let pokemonFilter: Pokemon[]

  if (data && searchInput.length > 0) {
    const filterName = [...data]
      .filter((p) => p.name.startsWith(searchInput))
      .splice(0, 5)

    const filterNumber = [...data]
      .filter((p) => p.id.toString().startsWith(searchInput))
      .splice(0, 5)

    pokemonFilter = filterNumber.length > 0 ? filterNumber : filterName
  } else {
    pokemonFilter = []
  }

  return pokemonFilter
}

export default filterPokemon
