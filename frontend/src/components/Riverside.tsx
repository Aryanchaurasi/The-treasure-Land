import { motion } from 'framer-motion'
import { Clock, Waves } from 'lucide-react'
import { useGame } from '../hooks/useGame'

const Riverside = () => {
  const { message, prompt, makeChoice, isLoading } = useGame()

  return (
    <div className="text-center space-y-8">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold pirate-font text-treasure-gold"
      >
        The Riverside
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

      {/* River Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900"
      >
        {/* Water waves */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-4 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: [-100, 100],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Crocodiles */}
        <motion.div
          className="absolute bottom-8 left-4 text-4xl"
          animate={{
            x: [0, 50, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🐊
        </motion.div>

        <motion.div
          className="absolute bottom-12 right-8 text-3xl"
          animate={{
            x: [0, -30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          🐊
        </motion.div>

        {/* Boat */}
        <motion.div
          className="absolute top-8 right-4 text-3xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ⛵
        </motion.div>

        {/* Water ripples */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 border-2 border-blue-300/50 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: `${40 + i * 10}%`,
              }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0.8, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
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
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => makeChoice('w')}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          <Clock className="inline-block mr-2" size={20} />
          Wait for Boat
          <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => makeChoice('s')}
          disabled={isLoading}
          className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] glow-red"
        >
          <Waves className="inline-block mr-2" size={20} />
          Swim Across
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

export default Riverside