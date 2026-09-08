'use client'

import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { Calendar, Clock, Users } from 'lucide-react'

interface TimelineEvent {
  id: string
  title: string
  date: string
  participants: number
  status: 'completed' | 'upcoming' | 'in-progress'
}

const events: TimelineEvent[] = [
  {
    id: '1',
    title: 'Formation NF C 18-510 - Niveau B1V',
    date: '15 Septembre 2026',
    participants: 12,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Recyclage habilitation électrique',
    date: '22 Septembre 2026',
    participants: 8,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Formation initiale B2V BR',
    date: '29 Septembre 2026',
    participants: 15,
    status: 'upcoming',
  },
]

export function Timeline3D() {
  return (
    <GlassCard className="col-span-2">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Formations à venir
      </h3>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.15,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative"
          >
            {/* Ligne de connexion */}
            {index < events.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent" />
            )}
            
            <motion.div
              className="glass-dark rounded-xl p-4 border-l-4 border-primary-500 hover:border-teal-500 transition-colors duration-300"
              whileHover={{ x: 10, scale: 1.02 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">{event.title}</h4>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      event.status === 'completed' 
                        ? 'bg-teal-500' 
                        : event.status === 'in-progress'
                        ? 'bg-primary-500'
                        : 'bg-gray-500'
                    }`}
                    animate={event.status === 'in-progress' ? {
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}
