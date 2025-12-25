import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from './hooks/useGame'
import GameScreen from './components/GameScreen'
import Crossroads from './components/Crossroads'
import Riverside from './components/Riverside'
import Doors from './components/Doors'
import WinScreen from './components/WinScreen'
import LoseScreen from './components/LoseScreen'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  const { currentStep, gameOver, won, isLoading, startGame } = useGame()

  useEffect(() => {
    // Auto-start game on app load
    startGame()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  const renderGameContent = () => {
    if (gameOver) {
      return won ? <WinScreen /> : <LoseScreen />
    }

    switch (currentStep) {
      case 'welcome':
        return <GameScreen />
      case 'crossroads':
        return <Crossroads />
      case 'riverside':
        return <Riverside />
      case 'doors':
        return <Doors />
      default:
        return <GameScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-night via-ocean-deep to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      
      {/* Stars */}
      <div className="fixed inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep + (gameOver ? '-over' : '')}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            {renderGameContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App