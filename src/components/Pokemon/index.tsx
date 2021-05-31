import React from 'react'
import Link from 'next/link'
import useCatchPokemon from '~hooks/useCatchPokemon'

import styles from './pokemon.module.scss'

const Pokemon = () => {
  const { pokemon, error, isValidating } = useCatchPokemon(151)

  const pokemonMap = pokemon.map((p) => (
    <Link key={p.name} href={`pokemon/${p.name}`}>
      <a className={styles.link}>{p.name}</a>
    </Link>
  ))

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.error}>
          {error.errorMessage} {error.status && `status: ${error.status}`}
        </h2>
      </div>
    )
  }

  if (isValidating) {
    return (
      <div className={styles.loading}>
        <h3>
          Catching Pokemon
          <span className={styles.loadingDot}>.</span>
          <span className={styles.loadingDot}>.</span>
          <span className={styles.loadingDot}>.</span>
        </h3>
        <div className={styles.gifContainer}>
          <img
            alt="Pikachu Gif"
            className={styles.gif}
            src="https://media.tenor.com/images/6e190eb7b580983ce09c7ccf0c91519d/tenor.gif"
            width="100"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.headerContainer}>
        <p className={styles.headerText}>Number of Pokemon:</p>{' '}
        <p className={styles.headerCount}>{pokemon.length}</p>
      </h1>
      {pokemonMap}
    </div>
  )
}

export default Pokemon
