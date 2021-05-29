import React from 'react'
import usePokeDetails from '~hooks/usePokeDetails'

import styles from './pokemonDetails.module.scss'

const PokemonDetails = ({ params }) => {
  const { pokeDetails, isLoading } = usePokeDetails(params)

  console.log(pokeDetails)

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  return <div className={styles.container}>Catch 'em all</div>
}

export default PokemonDetails
