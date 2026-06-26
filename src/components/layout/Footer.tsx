import { useTranslations } from '@/i18n'
import styles from './Footer.module.scss'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>{t('copyright')}</span>
        <span className={styles.version}>{t('version')}</span>
      </div>
    </footer>
  )
}
