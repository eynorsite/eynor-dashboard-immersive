# 🏗️ Architecture Technique

## Vue d'ensemble

```
┌─────────────────────────────────────────┐
│         app/page.tsx (Main Page)        │
│  ┌───────────────────────────────────┐  │
│  │  ParticlesBackground (3D Layer)   │  │
│  │  ─────────────────────────────────│  │
│  │  CustomCursor (Overlay)           │  │
│  │  ─────────────────────────────────│  │
│  │  Hero3D                           │  │
│  │  ─────────────────────────────────│  │
│  │  KPICard × 4 (Grid)               │  │
│  │  ─────────────────────────────────│  │
│  │  Timeline3D | Chart3D + Activity  │  │
│  │  ─────────────────────────────────│  │
│  │  FloatingActionButton             │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Hiérarchie des Composants

### 1. Layout Global (`app/layout.tsx`)

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children} ← app/page.tsx injecté ici
      </body>
    </html>
  )
}
```

**Responsabilités** :
- Metadata SEO
- Fonts Geist
- Styles globaux (`globals.css`)

---

### 2. Page Principale (`app/page.tsx`)

**Structure** :
```tsx
<main>
  <ParticlesBackground />      ← Fixed, z-index -10
  <CustomCursor />             ← Fixed, z-index 9999
  
  <div className="relative z-10">
    <Hero3D />                 ← Section hero
    
    <div className="max-w-7xl">
      <Grid>
        <KPICard /> × 4         ← 4 indicateurs
      </Grid>
      
      <Grid>
        <Timeline3D />          ← 2 colonnes
        <div>
          <Chart3D />
          <GlassCard />         ← Activité récente
        </div>
      </Grid>
    </div>
  </div>
  
  <FloatingActionButton />     ← Fixed bottom-right
</main>
```

**Layering Z-Index** :
```
9999 : CustomCursor (top absolu)
50   : FloatingActionButton
10   : Contenu principal
0    : Base
-10  : ParticlesBackground (fond)
```

---

## Composants Détaillés

### ParticlesBackground (`components/ParticlesBackground.tsx`)

**Tech** : Three.js + React Three Fiber

```tsx
<Canvas>
  <Points positions={5000} colors={violet/teal}>
    <PointMaterial />
  </Points>
</Canvas>
```

**Performance** :
- `Float32Array` pour positions/couleurs
- `frustumCulled: false` pour visibilité complète
- Rotation lente via `useFrame`

**Code clé** :
```ts
useFrame((state) => {
  ref.current.rotation.x = state.clock.elapsedTime * 0.05
  ref.current.rotation.y = state.clock.elapsedTime * 0.075
})
```

---

### GlassCard (`components/GlassCard.tsx`)

**Props** :
```ts
interface GlassCardProps {
  children: ReactNode
  className?: string
  hover3D?: boolean    // Active rotation 3D
  glow?: boolean       // Active effet glow
}
```

**Effet 3D** :
```ts
const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

<motion.div style={{ rotateX, rotateY }}>
```

**Layers** :
1. Base glass : `bg-white/10 backdrop-blur-xl`
2. Gradient overlay : `from-primary/10 to-teal/10`
3. Shimmer effect : `animate-shimmer`
4. Contenu : `translateZ(20px)`

---

### KPICard (`components/KPICard.tsx`)

**Entrée progressive** :
```ts
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }} // Stagger
>
```

**Badge icône** :
```tsx
<div className="bg-gradient-to-br from-primary/20 to-teal/20">
  {icon}
</div>
```

**Valeur animée** :
```tsx
<motion.p
  initial={{ scale: 0.5 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', stiffness: 200 }}
>
  {value}
</motion.p>
```

---

### Timeline3D (`components/Timeline3D.tsx`)

**Structure** :
```tsx
{events.map((event, index) => (
  <>
    {/* Ligne connecteur */}
    <div className="absolute left-6 w-0.5 h-8 bg-gradient-to-b" />
    
    {/* Event card */}
    <motion.div
      whileHover={{ x: 10, scale: 1.02 }}
      className="border-l-4 border-primary"
    >
      {/* Contenu */}
    </motion.div>
  </>
))}
```

**Status indicator** :
```tsx
<motion.div
  className="w-3 h-3 rounded-full bg-teal-500"
  animate={{ scale: [1, 1.3, 1] }} // Pulse si in-progress
/>
```

---

### Chart3D (`components/Chart3D.tsx`)

**Tech** : Three.js Line + Spheres

```tsx
<Canvas>
  <Line points={[...]} color="#6D1FE0" lineWidth={3} />
  
  {points.map(point => (
    <mesh position={point}>
      <sphereGeometry args={[0.08]} />
      <meshStandardMaterial emissive="#6D1FE0" />
    </mesh>
  ))}
  
  <ambientLight />
  <pointLight position={[2, 2, 2]} />
</Canvas>
```

**Rotation douce** :
```ts
useFrame((state) => {
  lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
})
```

---

### Hero3D (`components/Hero3D.tsx`)

**Mesh gradient** :
```tsx
<div className="mesh-gradient opacity-60" />
```

**Badge animé** :
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', stiffness: 200 }}
>
  <Zap className="animate-spin-slow" />
  Dashboard Immersif v3.0
</motion.div>
```

**Floating blobs** :
```tsx
<motion.div
  className="w-32 h-32 bg-primary/20 blur-3xl"
  animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
  transition={{ duration: 6, repeat: Infinity }}
/>
```

---

### FloatingActionButton (`components/FloatingActionButton.tsx`)

**Ripple effect** :
```tsx
{isHovered && (
  <motion.span
    initial={{ scale: 1, opacity: 0.6 }}
    animate={{ scale: 2, opacity: 0 }}
    transition={{ duration: 0.8, repeat: Infinity }}
  />
)}
```

**Glow ring** :
```tsx
<motion.span
  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
  transition={{ duration: 1.5, repeat: Infinity }}
/>
```

---

### CustomCursor (`components/CustomCursor.tsx`)

**Deux layers** :

1. **Cursor dot** (instant) :
```tsx
<motion.div
  style={{ left: cursorX, top: cursorY }}
  className="w-2 h-2 bg-teal-500"
/>
```

2. **Outline** (spring delay) :
```tsx
<motion.div
  style={{ left: cursorXSpring, top: cursorYSpring }}
  className="w-8 h-8 border-2 border-primary"
/>
```

**Spring config** :
```ts
{ damping: 25, stiffness: 300 } // Réactif mais smooth
```

---

## Styles Globaux (`app/globals.css`)

### Utilities Custom

```css
.glass {
  @apply bg-white/10 backdrop-blur-xl border border-white/20;
}

.mesh-gradient {
  background: radial-gradient(...) /* 7 layers */;
  animation: mesh-move 20s ease infinite;
}

.transform-3d {
  transform-style: preserve-3d;
}
```

### Animations Keyframes

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## Config Tailwind (`tailwind.config.ts`)

### Palette EYNOR

```ts
colors: {
  primary: {
    DEFAULT: '#6D1FE0',
    50: '#F5ECFF',
    // ... 100-900
  },
  teal: {
    DEFAULT: '#22C997',
    // ... 50-900
  }
}
```

### Animations Custom

```ts
animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
  'shimmer': 'shimmer 2.5s infinite',
}
```

---

## Data Flow

### Static Data (Actuel)

```tsx
// page.tsx
const kpiData = [
  { label: "Stagiaires", value: "2,847", change: 12 },
  // ...
]

const events = [
  { title: "Formation B1V", date: "15 Sept", ... },
  // ...
]
```

### Future : API Integration

```tsx
// app/api/kpi/route.ts
export async function GET() {
  const data = await db.kpi.findAll()
  return Response.json(data)
}

// page.tsx
const { data } = await fetch('/api/kpi')
```

---

## Performance Optimizations

### 1. Three.js
- `Float32Array` au lieu d'arrays classiques
- `frustumCulled: false` minimise calculs
- Particle count ajustable

### 2. Framer Motion
- `layoutId` pour transitions partagées
- `whileInView` pour lazy animations
- `useReducedMotion` respect

### 3. Next.js
- Image Optimization auto
- Font Optimization (Geist)
- Static generation où possible

### 4. CSS
- GPU acceleration : `transform3d`, `will-change`
- Backdrop-filter performant
- Classes Tailwind purgées

---

## Extensibilité

### Ajouter un Composant

```tsx
// components/NewCard.tsx
export function NewCard() {
  return (
    <GlassCard hover3D glow>
      {/* Votre contenu */}
    </GlassCard>
  )
}
```

### Ajouter une Animation

```ts
// tailwind.config.ts
animation: {
  'custom': 'custom 3s ease infinite',
}

keyframes: {
  custom: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  }
}
```

### Changer Couleurs

```ts
// tailwind.config.ts
colors: {
  primary: { DEFAULT: '#VotreCouleur' },
}
```

Toutes les références `primary-500`, `primary-400` etc. suivent.

---

## Testing

### Component Tests (Future)

```tsx
// __tests__/GlassCard.test.tsx
import { render } from '@testing-library/react'
import { GlassCard } from '@/components/GlassCard'

test('renders with glassmorphism', () => {
  const { container } = render(<GlassCard>Test</GlassCard>)
  expect(container.firstChild).toHaveClass('glass')
})
```

### E2E Tests (Future)

```ts
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('3D hover works', async ({ page }) => {
  await page.goto('/')
  const card = page.locator('.glass').first()
  await card.hover()
  // Assert rotation
})
```

---

## Débogage

### Three.js Stats

```tsx
import { Stats } from '@react-three/drei'

<Canvas>
  <Stats /> {/* FPS counter */}
  <ParticlesField />
</Canvas>
```

### Framer Motion DevTools

```tsx
import { LazyMotion, domAnimation } from 'framer-motion'

<LazyMotion features={domAnimation} strict>
  {children}
</LazyMotion>
```

### Performance Profiler

Chrome DevTools :
- Performance tab
- Rendering → Paint flashing
- Layers → Composited layers

---

## Conclusion

Architecture modulaire avec :
- **Separation of Concerns** : chaque composant autonome
- **Composition** : GlassCard réutilisée partout
- **Performance** : optimisations GPU + lazy
- **Extensibilité** : design tokens Tailwind

**Point d'entrée principal** : `app/page.tsx`  
**Composants réutilisables** : `components/`  
**Config design** : `tailwind.config.ts`

---

**Next Step** : Lire `FEATURES.md` pour détails techniques
