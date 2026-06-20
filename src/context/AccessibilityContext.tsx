import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { saveData, loadData } from '../utils/storage'

interface AccessibilityState {
  colorblindMode: boolean
  dyslexiaFont: boolean
  narration: boolean
  highContrast: boolean
}

interface AccessibilityContextType extends AccessibilityState {
  toggleColorblind: () => void
  toggleDyslexia: () => void
  toggleNarration: () => void
  toggleHighContrast: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

const defaults: AccessibilityState = {
  colorblindMode: false,
  dyslexiaFont: false,
  narration: false,
  highContrast: false,
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(() => loadData('accessibility', defaults))

  useEffect(() => {
    saveData('accessibility', state)
    document.body.classList.toggle('colorblind-mode', state.colorblindMode)
    document.body.classList.toggle('dyslexia-font', state.dyslexiaFont)
    document.body.classList.toggle('high-contrast', state.highContrast)
  }, [state])

  const toggle = (key: keyof AccessibilityState) =>
    setState(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <AccessibilityContext.Provider value={{
      ...state,
      toggleColorblind: () => toggle('colorblindMode'),
      toggleDyslexia: () => toggle('dyslexiaFont'),
      toggleNarration: () => toggle('narration'),
      toggleHighContrast: () => toggle('highContrast'),
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider')
  return ctx
}
