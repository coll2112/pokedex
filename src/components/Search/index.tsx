import React, { FunctionComponent, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import styles from './search.module.scss'

const Search: FunctionComponent = () => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const [hasValue, setHasValue] = useState(false)

  useMemo(() => {
    if (searchInput.length > 0) {
      setHasValue(true)
    } else {
      setHasValue(false)
    }
  }, [searchInput])

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = async () => {
    await router.push(
      {
        pathname: '/pokemon/',
        query: { name: searchInput }
      },
      `/pokemon/${searchInput}`
    )
  }

  return (
    <div className={styles.container}>
      <form autoComplete="off" onSubmit={handleSearch}>
        <div className={styles.inputContainer}>
          <input
            className={clsx(styles.input, hasValue && styles.hasValue)}
            name="search"
            onChange={handleInput}
          />
          <label className={styles.label} htmlFor="search">
            Enter Pokemon
          </label>
          <button
            className={clsx(styles.submitBtn, !hasValue && styles.disabled)}
            disabled={!hasValue}
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default Search
