import Link from 'next/link'
import React, { useState } from 'react'
import usePokeDetails from '~hooks/usePokeDetails'
import pokemonIdPrefix from '~utils/pokemonIdPrefix'

import styles from './pokemonDetails.module.scss'

const PokemonDetails = ({ params }) => {
  const { pokeDetails, isValidating, error } = usePokeDetails(params)
  const [toggleImg, setToggleImg] = useState(false)

  if (isValidating || !pokeDetails) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h1>error yo</h1>
  }

  const pokeTypes = pokeDetails.types.map((t) => (
    <p key={t.type.name} className={styles.typeName}>
      {t.type.name}
    </p>
  ))

  const switchImg = toggleImg ? (
    <img
      alt={`Front Default Shiny Sprite of ${pokeDetails.name}`}
      src={pokeDetails.sprites.front_shiny}
    />
  ) : (
    <img
      alt={`Front Default Sprite of ${pokeDetails.name}`}
      src={pokeDetails.sprites.front_default}
    />
  )

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          <h3 className={styles.name}>{pokeDetails.name}</h3>
          <h3 className={styles.number}>{pokemonIdPrefix(pokeDetails.id)}</h3>
        </div>
        <div className={styles.imgContainer}>{switchImg}</div>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={() => setToggleImg(!toggleImg)}
        >
          Show {toggleImg ? 'Default' : 'Shiny'} Variation
        </button>
        <Link href="/">
          <button className={styles.button} type="button">
            Back to Results
          </button>
        </Link>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statTitle}>Types:</p>
        <div className={styles.types}>{pokeTypes}</div>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statTitle}>Weight:</p>
        <p className={styles.stat}>{pokeDetails.weight}</p>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statTitle}>Height: </p>
        <p className={styles.stat}>{pokeDetails.height}</p>
      </div>
    </div>
  )
}

export default PokemonDetails
