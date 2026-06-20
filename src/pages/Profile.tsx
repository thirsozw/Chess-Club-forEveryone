import { motion } from 'framer-motion'
import { Trophy, Star, Flame, BookOpen, Coins, Target } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { lessons } from '../data/lessons'
import { medals as medalsList } from '../data/puzzles'

export default function Profile() {
  const { state } = useGame()
  const xpProgress = (state.xp % 100)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center mb-8">
          <div className="text-6xl mb-3">♞</div>
          <h1 className="text-3xl font-black mb-1">Meu Perfil</h1>
          <p className="opacity-80">Nível {state.level} — Jovem Xadrezista</p>
          <div className="max-w-xs mx-auto mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{state.xp} XP</span>
              <span>Próximo nível: {state.level * 100} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="h-3 rounded-full bg-white transition-all" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Star, label: 'XP Total', value: state.xp, color: 'yellow' },
            { icon: Coins, label: 'Moedas', value: state.coins, color: 'amber' },
            { icon: Flame, label: 'Streak', value: `${state.streak} dias`, color: 'orange' },
            { icon: BookOpen, label: 'Lições', value: `${state.completedLessons.length}/${lessons.length}`, color: 'green' },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-md text-center"
              >
                <Icon size={24} className={`mx-auto mb-2 text-${s.color}-500`} />
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Medals */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy size={24} className="text-yellow-500" /> Medalhas & Conquistas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {medalsList.map(medal => {
              const unlocked = state.medals.find(m => m.id === medal.id)
              return (
                <motion.div
                  key={medal.id}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-xl p-4 text-center transition-all ${
                    unlocked ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{medal.icon}</div>
                  <div className="font-bold text-sm">{medal.name}</div>
                  <div className="text-xs text-gray-500">{medal.description}</div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Completed lessons */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target size={24} className="text-green-500" /> Lições Concluídas
          </h2>
          {state.completedLessons.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Nenhuma lição concluída ainda. Comece a aprender!</p>
          ) : (
            <div className="space-y-2">
              {state.completedLessons.map(id => {
                const lesson = lessons.find(l => l.id === id)
                if (!lesson) return null
                return (
                  <div key={id} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <span className="text-2xl">{lesson.icon}</span>
                    <div>
                      <div className="font-bold text-sm">{lesson.title}</div>
                      {state.quizScores[id] !== undefined && (
                        <span className="text-xs text-blue-600 font-bold">Quiz: {state.quizScores[id]}%</span>
                      )}
                    </div>
                    <span className="ml-auto text-green-500">✓</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
