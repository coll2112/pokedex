import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { PokeDetails } from '~interfaces/pokemon'

const axiosFetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return error
  }
}

const usePokeDetails = (name) => {
  const [pokeDetails, setPokeDetails] = useState<PokeDetails>()
  const { data, isValidating, error } = useSWR(
    `/api/details?name=${name}`,
    axiosFetcher
  )

  useEffect(() => {
    if (data) {
      setPokeDetails(data)
    }
  }, [data, pokeDetails])

  return { pokeDetails, isValidating, error }
}

export default usePokeDetails
