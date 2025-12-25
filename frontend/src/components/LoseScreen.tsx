import { motion } from 'framer-motion'
import { Skull, RotateCcw, Home } from 'lucide-react'
import { useGame } from '../hooks/useGame'

const LoseScreen = () => {
  const { message, resetGame, startGame } = useGame()

  const handlePlayAgain = () => {
    resetGame()
    startGame()
  }

  const handleGoHome = () => {
    resetGame()
    startGame()
  }

  return (
    <div className="text-center space-y-8 relative">
      {/* Dramatic Title */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        className="space-y-4"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Skull className="mx-auto text-danger-red" size={120} />
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-bold creepy-font text-danger-red animate-shake">
          GAME OVER
        </h1>
      </motion.div>

      {/* Failure Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto"
      >
        {message.split('\n').map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.2 }}
            className="mb-2"
          >
            {line}
          </motion.div>
        ))}
      </motion.div>

      {/* Dramatic Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative h-64 md:h-80 flex items-center justify-center"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black/40 to-red-900/20 rounded-lg" />
        
        {/* Danger symbols */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-8xl md:text-9xl"
        >
          💀
        </motion.div>

        {/* Floating danger elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-60"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {i % 3 === 0 ? '🔥' : i % 3 === 1 ? '⚡' : '💥'}
          </motion.div>
        ))}

        {/* Screen shake effect overlay */}
        <motion.div
          className="absolute inset-0 bg-red-500/10 rounded-lg"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: 3,
            delay: 1,
          }}
        />
      </motion.div>

      {/* Failure Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-black/50 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm max-w-md mx-auto"
      >
        <h3 className="text-xl font-bold text-danger-red mb-4">Adventure Failed</h3>
        <div className="space-y-2 text-white/80">
          <div className="flex justify-between">
            <span>💀 Survival Rate</span>
            <span className="text-danger-red">0%</span>
          </div>
          <div className="flex justify-between">
            <span>⚰️ Fate</span>
            <span className="text-danger-red">Sealed</span>
          </div>
          <div className="flex justify-between">
            <span>🎯 Lesson</span>
            <span className="text-treasure-gold">Learned</span>
          </div>
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-lg text-treasure-gold italic max-w-lg mx-auto"
      >
        "Every great treasure hunter has fallen before rising to glory. Your adventure is not over!"
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAgain}
          className="group relative px-8 py-4 bg-gradient-to-r from-treasure-gold to-treasure-bright text-black font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] animate-glow"
        >
          <RotateCcw className="inline-block mr-2" size={20} />
          Try Again
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoHome}
          className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        >
          <Home className="inline-block mr-2" size={20} />
          Start Over
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* Floating skulls */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            💀
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LoseScreen