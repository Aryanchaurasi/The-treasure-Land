import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Share2 } from 'lucide-react'
import Confetti from 'react-confetti'
import { useGame } from '../hooks/useGame'
import { useEffect, useState } from 'react'

const WinScreen = () => {
  const { message, resetGame, startGame } = useGame()
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    
    // Stop confetti after 10 seconds
    const timer = setTimeout(() => setShowConfetti(false), 10000)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  const handlePlayAgain = () => {
    resetGame()
    startGame()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Treasure Land Adventure',
        text: 'I found the treasure in Treasure Land Adventure! 🏆⭐',
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText('I found the treasure in Treasure Land Adventure! 🏆⭐ ' + window.location.href)
    }
  }

  return (
    <div className="text-center space-y-8 relative">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#fbbf24', '#f59e0b', '#d97706', '#92400e']}
        />
      )}

      {/* Victory Title */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="space-y-4"
      >
        <Trophy className="mx-auto text-treasure-gold animate-float" size={120} />
        <h1 className="text-6xl md:text-8xl font-bold pirate-font text-treasure-gold animate-glow">
          VICTORY!
        </h1>
      </motion.div>

      {/* Treasure Chest Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-8xl md:text-9xl"
        >
          💰
        </motion.div>
        
        {/* Sparkles around treasure */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${50 + 30 * Math.cos((i * Math.PI) / 4)}%`,
              top: `${50 + 30 * Math.sin((i * Math.PI) / 4)}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>

      {/* Victory Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto"
      >
        {message.split('\n').map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
      </motion.div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-black/50 p-6 rounded-lg border border-treasure-gold/30 backdrop-blur-sm max-w-md mx-auto"
      >
        <h3 className="text-xl font-bold text-treasure-gold mb-4">Achievement Unlocked!</h3>
        <div className="space-y-2 text-white/80">
          <div className="flex justify-between">
            <span>🏆 Treasure Hunter</span>
            <span className="text-treasure-gold">Completed</span>
          </div>
          <div className="flex justify-between">
            <span>⭐ Wise Choices</span>
            <span className="text-treasure-gold">Mastered</span>
          </div>
          <div className="flex justify-between">
            <span>🎯 Perfect Run</span>
            <span className="text-treasure-gold">Achieved</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAgain}
          className="group relative px-8 py-4 bg-gradient-to-r from-treasure-gold to-treasure-bright text-black font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] animate-glow"
        >
          <RotateCcw className="inline-block mr-2" size={20} />
          Play Again
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        >
          <Share2 className="inline-block mr-2" size={20} />
          Share Victory
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* Floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🪙
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WinScreen