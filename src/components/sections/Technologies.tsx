import { useRef } from 'react'
import { useTranslations } from '@/i18n'
import { gsap, useGSAP } from '@/lib/gsap'
import styles from './Technologies.module.scss'

interface Tech {
  name: string
  category: 'frontend' | 'backend' | 'tools'
}

const TECHS: Tech[] = [
  // Frontend
  { name: 'HTML5',      category: 'frontend' },
  { name: 'CSS3',       category: 'frontend' },
  { name: 'SCSS/Sass',  category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'jQuery',     category: 'frontend' },
  { name: 'React',      category: 'frontend' },
  { name: 'Bootstrap',  category: 'frontend' },
  // Backend
  { name: 'PHP',        category: 'backend'  },
  { name: 'MySQL',      category: 'backend'  },
  // Tools
  { name: 'Git',        category: 'tools'    },
  { name: 'Webpack',    category: 'tools'    },
  { name: 'Vite',       category: 'tools'    },
  { name: 'Figma',      category: 'tools'    },
  { name: 'VS Code',    category: 'tools'    },
]

const CATEGORY_ORDER: Tech['category'][] = ['frontend', 'backend', 'tools']

export default function Technologies() {
  const t = useTranslations('technologies')
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.title}`,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.title}`, start: 'top 85%' },
        }
      )

      CATEGORY_ORDER.forEach((cat, groupIndex) => {
        gsap.fromTo(
          `.${styles.group}:nth-child(${groupIndex + 1})`,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.${styles.groups}`,
              start: 'top 80%',
            },
            delay: groupIndex * 0.08,
          }
        )
      })

      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: { amount: 0.6, from: 'start' },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: `.${styles.groups}`,
            start: 'top 78%',
          },
        }
      )
    },
    { scope: sectionRef }
  )

  const grouped = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: t(`categories.${cat}`),
    items: TECHS.filter((tech) => tech.category === cat),
  }))

  return (
    <section ref={sectionRef} id="technologies" className={styles.section}>
      <p className="section-label">02</p>
      <h2 className={`section-title ${styles.title}`}>{t('section_title')}</h2>
      <p className={styles.description}>{t('description')}</p>

      <div className={styles.groups}>
        {grouped.map(({ key, label, items }) => (
          <div key={key} className={styles.group}>
            <h3 className={styles.groupLabel}>
              <span className={styles.groupDot} aria-hidden="true" />
              {label}
            </h3>
            <ul className={styles.cards} aria-label={label}>
              {items.map((tech) => (
                <li key={tech.name} className={styles.card}>
                  <span className={styles.cardInitial} aria-hidden="true">
                    {tech.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className={styles.cardName}>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
