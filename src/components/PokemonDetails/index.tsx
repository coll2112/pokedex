import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import usePokeDetails from '~hooks/usePokeDetails'
import pokemonIdPrefix from '~utils/pokemonIdPrefix'
import Loading from '~components/Loading'
import Error from '~components/Error'

import styles from './pokemonDetails.module.scss'

const PokemonDetails = ({ params }) => {
  const { data, isValidating, error } = usePokeDetails(params)
  const [toggleImg, setToggleImg] = useState(false)

  if (isValidating) {
    return <Loading text="Searching Pokedex" />
  }

  if (error) {
    return <Error />
  }

  const pokeTypes = data.types.map((t) => (
    <p key={t.type.name} className={styles.typeName}>
      {t.type.name}
    </p>
  ))

  // converts from hectograms to pounds
  const convertWeight = (data.weight / 4.536).toFixed(2)
  // converts from decimetres to feet
  const convertHeight = (data.height / 3.048).toFixed(1).replace('.', "'")

  const switchImg = (
    <Image
      alt={`Sprite of ${data.name}`}
      height={200}
      src={toggleImg ? data.sprites.front_shiny : data.sprites.front_default}
      width={200}
    />
  )

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          <h3 className={styles.name}>{data.name}</h3>
          <h3 className={styles.number}>{pokemonIdPrefix(data.id)}</h3>
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
        <p className={styles.stat}>
          {convertWeight} <span className={styles.statSuffix}>lbs.</span>
        </p>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statTitle}>Height: </p>
        <p className={styles.stat}>{convertHeight}</p>
      </div>
    </div>
  )
}

export default PokemonDetails
