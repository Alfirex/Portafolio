export const routing = {
  locales: ['es', 'ca', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
} as const

export type Locale = (typeof routing.locales)[number]

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (routing.locales as readonly string[]).includes(value)
}
