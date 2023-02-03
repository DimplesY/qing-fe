import { useTheme } from 'next-themes'
import { BiSun, BiMoon } from 'react-icons/bi'
import { ComponentPropsWithoutRef } from 'react'
import clsxm from '@/utils/clsxm'
import useLoaded from '@/hooks/useLoaded'

type ThemeButtonProps = ComponentPropsWithoutRef<'button'>

const ThemeButton = ({ className, ...rest }: ThemeButtonProps) => {
  const { theme, setTheme } = useTheme()
  const isLoaded = useLoaded()

  return (
    <button
      className={clsxm(className)}
      {...rest}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' && isLoaded ? <BiMoon d="" /> : <BiSun d="" />}
    </button>
  )
}

export default ThemeButton
