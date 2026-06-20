import { motion } from 'framer-motion'
import { Chessboard } from 'react-chessboard'
import { Check, Palette } from 'lucide-react'
import { useTheme, themes } from '../context/ThemeContext'
import { getThemedPieces } from '../utils/themedPieces'

export default function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <Palette size={40} className="mx-auto mb-3 text-[var(--color-primary)]" />
        <h1 className="text-3xl font-black mb-2">Escolha seu Tema</h1>
        <p className="text-gray-500">Personalize seu tabuleiro com o tema que mais combina com você!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, i) => {
          const isActive = currentTheme.id === theme.id
          return (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setTheme(theme.id)}
              className={`relative bg-white rounded-2xl p-4 shadow-md text-left cursor-pointer border-3 transition-all ${
                isActive ? 'border-[var(--color-primary)] shadow-lg' : 'border-transparent hover:shadow-lg'
              }`}
              style={{ borderWidth: '3px' }}
            >
              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{theme.icon}</span>
                <div>
                  <h3 className="font-bold">{theme.name}</h3>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden">
                <Chessboard
                  options={{
                    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                    allowDragging: false,
                    darkSquareStyle: { backgroundColor: theme.boardColors.dark },
                    lightSquareStyle: { backgroundColor: theme.boardColors.light },
                    boardStyle: { borderRadius: '8px' },
                    pieces: getThemedPieces(theme.id),
                  }}
                />
              </div>

              <div className="flex gap-2 mt-3">
                {Object.values(theme.colors).slice(0, 3).map((c, j) => (
                  <div key={j} className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: c }} />
                ))}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
