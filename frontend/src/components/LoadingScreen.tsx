import { motion } from 'framer-motion'
import { Anchor } from 'lucide-react'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-night via-ocean-deep to-black text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Loading Animation */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Anchor className="text-treasure-gold mx-auto" size={80} />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold pirate-font text-treasure-gold"
        >
          Preparing Your Adventure...
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex justify-center items-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-treasure-gold rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/70 text-lg"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Charting the treasure map...
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen