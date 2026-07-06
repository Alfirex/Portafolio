import { useEffect, useRef, useState } from 'react'

// Token = [texto, tipo]. El tipo mapea a un color de la marca València.
type Tok = [string, ('kw' | 'tag' | 'str' | 'num' | 'fn' | 'com')?]

const CODE: Tok[] = [
  ['// front-end para reservas\n', 'com'],
  ['function', 'kw'],
  [' ', ],
  ['Reserva', 'fn'],
  ['() {\n', ],
  ['  ', ],
  ['const', 'kw'],
  [' [noches, setNoches] = ', ],
  ['useState', 'fn'],
  ['(', ],
  ['7', 'num'],
  [')\n\n', ],
  ['  ', ],
  ['return', 'kw'],
  [' (\n', ],
  ['    ', ],
  ['<Card', 'tag'],
  [' destino=', ],
  ['"València"', 'str'],
  ['>', 'tag'],
  ['\n', ],
  ['      ', ],
  ['<Calendario', 'tag'],
  [' checkIn checkOut', ],
  [' />', 'tag'],
  ['\n', ],
  ['      ', ],
  ['<Precio', 'tag'],
  [' noches={noches}', ],
  [' />', 'tag'],
  ['\n', ],
  ['      ', ],
  ['<Boton>', 'tag'],
  ['Reservar', ],
  ['</Boton>', 'tag'],
  ['\n', ],
  ['    ', ],
  ['</Card>', 'tag'],
  ['\n', ],
  ['  )\n', ],
  ['}', ],
]

const COLOR: Record<string, string> = {
  kw: 'text-[var(--color-naranja)] font-medium',
  tag: 'text-[var(--color-azulejo)]',
  str: 'text-[var(--color-naranja-claro)]',
  num: 'text-[var(--color-azulejo)]',
  fn: 'text-foreground',
  com: 'text-muted-foreground italic',
}

const FULL_LEN = CODE.reduce((a, [t]) => a + t.length, 0)

export function CodeWindow() {
  const [n, setN] = useState(0)
  const lastN = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(FULL_LEN)
      return
    }
    const typeMs = 32
    const pause = 2000
    const typeDur = FULL_LEN * typeMs
    const cycle = typeDur + pause
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const e = (now - start) % cycle
      const next = e < typeDur ? Math.floor(e / typeMs) : FULL_LEN
      if (next !== lastN.current) {
        lastN.current = next
        setN(next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Revela hasta n caracteres, respetando el color de cada token.
  let rem = n
  const spans = CODE.map(([text, type], i) => {
    if (rem <= 0) return null
    const shown = text.slice(0, rem)
    rem -= text.length
    return (
      <span key={i} className={type ? COLOR[type] : 'text-foreground/75'}>
        {shown}
      </span>
    )
  })

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-input bg-card shadow-2xl shadow-black/10">
      {/* Barra de título */}
      <div className="flex items-center gap-3 border-b border-input px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[var(--color-naranja)]" />
          <span className="size-3 rounded-full bg-[var(--color-naranja-claro)]" />
          <span className="size-3 rounded-full bg-[var(--color-azulejo)]" />
        </div>
        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}>
          reserva.tsx
        </span>
      </div>

      {/* Código */}
      <pre
        className="overflow-x-auto px-5 py-5 text-[13px] leading-relaxed sm:text-sm"
        style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}>
        <code aria-label="Componente de reserva">
          {spans}
          <span
            className="ml-0.5 inline-block w-[2px] -translate-y-[2px] bg-[var(--color-naranja)] align-middle"
            style={{ height: '1.05em', animation: 'caret-blink 1s step-end infinite' }}
            aria-hidden="true"
          />
        </code>
      </pre>
    </div>
  )
}
