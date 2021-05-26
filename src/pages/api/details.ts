import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = `${process.env.POKE_URL}${req.body.name}`

  if (req.method !== 'POST') {
    return res.status(400).send('Invalid HTTP Method')
  }

  const headers = {
    'content-type': 'application/json'
  }

  try {
    const { data, status, statusText } = await axios.get(url, { headers })

    if (status !== 200) {
      return res.status(status).send(statusText)
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).send({ error })
  }
}
