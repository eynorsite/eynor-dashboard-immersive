'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-2xl z-50 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Ripple effect */}
      {isHovered && (
        <motion.span
          className="absolute inset-0 rounded-full bg-primary-400"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
      
      {/* Glow ring */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-primary-300"
        animate={{
          scale: [1, 1.4],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      
      <Plus className="w-6 h-6 text-white relative z-10" />
    </motion.button>
  )
}
