import { useRef, useState } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Contact.module.scss'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/alejandro-ajenjo/',
  github: 'https://github.com/alfirex',
  cv: '/cv.pdf',
}

export default function Contact() {
  const t = useTranslations('contact')
  const sectionRef = useRef<HTMLElement>(null)

  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.inner} > *`,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.inner}`,
            start: 'top 80%',
          },
        }
      )
    },
    { scope: sectionRef }
  )

  function validate(): boolean {
    const next: FormErrors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!fields.name.trim()) next.name = t('form.required')
    if (!fields.email.trim()) next.email = t('form.required')
    else if (!emailRe.test(fields.email)) next.email = t('form.invalid_email')
    if (!fields.subject.trim()) next.subject = t('form.required')
    if (!fields.message.trim()) next.message = t('form.required')

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setFormState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error()
      setFormState('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className="section-label" aria-hidden="true" />
          <h2 className={`section-title ${styles.title}`}>{t('section_title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.layout}>
          {/* ── Form ─────────────────────────────────────────────── */}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label={t('section_title')}
          >
            {formState === 'success' ? (
              <div className={styles.successCard}>
                <span className={styles.successIcon} aria-hidden="true">✓</span>
                <h3 className={styles.successTitle}>{t('form.success_title')}</h3>
                <p className={styles.successText}>{t('form.success_text')}</p>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setFormState('idle')}
                >
                  {t('form.submit').replace('Enviar', 'Nuevo')}
                </button>
              </div>
            ) : (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      {t('form.name_label')}
                      <span aria-hidden="true"> *</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t('form.name_placeholder')}
                      value={fields.name}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <span id="error-name" className={styles.error} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>
                      {t('form.email_label')}
                      <span aria-hidden="true"> *</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t('form.email_placeholder')}
                      value={fields.email}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span id="error-email" className={styles.error} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>
                    {t('form.subject_label')}
                    <span aria-hidden="true"> *</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder={t('form.subject_placeholder')}
                    value={fields.subject}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                    aria-describedby={errors.subject ? 'error-subject' : undefined}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <span id="error-subject" className={styles.error} role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>
                    {t('form.message_label')}
                    <span aria-hidden="true"> *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder={t('form.message_placeholder')}
                    value={fields.message}
                    onChange={handleChange}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span id="error-message" className={styles.error} role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {formState === 'error' && (
                  <p className={styles.formError} role="alert">
                    {t('form.error_text')}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={formState === 'submitting'}
                  aria-busy={formState === 'submitting'}
                >
                  {formState === 'submitting' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className={styles.sidebar}>
            <p className={styles.sidebarTitle}>{t('links.title')}</p>

            <div className={styles.sidebarLinks}>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <LinkedInIcon />
                <span>{t('links.linkedin')}</span>
                <ExternalIcon />
              </a>

              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <GitHubIcon />
                <span>{t('links.github')}</span>
                <ExternalIcon />
              </a>

              <a
                href={SOCIAL_LINKS.cv}
                download="CV_Alejandro_Ajenjo.pdf"
                className={`${styles.socialLink} ${styles.cvLink}`}
              >
                <DownloadIcon />
                <span>{t('links.download_cv')}</span>
                <span className="badge" aria-hidden="true">PDF</span>
              </a>
            </div>

            <div className={styles.locationTag}>
              <span className={styles.locationDot} aria-hidden="true" />
              <span>Catarroja, Valencia · España</span>
            </div>

            <a href="mailto:gplp97@gmail.com" className={styles.emailLink}>
              gplp97@gmail.com
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
