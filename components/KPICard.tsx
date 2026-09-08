'use client'

import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { ReactNode } from 'react'

interface KPICardProps {
  label: string
  value: string | number
  change?: number
  icon: ReactNode
  index: number
}

export function KPICard({ label, value, change, icon, index }: KPICardProps) {
  const isPositive = change && change > 0
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
    >
      <GlassCard hover3D glow>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-teal-500/20 border border-primary-500/30">
            {icon}
          </div>
          
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-teal-400' : 'text-red-400'
            }`}>
              <span>{isPositive ? '↗' : '↘'}</span>
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-400">{label}</p>
          <motion.p 
            className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: index * 0.1 + 0.2,
              type: 'spring',
              stiffness: 200,
            }}
          >
            {value}
          </motion.p>
        </div>
      </GlassCard>
    </motion.div>
  )
}
