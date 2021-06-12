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

const usePokeDetails = (name: string) => {
  const { data, isValidating, error } = useSWR(
    `/api/details?name=${name}`,
    axiosFetcher
  )

  return { data, isValidating, error }
}

export default usePokeDetails
