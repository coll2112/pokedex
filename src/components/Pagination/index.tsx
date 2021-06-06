import React from 'react'
import { usePokemonProvider } from '~contexts/pokemon'

import styles from './pagination.module.scss'

const Pagination = () => {
  const { page, pageItems, setPaginationPage } = usePokemonProvider()
  //   const maxItems = Math.ceil(data.length / 12)

  const buttons = pageItems.map((p, i) => (
    <button
      key={p.name}
      className={styles.button}
      type="button"
      onClick={() => setPaginationPage(i)}
    >
      {i + 1}
    </button>
  ))

  console.log(page)

  //   const backButton = (
  //     <button type="button" onClick={() => setPaginationPage()}>
  //       Back
  //     </button>
  //   )

  //   const forwardButton = (
  //     <button type="button" onClick={() => setPaginationPage()}>
  //       Forward
  //     </button>
  //   )

  return <div className={styles.container}>{buttons}</div>
}

export default Pagination
