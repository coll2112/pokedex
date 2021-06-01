import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const axiosFetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return error
  }
}

interface PokemonEntry {
  name: string
  id: number
  sprites: {
    front: string
    back: string
  }
}

const initState = {
  name: '',
  id: 0,
  sprites: {
    front: '',
    back: ''
  }
}

const useCatchPokemon = (limit?: number) => {
  const [pokemon, setPokemon] = useState<PokemonEntry[]>([initState])
  const { data, isValidating, error } = useSWR(
    `/api/pokemon?limit=${limit}`,
    axiosFetcher
  )

  useEffect(() => {
    if (data) {
      setPokemon(data)
    }
  }, [data])

  console.log(pokemon)

  return { pokemon, isValidating, error }
}

export default useCatchPokemon
