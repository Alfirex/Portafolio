import { Link as RouterLink, useLocation } from 'react-router-dom'
import type { ComponentPropsWithoutRef } from 'react'
import { useLocale } from './IntlProvider'

/** Drop-in replacement for next/navigation's `usePathname`. */
export function usePathname(): string {
  return useLocation().pathname
}

type LinkProps = Omit<ComponentPropsWithoutRef<typeof RouterLink>, 'to'> & {
  href: string
  locale?: string
}

/**
 * Locale-aware Link, mirroring next-intl's `Link`. Prefixes the href with the
 * target locale (or the active one) so `/about` becomes `/es/about`.
 */
export function Link({ href, locale, children, ...rest }: LinkProps) {
  const activeLocale = useLocale()
  const target = locale ?? activeLocale
  const to = `/${target}${href === '/' ? '' : href}`
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
}
