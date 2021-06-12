import React, { FunctionComponent } from 'react'
import Header from '~layout/header'

import styles from './layout.module.scss'

const Layout: FunctionComponent = ({ children }) => (
  <div>
    <Header text="Pokedex" />
    <div className={styles.container}>{children}</div>
  </div>
)

export default Layout
