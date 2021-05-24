import React from 'react'
import Layout from '~layout/layout'

// import global styles
import '~styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
