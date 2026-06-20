import { useTheme } from '../context/ThemeContext'
import { getThemePieceMap } from '../utils/themedPieces'

const defaultPieceSymbols: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
}

function parseFen(fen: string): (string | null)[][] {
  const rows = fen.split(' ')[0].split('/')
  return rows.map(row => {
    const cells: (string | null)[] = []
    for (const ch of row) {
      if (ch >= '1' && ch <= '8') {
        for (let i = 0; i < parseInt(ch); i++) cells.push(null)
      } else {
        cells.push(ch)
      }
    }
    return cells
  })
}

interface Props {
  fen?: string
  highlightSquares?: string[]
  size?: number
}

export default function StaticBoard({ fen, highlightSquares = [], size = 400 }: Props) {
  const { currentTheme } = useTheme()
  const themeMap = getThemePieceMap(currentTheme.id)

  const position = fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
  const board = parseFen(position)
  const sqSize = size / 8

  const highlightSet = new Set(highlightSquares)

  return (
    <div
      style={{
        width: size,
        maxWidth: '100%',
        aspectRatio: '1',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
      }}
    >
      {board.map((row, r) =>
        row.map((piece, c) => {
          const isLight = (r + c) % 2 === 0
          const squareId = String.fromCharCode(97 + c) + (8 - r)
          const isHighlighted = highlightSet.has(squareId)

          let symbol = ''
          if (piece) {
            if (themeMap) {
              symbol = themeMap[piece] || defaultPieceSymbols[piece] || ''
            } else {
              symbol = defaultPieceSymbols[piece] || ''
            }
          }

          return (
            <div
              key={squareId}
              style={{
                backgroundColor: isHighlighted
                  ? 'rgba(108, 99, 255, 0.35)'
                  : isLight
                    ? currentTheme.boardColors.light
                    : currentTheme.boardColors.dark,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `clamp(1.5rem, ${sqSize * 0.7}px, 3rem)`,
                userSelect: 'none',
                position: 'relative',
              }}
            >
              {symbol && (
                <span style={{ lineHeight: 1, filter: piece === piece.toUpperCase() ? 'none' : 'none' }}>
                  {symbol}
                </span>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
