import { useState, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { CheckCircle } from 'lucide-react'
import { puzzles, dailyMotivation } from '../data/puzzles'
import { useTheme } from '../context/ThemeContext'
import { useGame } from '../context/GameContext'
import { getThemedPieces } from '../utils/themedPieces'

export default function Puzzles() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [solved, setSolved] = useState<Set<string>>(new Set())
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const { currentTheme } = useTheme()
  const { dispatch } = useGame()

  const puzzle = puzzles[currentPuzzle]
  const quote = dailyMotivation[new Date().getDate() % dailyMotivation.length]
  const themedPieces = useMemo(() => getThemedPieces(currentTheme.id), [currentTheme.id])

  function onDrop({ sourceSquare, targetSquare }: { piece: unknown; sourceSquare: string; targetSquare: string | null }) {
    if (!targetSquare) return false
    const move = sourceSquare + targetSquare
    if (puzzle.solution.includes(move)) {
      setFeedback('correct')
      setSolved(prev => new Set(prev).add(puzzle.id))
      dispatch({ type: 'ADD_XP', amount: puzzle.xpReward })
      dispatch({ type: 'ADD_COINS', amount: 5 })
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 1500)
    }
    return false
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8 anim-fade-up">
        <h1 className="text-3xl font-black mb-2">🧩 Quebra-Cabeças</h1>
        <p className="text-gray-500 italic text-sm">{quote}</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {puzzles.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setCurrentPuzzle(i); setFeedback(null) }}
            className={`w-10 h-10 rounded-xl font-bold border-2 cursor-pointer text-sm transition-all ${
              i === currentPuzzle ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
              : solved.has(p.id) ? 'bg-green-100 border-green-400 text-green-700'
              : 'bg-white border-gray-200 hover:border-purple-300'
            }`}
          >
            {solved.has(p.id) ? '✓' : i + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="w-full max-w-[450px]">
            <Chessboard
              options={{
                position: puzzle.fen,
                onPieceDrop: onDrop,
                boardStyle: { borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
                darkSquareStyle: { backgroundColor: currentTheme.boardColors.dark },
                lightSquareStyle: { backgroundColor: currentTheme.boardColors.light },
                pieces: themedPieces,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">{puzzle.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                puzzle.difficulty === 'easy' ? 'bg-green-100 text-green-700'
                : puzzle.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
              }`}>
                {puzzle.difficulty === 'easy' ? 'Fácil' : puzzle.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{puzzle.description}</p>
            <p className="text-sm text-purple-600 font-bold">+{puzzle.xpReward} XP</p>
          </div>

          {feedback === 'correct' && (
            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 text-center anim-scale-in">
              <CheckCircle size={32} className="mx-auto mb-2 text-green-500" />
              <p className="font-bold text-green-700">Correto! Excelente!</p>
            </div>
          )}

          {feedback === 'wrong' && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-center anim-fade-in">
              <p className="font-bold text-red-700">Tente novamente!</p>
            </div>
          )}

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h3 className="font-bold mb-2">Progresso</h3>
            <p className="text-sm text-gray-600">{solved.size} de {puzzles.length} resolvidos</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${(solved.size / puzzles.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
