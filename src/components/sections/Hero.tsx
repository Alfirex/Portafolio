import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Hero.module.scss'

const NAME_LINE1 = 'ALEJANDRO'
const NAME_LINE2 = 'AJENJO'

export default function Hero() {
  const t = useTranslations('hero')
  const containerRef  = useRef<HTMLElement>(null)
  const charsRef      = useRef<HTMLSpanElement[]>([])
  const subtitleRefs  = useRef<HTMLParagraphElement[]>([])
  const metaRef       = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const chars     = charsRef.current.filter(Boolean)
      const subtitles = subtitleRefs.current.filter(Boolean)

      gsap.set(chars,                 { opacity: 0, y: 50 })
      gsap.set(subtitles,             { opacity: 0, y: 20 })
      gsap.set(metaRef.current,       { opacity: 0 })
      gsap.set(scrollHintRef.current, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(chars, {
        opacity: 1, y: 0,
        duration: 0.9, stagger: 0.045, ease: 'power3.out',
      })
      .to(subtitles, {
        opacity: 1, y: 0,
        duration: 0.7, stagger: 0.1, ease: 'power2.out',
      }, '-=0.45')
      .to(metaRef.current, { opacity: 1, duration: 0.6 }, '-=0.3')
      .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, '-=0.2')
    },
    { scope: containerRef }
  )

  const collectChar = (el: HTMLSpanElement | null) => {
    if (el && !charsRef.current.includes(el)) charsRef.current.push(el)
  }
  const collectSub = (el: HTMLParagraphElement | null) => {
    if (el && !subtitleRefs.current.includes(el)) subtitleRefs.current.push(el)
  }

  return (
    <section ref={containerRef} className={styles.hero} aria-label="Hero">
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.grid}>
        {/* ── Texto ─────────────────────────────────────────────────── */}
        <div className={styles.left}>
          <h1 className={styles.name} aria-label="Alejandro Ajenjo Rodríguez">
            <span className={styles.nameLine} aria-hidden="true">
              {NAME_LINE1.split('').map((ch, i) => (
                <span key={`l1-${i}`} ref={collectChar} className={styles.char}>{ch}</span>
              ))}
            </span>
            <span className={styles.nameLine} aria-hidden="true">
              {NAME_LINE2.split('').map((ch, i) => (
                <span key={`l2-${i}`} ref={collectChar} className={styles.char}>{ch}</span>
              ))}
            </span>
          </h1>

          <p ref={collectSub} className={styles.subtitle}>{t('title')}</p>
          <p ref={collectSub} className={`${styles.subtitle} ${styles.location}`}>{t('location')}</p>
        </div>
      </div>

      {/* ── Metadata ───────────────────────────────────────────────── */}
      <div ref={metaRef} className={styles.meta} aria-label="Metadata">
        <span className={styles.metaLine}>{t('meta_role')}</span>
        <span className={styles.metaLine}>{t('meta_exp')}</span>
        <span className={styles.metaLine}>CATARROJA, VLC · ESP</span>
      </div>

      {/* ── Scroll hint ────────────────────────────────────────────── */}
      <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>{t('scroll_hint')}</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
