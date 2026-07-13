import { Trophy, Star, Flame, BookOpen, Coins, Target, Eye } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { useAccessibility } from '../context/AccessibilityContext'
import { lessons } from '../data/lessons'
import { medals as medalsList } from '../data/puzzles'

export default function Profile() {
  const { state } = useGame()
  const { dyslexiaFont, highContrast, toggleDyslexia, toggleHighContrast } = useAccessibility()
  const xpProgress = (state.xp % 100)

  const a11yOptions = [
    { label: 'Fonte para dislexia', desc: 'Letras mais fáceis de ler', active: dyslexiaFont, onToggle: toggleDyslexia },
    { label: 'Alto contraste', desc: 'Cores mais fortes e visíveis', active: highContrast, onToggle: toggleHighContrast },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 anim-fade-up">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center mb-8">
        <div className="text-6xl mb-3">♞</div>
        <h1 className="text-3xl font-black mb-1">Meu Perfil</h1>
        <p className="opacity-80">Nível {state.level} — Jovem Xadrezista</p>
        <div className="max-w-xs mx-auto mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{state.xp} XP</span>
            <span>Próximo: {state.level * 100} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div className="h-3 rounded-full bg-white transition-all" style={{ width: `${xpProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Star, label: 'XP Total', value: state.xp, bg: 'bg-yellow-50', color: 'text-yellow-500' },
          { icon: Coins, label: 'Moedas', value: state.coins, bg: 'bg-amber-50', color: 'text-amber-500' },
          { icon: Flame, label: 'Streak', value: `${state.streak} dias`, bg: 'bg-orange-50', color: 'text-orange-500' },
          { icon: BookOpen, label: 'Lições', value: `${state.completedLessons.length}/${lessons.length}`, bg: 'bg-green-50', color: 'text-green-500' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={`${s.bg} rounded-2xl p-4 text-center anim-scale-in`} style={{ animationDelay: `${i * 0.1}s` }}>
              <Icon size={24} className={`mx-auto mb-2 ${s.color}`} />
              <div className="text-2xl font-black">{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy size={24} className="text-yellow-500" /> Medalhas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {medalsList.map(medal => {
            const unlocked = state.medals.find(m => m.id === medal.id)
            return (
              <div key={medal.id} className={`rounded-xl p-4 text-center transition-all ${unlocked ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50 opacity-50'}`}>
                <div className="text-3xl mb-2">{medal.icon}</div>
                <div className="font-bold text-sm">{medal.name}</div>
                <div className="text-xs text-gray-500">{medal.description}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Eye size={24} className="text-blue-500" /> Acessibilidade
        </h2>
        <div className="space-y-3">
          {a11yOptions.map((opt, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="font-bold text-sm">{opt.label}</div>
                <div className="text-xs text-gray-500">{opt.desc}</div>
              </div>
              <button
                onClick={opt.onToggle}
                role="switch"
                aria-checked={opt.active}
                aria-label={opt.label}
                className={`relative w-12 h-7 rounded-full border-none cursor-pointer transition-colors ${opt.active ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${opt.active ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target size={24} className="text-green-500" /> Lições Concluídas
        </h2>
        {state.completedLessons.length === 0 ? (
          <p className="text-gray-400 text-center py-4">Nenhuma lição concluída ainda. Comece a aprender!</p>
        ) : (
          <div className="space-y-2">
            {state.completedLessons.map(cid => {
              const l = lessons.find(x => x.id === cid)
              if (!l) return null
              return (
                <div key={cid} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <span className="text-2xl">{l.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{l.title}</div>
                    {state.quizScores[cid] !== undefined && <span className="text-xs text-blue-600 font-bold">Quiz: {state.quizScores[cid]}%</span>}
                  </div>
                  <span className="ml-auto text-green-500">✓</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
