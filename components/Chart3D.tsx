'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Text } from '@react-three/drei'
import * as THREE from 'three'
import { GlassCard } from './GlassCard'

function LineChart3D() {
  const lineRef = useRef<THREE.Line>(null)
  
  // Données simulées
  const data = [65, 59, 80, 81, 76, 85, 90, 95, 88]
  const points = data.map((value, index) => {
    return new THREE.Vector3(
      (index / (data.length - 1)) * 4 - 2,
      (value / 100) * 2 - 1,
      0
    )
  })
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })
  
  return (
    <group ref={lineRef}>
      <Line
        points={points}
        color="#6D1FE0"
        lineWidth={3}
      />
      
      {/* Points sur la courbe */}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={i === points.length - 1 ? '#22C997' : '#6D1FE0'}
            emissive={i === points.length - 1 ? '#22C997' : '#6D1FE0'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
      >
        Taux de réussite
      </Text>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} />
    </group>
  )
}

export function Chart3D() {
  return (
    <GlassCard className="h-[400px]">
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Performance 3D
      </h3>
      <div className="h-[320px] w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <LineChart3D />
        </Canvas>
      </div>
    </GlassCard>
  )
}
