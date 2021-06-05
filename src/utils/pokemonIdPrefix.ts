const pokemonIdPrefix = (id: number) => {
  let pokemonNumber: string
  if (id > 100) {
    pokemonNumber = `#${id}`
  } else if (id > 9 && id < 100) {
    pokemonNumber = `#0${id}`
  } else {
    pokemonNumber = `#00${id}`
  }

  return pokemonNumber
}

export default pokemonIdPrefix
