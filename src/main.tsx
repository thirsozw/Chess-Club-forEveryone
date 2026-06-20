import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { ThemeProvider } from './context/ThemeContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <ThemeProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </StrictMode>,
)
