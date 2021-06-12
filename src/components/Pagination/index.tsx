import clsx from 'clsx'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { usePokemonProvider } from '~contexts/pokemon'

import styles from './pagination.module.scss'

interface Props {
  minPageNumber?: number
  maxPageNumber?: number
  pageNumLimit?: number
  maxItemsOnPage?: number
}

// TODO: strip logic from context and put into parent component
// Pass data to pagination instead
const Pagination: FunctionComponent<Props> = ({
  minPageNumber = 0,
  maxPageNumber = 5,
  pageNumLimit = 5,
  maxItemsOnPage = 12
}) => {
  const {
    data,
    currentPage,
    currentItems,
    setPaginationPage
  } = usePokemonProvider()
  const [pageLimit, setPageLimit] = useState<Array<number>>([])
  const [pageNumberLimit] = useState<number>(pageNumLimit)
  const [maxPageLimit, setMaxPageLimit] = useState<number>(maxPageNumber)
  const [minPageLimit, setMinPageLimit] = useState<number>(minPageNumber)
  const [itemsPerPage, setItemsPerPage] = useState(maxItemsOnPage)

  const disableNextBtn = currentPage >= pageLimit.length - 1
  const disableBackBtn = currentPage <= 1

  useMemo(() => {
    const amountOfPages: Array<number> = []
    for (let i = 0; i <= Math.ceil(data.length / itemsPerPage); i += 1) {
      amountOfPages.push(i)
    }

    setPageLimit(amountOfPages)
  }, [currentPage, itemsPerPage])

  useMemo(() => {
    setPaginationPage(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage])

  const buttons = useMemo(
    () =>
      pageLimit.map((number) => {
        if (number < maxPageLimit + 1 && number > minPageLimit) {
          return (
            <button
              key={number}
              className={clsx(
                styles.button,
                currentPage === number && styles.currentPage
              )}
              type="button"
              onClick={() => setPaginationPage(number, itemsPerPage)}
            >
              {number}
            </button>
          )
        }
        return null
      }),
    [itemsPerPage, currentPage, pageLimit]
  )

  const handlePrevPage = () => {
    setPaginationPage(currentPage - 1, itemsPerPage)

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit)
      setMinPageLimit(minPageLimit - pageNumberLimit)
    }
  }

  const handleNextPage = () => {
    setPaginationPage(currentPage + 1, itemsPerPage)

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit)
      setMinPageLimit(minPageLimit + pageNumberLimit)
    }
  }

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + maxPageLimit)
  }

  const backButton = (
    <button
      className={clsx(styles.button, disableBackBtn && styles.disabled)}
      disabled={disableBackBtn}
      type="button"
      onClick={handlePrevPage}
    >
      Prev
    </button>
  )

  const nextButton = (
    <button
      className={clsx(styles.button, disableNextBtn && styles.disabled)}
      disabled={disableNextBtn}
      type="button"
      onClick={handleNextPage}
    >
      Next
    </button>
  )

  // let elipNext
  // if (pageLimit.length > maxPageLimit) {
  //   elipNext = (
  //     <button className={styles.button} type="button" onClick={handleNextPage}>
  //       &hellip;
  //     </button>
  //   )
  // }

  // let elipPrev
  // if (minPageLimit >= 1) {
  //   elipPrev = (
  //     <button className={styles.button} type="button" onClick={handlePrevPage}>
  //       &hellip;
  //     </button>
  //   )
  // }

  let loadMoreBtn
  if (currentItems.length !== data.length) {
    loadMoreBtn = (
      <button
        className={clsx(styles.button, styles.loadMore)}
        type="button"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainPaginationContainer}>
        {backButton}
        {buttons}
        {nextButton}
      </div>
      {loadMoreBtn}
      <p className={styles.pageNumber}>
        Pokemon {currentItems.length}/{data.length}
      </p>
    </div>
  )
}

export default Pagination
