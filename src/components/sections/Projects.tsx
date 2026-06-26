import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Projects.module.scss'

const PLACEHOLDER_COUNT = 3

export default function Projects() {
  const t = useTranslations('projects')
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.title}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.title}`,
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        `.${styles.tile}`,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.grid}`,
            start: 'top 80%',
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="projects" className={styles.section}>
      <p className="section-label">03</p>
      <h2 className={`section-title ${styles.title}`}>{t('section_title')}</h2>

      <p className={styles.description}>{t('description')}</p>

      <div className={styles.grid}>
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div key={i} className={styles.tile} aria-label={t('coming_soon')}>
            <div className={styles.tileInner}>
              <div className={styles.tileTop}>
                <span className="badge">{t('status_badge')}</span>
                <span className={styles.tileIndex}>0{i + 1}</span>
              </div>
              <div className={styles.tileCenter}>
                <span className={styles.comingSoon}>{t('coming_soon')}</span>
              </div>
              <div className={styles.tileBottom}>
                <div className={styles.tileLine} />
                <div className={styles.tileLine} style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
