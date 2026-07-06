import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { CodeWindow } from '@/components/blocks/code-window'
import { cn } from '@/lib/utils'
import { useLocale } from '@/i18n'
import { useTheme } from '@/hooks/useTheme'
import { Menu, X, Sun, Moon } from 'lucide-react'

// El componente original usa next/link. En este proyecto (Vite + React Router,
// sin Next.js) lo sustituimos por un <a> que acepta la misma prop `href`.
type LinkProps = React.ComponentPropsWithoutRef<'a'> & { href: string }
const Link = ({ href, ...props }: LinkProps) => <a href={href} {...props} />

const LOCALES = ['es', 'ca', 'en'] as const

// Selector de idioma (ES/CA/EN) — navega a /es, /ca, /en conservando la home.
function LangSwitch() {
    const locale = useLocale()
    return (
        <div
            className="flex items-center overflow-hidden rounded-md border border-input"
            role="group"
            aria-label="Idioma">
            {LOCALES.map((loc) => (
                <RouterLink
                    key={loc}
                    to={`/${loc}`}
                    aria-current={locale === loc ? 'true' : undefined}
                    className={cn(
                        'px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-colors',
                        locale === loc
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                    )}>
                    {loc}
                </RouterLink>
            ))}
        </div>
    )
}

// Toggle de tema claro/oscuro (usa el hook del portfolio → data-theme).
function ThemeToggle() {
    const { theme, toggle } = useTheme()
    return (
        <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="inline-flex size-9 items-center justify-center rounded-md border border-input text-foreground transition-colors hover:bg-accent">
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
    )
}

const display = { fontFamily: 'var(--font-display), Georgia, serif' }
const mono = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }

// Stack del día a día (sustituye a los logos de clientes ajenos)
const STACK = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'PHP', 'MySQL', 'Git', 'Tailwind', 'Figma']

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section className="flex min-h-dvh items-center">
                    <div className="w-full py-24 lg:py-28">
                        <div className="relative mx-auto flex w-full max-w-[80%] flex-col px-6 lg:block">
                            <div className="relative z-10 mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <p
                                    className="mb-5 text-sm uppercase tracking-[0.18em] text-[var(--color-azulejo)]"
                                    style={mono}>
                                    Front-end · turismo &amp; alquiler vacacional
                                </p>
                                <h1
                                    className="mt-4 max-w-2xl text-balance text-5xl font-semibold md:text-6xl lg:mt-8 xl:text-7xl"
                                    style={display}>
                                    Construyo las webs donde empiezan las vacaciones.
                                </h1>
                                <p className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                                    Alejandro Ajenjo — desarrollador front-end con más de 6 años creando producto para el sector turístico, desde Catarroja (València).
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="#projects">
                                            <span className="text-nowrap">Ver trabajo</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base">
                                        <Link href="#contact">
                                            <span className="text-nowrap">Hablemos</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="order-first mt-10 w-full lg:absolute lg:right-0 lg:top-1/2 lg:order-last lg:mt-0 lg:w-1/2 lg:-translate-y-1/2">
                                <CodeWindow />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-16 md:pb-32">
                    <div className="group relative m-auto max-w-none px-6 lg:px-10">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p
                                    className="text-end text-sm text-muted-foreground"
                                    style={mono}>
                                    Stack del día a día
                                </p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}>
                                    {STACK.map((tech) => (
                                        <div
                                            key={tech}
                                            className="flex items-center text-lg font-medium text-foreground/70"
                                            style={mono}>
                                            {tech}
                                        </div>
                                    ))}
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Sobre mí', href: '#about' },
    { name: 'Experiencia', href: '#experience' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-none px-6 transition-all duration-300 lg:px-10">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="Inicio"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Cerrar menú' : 'Abrir menú'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className="flex items-center gap-3">
                                    <LangSwitch />
                                    <ThemeToggle />
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm">
                                    <Link href="/cv.pdf">
                                        <span>Descargar CV</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="#contact">
                                        <span>Hablemos</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = () => {
    return (
        <span
            className="text-base font-semibold uppercase tracking-[0.18em] text-foreground"
            style={mono}>
            AAR
        </span>
    )
}
