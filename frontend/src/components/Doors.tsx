import { motion } from 'framer-motion'
import { Flame, Leaf, Star } from 'lucide-react'
import { useGame } from '../hooks/useGame'

const Doors = () => {
  const { message, prompt, makeChoice, isLoading } = useGame()

  const doors = [
    {
      key: 'r',
      color: 'red',
      icon: Flame,
      gradient: 'from-red-600 to-red-500',
      glow: 'glow-red',
      label: 'Red Door',
      emoji: '🔥',
      description: 'Flames flicker behind this door...'
    },
    {
      key: 'g',
      color: 'green',
      icon: Leaf,
      gradient: 'from-green-600 to-green-500',
      glow: 'glow-green',
      label: 'Green Door',
      emoji: '🟢',
      description: 'Something lurks in the shadows...'
    },
    {
      key: 'y',
      color: 'yellow',
      icon: Star,
      gradient: 'from-yellow-600 to-yellow-500',
      glow: 'animate-glow',
      label: 'Yellow Door',
      emoji: '⭐',
      description: 'Golden light emanates from within...'
    }
  ]

  return (
    <div className="text-center space-y-8">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold pirate-font text-treasure-gold"
      >
        The Three Doors
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

      {/* Prompt */}
      {prompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-treasure-gold font-semibold"
        >
          {prompt}
        </motion.div>
      )}

      {/* Doors */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
      >
        {doors.map((door, index) => {
          const IconComponent = door.icon
          return (
            <motion.div
              key={door.key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              className="relative group"
            >
              {/* Door Frame */}
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative h-80 w-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-4 border-gray-600 shadow-2xl overflow-hidden cursor-pointer"
                onClick={() => makeChoice(door.key)}
              >
                {/* Door Background */}
                <div className={`absolute inset-2 bg-gradient-to-b ${door.gradient} rounded-md ${door.glow} transition-all duration-300 group-hover:brightness-110`} />
                
                {/* Door Handle */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-yellow-600 rounded-full shadow-lg" />
                
                {/* Door Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: door.key === 'r' ? [0, 5, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-6xl"
                  >
                    {door.emoji}
                  </motion.div>
                </div>

                {/* Special effects */}
                {door.key === 'r' && (
                  <div className="absolute inset-0 fire-flicker">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-8 bg-orange-400 rounded-full opacity-60"
                        style={{
                          left: `${30 + i * 20}%`,
                          bottom: '10%',
                        }}
                        animate={{
                          height: [20, 40, 20],
                          opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}

                {door.key === 'y' && (
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + i * 10}%`,
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
              </motion.div>

              {/* Door Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="mt-4 space-y-2"
              >
                <h3 className="text-xl font-bold text-white">{door.label}</h3>
                <p className="text-sm text-gray-300">{door.description}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center space-x-2 text-treasure-gold mt-8"
        >
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-treasure-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </motion.div>
      )}
    </div>
  )
}

export default Doors