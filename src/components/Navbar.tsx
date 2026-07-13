import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, BookOpen, Gamepad2, Puzzle, Heart, User, Palette } from 'lucide-react'
import { useGame } from '../context/GameContext'

const navItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/learn', label: 'Aprender', icon: BookOpen },
  { path: '/play', label: 'Jogar', icon: Gamepad2 },
  { path: '/puzzles', label: 'Puzzles', icon: Puzzle },
  { path: '/impact', label: 'Impacto', icon: Heart },
  { path: '/themes', label: 'Temas', icon: Palette },
  { path: '/profile', label: 'Perfil', icon: User },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { state } = useGame()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-3xl">♞</span>
            <span className="font-extrabold text-xl text-[var(--color-primary)]">Chess For Everyone</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold no-underline transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-[var(--color-primary)]'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-full text-sm font-bold">
              <span>⭐</span> {state.xp} XP
            </div>
            <div className="flex items-center gap-1 bg-amber-100 px-3 py-1.5 rounded-full text-sm font-bold">
              <span>🪙</span> {state.coins}
            </div>
            {state.streak > 0 && (
              <div className="flex items-center gap-1 bg-orange-100 px-3 py-1.5 rounded-full text-sm font-bold">
                <span>🔥</span> {state.streak}
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t anim-fade-in">
          <div className="px-4 py-2 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl no-underline font-semibold ${
                    isActive ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              )
            })}
            <div className="flex gap-2 px-4 py-3">
              <span className="bg-yellow-100 px-3 py-1 rounded-full text-sm font-bold">⭐ {state.xp} XP</span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-bold">🪙 {state.coins}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
