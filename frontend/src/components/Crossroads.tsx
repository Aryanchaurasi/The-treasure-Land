import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Skull } from 'lucide-react'
import { useGame } from '../hooks/useGame'

const Crossroads = () => {
  const { message, prompt, makeChoice, isLoading } = useGame()

  return (
    <div className="text-center space-y-8">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold pirate-font text-treasure-gold"
      >
        The Crossroads
      </motion.h2>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
      >
        {message.split('\n').map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
      </motion.div>

      {/* Visual Crossroads */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative h-64 md:h-80 flex items-center justify-center"
      >
        {/* Path visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-32 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-full" />
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-2 bg-gradient-to-l from-green-600 to-green-400 rounded-full transform -rotate-45" />
            <div className="w-32 h-2 bg-gradient-to-r from-red-600 to-red-400 rounded-full transform rotate-45 -mt-2" />
          </div>
        </div>

        {/* Left path (safe) */}
        <motion.div
          className="absolute left-8 top-8 text-green-400"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center">
            <div className="text-2xl">🌟</div>
            <div className="text-sm mt-2">Safe Path</div>
          </div>
        </motion.div>

        {/* Right path (danger) */}
        <motion.div
          className="absolute right-8 top-8 text-red-400"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="text-center">
            <Skull size={32} className="mx-auto" />
            <div className="text-sm mt-2">Danger!</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Prompt */}
      {prompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-treasure-gold font-semibold"
        >
          {prompt}
        </motion.div>
      )}

      {/* Choice Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => makeChoice('l')}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] glow-green"
        >
          <ArrowLeft className="inline-block mr-2" size={20} />
          Go Left (Safe)
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => makeChoice('r')}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] glow-red"
        >
          <ArrowRight className="inline-block mr-2" size={20} />
          Go Right (Risk)
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center space-x-2 text-treasure-gold mt-4"
        >
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </motion.div>
      )}
    </div>
  )
}

export default Crossroads