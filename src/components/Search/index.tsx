import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'

import styles from './search.module.scss'

const Search: FunctionComponent = () => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState()

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = async () => {
    console.log('clicked')
    // if (searchInput === router.query.name) {
    //   return
    // }
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
      <input name="search" placeholder="Search for..." onChange={handleInput} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default Search
