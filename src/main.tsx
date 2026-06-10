import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LangProvider } from '@/i18n/LangContext'
import { router } from '@/router'
import { initAnalytics } from '@/lib/analytics'
import './index.css'

initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LangProvider>
        <RouterProvider router={router} />
      </LangProvider>
    </HelmetProvider>
  </StrictMode>,
)
