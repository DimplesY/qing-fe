import { useTheme } from 'next-themes'
import { BiSun, BiMoon } from 'react-icons/bi'
import { ComponentPropsWithoutRef, useMemo, useRef } from 'react'
import clsxm from '@/utils/clsxm'
import useLoaded from '@/hooks/useLoaded'
import { usePopup } from '@/hooks/usePopup'

type ThemeButtonProps = ComponentPropsWithoutRef<'button'>

const ThemeButton = ({ className, ...rest }: ThemeButtonProps) => {
  const { theme, setTheme } = useTheme()
  const isLoaded = useLoaded()
  const tip = useMemo(() => (theme === 'dark' ? '切换为浅色模式' : '切换为深色模式'), [theme])

  const themeRef = useRef<HTMLButtonElement>(null)
  usePopup(themeRef, tip)

  return (
    <button
      name="theme"
      aria-label="主题切换"
      ref={themeRef}
      className={clsxm(className)}
      {...rest}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' && isLoaded ? <BiMoon /> : <BiSun />}
    </button>
  )
}

export default ThemeButton
