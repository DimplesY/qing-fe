import useDevice from '@/hooks/useDevice'
import { useShowHeader } from '@/hooks/useShowHeader'
import clsxm from '@/utils/clsxm'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'
import Badge from '../Badge'
import ThemeButton from '../ThemeButton'
import styles from './index.module.scss'
import { BiCaretDown } from 'react-icons/bi'
import { useClickAway } from 'ahooks'

interface NavProps {
  menus: CommonData<Menu>[]
  activeId: number
}

// 移动端导航条
const MobileNav: FC<NavProps> = ({ menus, activeId }) => {
  const [showMenu, setShowMenu] = useState(false)
  const activeMenu = menus.find((menu) => menu.id === activeId)
  const ref = useRef<HTMLDivElement>(null)

  // 点击其他地方关闭菜单
  useClickAway(() => {
    if (showMenu) {
      setShowMenu(false)
    }
  }, ref)

  return (
    <div className="relative h-full flex flex-1" ref={ref}>
      <div className=" cursor-pointer relative z-9" onClick={() => setShowMenu(!showMenu)}>
        <div className="w-[5.66rem] flex justify-center items-center h-full text-[1.33rem] text-[#1e80ff]">
          {activeMenu?.attributes.name}
          <BiCaretDown color="#515767" />
        </div>
      </div>

      <ul
        className={clsxm(
          'w-[11.9rem] p-[0.667rem] box-content shadow-mobile-menu text-[1.2rem] block absolute -right-20 -left-[4.3rem] top-[52px] border-solid border rounded-[4px] border-[#ebebeb] bg-[var(--primary-white)]',
          showMenu && 'block',
          !showMenu && 'hidden',
        )}>
        {menus.map((menu) => (
          <li key={menu.id} className="h-16 flex justify-center items-center text-[1.167rem]">
            <Link
              href={menu.attributes.path}
              className={clsxm(
                'inline-block h-20 mx-4 leading-[5rem] text-[var(--juejin-font-2)]',
                activeId === menu.id &&
                  'font-[500] text-[#1e80ff] hover:text-black dark:hover:text-white',
                activeId !== menu.id && 'hover:text-black dark:hover:text-white',
                styles.menuItem,
              )}>
              {menu.attributes.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// PC 端导航条
const DesktopNav: FC<NavProps> = ({ menus, activeId }) => (
  <ul className="flex flex-1 h-full text-[1.167rem] max-w-[1000px] overflow-x-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    {menus.map((menu) => (
      <li
        className={clsxm(
          'h-full mx-4 leading-[5rem] text-[var(--juejin-font-2)] block shrink-0',
          activeId === menu.id &&
            'text-[#1e80ff] font-[500] hover:text-black dark:hover:text-white',
          activeId !== menu.id && 'hover:text-black dark:hover:text-white',
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
  const { isDesktop, isMobile } = useDevice()
  return (
    <header className={clsxm(styles.header, show ? styles.visible : styles.show)}>
      <nav id="header" className={clsxm(styles.nav)}>
        {/* PC 端 LOGO light */}
        <Image
          src="/logo.svg"
          priority
          width={107}
          height={22}
          alt="稀土掘金"
          className={styles.logo}
        />

        {/* 移动端 LOGO light */}
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
        {/* 移动端导航条 */}
        {isMobile() && <MobileNav {...props} />}

        <ThemeButton className="text-[1.5rem] mr-[0.917rem]" />
      </nav>
    </header>
  )
}

export default Nav
