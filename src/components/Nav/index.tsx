import { useShowHeader } from '@/hooks/useShowHeader'
import clsxm from '@/utils/clsxm'
import Image from 'next/image'
import { FC } from 'react'
import styles from './index.module.scss'

const Nav: FC = () => {
  const show = useShowHeader()

  return (
    <header className={clsxm(styles.header, show ? styles.visible : styles.show)}>
      <nav id="header" className={clsxm(styles.nav)}>
        <Image
          src="/logo.svg"
          priority
          width={107}
          height={22}
          alt="稀土掘金"
          className={styles.logo}
        />
      </nav>
    </header>
  )
}

export default Nav
