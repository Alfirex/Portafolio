import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import styles from './Experience.module.scss'

export default function Experience() {
  const t = useTranslations('experience')
  const sectionRef = useRef<HTMLElement>(null)

  // Lee todos los empleos del JSON del idioma activo (orden del fichero).
  const jobKeys = Object.keys((t.raw('jobs') ?? {}) as Record<string, unknown>)

  useGSAP(
    () => {
      // Section title fade in
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

      // Timeline line draw
      gsap.fromTo(
        `.${styles.line}`,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: `.${styles.timeline}`,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      )

      // Cards stagger in from left
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.timeline}`,
            start: 'top 75%',
          },
        }
      )

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      <p className="section-label" aria-hidden="true" />
      <h2 className={`section-title ${styles.title}`}>{t('section_title')}</h2>

      <div className={styles.timeline}>
        {/* Vertical line */}
        <div className={styles.lineWrapper} aria-hidden="true">
          <div className={styles.line} />
        </div>

        {/* Job cards */}
        <div className={styles.cards}>
          {jobKeys.map((key) => (
            <article key={key} className={styles.card}>
              <div className={styles.dot} aria-hidden="true" />

              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.jobTitle}>{t(`jobs.${key}.title`)}</h3>
                  <span className={styles.period}>{t(`jobs.${key}.period`)}</span>
                </div>

                <div className={styles.companyRow}>
                  <span className={styles.company}>{t(`jobs.${key}.company`)}</span>
                  <span className={styles.duration}>{t(`jobs.${key}.duration`)}</span>
                </div>

                <p className={styles.location}>{t(`jobs.${key}.location`)}</p>

                <p className={styles.description}>{t(`jobs.${key}.description`)}</p>

                <ul className={styles.skills} aria-label="Skills">
                  {(t.raw(`jobs.${key}.skills`) as string[]).map((skill: string) => (
                    <li key={skill} className={styles.skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
