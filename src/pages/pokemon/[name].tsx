import { GetServerSideProps } from 'next'
import React from 'react'
import PokemonDetails from '~components/PokemonDetails'

const Pokemon = ({ params }) => <PokemonDetails params={params.name} />

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: { params }
})

export default Pokemon
