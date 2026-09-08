# 🚀 EYNOR Dashboard Immersif

Interface de tableau de bord **immersive 3D** pour EYNOR Formation, avec glassmorphism, animations premium et effets visuels avancés.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Design System
- **Glassmorphism** : cartes semi-transparentes avec backdrop blur
- **Palette EYNOR** : Violet #6D1FE0 + Teal #22C997
- **Mesh gradients animés** : fond vivant qui évolue
- **Effets de glow** dynamiques sur hover

### 🌌 Effets 3D
- **Particules 3D** : 5000 particules animées (Three.js)
- **Cartes 3D** : rotation selon la souris (parallax tilt)
- **Timeline en profondeur** : axe Z pour les événements
- **Graphique 3D** : courbe interactive en WebGL

### 🎭 Animations
- **Framer Motion** : spring physics naturelle
- **Hover effects** : scale, rotation, glow
- **Stagger animations** : apparition progressive des KPI
- **Micro-interactions** : ripple, shimmer, float

### 🎯 Composants
- **Hero 3D** : introduction immersive
- **KPI Cards** : 4 indicateurs animés
- **Timeline** : formations à venir
- **Chart 3D** : visualisation WebGL
- **Floating Action Button** : avec effet ripple
- **Custom Cursor** : curseur personnalisé avec traînée

## 🛠️ Stack Technique

```json
{
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "TailwindCSS",
  "3D": "Three.js + React Three Fiber",
  "animations": "Framer Motion",
  "components": "React 19"
}
```

### Dépendances principales
```json
{
  "next": "^16.3.4",
  "react": "^19.0.0",
  "three": "^0.172.0",
  "@react-three/fiber": "^8.18.3",
  "@react-three/drei": "^10.1.3",
  "framer-motion": "^11.18.0"
}
```

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Clone & Install
```bash
git clone https://github.com/eynorsite/eynor-dashboard-immersive.git
cd eynor-dashboard-immersive
npm install
```

### Dev Server
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Build Production
```bash
npm run build
npm start
```

## 🚀 Déploiement Vercel

### Option 1 : Via GitHub (recommandé)
1. Push le code sur GitHub
2. Import dans Vercel
3. Deploy automatique

### Option 2 : CLI
```bash
npm install -g vercel
vercel --prod
```

## 🎨 Personnalisation

### Couleurs
Modifier `tailwind.config.ts` :
```ts
colors: {
  primary: {
    DEFAULT: '#6D1FE0', // Votre violet
  },
  teal: {
    DEFAULT: '#22C997', // Votre teal
  },
}
```

### Particules 3D
Ajuster dans `components/ParticlesBackground.tsx` :
```ts
const positions = new Float32Array(5000 * 3) // Nombre de particules
```

### Animations
Timing dans `components/KPICard.tsx` :
```ts
transition={{ delay: index * 0.1 }} // Délai stagger
```

## 📊 Structure

```
eynor-dashboard-immersive/
├── app/
│   ├── page.tsx              # Page principale
│   ├── layout.tsx            # Layout + metadata
│   └── globals.css           # Styles globaux
├── components/
│   ├── ParticlesBackground.tsx  # Fond 3D particules
│   ├── GlassCard.tsx            # Carte glassmorphism
│   ├── KPICard.tsx              # Indicateur animé
│   ├── Timeline3D.tsx           # Timeline formations
│   ├── Chart3D.tsx              # Graphique WebGL
│   ├── Hero3D.tsx               # Hero immersif
│   ├── FloatingActionButton.tsx # FAB avec ripple
│   └── CustomCursor.tsx         # Curseur custom
├── lib/
│   └── utils.ts              # Utilitaires (cn)
└── tailwind.config.ts        # Config Tailwind
```

## 🎯 Features à venir

- [ ] Sound design (sons subtils sur interactions)
- [ ] Motion blur sur scroll rapide
- [ ] Modal immersif avec backdrop
- [ ] Dark/Light mode toggle
- [ ] Export vidéo des animations
- [ ] Dashboard responsive mobile optimisé

## 🔧 Performance

- **Optimisations Three.js** : frustum culling, instancing
- **Lazy loading** : composants 3D chargés à la demande
- **GPU acceleration** : transform3d, will-change
- **Debounce** : événements souris throttlés

## 📸 Captures

### Desktop
![Hero](docs/hero-screenshot.png)
![Dashboard](docs/dashboard-screenshot.png)

### Mobile
![Mobile](docs/mobile-screenshot.png)

## 🤝 Contribution

Les PRs sont bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une PR

## 📄 License

MIT License - voir [LICENSE](LICENSE)

## 👤 Auteur

**Ulrich Calmo - EYNOR Formation**
- GitHub: [@eynorsite](https://github.com/eynorsite)
- Email: contact@eynor.fr

## 🙏 Crédits

Inspirations :
- Apple Design System
- Stripe Checkout
- Three.js Examples
- Spline Design

---

**Made with ⚡ by EYNOR Formation**
