import React from 'react'
import Link from 'next/link'
import useCatchPokemon from '~hooks/useCatchPokemon'

import styles from './main.module.scss'

const Main = () => {
  const { pokemon, error, isLoading } = useCatchPokemon(151)

  const caughtThemAll = pokemon.map((p) => (
    <Link key={p.name} href={`pokemon/${p.name}`}>
      <h2>{p.name}</h2>
    </Link>
  ))

  if (error.status) {
    return (
      <div>
        <h2>
          {error.errorMessage}... status: {error.status}
        </h2>
      </div>
    )
  }

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className={styles.container}>
      <h1>Number of Pokemon: {pokemon.length}</h1>
      {caughtThemAll}
    </div>
  )
}

export default Main
