import React, { FunctionComponent, useMemo, useState } from 'react'
import { usePokemonProvider } from '~contexts/pokemon'

import styles from './pagination.module.scss'

interface Props {
  minLimit?: number
  maxLimit?: number
  pageNumLimit?: number
}

const Pagination: FunctionComponent<Props> = ({
  minLimit = 0,
  maxLimit = 5,
  pageNumLimit = 3
}) => {
  const { data, currentPage, setPaginationPage } = usePokemonProvider()
  const [pageLimit, setPageLimit] = useState<Array<number>>([])
  const [pageNumberLimit] = useState<number>(pageNumLimit)
  const [maxPageLimit, setMaxPageLimit] = useState<number>(maxLimit)
  const [minPageLimit, setMinPageLimit] = useState<number>(minLimit)

  useMemo(() => {
    const amountOfPages: Array<number> = []
    for (let i = 1; i <= Math.ceil(data.length / 12); i += 1) {
      amountOfPages.push(i)
    }

    setPageLimit(amountOfPages)
  }, [currentPage])

  const buttons = pageLimit.map((number) => {
    if (number < maxPageLimit + 1 && number > minPageLimit) {
      return (
        <button
          key={number}
          className={styles.button}
          type="button"
          onClick={() => setPaginationPage(number - 1)}
        >
          {number}
        </button>
      )
    }
    return null
  })

  const handlePrevPage = () => {
    setPaginationPage(currentPage - 1)

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit)
      setMinPageLimit(minPageLimit - pageNumberLimit)
    }
  }

  const handleNextPage = () => {
    setPaginationPage(currentPage + 1)

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit)
      setMinPageLimit(minPageLimit + pageNumberLimit)
    }
  }

  const backButton = (
    <button disabled={currentPage === 0} type="button" onClick={handlePrevPage}>
      Prev
    </button>
  )

  const nextButton = (
    <button
      disabled={currentPage === pageLimit.length - 1}
      type="button"
      onClick={handleNextPage}
    >
      Next
    </button>
  )

  let elipNext
  if (pageLimit.length > maxPageLimit) {
    elipNext = (
      <button type="button" onClick={handleNextPage}>
        {' '}
        &hellip;{' '}
      </button>
    )
  }

  let elipPrev
  if (minPageLimit >= 1) {
    elipPrev = (
      <button type="button" onClick={handlePrevPage}>
        {' '}
        &hellip;{' '}
      </button>
    )
  }

  return (
    <div className={styles.container}>
      {backButton} {elipPrev} {buttons} {elipNext} {nextButton}
    </div>
  )
}

export default Pagination
