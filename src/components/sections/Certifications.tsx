import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Certifications.module.scss'

// ─── Añade aquí tus certificaciones reales ───────────────────────────
interface Cert {
  nameKey: string
  issuer: string
  date: string
  url?: string
}

const CERTS: Cert[] = [
  { nameKey: 'cert1', issuer: 'freeCodeCamp', date: '2021', url: 'https://www.freecodecamp.org' },
  { nameKey: 'cert2', issuer: 'freeCodeCamp', date: '2021', url: 'https://www.freecodecamp.org' },
  { nameKey: 'cert3', issuer: 'Udemy',        date: '2022', url: 'https://www.udemy.com' },
  { nameKey: 'cert4', issuer: 'Google',       date: '2023', url: 'https://developers.google.com' },
]
// ─────────────────────────────────────────────────────────────────────

export default function Certifications() {
  const t = useTranslations('certifications')
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
        `.${styles.card}`,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' } }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="certifications" className={styles.section}>
      <p className="section-label">{t('index')}</p>
      <h2 className={`section-title ${styles.title}`}>{t('section_title')}</h2>

      <div className={styles.grid}>
        {CERTS.map((cert) => (
          <article key={cert.nameKey} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.certIcon} aria-hidden="true">
                <CertIcon />
              </span>
              <span className={styles.issuer}>{cert.issuer}</span>
              <span className={styles.date}>{cert.date}</span>
            </div>

            <h3 className={styles.certName}>{t(`items.${cert.nameKey}`)}</h3>

            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.verifyLink}
                aria-label={`${t('verify')} — ${t(`items.${cert.nameKey}`)}`}
              >
                {t('verify')}
                <ArrowIcon />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function CertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
