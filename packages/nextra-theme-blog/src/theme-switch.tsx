import { useMounted } from '@julianberger/nextra/hooks'
import { MoonIcon, SunIcon } from '@julianberger/nextra/icons'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = resolvedTheme === 'dark'

  // @TODO: system theme
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <span
      role="button"
      aria-label="Toggle Dark Mode"
      className="_cursor-pointer _p-2 _text-current"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={e => {
        if (e.key === 'Enter') toggleTheme()
      }}
    >
      {mounted && isDark ? <MoonIcon /> : <SunIcon />}
    </span>
  )
}
