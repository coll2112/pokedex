import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { limit, offset }
  } = req
  const url = `${process.env.POKE_URL}pokemon?limit=${limit}&offset=${offset}`

  if (method !== 'GET') {
    return res.status(400).send('Invalid HTTP Method')
  }

  const headers = {
    'content-type': 'application/json'
  }

  try {
    const { data, status, statusText } = await axios.get(url, { headers })

    const pokeUrlArr = data.results.map(async (p: any) => {
      const pokemon = await axios.get(p.url)
      const newObj = {
        name: pokemon.data.name,
        id: pokemon.data.id,
        sprites: {
          front: pokemon.data.sprites.front_default,
          back: pokemon.data.sprites.back_default
        }
      }
      return newObj
    })

    const pokeData = await Promise.all(pokeUrlArr).then(async (r) => r)

    if (status !== 200) {
      return res.status(status).send(statusText)
    }

    return res.status(200).send(pokeData)
  } catch (error) {
    return res.status(500).send({ error })
  }
}
