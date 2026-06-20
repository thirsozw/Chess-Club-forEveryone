import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react'
import { quizzes } from '../data/quizzes'
import { lessons } from '../data/lessons'
import { useGame } from '../context/GameContext'

export default function Quiz() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { dispatch } = useGame()
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = quizzes[lessonId || '']
  const foundLesson = lessons.find(l => l.id === lessonId)
  if (!questions || !foundLesson) return <div className="text-center py-20">Quiz não encontrado</div>
  const lesson = foundLesson

  const q = questions[currentQ]
  const isCorrect = selected === q.correctIndex
  const answered = selected !== null

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
    if (index === q.correctIndex) setScore(s => s + 1)
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1)
      setSelected(null)
    } else {
      const pct = Math.round((score / questions.length) * 100)
      dispatch({ type: 'SAVE_QUIZ_SCORE', lessonId: lesson.id, score: pct })
      dispatch({ type: 'ADD_XP', amount: Math.round(pct / 10) })
      setFinished(true)
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center anim-scale-in">
        <Trophy size={64} className="mx-auto mb-4 text-yellow-500" />
        <h1 className="text-3xl font-black mb-2">Quiz Completo!</h1>
        <p className="text-gray-500 mb-4">{lesson.title}</p>
        <div className="text-5xl font-black text-[var(--color-primary)] mb-2">{pct}%</div>
        <p className="text-gray-500 mb-8">{score} de {questions.length} corretas</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setFinished(false) }} className="px-6 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 border-none cursor-pointer text-base">
            Tentar Novamente
          </button>
          <button onClick={() => navigate('/learn')} className="px-6 py-3 rounded-xl font-bold bg-[var(--color-primary)] text-white hover:opacity-90 border-none cursor-pointer text-base flex items-center gap-2">
            Continuar <ArrowRight size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black">Quiz: {lesson.title}</h1>
        <p className="text-gray-500 text-sm">Pergunta {currentQ + 1} de {questions.length}</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div className="h-2 rounded-full bg-[var(--color-primary)] transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      <div key={currentQ} className="anim-fade-up">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-bold">{q.question}</h2>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let bg = 'bg-white hover:bg-purple-50'
            let border = 'border-gray-200'
            if (answered) {
              if (i === q.correctIndex) { bg = 'bg-green-50'; border = 'border-green-400' }
              else if (i === selected) { bg = 'bg-red-50'; border = 'border-red-400' }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left p-4 rounded-xl border-2 ${border} ${bg} font-semibold transition-all cursor-pointer text-base flex items-center justify-between`}
              >
                <span>{opt}</span>
                {answered && i === q.correctIndex && <CheckCircle size={20} className="text-green-500" />}
                {answered && i === selected && i !== q.correctIndex && <XCircle size={20} className="text-red-500" />}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="mt-4 anim-fade-up">
            <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <p className="font-bold text-sm mb-1">{isCorrect ? '✅ Correto!' : '❌ Não foi dessa vez...'}</p>
              <p className="text-sm text-gray-600">{q.explanation}</p>
            </div>
            <button onClick={handleNext} className="mt-4 w-full py-3 rounded-xl font-bold bg-[var(--color-primary)] text-white hover:opacity-90 border-none cursor-pointer text-base flex items-center justify-center gap-2">
              {currentQ < questions.length - 1 ? 'Próxima' : 'Ver Resultado'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
