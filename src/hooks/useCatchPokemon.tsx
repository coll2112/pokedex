/** Convert to useSWR */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Pokemon } from '~interfaces/pokemon'
import { Error } from '~interfaces/error'

const useCatchPokemon = (limit?: number) => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([])
  const [error, setError] = useState<Error>({ errorMessage: '', status: '' })
  const [isLoading, setIsLoading] = useState(true)

  const fetchPokemon = async () => {
    try {
      const { data } = await axios.post('/api/pokemon', { limit })
      setPokemon(data.results)
      setIsLoading(false)
    } catch (err) {
      setError({
        ...err,
        errorMessage: 'Error fetching Pokemon'
      })
      setIsLoading(false)
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

  return { pokemon, isLoading, error }
}

export default useCatchPokemon
