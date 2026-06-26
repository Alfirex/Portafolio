import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import styles from './Hero.module.scss'

export default function Hero() {
  const t = useTranslations('hero')
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const revealRef = useRef<HTMLElement[]>([])
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // ── Animación de entrada del texto ─────────────────────────────
      const chars = charsRef.current.filter(Boolean)
      const reveals = revealRef.current.filter(Boolean)

      gsap.set(chars, { opacity: 0, y: 40 })
      gsap.set(reveals, { opacity: 0, y: 18 })
      gsap.set([metaRef.current, scrollHintRef.current], { opacity: 0 })

      gsap
        .timeline({ delay: 0.1 })
        .to(chars, { opacity: 1, y: 0, duration: 0.85, stagger: 0.025, ease: 'power3.out' })
        .to(reveals, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.4')
        .to(metaRef.current, { opacity: 1, duration: 0.6 }, '-=0.3')
        .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, '-=0.2')

      // ── Vídeo scrubbeado por scroll (pin + currentTime) ────────────
      const video = videoRef.current
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let trigger: ScrollTrigger | null = null

      const initScrub = () => {
        if (trigger || !video || !containerRef.current) return
        const duration = video.duration
        if (!duration || !isFinite(duration)) return

        trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          // Suavizado inercial: el scroll a saltos se convierte en avance fluido.
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress
            // Avanza el vídeo con el scroll. Solo busca si el seek anterior
            // terminó (evita encolar seeks y dar tirones).
            if (!video.seeking) {
              const time = p * duration
              if (Math.abs(video.currentTime - time) > 0.015) video.currentTime = time
            }
            // Desvanece el texto en el último tramo para dejar ver el vídeo
            if (leftRef.current) {
              leftRef.current.style.opacity = String(1 - Math.max(0, (p - 0.7) / 0.3))
            }
          },
        })
      }

      // Solo se fija/scrubbe si hay vídeo válido (si falta el archivo, el
      // hero queda estático con su fondo de marca — sin scroll muerto).
      if (video && !reduce) {
        if (video.readyState >= 1) initScrub()
        else video.addEventListener('loadedmetadata', initScrub)
      }

      return () => {
        video?.removeEventListener('loadedmetadata', initScrub)
        trigger?.kill()
      }
    },
    { scope: containerRef }
  )

  const collectChar = (el: HTMLSpanElement | null) => {
    if (el && !charsRef.current.includes(el)) charsRef.current.push(el)
  }
  const collectReveal = (el: HTMLElement | null) => {
    if (el && !revealRef.current.includes(el)) revealRef.current.push(el)
  }

  // Divide un texto en <span> por carácter para la animación de entrada.
  const splitChars = (text: string, prefix: string) =>
    text.split('').map((ch, i) => (
      <span key={`${prefix}-${i}`} ref={collectChar} className={styles.char}>
        {ch === ' ' ? ' ' : ch}
      </span>
    ))

  return (
    <section ref={containerRef} className={styles.hero} aria-label="Hero">
      {/* Fondo de marca (visible si el vídeo no carga) */}
      <div className={styles.bg} aria-hidden="true" />

      {/* Vídeo de fondo, avanzado por el scroll */}
      <video
        ref={videoRef}
        className={styles.video}
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Velo de legibilidad */}
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.grid}>
        {/* ── Texto / tesis ─────────────────────────────────────────── */}
        <div ref={leftRef} className={styles.left}>
          <p ref={collectReveal} className={styles.eyebrow}>
            {t('eyebrow')}
          </p>

          <h1 className={styles.headline} aria-label="Alejandro Ajenjo Rodríguez">
            <span className={styles.line} aria-hidden="true">
              {splitChars(t('headline_1'), 'h1')}
            </span>
            <span className={`${styles.line} ${styles.accent}`} aria-hidden="true">
              {splitChars(t('headline_accent'), 'ha')}
            </span>
            <span className={styles.line} aria-hidden="true">
              {splitChars(t('headline_2'), 'h2')}
            </span>
          </h1>

          <p ref={collectReveal} className={styles.subtitle}>
            {t('title')}
          </p>

          <div ref={collectReveal} className={styles.actions}>
            <a href="#projects" className="btn-primary">
              {t('cta_work')}
            </a>
            <a href="#contact" className="btn-ghost">
              {t('cta_talk')}
            </a>
          </div>
        </div>
      </div>

      {/* ── Metadata ───────────────────────────────────────────────── */}
      <div ref={metaRef} className={styles.meta} aria-label="Metadata">
        <span className={styles.metaLine}>{t('meta_role')}</span>
        <span className={styles.metaDot} aria-hidden="true" />
        <span className={styles.metaLine}>{t('meta_exp')}</span>
        <span className={styles.metaDot} aria-hidden="true" />
        <span className={styles.metaLine}>{t('location')}</span>
      </div>

      {/* ── Scroll hint ────────────────────────────────────────────── */}
      <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>{t('scroll_hint')}</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
