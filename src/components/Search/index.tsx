import React, { FunctionComponent, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { usePokemonProvider } from '~contexts/pokemon'
import { Pokemon } from '~interfaces/pokemon'

import styles from './search.module.scss'

const Search: FunctionComponent = () => {
  const router = useRouter()
  const { data, isValidating } = usePokemonProvider()
  const [searchInput, setSearchInput] = useState('')
  const [autoComplete, setAutoComplete] = useState<Pokemon[]>()
  const [hasValue, setHasValue] = useState(false)

  useMemo(() => {
    if (searchInput.length > 0) {
      setHasValue(true)
    } else {
      setHasValue(false)
    }
  }, [searchInput])

  useMemo(() => {
    if (data && searchInput.length > 0) {
      setAutoComplete(
        [...data].filter((p) => p.name.includes(searchInput)).splice(0, 5)
      )
    } else {
      setAutoComplete([])
    }
  }, [searchInput])

  if (isValidating) {
    return <></>
  }

  const handleInput = (e) => {
    setSearchInput(e.target.value.toLowerCase())
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

  const handleAutoComplete = async (name) => {
    setAutoComplete([])
    await router.push(
      {
        pathname: '/pokemon/',
        query: { name }
      },
      `/pokemon/${name}`
    )
  }

  const pokemonComplete = autoComplete?.map((p) => (
    <button
      key={p.id}
      className={styles.link}
      type="button"
      onClick={() => handleAutoComplete(p.name)}
    >
      {p.name}
    </button>
  ))

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
            Search Pokemon
          </label>
          <button
            className={clsx(styles.submitBtn, !hasValue && styles.disabled)}
            disabled={!hasValue}
            type="submit"
          >
            Search
          </button>
          <div className={styles.autoComplete}>{pokemonComplete}</div>
        </div>
      </form>
    </div>
  )
}

export default Search
