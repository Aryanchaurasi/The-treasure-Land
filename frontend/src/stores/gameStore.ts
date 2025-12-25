import { create } from 'zustand'

export interface GameChoice {
  step: string
  choice: string
  timestamp: string
}

export interface GameState {
  sessionId: string | null
  currentStep: string
  message: string
  prompt: string
  choices: Record<string, string>
  asciiArt: string
  gameOver: boolean
  won: boolean
  choicesMade: GameChoice[]
  isLoading: boolean
  error: string | null
}

export interface GameActions {
  setGameData: (data: Partial<GameState>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetGame: () => void
}

const initialState: GameState = {
  sessionId: null,
  currentStep: 'welcome',
  message: '',
  prompt: '',
  choices: {},
  asciiArt: '',
  gameOver: false,
  won: false,
  choicesMade: [],
  isLoading: false,
  error: null,
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,
  
  setGameData: (data) => set((state) => ({ ...state, ...data })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  resetGame: () => set(initialState),
}))