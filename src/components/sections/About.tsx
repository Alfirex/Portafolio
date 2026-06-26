import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './About.module.scss'

export default function About() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.tag}`,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: `.${styles.tag}`, start: 'top 88%' } }
      )
      gsap.fromTo(
        `.${styles.headline}`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.headline}`, start: 'top 85%' } }
      )
      gsap.fromTo(
        `.${styles.body} p`,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: `.${styles.body}`, start: 'top 82%' } }
      )
      gsap.fromTo(
        `.${styles.pill}`,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: `.${styles.pills}`, start: 'top 84%' } }
      )
    },
    { scope: sectionRef }
  )

  const pills: string[] = t.raw('pills') as string[]

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.tag}>{t('tag')}</span>
          <h2 className={styles.headline}>{t('headline')}</h2>

          <div className={styles.body}>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>

          <ul className={styles.pills} aria-label={t('tag')}>
            {pills.map((pill) => (
              <li key={pill} className={styles.pill}>
                {pill}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right} aria-hidden="true">
          <div className={styles.avatar}>
            <span className={styles.avatarInitials}>AAR</span>
            <span className={styles.availBadge}>{t('available')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
