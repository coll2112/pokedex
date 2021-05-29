import React, { useState } from 'react'
import useSWR from 'swr'

import styles from './pokemonDetails.module.scss'

const PokemonDetails = ({ params }) => {
  const [toggleImg, setToggleImg] = useState(false)
  const { data, isValidating, error } = useSWR(`/api/details?name=${params}`)

  if (isValidating) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h1>error yo</h1>
  }

  const handleImgToggle = () => {
    setToggleImg(!toggleImg)
  }

  const pokeTypes = data.types.map((t) => (
    <p key={t.type.name} className={styles.typeName}>
      {t.type.name}
    </p>
  ))

  const switchImg = toggleImg ? (
    <img
      alt={`Front Default Shiny Sprite of ${data.name}`}
      src={data.sprites.front_shiny}
    />
  ) : (
    <img
      alt={`Front Default Sprite of ${data.name}`}
      src={data.sprites.front_default}
    />
  )

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3 className={styles.name}>{data.name}</h3>
        <h3 className={styles.number}>#00{data.id}</h3>
      </div>
      <div className={styles.imgContainer}>{switchImg}</div>
      <button className={styles.button} type="button" onClick={handleImgToggle}>
        Show {toggleImg ? 'Default' : 'Shiny'} Sprites
      </button>
      <div className={styles.typesContainer}>
        <p className={styles.typeTitle}>Types:</p>
        <div className={styles.types}>{pokeTypes}</div>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statTitle}>Weight:</p>
        <p className={styles.stat}>{data.weight} lbs</p>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statTitle}>Height: </p>
        <p className={styles.stat}>{data.height}</p>
      </div>
    </div>
  )
}

export default PokemonDetails
