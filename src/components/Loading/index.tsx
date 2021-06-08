import React, { FunctionComponent } from 'react'

import styles from './loading.module.scss'

interface Props {
  text: string
}

const Loading: FunctionComponent<Props> = ({ text }) => (
  <div className={styles.loading}>
    <h3>
      {text}
      <span className={styles.loadingDot}>.</span>
      <span className={styles.loadingDot}>.</span>
      <span className={styles.loadingDot}>.</span>
    </h3>
    <div className={styles.gifContainer}>
      <img
        alt="Pikachu Gif"
        className={styles.gif}
        src="https://media.tenor.com/images/6e190eb7b580983ce09c7ccf0c91519d/tenor.gif"
        width="100"
      />
    </div>
  </div>
)

export default Loading
