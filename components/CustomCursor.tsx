'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    
    window.addEventListener('mousemove', moveCursor)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])
  
  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-8 h-8 rounded-full border-2 border-primary-500 mix-blend-difference hidden md:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
      
      {/* Trail effect */}
      <motion.div
        className="pointer-events-none fixed z-[9998] w-2 h-2 rounded-full bg-teal-500 hidden md:block"
        style={{
          left: cursorX,
          top: cursorY,
          x: 6,
          y: 6,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      />
    </>
  )
}
