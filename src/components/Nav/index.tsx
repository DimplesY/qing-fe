import useDevice from '@/hooks/useDevice'
import { useShowHeader } from '@/hooks/useShowHeader'
import clsxm from '@/utils/clsxm'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import Badge from '../Badge'
import styles from './index.module.scss'

interface NavProps {
  menus: CommonData<Menu>[]
  activeId: number
}

// PC 端导航条
const DesktopNav: FC<NavProps> = ({ menus, activeId }) => (
  <ul className="flex h-full text-[1.167rem]">
    {menus.map((menu) => (
      <li
        className={clsxm(
          'h-full mx-4 leading-[5rem] text-[var(--juejin-font-2)] block',
          activeId === menu.id && 'text-[#1e80ff] font-[500] hover:text-black',
          activeId !== menu.id && 'hover:text-black',
          styles.menuItem,
        )}
        key={menu.id}>
        {!!menu.attributes.badge?.trim() && <Badge title={menu.attributes.badge} />}
        <Link href={menu.attributes.path}>{menu.attributes.name} </Link>
      </li>
    ))}
  </ul>
)

const Nav: FC<NavProps> = (props) => {
  const show = useShowHeader()
  const { isDesktop } = useDevice()

  return (
    <header className={clsxm(styles.header, show ? styles.visible : styles.show)}>
      <nav id="header" className={clsxm(styles.nav)}>
        {/* PC 端 LOGO */}
        <Image
          src="/logo.svg"
          priority
          width={107}
          height={22}
          alt="稀土掘金"
          className={styles.logo}
        />
        {/* 移动端 LOGO */}
        <Image
          src="/m-logo.svg"
          priority
          width={31}
          height={24}
          alt="稀土掘金"
          className={styles.logoMobile}
        />

        {/* PC端导航条 */}
        {isDesktop() && <DesktopNav {...props} />}
      </nav>
    </header>
  )
}

export default Nav
