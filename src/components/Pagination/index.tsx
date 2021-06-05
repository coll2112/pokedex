import React from 'react'
import { usePokemonProvider } from '~contexts/pokemon'

import styles from './pagination.module.scss'

const Pagination = () => {
  const { data, offset, setPaginationPage } = usePokemonProvider()

  const buttons = data.map((p, i) => (
    <button
      key={p.name}
      className={styles.button}
      type="button"
      onClick={() => setPaginationPage(i * 10)}
    >
      {i + 1}
    </button>
  ))

  const backButton = (
    <button type="button" onClick={() => setPaginationPage(offset - 10)}>
      Back
    </button>
  )

  const forwardButton = (
    <button type="button" onClick={() => setPaginationPage(offset + 10)}>
      Forward
    </button>
  )

  return (
    <div className={styles.container}>
      {backButton} {buttons} {forwardButton}
    </div>
  )
}

export default Pagination
