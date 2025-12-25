import { motion } from 'framer-motion'
import { Anchor, Play } from 'lucide-react'
import { useGame } from '../hooks/useGame'

const GameScreen = () => {
  const { message, asciiArt, prompt, choices, makeChoice, isLoading } = useGame()

  return (
    <div className="text-center space-y-8">
      {/* Title */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-6xl md:text-8xl font-bold pirate-font text-treasure-gold mb-8"
      >
        <Anchor className="inline-block mr-4 animate-float" size={80} />
        Treasure Land
        <Anchor className="inline-block ml-4 animate-float" size={80} />
      </motion.h1>

      {/* ASCII Art */}
      {asciiArt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-black/50 p-6 rounded-lg border border-treasure-gold/30 backdrop-blur-sm"
        >
          <pre className="text-treasure-gold text-xs md:text-sm mono-font leading-tight overflow-x-auto">
            {asciiArt}
          </pre>
        </motion.div>
      )}

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 leading-relaxed"
        >
          {message.split('\n').map((line, index) => (
            <div key={index} className="mb-2">
              {line}
            </div>
          ))}
        </motion.div>
      )}

      {/* Prompt */}
      {prompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-treasure-gold font-semibold"
        >
          {prompt}
        </motion.div>
      )}

      {/* Choices */}
      {Object.keys(choices).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          {Object.entries(choices).map(([key, value]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => makeChoice(key)}
              disabled={isLoading}
              className="group relative px-8 py-4 bg-gradient-to-r from-treasure-gold to-treasure-bright text-black font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] animate-glow"
            >
              <Play className="inline-block mr-2" size={20} />
              {value.charAt(0).toUpperCase() + value.slice(1)}
              <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center space-x-2 text-treasure-gold"
        >
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </motion.div>
      )}
    </div>
  )
}

export default GameScreen