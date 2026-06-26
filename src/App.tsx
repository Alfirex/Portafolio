import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { IntlProvider } from '@/i18n/IntlProvider'
import { routing, isLocale } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Stats from '@/components/sections/Stats'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Technologies from '@/components/sections/Technologies'
import Certifications from '@/components/sections/Certifications'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

import es from '@/i18n/messages/es.json'
import ca from '@/i18n/messages/ca.json'
import en from '@/i18n/messages/en.json'

const messagesByLocale: Record<string, Record<string, unknown>> = { es, ca, en }

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Experience />
        <Education />
        <Technologies />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function LocaleLayout() {
  const { locale } = useParams()

  useEffect(() => {
    if (locale) document.documentElement.lang = locale
  }, [locale])

  if (!isLocale(locale)) {
    return <Navigate to={`/${routing.defaultLocale}`} replace />
  }

  return (
    <IntlProvider locale={locale} messages={messagesByLocale[locale]}>
      <HomePage />
    </IntlProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${routing.defaultLocale}`} replace />} />
        <Route path="/:locale" element={<LocaleLayout />} />
        <Route path="*" element={<Navigate to={`/${routing.defaultLocale}`} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
