import React, { FunctionComponent, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { usePokemonProvider } from '~contexts/pokemon'
import { Pokemon } from '~interfaces/pokemon'
import filterPokemon from '~utils/filterPokemon'

import styles from './search.module.scss'

const Search: FunctionComponent = () => {
  const router = useRouter()
  const { data } = usePokemonProvider()
  const [searchInput, setSearchInput] = useState('')
  const [autoComplete, setAutoComplete] = useState<Pokemon[]>([])
  const [hasValue, setHasValue] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useMemo(() => {
    if (searchInput.length > 0) {
      setHasValue(true)
    } else {
      setHasValue(false)
    }

    setAutoComplete(filterPokemon(data, searchInput))
  }, [searchInput])

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
      className={clsx(styles.link)}
      type="button"
      onMouseDown={() => handleAutoComplete(p.name)}
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
            onBlur={() => setIsOpen(false)}
            onChange={handleInput}
            onFocus={() => setIsOpen(true)}
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
          <div className={clsx(styles.autoComplete, !isOpen && styles.hide)}>
            {pokemonComplete}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
