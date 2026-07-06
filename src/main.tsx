import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// Tailwind primero: así los tokens/reset SCSS del portfolio (que se cargan
// después) prevalecen en colisiones, y las utilidades Tailwind del Hero siguen aplicando.
import '@/styles/tailwind.css'
import '@/styles/globals.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
