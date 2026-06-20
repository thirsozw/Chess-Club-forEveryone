import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle } from 'lucide-react'
import { lessons } from '../data/lessons'
import { quizzes } from '../data/quizzes'
import { useGame } from '../context/GameContext'
import StaticBoard from '../components/StaticBoard'

export default function Lesson() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const [stepIndex, setStepIndex] = useState(0)

  const lesson = lessons.find(l => l.id === lessonId)
  if (!lesson) return <div className="text-center py-20">Lição não encontrada</div>

  const step = lesson.steps[stepIndex]
  const isLastStep = stepIndex === lesson.steps.length - 1
  const isCompleted = state.completedLessons.includes(lesson.id)
  const hasQuiz = quizzes[lesson.id] !== undefined

  function completeLesson() {
    dispatch({ type: 'COMPLETE_LESSON', lessonId: lesson.id })
    dispatch({ type: 'ADD_XP', amount: lesson.xpReward })
    dispatch({ type: 'ADD_COINS', amount: lesson.coinReward })
  }

  function handleNext() {
    if (isLastStep) {
      if (!isCompleted) completeLesson()
      if (hasQuiz) {
        navigate(`/quiz/${lesson.id}`)
      } else {
        navigate('/learn')
      }
    } else {
      setStepIndex(s => s + 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/learn')} className="flex items-center gap-1 text-gray-500 hover:text-[var(--color-primary)] mb-6 font-semibold bg-transparent border-none cursor-pointer text-base">
        <ChevronLeft size={20} /> Voltar às lições
      </button>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{lesson.icon}</span>
        <div>
          <h1 className="text-2xl font-black">{lesson.title}</h1>
          <p className="text-gray-500 text-sm">{lesson.description}</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <motion.div
          className="h-2 rounded-full bg-[var(--color-primary)]"
          initial={{ width: 0 }}
          animate={{ width: `${((stepIndex + 1) / lesson.steps.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[400px]">
            <StaticBoard
              fen={step.fen}
              highlightSquares={step.highlightSquares}
              size={400}
            />
          </div>
        </motion.div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                Passo {stepIndex + 1} de {lesson.steps.length}
              </div>
              <h2 className="text-xl font-bold mb-4">{step.title}</h2>
              <p className="text-gray-600 leading-relaxed text-base">{step.content}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStepIndex(s => s - 1)}
              disabled={stepIndex === 0}
              className="flex items-center gap-1 px-5 py-3 rounded-xl font-bold disabled:opacity-30 bg-gray-100 hover:bg-gray-200 border-none cursor-pointer text-base"
            >
              <ChevronLeft size={18} /> Anterior
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-5 py-3 rounded-xl font-bold bg-[var(--color-primary)] text-white hover:opacity-90 border-none cursor-pointer text-base"
            >
              {isLastStep ? (
                hasQuiz ? <>Quiz <HelpCircle size={18} /></> : <>Concluir <CheckCircle size={18} /></>
              ) : (
                <>Próximo <ChevronRight size={18} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
