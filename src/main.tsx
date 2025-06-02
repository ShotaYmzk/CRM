import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider, ToastProvider } from "@heroui/react"
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { SWRConfig } from 'swr'
import { fetcher } from './utils/api.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider>
        <HeroUIProvider>
          <ToastProvider />
          <SWRConfig value={{ 
            fetcher,
            revalidateOnFocus: false,
            errorRetryCount: 3
          }}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SWRConfig>
        </HeroUIProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
