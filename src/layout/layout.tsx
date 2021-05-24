import React, { FunctionComponent } from 'react'

import styles from './layout.module.scss'

const Layout: FunctionComponent = ({ children }) => (
  <div className={styles.container}>{children}</div>
)

export default Layout
