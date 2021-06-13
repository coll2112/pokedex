import React, { FunctionComponent, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Search from '~components/Search'

import styles from './header.module.scss'

interface Props {
  text: string
}

const Header: FunctionComponent<Props> = ({ text }) => {
  const [animationType, setAnimationType] = useState('')

  const handleMouseEnter = () => {
    setAnimationType('mouseEnter')
  }

  const handleMouseExit = () => {
    setAnimationType('mouseExit')
  }
  return (
    <div className={styles.container}>
      <Link href="/">
        <a
          className={clsx(styles.text, styles[animationType])}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseExit}
        >
          {text}
        </a>
      </Link>
      <Search />
    </div>
  )
}

export default Header
