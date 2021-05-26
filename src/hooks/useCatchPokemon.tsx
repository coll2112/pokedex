import axios from 'axios'
import { useEffect, useState } from 'react'

const useCatchPokemon = (limit: number) => {
  const [pokemon, setPokemon] = useState([{ name: '', url: '' }])
  const [error, setError] = useState({
    errorMessage: '',
    status: ''
  })

  const fetchPokemon = async () => {
    try {
      const { data } = await axios.post('/api/pokemon', { limit })
      setPokemon(data.results)
    } catch (err) {
      setError({
        ...err,
        errorMessage: 'Error fetching Pokemon'
      })
    }
  }

  useEffect(() => {
    let isSubscribed = true

    if (isSubscribed) {
      void fetchPokemon()
    }

    return () => {
      isSubscribed = false
    }
  }, [])

  return { pokemon, error }
}

export default useCatchPokemon
