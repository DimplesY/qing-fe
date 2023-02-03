import { useTheme } from 'next-themes'
import { BiSun, BiMoon } from 'react-icons/bi'
import { ComponentPropsWithoutRef } from 'react'
import clsxm from '@/utils/clsxm'

type ThemeButtonProps = ComponentPropsWithoutRef<'button'>

const ThemeButton = ({ className, ...rest }: ThemeButtonProps) => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      className={clsxm(className)}
      {...rest}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      {resolvedTheme === 'light' ? <BiMoon /> : <BiSun />}
    </button>
  )
}

export default ThemeButton
