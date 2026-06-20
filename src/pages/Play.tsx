import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { RotateCcw, Info } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useGame } from '../context/GameContext'
import { getThemedPieces } from '../utils/themedPieces'

export default function Play() {
  const [game, setGame] = useState(new Chess())
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [gameOver, setGameOver] = useState('')
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const { currentTheme } = useTheme()
  const { dispatch } = useGame()

  const makeAIMove = useCallback((currentGame: Chess) => {
    const moves = currentGame.moves()
    if (moves.length === 0) return
    const randomMove = moves[Math.floor(Math.random() * moves.length)]
    currentGame.move(randomMove)
    setGame(new Chess(currentGame.fen()))
    setMoveHistory(prev => [...prev, randomMove])

    if (currentGame.isGameOver()) {
      if (currentGame.isCheckmate()) setGameOver('Xeque-Mate! Você perdeu.')
      else if (currentGame.isDraw()) setGameOver('Empate!')
    }
  }, [])

  const makeMove = useCallback((from: string, to: string) => {
    const gameCopy = new Chess(game.fen())
    try {
      const move = gameCopy.move({ from, to, promotion: 'q' })
      if (!move) return false
      setGame(gameCopy)
      setMoveHistory(prev => [...prev, move.san])
      setSelectedSquare(null)

      if (gameCopy.isGameOver()) {
        if (gameCopy.isCheckmate()) setGameOver('Xeque-Mate! Você venceu!')
        else if (gameCopy.isDraw()) setGameOver('Empate!')
        else if (gameCopy.isStalemate()) setGameOver('Afogamento!')
        dispatch({ type: 'ADD_XP', amount: 20 })
        return true
      }

      setTimeout(() => makeAIMove(gameCopy), 300)
      return true
    } catch {
      return false
    }
  }, [game, dispatch, makeAIMove])

  const legalMoveStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {}
    if (selectedSquare) {
      styles[selectedSquare] = { backgroundColor: 'rgba(108, 99, 255, 0.4)' }
      const moves = game.moves({ square: selectedSquare as 'a1', verbose: true })
      moves.forEach(m => {
        styles[m.to as string] = {
          background: 'radial-gradient(circle, rgba(108,99,255,0.3) 25%, transparent 25%)',
          borderRadius: '50%',
        }
      })
    }
    if (game.inCheck()) {
      const kingSquare = game.board().flat().find(p => p?.type === 'k' && p.color === game.turn())
      if (kingSquare) {
        styles[kingSquare.square] = { backgroundColor: 'rgba(255,0,0,0.4)' }
      }
    }
    return styles
  }, [selectedSquare, game])

  const themedPieces = useMemo(() => getThemedPieces(currentTheme.id), [currentTheme.id])

  function resetGame() {
    setGame(new Chess())
    setGameOver('')
    setMoveHistory([])
    setSelectedSquare(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-3xl font-black mb-2">🎮 Jogar Xadrez</h1>
        <p className="text-gray-500">Jogue contra o computador e pratique!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-full max-w-[560px]">
            <Chessboard
              options={{
                position: game.fen(),
                onPieceDrop: ({ sourceSquare, targetSquare }) => {
                  if (!targetSquare) return false
                  return makeMove(sourceSquare, targetSquare)
                },
                onSquareClick: ({ square }) => {
                  if (selectedSquare) {
                    const success = makeMove(selectedSquare, square)
                    if (!success) setSelectedSquare(square)
                  } else {
                    setSelectedSquare(square)
                  }
                },
                boardStyle: { borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
                darkSquareStyle: { backgroundColor: currentTheme.boardColors.dark },
                lightSquareStyle: { backgroundColor: currentTheme.boardColors.light },
                squareStyles: legalMoveStyles,
                animationDurationInMs: 200,
                pieces: themedPieces,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {gameOver && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black">{gameOver}</p>
            </motion.div>
          )}

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h3 className="font-bold mb-3 flex items-center gap-2"><Info size={18} /> Status</h3>
            <p className="text-sm text-gray-600">
              {game.turn() === 'w' ? '⬜ Brancas jogam' : '⬛ Pretas jogam'}
            </p>
            {game.inCheck() && <p className="text-red-500 font-bold text-sm mt-1">⚠️ Xeque!</p>}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h3 className="font-bold mb-3">Movimentos</h3>
            <div className="max-h-48 overflow-y-auto text-sm space-y-1">
              {moveHistory.length === 0 ? (
                <p className="text-gray-400">Nenhum movimento ainda</p>
              ) : (
                moveHistory.map((m, i) => (
                  <span key={i} className={`inline-block px-2 py-1 rounded mr-1 mb-1 text-xs font-mono ${i % 2 === 0 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    {Math.floor(i / 2) + 1}{i % 2 === 0 ? '.' : '...'}{m}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={resetGame} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 border-none cursor-pointer text-base">
              <RotateCcw size={18} /> Novo Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
