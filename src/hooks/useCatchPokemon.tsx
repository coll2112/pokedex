/** Convert to useSWR */
import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Pokemon } from '~interfaces/pokemon'

const axiosFetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return error
  }
}

const useCatchPokemon = (limit?: number) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const { data, error, isValidating } = useSWR(
    `/api/pokemon?limit=${limit}`,
    axiosFetcher
  )

  // const createPokemonEntryObj = () => {
  //   const pokeman = data.results.map(async (p) => {
  //     const { data } = await axios.get(p.url)

  //     return { name: p.name, sprites: pokeImg.data.results }
  //   })

  //   setPokemon(pokeman)
  // }

  useEffect(() => {
    if (data) {
      setPokemon(data.results)
    }
  }, [data])

  return { pokemon, isValidating, error }
}

export default useCatchPokemon
