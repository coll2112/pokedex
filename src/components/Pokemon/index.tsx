import React from 'react'
import Link from 'next/link'
import { usePokemonProvider } from '~contexts/pokemon'
import pokemonIdPrefix from '~utils/pokemonIdPrefix'

import styles from './pokemon.module.scss'

const Pokemon = () => {
  const { data, isValidating, error } = usePokemonProvider()

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

  const pokemonMap = data.map((p) => (
    <Link key={p.name} href={`pokemon/${p.name}`}>
      <a className={styles.link}>
        <div className={styles.card}>
          <div className={styles.number}>{pokemonIdPrefix(p.id)}</div>
          <img
            alt={`front sprite of ${p.name}`}
            className={styles.sprite}
            src={p.sprites.front}
          />
          <p className={styles.name}>{p.name}</p>
        </div>
      </a>
    </Link>
  ))

  return (
    <div className={styles.container}>
      <h1 className={styles.headerContainer}>
        <p className={styles.headerText}>Number of Pokemon:</p>{' '}
        <p className={styles.headerCount}>{data.length}</p>
      </h1>
      {pokemonMap}
    </div>
  )
}

export default Pokemon
