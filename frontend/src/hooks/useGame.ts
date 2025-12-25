import { useGameStore } from '../stores/gameStore'

const API_BASE = 'http://localhost:8000/api/game'

export const useGame = () => {
  const {
    sessionId,
    currentStep,
    message,
    prompt,
    choices,
    asciiArt,
    gameOver,
    won,
    choicesMade,
    isLoading,
    error,
    setGameData,
    setLoading,
    setError,
    resetGame,
  } = useGameStore()

  const startGame = async (userId?: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to start game')
      }
      
      const data = await response.json()
      
      setGameData({
        sessionId: data.session_id,
        currentStep: data.current_step,
        message: data.message,
        prompt: data.prompt,
        choices: data.choices,
        asciiArt: data.ascii_art,
        gameOver: false,
        won: false,
        choicesMade: [],
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game')
    } finally {
      setLoading(false)
    }
  }

  const makeChoice = async (choice: string) => {
    if (!sessionId) {
      setError('No active game session')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE}/${sessionId}/choice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to make choice')
      }
      
      const data = await response.json()
      
      setGameData({
        message: data.message,
        prompt: data.prompt,
        choices: data.choices || {},
        gameOver: data.game_over,
        won: data.won || false,
        currentStep: data.next_step || currentStep,
      })
      
      // Add choice to history
      const newChoice = {
        step: currentStep,
        choice,
        timestamp: new Date().toISOString(),
      }
      
      setGameData({
        choicesMade: [...choicesMade, newChoice],
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make choice')
    } finally {
      setLoading(false)
    }
  }

  const getGameStatus = async () => {
    if (!sessionId) return
    
    try {
      const response = await fetch(`${API_BASE}/status/${sessionId}`)
      if (!response.ok) {
        throw new Error('Failed to get game status')
      }
      
      const data = await response.json()
      
      setGameData({
        currentStep: data.current_step,
        choicesMade: data.choices_made,
        gameOver: data.game_over,
        won: data.won,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get game status')
    }
  }

  return {
    // State
    sessionId,
    currentStep,
    message,
    prompt,
    choices,
    asciiArt,
    gameOver,
    won,
    choicesMade,
    isLoading,
    error,
    
    // Actions
    startGame,
    makeChoice,
    getGameStatus,
    resetGame,
  }
}