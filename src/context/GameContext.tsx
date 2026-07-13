import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { saveData, loadData } from '../utils/storage'

interface Medal {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
}

interface GameState {
  xp: number
  level: number
  coins: number
  streak: number
  lastPlayDate: string
  completedLessons: string[]
  quizScores: Record<string, number>
  medals: Medal[]
  totalPlayTime: number
  dailyChallengeCompleted: boolean
}

type GameAction =
  | { type: 'ADD_XP'; amount: number }
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'COMPLETE_LESSON'; lessonId: string }
  | { type: 'SAVE_QUIZ_SCORE'; lessonId: string; score: number }
  | { type: 'UNLOCK_MEDAL'; medal: Medal }
  | { type: 'UPDATE_STREAK' }
  | { type: 'COMPLETE_DAILY_CHALLENGE' }
  | { type: 'ADD_PLAY_TIME'; minutes: number }

const XP_PER_LEVEL = 100

function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

const initialState: GameState = {
  xp: 0,
  level: 1,
  coins: 0,
  streak: 0,
  lastPlayDate: '',
  completedLessons: [],
  quizScores: {},
  medals: [],
  totalPlayTime: 0,
  dailyChallengeCompleted: false,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_XP': {
      const newXp = state.xp + action.amount
      return { ...state, xp: newXp, level: calculateLevel(newXp) }
    }
    case 'ADD_COINS':
      return { ...state, coins: state.coins + action.amount }
    case 'COMPLETE_LESSON':
      if (state.completedLessons.includes(action.lessonId)) return state
      return { ...state, completedLessons: [...state.completedLessons, action.lessonId] }
    case 'SAVE_QUIZ_SCORE': {
      const best = Math.max(state.quizScores[action.lessonId] ?? 0, action.score)
      return { ...state, quizScores: { ...state.quizScores, [action.lessonId]: best } }
    }
    case 'UNLOCK_MEDAL':
      if (state.medals.find(m => m.id === action.medal.id)) return state
      return { ...state, medals: [...state.medals, { ...action.medal, unlockedAt: new Date().toISOString() }] }
    case 'UPDATE_STREAK': {
      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      if (state.lastPlayDate === today) return state
      const newStreak = state.lastPlayDate === yesterday ? state.streak + 1 : 1
      return { ...state, streak: newStreak, lastPlayDate: today, dailyChallengeCompleted: false }
    }
    case 'COMPLETE_DAILY_CHALLENGE':
      return { ...state, dailyChallengeCompleted: true }
    case 'ADD_PLAY_TIME':
      return { ...state, totalPlayTime: state.totalPlayTime + action.minutes }
    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, loadData('gameState', initialState))

  useEffect(() => {
    saveData('gameState', state)
  }, [state])

  useEffect(() => {
    dispatch({ type: 'UPDATE_STREAK' })
  }, [])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
