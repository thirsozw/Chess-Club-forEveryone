import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { saveData, loadData } from '../utils/storage'

export interface ChessTheme {
  id: string
  name: string
  icon: string
  colors: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
  boardColors: {
    light: string
    dark: string
  }
}

export const themes: ChessTheme[] = [
  { id: 'default', name: 'Clássico', icon: '♟️', colors: { primary: '#6C63FF', secondary: '#FF6B6B', accent: '#4ECDC4', bg: '#F8F9FF' }, boardColors: { light: '#F0D9B5', dark: '#B58863' } },
  { id: 'soccer', name: 'Futebol', icon: '⚽', colors: { primary: '#2E7D32', secondary: '#FDD835', accent: '#1B5E20', bg: '#E8F5E9' }, boardColors: { light: '#C8E6C9', dark: '#388E3C' } },
  { id: 'princesses', name: 'Princesas', icon: '👑', colors: { primary: '#E91E90', secondary: '#FF69B4', accent: '#FFD700', bg: '#FFF0F5' }, boardColors: { light: '#FFE4E1', dark: '#DB7093' } },
  { id: 'space', name: 'Espaço', icon: '🚀', colors: { primary: '#1A237E', secondary: '#7C4DFF', accent: '#00BCD4', bg: '#E8EAF6' }, boardColors: { light: '#C5CAE9', dark: '#3F51B5' } },
  { id: 'animals', name: 'Animais', icon: '🦁', colors: { primary: '#E65100', secondary: '#FFB300', accent: '#795548', bg: '#FFF3E0' }, boardColors: { light: '#FFE0B2', dark: '#F57C00' } },
  { id: 'dinosaurs', name: 'Dinossauros', icon: '🦕', colors: { primary: '#33691E', secondary: '#8BC34A', accent: '#FF6F00', bg: '#F1F8E9' }, boardColors: { light: '#DCEDC8', dark: '#689F38' } },
  { id: 'superheroes', name: 'Super-Heróis', icon: '🦸', colors: { primary: '#B71C1C', secondary: '#1565C0', accent: '#FFD600', bg: '#FFEBEE' }, boardColors: { light: '#BBDEFB', dark: '#1976D2' } },
  { id: 'pirates', name: 'Piratas', icon: '🏴‍☠️', colors: { primary: '#3E2723', secondary: '#D84315', accent: '#FFB300', bg: '#EFEBE9' }, boardColors: { light: '#D7CCC8', dark: '#795548' } },
  { id: 'ocean', name: 'Fundo do Mar', icon: '🐠', colors: { primary: '#006064', secondary: '#00ACC1', accent: '#26C6DA', bg: '#E0F7FA' }, boardColors: { light: '#B2EBF2', dark: '#0097A7' } },
  { id: 'castle', name: 'Castelo Medieval', icon: '🏰', colors: { primary: '#4A148C', secondary: '#7B1FA2', accent: '#CE93D8', bg: '#F3E5F5' }, boardColors: { light: '#E1BEE7', dark: '#8E24AA' } },
  { id: 'forest', name: 'Floresta Encantada', icon: '🌿', colors: { primary: '#1B5E20', secondary: '#66BB6A', accent: '#A5D6A7', bg: '#E8F5E9' }, boardColors: { light: '#C8E6C9', dark: '#43A047' } },
]

interface ThemeContextType {
  currentTheme: ChessTheme
  setTheme: (id: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(() => loadData('theme', 'default'))

  const currentTheme = themes.find(t => t.id === themeId) || themes[0]

  useEffect(() => {
    saveData('theme', themeId)
    document.documentElement.style.setProperty('--color-primary', currentTheme.colors.primary)
    document.documentElement.style.setProperty('--color-secondary', currentTheme.colors.secondary)
    document.documentElement.style.setProperty('--color-accent', currentTheme.colors.accent)
    document.documentElement.style.setProperty('--color-bg', currentTheme.colors.bg)
  }, [themeId, currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
