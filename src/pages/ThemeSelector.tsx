import { Check, Palette } from 'lucide-react'
import { useTheme, themes } from '../context/ThemeContext'
import StaticBoard from '../components/StaticBoard'

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10 anim-fade-up">
        <Palette size={40} className="mx-auto mb-3 text-[var(--color-primary)]" />
        <h1 className="text-3xl font-black mb-2">Escolha seu Tema</h1>
        <p className="text-gray-500">Personalize seu tabuleiro com o tema que mais combina com você!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, i) => {
          const isActive = currentTheme.id === theme.id
          return (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              aria-pressed={isActive}
              className={`relative bg-white rounded-2xl p-4 shadow-md text-left cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all anim-fade-up ${
                isActive ? 'ring-3 ring-[var(--color-primary)]' : ''
              }`}
              style={{ animationDelay: `${i * 0.05}s`, border: isActive ? '3px solid var(--color-primary)' : '3px solid transparent' }}
            >
              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center z-10">
                  <Check size={16} className="text-white" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{theme.icon}</span>
                <h3 className="font-bold">{theme.name}</h3>
              </div>

              <div className="rounded-xl overflow-hidden pointer-events-none">
                <StaticBoard size={280} themeId={theme.id} boardColors={theme.boardColors} />
              </div>

              <div className="flex gap-2 mt-3">
                {Object.values(theme.colors).slice(0, 3).map((c, j) => (
                  <div key={j} className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: c }} />
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
