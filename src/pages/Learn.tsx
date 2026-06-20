import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { lessons, levelNames } from '../data/lessons'
import { useGame } from '../context/GameContext'

export default function Learn() {
  const { state } = useGame()

  const levels = Object.entries(levelNames).map(([num, name]) => ({
    level: Number(num),
    name,
    lessons: lessons.filter(l => l.level === Number(num)),
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Trilha de <span className="gradient-text">Aprendizado</span>
        </h1>
        <p className="text-gray-500">Siga a trilha e torne-se um mestre do xadrez!</p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
            {state.completedLessons.length}/{lessons.length} lições
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
            Nível {state.level}
          </span>
        </div>
      </motion.div>

      <div className="space-y-8">
        {levels.map(({ level, name, lessons: lvlLessons }) => (
          <motion.div
            key={level}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                {level}
              </div>
              <h2 className="text-xl font-bold">{name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-5 border-l-2 border-purple-200 pl-8">
              {lvlLessons.map((lesson) => {
                const completed = state.completedLessons.includes(lesson.id)
                const quizScore = state.quizScores[lesson.id]
                return (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="relative"
                  >
                    <Link
                      to={`/learn/${lesson.id}`}
                      className="block bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all no-underline text-inherit"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{lesson.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-base mb-1">{lesson.title}</h3>
                          <p className="text-gray-500 text-sm mb-2">{lesson.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
                              +{lesson.xpReward} XP
                            </span>
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                              +{lesson.coinReward} 🪙
                            </span>
                            {quizScore !== undefined && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                                Quiz: {quizScore}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {completed ? (
                            <CheckCircle size={24} className="text-green-500" />
                          ) : (
                            <ChevronRight size={24} className="text-gray-300" />
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
