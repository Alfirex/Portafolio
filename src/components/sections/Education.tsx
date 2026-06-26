import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Education.module.scss'

// ─── Actualiza estos datos con tu formación real ─────────────────────
type EduKey = 'daw' | 'bachillerato'
const EDU_KEYS: EduKey[] = ['daw', 'bachillerato']
// ─────────────────────────────────────────────────────────────────────

export default function Education() {
  const t = useTranslations('education')
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.title}`,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.title}`, start: 'top 85%' } }
      )
      gsap.fromTo(
        `.${styles.line}`,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 80%',
            end: 'bottom 30%', scrub: 0.4 } }
      )
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, x: -36 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 78%' } }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="education" className={styles.section}>
      <p className="section-label">{t('index')}</p>
      <h2 className={`section-title ${styles.title}`}>{t('section_title')}</h2>

      <div className={styles.timeline}>
        <div className={styles.lineWrapper} aria-hidden="true">
          <div className={styles.line} />
        </div>

        <div className={styles.cards}>
          {EDU_KEYS.map((key) => (
            <article key={key} className={styles.card}>
              <div className={styles.dot} aria-hidden="true" />
              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.degree}>{t(`items.${key}.degree`)}</h3>
                  <span className={styles.period}>{t(`items.${key}.period`)}</span>
                </div>
                <div className={styles.institutionRow}>
                  <span className={styles.institution}>{t(`items.${key}.institution`)}</span>
                </div>
                <p className={styles.location}>{t(`items.${key}.location`)}</p>
                <p className={styles.description}>{t(`items.${key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
