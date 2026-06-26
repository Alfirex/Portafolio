import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

// Mock i18n
vi.mock('@/i18n', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      title: 'Desarrollador de Aplicaciones Web',
      location: 'Catarroja, Valencia · España',
      meta_role: 'DEV',
      meta_exp: '6+ AÑOS EXP.',
      scroll_hint: 'Desplázate',
    }
    return messages[key] ?? key
  },
}))

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}))

// Mock lib/gsap
vi.mock('@/lib/gsap', () => ({
  gsap: { fromTo: vi.fn(), timeline: vi.fn(() => ({ fromTo: vi.fn() })) },
  ScrollTrigger: { getAll: vi.fn(() => []), kill: vi.fn() },
  useGSAP: vi.fn(),
}))

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getByLabelText('Alejandro Ajenjo Rodríguez')).toBeTruthy()
  })

  it('renders the job title', () => {
    render(<Hero />)
    expect(screen.getByText('Desarrollador de Aplicaciones Web')).toBeTruthy()
  })

  it('renders location metadata', () => {
    render(<Hero />)
    expect(screen.getByText('DEV')).toBeTruthy()
  })
})
