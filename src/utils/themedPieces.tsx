import React from 'react'

interface ThemePieceMap {
  label: string
  pieces: Record<string, string>
}

const themePieceMaps: Record<string, ThemePieceMap> = {
  princesses: {
    label: 'Princesas',
    pieces: {
      K: '🤴', Q: '👸', R: '🏰', B: '🧙‍♀️', N: '🦄', P: '⭐',
      k: '🫅', q: '👑', r: '🗼', b: '🧝‍♀️', n: '🐴', p: '🌟',
    },
  },
  soccer: {
    label: 'Futebol',
    pieces: {
      K: '🏆', Q: '⚽', R: '🥅', B: '👟', N: '🏃', P: '🟡',
      k: '🏅', q: '⚽', r: '🥅', b: '👟', n: '🏃‍♂️', p: '🟢',
    },
  },
  space: {
    label: 'Espaço',
    pieces: {
      K: '👨‍🚀', Q: '🛸', R: '🚀', B: '🌟', N: '🛰️', P: '⭐',
      k: '👽', q: '🛸', r: '☄️', b: '🌙', n: '🛰️', p: '🪐',
    },
  },
  animals: {
    label: 'Animais',
    pieces: {
      K: '🦁', Q: '🦅', R: '🐘', B: '🦒', N: '🐎', P: '🐾',
      k: '🐺', q: '🦉', r: '🦏', b: '🦊', n: '🦌', p: '🐾',
    },
  },
  dinosaurs: {
    label: 'Dinossauros',
    pieces: {
      K: '🦖', Q: '🦕', R: '🌋', B: '🦎', N: '🐊', P: '🥚',
      k: '🐉', q: '🦕', r: '🏔️', b: '🦎', n: '🐊', p: '🥚',
    },
  },
  superheroes: {
    label: 'Super-Heróis',
    pieces: {
      K: '🦸‍♂️', Q: '🦸‍♀️', R: '🏢', B: '🧙', N: '🦇', P: '💥',
      k: '🦹‍♂️', q: '🦹‍♀️', r: '🏗️', b: '🧛', n: '🐍', p: '💫',
    },
  },
  pirates: {
    label: 'Piratas',
    pieces: {
      K: '🏴‍☠️', Q: '🧜‍♀️', R: '⛵', B: '🦜', N: '🗡️', P: '💰',
      k: '☠️', q: '🧜', r: '🚢', b: '🦑', n: '⚓', p: '💎',
    },
  },
  ocean: {
    label: 'Fundo do Mar',
    pieces: {
      K: '🐙', Q: '🧜‍♀️', R: '🐋', B: '🐬', N: '🦈', P: '🐠',
      k: '🦑', q: '🧜', r: '🐳', b: '🐡', n: '🦭', p: '🐟',
    },
  },
  castle: {
    label: 'Castelo Medieval',
    pieces: {
      K: '👑', Q: '🏰', R: '⚔️', B: '🧙‍♂️', N: '🐎', P: '🛡️',
      k: '💀', q: '🏚️', r: '🗡️', b: '🧝', n: '🐲', p: '🪖',
    },
  },
  forest: {
    label: 'Floresta Encantada',
    pieces: {
      K: '🌳', Q: '🧚', R: '🍄', B: '🦉', N: '🦌', P: '🌿',
      k: '🌲', q: '🧝‍♀️', r: '🪵', b: '🐺', n: '🦊', p: '🍀',
    },
  },
}

const fenKeyMap: Record<string, string> = {
  wK: 'K', wQ: 'Q', wR: 'R', wB: 'B', wN: 'N', wP: 'P',
  bK: 'k', bQ: 'q', bR: 'r', bB: 'b', bN: 'n', bP: 'p',
}

function makeEmojiPiece(emoji: string) {
  return function EmojiPiece() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 45 45"
        width="100%"
        height="100%"
      >
        <text
          x="22.5"
          y="33"
          textAnchor="middle"
          fontSize="30"
          style={{ userSelect: 'none' }}
        >
          {emoji}
        </text>
      </svg>
    )
  }
}

export function getThemedPieces(themeId: string) {
  const map = themePieceMaps[themeId]
  if (!map) return undefined

  const result: Record<string, () => React.JSX.Element> = {}

  for (const [pieceKey, fenKey] of Object.entries(fenKeyMap)) {
    const emoji = map.pieces[fenKey]
    if (emoji) {
      result[pieceKey] = makeEmojiPiece(emoji)
    }
  }

  return result
}

export function getThemePieceMap(themeId: string): Record<string, string> | undefined {
  return themePieceMaps[themeId]?.pieces
}
