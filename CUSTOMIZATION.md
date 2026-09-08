# 🎨 Guide de Personnalisation

Guide rapide pour adapter le dashboard à vos besoins.

---

## 🎨 Couleurs

### Changer la Palette

**Fichier** : `tailwind.config.ts`

```ts
colors: {
  primary: {
    DEFAULT: '#VotreCouleur',    // ← Remplacer ici
    50: '#...',
    // Générer sur: https://uicolors.app
  },
  teal: {
    DEFAULT: '#VotreCouleur',    // ← Remplacer ici
  }
}
```

**Tous les composants suivent automatiquement.**

---

## 🔢 Données KPI

### Remplacer Valeurs Mock

**Fichier** : `app/page.tsx`

**Avant** (mock statique) :
```tsx
<KPICard
  label="Stagiaires formés"
  value="2,847"
  change={12}
  icon={<Users />}
  index={0}
/>
```

**Après** (données dynamiques) :
```tsx
const kpiData = await fetch('/api/kpi').then(r => r.json())

<KPICard
  label={kpiData.students.label}
  value={kpiData.students.value}
  change={kpiData.students.change}
  icon={<Users />}
  index={0}
/>
```

### Créer Route API

**Fichier** : `app/api/kpi/route.ts`

```ts
export async function GET() {
  // Fetch depuis votre DB
  const data = {
    students: { label: "Stagiaires", value: "2,847", change: 12 },
    // ...
  }
  
  return Response.json(data)
}
```

---

## 📅 Timeline Formations

### Ajouter/Modifier Événements

**Fichier** : `components/Timeline3D.tsx`

```tsx
const events: TimelineEvent[] = [
  {
    id: '1',
    title: 'Votre Formation',           // ← Modifier
    date: '15 Septembre 2026',          // ← Modifier
    participants: 12,                   // ← Modifier
    status: 'upcoming',                 // completed | in-progress | upcoming
  },
  // Ajouter d'autres événements
]
```

**Format Date** : Texte libre (ex: "15 Sept 2026")

---

## 📊 Graphique 3D

### Changer Données Courbe

**Fichier** : `components/Chart3D.tsx`

```tsx
// Ligne 14
const data = [65, 59, 80, 81, 76, 85, 90, 95, 88]
              ↑ Remplacer par vos valeurs (0-100)
```

**Nombre de points** : Pas de limite, ajustez l'array.

---

## ✨ Particules 3D

### Nombre de Particules

**Fichier** : `components/ParticlesBackground.tsx`

```tsx
// Ligne 10
const particlesPosition = useMemo(() => {
  const positions = new Float32Array(5000 * 3)
                                     ↑ Modifier (ex: 3000, 10000)
```

**Attention** : Plus de particules = + GPU usage.

**Recommandations** :
- Desktop puissant : 10 000
- Standard : 5 000
- Mobile : 2 000

### Couleurs Particules

**Fichier** : `components/ParticlesBackground.tsx`

```tsx
// Lignes 23-24
const violet = new THREE.Color('#6D1FE0')  // ← Changer
const teal = new THREE.Color('#22C997')    // ← Changer
```

---

## 🎭 Animations

### Vitesses Animations

**Fichier** : `components/KPICard.tsx`

```tsx
transition={{ 
  duration: 0.5,    // ← Durée (secondes)
  delay: index * 0.1,  // ← Délai stagger
  type: 'spring',
  stiffness: 100,   // ← Réactivité (50-300)
}}
```

**Stiffness** :
- 50 : Lent, fluide
- 100 : Standard
- 200+ : Rapide, nerveux

### Désactiver Animations

**Option 1** : Respect `prefers-reduced-motion`

```tsx
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()

<motion.div
  animate={shouldReduceMotion ? {} : { y: 0 }}
>
```

**Option 2** : Désactiver globalement

```tsx
// app/layout.tsx
import { MotionConfig } from 'framer-motion'

<MotionConfig reducedMotion="always">
  {children}
</MotionConfig>
```

---

## 🖱️ Curseur Custom

### Désactiver Curseur

**Fichier** : `app/page.tsx`

```tsx
// Commenter ligne :
// <CustomCursor />
```

### Changer Couleurs

**Fichier** : `components/CustomCursor.tsx`

```tsx
// Ligne 37
className="border-2 border-primary-500"  // ← Changer couleur

// Ligne 46
className="bg-teal-500"  // ← Changer couleur trail
```

---

## 📐 Layout & Espacement

### Hero Height

**Fichier** : `components/Hero3D.tsx`

```tsx
// Ligne 6
<div className="py-20">  // ← Changer padding (py-10, py-32...)
```

### Grid KPI

**Fichier** : `app/page.tsx`

```tsx
// Ligne 23
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                                        ↑ Changer nombre colonnes
```

**Exemples** :
- 3 KPI : `lg:grid-cols-3`
- 5 KPI : `lg:grid-cols-5`

### Espacement Cards

```tsx
gap-6  // ← 24px
gap-4  // ← 16px
gap-8  // ← 32px
```

---

## 🎯 FloatingActionButton

### Position

**Fichier** : `components/FloatingActionButton.tsx`

```tsx
// Ligne 10
className="fixed bottom-8 right-8"
             ↑ bottom-4, right-4, left-8, top-8...
```

### Action au Clic

```tsx
<motion.button
  onClick={() => {
    // Votre action ici
    console.log('FAB clicked')
  }}
>
```

**Exemples** :
- Ouvrir modal
- Navigate vers `/new-formation`
- Déclencher action

---

## 🌓 Dark/Light Mode

### Ajouter Toggle (Future)

**Fichier** : `app/layout.tsx`

```tsx
'use client'
import { useState } from 'react'

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark')
  
  return (
    <html className={theme}>
      <body>{children}</body>
    </html>
  )
}
```

**Fichier** : `tailwind.config.ts`

```ts
darkMode: 'class',  // Active mode class
```

**CSS** :
```css
.dark {
  --background: #0a0a0f;
}

.light {
  --background: #ffffff;
}
```

---

## 📱 Responsive

### Breakpoints Tailwind

```
sm:   640px   (mobile landscape)
md:   768px   (tablet)
lg:   1024px  (desktop)
xl:   1280px  (large desktop)
2xl:  1536px  (très large)
```

**Exemple** :
```tsx
className="text-4xl md:text-6xl lg:text-7xl"
            ↑ mobile  ↑ tablet  ↑ desktop
```

### Désactiver 3D sur Mobile

**Fichier** : `components/GlassCard.tsx`

```tsx
// Ligne 52
hover3D && 'hover:scale-[1.02]'

// Remplacer par :
hover3D && 'md:hover:scale-[1.02]'  // Seulement desktop
```

---

## 🔧 Optimisations

### Réduire Bundle Size

**Option 1** : Lazy load Three.js

```tsx
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(
  () => import('@/components/ParticlesBackground'),
  { ssr: false }  // Pas de SSR pour Three.js
)
```

**Option 2** : Conditional render

```tsx
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

{!isMobile && <ParticlesBackground />}
```

### Lazy Load Images

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  loading="lazy"
  priority={false}
/>
```

---

## 🎨 Effets Visuels

### Glow Intensity

**Fichier** : `app/globals.css`

```css
.glow-primary {
  box-shadow: 0 0 30px rgba(109, 31, 224, 0.4);
                     ↑ Size      ↑ Opacity (0-1)
}
```

### Glassmorphism Blur

**Fichier** : `app/globals.css`

```css
.glass {
  backdrop-blur-xl  /* ← blur-sm, blur-md, blur-lg, blur-xl, blur-2xl */
}
```

### Mesh Gradient Speed

**Fichier** : `app/globals.css`

```css
animation: mesh-move 20s ease infinite;
                     ↑ Durée (10s = rapide, 40s = lent)
```

---

## 🌐 Internationalisation

### Textes

**Fichier** : `app/page.tsx`

Remplacer hardcodés :
```tsx
"Stagiaires formés" → t('kpi.students')
"Taux de réussite" → t('kpi.success_rate')
```

**Setup i18n** (next-intl) :

```bash
npm install next-intl
```

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'

export default function LocaleLayout({ children, params: { locale } }) {
  const messages = await import(`@/messages/${locale}.json`)
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
```

---

## 📊 Analytics

### Ajouter Google Analytics

**Fichier** : `app/layout.tsx`

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 🔐 Variables d'Environnement

### Ajouter API Keys

**Fichier** : `.env.local` (créer)

```env
NEXT_PUBLIC_API_URL=https://api.eynor.fr
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
DATABASE_URL=postgresql://...
```

**Usage** :

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

**⚠️ NEXT_PUBLIC_** : Exposé côté client  
**Sans préfixe** : Serveur uniquement

---

## 📝 Checklist Personnalisation

- [ ] Couleurs primary/teal changées
- [ ] Logo EYNOR ajouté
- [ ] Données KPI dynamiques
- [ ] Timeline events réels
- [ ] Graphique données live
- [ ] FAB action configurée
- [ ] Responsive testé mobile
- [ ] Performance optimisée
- [ ] Analytics ajoutées

---

## 🆘 Troubleshooting

### Animations laggy ?
→ Réduire nombre particules (3000 au lieu 5000)

### Build error Three.js ?
→ Lazy load avec `dynamic(() => import())`

### Glassmorphism invisible ?
→ Vérifier `backdrop-filter` support navigateur

### Curseur custom ne marche pas ?
→ Vérifier `hidden md:block` (mobile désactivé)

---

**Besoin d'aide ?**
- Lire `ARCHITECTURE.md` pour structure
- Voir `FEATURES.md` pour détails techniques
- GitHub Issues pour bugs

---

**Happy customizing!** 🎨✨
