import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Stats.module.scss'

interface Stat {
  value: number
  suffix: string
  labelKey: string
}

const STATS: Stat[] = [
  { value: 6,  suffix: '+', labelKey: 'years'        },
  { value: 3,  suffix: '',  labelKey: 'companies'    },
  { value: 15, suffix: '+', labelKey: 'technologies' },
  { value: 10, suffix: '+', labelKey: 'projects'     },
]

export default function Stats() {
  const t = useTranslations('stats')
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      // Fade in items
      gsap.fromTo(
        `.${styles.item}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 82%' },
        }
      )

      // Animate counters
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val).toString()
          },
          scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className={styles.section} aria-label={t('aria_label')}>
      <div className={styles.grid}>
        {STATS.map((stat, i) => (
          <div key={stat.labelKey} className={styles.item}>
            <div className={styles.number}>
              <span
                ref={(el) => { numRefs.current[i] = el }}
                className={styles.count}
                aria-live="polite"
              >
                0
              </span>
              <span className={styles.suffix}>{stat.suffix}</span>
            </div>
            <p className={styles.label}>{t(stat.labelKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
