import React, { FunctionComponent } from 'react'

import styles from './error.module.scss'

const Error: FunctionComponent = () => (
  <div className={styles.errorContainer}>
    <p className={styles.subtext}>Oh no, it broke free!</p>
    <h2 className={styles.error}>
      Looks like we failed to catch any Pokemon. That's okay, let's try again!
    </h2>
  </div>
)
export default Error
