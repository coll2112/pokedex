import axios from 'axios'
import useSWR from 'swr'

const axiosFetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return error
  }
}

const useCatchPokemon = (limit: number | string) => {
  const { data, isValidating, error } = useSWR(
    `/api/pokemon?limit=${limit}`,
    axiosFetcher
  )

  return { data, isValidating, error }
}

export default useCatchPokemon
