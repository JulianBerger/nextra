import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { DEFAULT_LOCALE, ERROR_ROUTES } from '../../constants.js'

const template = 'https://nextra.site'

export const useFSRoute = () => {
  const { locale = DEFAULT_LOCALE, pathname, route } = useRouter()

  return useMemo(() => {
    // because for the 404 route `asPath` will be redirected URL and `normalizePages` will never return correct pageItem
    const clientRoute = ERROR_ROUTES.has(route) ? route : pathname

    const { pathname } = new URL(clientRoute, template)

    const cleanedPath = locale
      ? pathname.replace(new RegExp(`\\.${locale}(\\/|$)`), '$1')
      : pathname

    return (
      cleanedPath
        .replace(/\.html$/, '')
        .replace(/\/index(\/|$)/, '$1')
        .replace(/\/$/, '') || '/'
    )
  }, [pathname, locale, route])
}
