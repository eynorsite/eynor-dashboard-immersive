'use client'

import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Hero3D } from '@/components/Hero3D'
import { KPICard } from '@/components/KPICard'
import { Timeline3D } from '@/components/Timeline3D'
import { Chart3D } from '@/components/Chart3D'
import { GlassCard } from '@/components/GlassCard'
import { FloatingActionButton } from '@/components/FloatingActionButton'
import { CustomCursor } from '@/components/CustomCursor'
import { Users, TrendingUp, Award, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ParticlesBackground />
      <CustomCursor />
      
      <div className="relative z-10">
        <Hero3D />
        
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {/* KPI Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <KPICard
              label="Stagiaires formés"
              value="2,847"
              change={12}
              icon={<Users className="w-6 h-6 text-primary-400" />}
              index={0}
            />
            
            <KPICard
              label="Taux de réussite"
              value="94.5%"
              change={3}
              icon={<TrendingUp className="w-6 h-6 text-teal-400" />}
              index={1}
            />
            
            <KPICard
              label="Certifications"
              value="2,691"
              change={8}
              icon={<Award className="w-6 h-6 text-primary-400" />}
              index={2}
            />
            
            <KPICard
              label="Sessions"
              value="156"
              change={-2}
              icon={<Calendar className="w-6 h-6 text-teal-400" />}
              index={3}
            />
          </motion.div>
          
          {/* Bento Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Timeline3D />
            
            <div className="space-y-6">
              <Chart3D />
              
              <GlassCard>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Activité récente
                </h3>
                
                <div className="space-y-3">
                  {[
                    { text: 'Nouvelle inscription - Jean Dupont', time: 'Il y a 5min', color: 'bg-teal-500' },
                    { text: 'Certification validée - Marie Laurent', time: 'Il y a 12min', color: 'bg-primary-500' },
                    { text: 'Session planifiée - B2V BR', time: 'Il y a 1h', color: 'bg-gray-500' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg glass-dark"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${item.color} mt-2`} />
                      <div className="flex-1">
                        <p className="text-sm text-white">{item.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
      
      <FloatingActionButton />
    </main>
  )
}
