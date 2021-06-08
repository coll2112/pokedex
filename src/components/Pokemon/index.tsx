import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePokemonProvider } from '~contexts/pokemon'
import pokemonIdPrefix from '~utils/pokemonIdPrefix'
import Pagination from '~/components/Pagination'
import Loading from '~components/Loading'
import Error from '~components/Error'

import styles from './pokemon.module.scss'

const Pokemon = () => {
  const { isValidating, error, currentItems } = usePokemonProvider()

  if (error) {
    return <Error />
  }

  if (!currentItems && isValidating) {
    return <Loading text="Catching Pokemon" />
  }

  const pokemonMap = currentItems.map((p) => (
    <Link key={p.name} href={`pokemon/${p.name}`}>
      <a className={styles.link}>
        <div className={styles.card}>
          <div className={styles.headerNumber}>{pokemonIdPrefix(p.id)}</div>
          <Image
            alt={`front sprite of ${p.name}`}
            className={styles.sprite}
            height={125}
            src={p.sprites.front}
            width={125}
          />
          <div className={styles.info}>
            <div className={styles.bodyNumber}>{pokemonIdPrefix(p.id)}</div>
            <p className={styles.name}>{p.name}</p>
          </div>
        </div>
      </a>
    </Link>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.pokeContainer}>{pokemonMap}</div>
      <Pagination />
    </div>
  )
}

export default Pokemon
