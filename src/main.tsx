import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LangProvider } from '@/i18n/LangContext'
import { router } from '@/router'
import { initAnalytics, CONSENT_KEY } from '@/lib/analytics'
import './index.css'

// Only load marketing pixels if the visitor has already granted consent.
// First-time visitors see the ConsentBanner, which calls initAnalytics() on accept.
if (localStorage.getItem(CONSENT_KEY) === 'granted') {
  initAnalytics()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LangProvider>
        <RouterProvider router={router} />
      </LangProvider>
    </HelmetProvider>
  </StrictMode>,
)
