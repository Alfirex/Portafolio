import { createContext, useContext, useMemo, type ReactNode } from 'react'

type Messages = Record<string, unknown>

interface IntlContextValue {
  locale: string
  messages: Messages
}

const IntlContext = createContext<IntlContextValue | null>(null)

function resolve(source: unknown, path: string): unknown {
  if (!path) return source
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, source)
}

/**
 * Drop-in replacement for next-intl's `NextIntlClientProvider`.
 */
export function IntlProvider({
  locale,
  messages,
  children,
}: {
  locale: string
  messages: Messages
  children: ReactNode
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages])
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>
}

function useIntl(): IntlContextValue {
  const ctx = useContext(IntlContext)
  if (!ctx) {
    throw new Error('useTranslations/useLocale must be used within an <IntlProvider>')
  }
  return ctx
}

export function useLocale(): string {
  return useIntl().locale
}

interface Translator {
  (key: string, values?: Record<string, string | number>): string
  raw: (key: string) => unknown
}

/**
 * Drop-in replacement for next-intl's `useTranslations(namespace)`.
 * Supports dot-notation keys, `{var}` interpolation and `t.raw()`.
 */
export function useTranslations(namespace?: string): Translator {
  const { messages } = useIntl()
  const scope = namespace ? resolve(messages, namespace) : messages

  const t = ((key: string, values?: Record<string, string | number>) => {
    const value = resolve(scope, key)
    if (typeof value !== 'string') return key
    if (!values) return value
    return value.replace(/\{(\w+)\}/g, (_, name: string) =>
      name in values ? String(values[name]) : `{${name}}`
    )
  }) as Translator

  t.raw = (key: string) => resolve(scope, key)

  return t
}
