'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export function Hero3D() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Mesh gradient animé */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Zap className="w-4 h-4 text-teal-400" />
          </motion.div>
          <span className="text-sm text-gray-300">Dashboard Immersif v3.0</span>
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-teal-400 bg-clip-text text-transparent">
            EYNOR Formation
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Pilotez vos formations avec une interface immersive nouvelle génération
        </motion.p>
        
        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/50"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(109, 31, 224, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Nouvelle formation
          </motion.button>
          
          <motion.button
            className="px-8 py-4 rounded-full glass border border-white/20 text-white font-semibold"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Voir les stats
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-500/20 blur-3xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-teal-500/20 blur-3xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
