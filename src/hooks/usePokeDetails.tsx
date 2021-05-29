/** Convert to useSWR */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Error } from '~interfaces/error'
import { PokeDetails } from '~interfaces/pokemon'

const usePokeDetails = (name) => {
  const [pokeDetails, setPokeDetails] = useState<PokeDetails>()
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState(true)

  const fetchPokemonDetails = async () => {
    try {
      const { data } = await axios.get('/api/details', name)
      setIsLoading(false)
      setPokeDetails(data)
    } catch (err) {
      setError({
        ...err,
        errorMessage: 'Error fetching Pokemon details'
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      void fetchPokemonDetails()
    }

    return () => {
      isSubscribed = false
    }
  }, [])

  return { pokeDetails, isLoading, error }
}

export default usePokeDetails
