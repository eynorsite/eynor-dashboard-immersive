'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticlesField() {
  const ref = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
    }
    
    return positions
  }, [])
  
  const particlesColor = useMemo(() => {
    const colors = new Float32Array(5000 * 3)
    
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3
      // Mix violet et teal
      const mixRatio = Math.random()
      const violet = new THREE.Color('#6D1FE0')
      const teal = new THREE.Color('#22C997')
      const color = violet.lerp(teal, mixRatio)
      
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    return colors
  }, [])
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })
  
  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
      <bufferAttribute
        attach="attributes-color"
        args={[particlesColor, 3]}
      />
    </Points>
  )
}

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ParticlesField />
      </Canvas>
    </div>
  )
}
