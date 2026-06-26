import { useEffect, useRef } from 'react'
import { useLocale, useTranslations } from '@/i18n'
import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { useTheme } from '@/hooks/useTheme'
import { gsap } from '@/lib/gsap'
import styles from './Navbar.module.scss'

const locales = ['es', 'ca', 'en'] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const { theme, toggle } = useTheme()

  // Scroll-based background
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add(styles.scrolled)
      } else {
        nav.classList.remove(styles.scrolled)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Strip locale prefix to get the path for locale switching
  const pathWithoutLocale = pathname.replace(/^\/(es|ca|en)/, '') || '/'

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#technologies', label: t('technologies') },
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <header ref={navRef} className={styles.nav}>
      <nav className={styles.inner}>
        {/* Logo / Name */}
        <a href="#" className={styles.logo}>
          AAR
        </a>

        {/* Nav links */}
        <ul className={styles.links}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Language switcher */}
          <div className={styles.langSwitcher} role="group" aria-label="Language">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={pathWithoutLocale}
                locale={loc}
                className={`${styles.langBtn} ${locale === loc ? styles.langBtnActive : ''}`}
                aria-current={locale === loc ? 'true' : undefined}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={styles.themeBtn}
            aria-label={theme === 'dark' ? t('toggle_theme_light') : t('toggle_theme_dark')}
          >
            {theme === 'dark' ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
