import React, { FunctionComponent } from 'react'

import styles from './header.module.scss'

interface Props {
  text: string
}

const Header: FunctionComponent<Props> = ({ text }) => (
  <div className={styles.container}>
    <h2 className={styles.text}>{text}</h2>
  </div>
)

export default Header
