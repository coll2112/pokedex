import React from 'react'
import Layout from '~layout/layout'
import PokemonProvider from '~contexts/pokemon'

// import global styles
import '~styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PokemonProvider>
  )
}

export default MyApp
