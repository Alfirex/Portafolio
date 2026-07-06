import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * Dev-only `/api/contact` endpoint. Replaces the former Next.js API route,
 * preserving the exact validation logic.
 */
function contactApi(): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        const send = (body: unknown, status = 200) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }

        if (req.method !== 'POST') return send({ error: 'Method not allowed.' }, 405)

        let raw = ''
        req.on('data', (chunk) => (raw += chunk))
        req.on('end', () => {
          try {
            const { name, email, subject, message } = JSON.parse(raw || '{}')

            if (!name || !email || !subject || !message) {
              return send({ error: 'All fields are required.' }, 400)
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
              return send({ error: 'Invalid email address.' }, 400)
            }

            // ── Connect your email service here ────────────────────────
            // Options: Resend (resend.com), SendGrid, Nodemailer, Formspree
            // ───────────────────────────────────────────────────────────

            console.log('[contact]', { name, email, subject, message })
            send({ success: true }, 200)
          } catch {
            send({ error: 'Internal server error.' }, 500)
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApi()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
