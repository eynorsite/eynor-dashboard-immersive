# ⚡ Quick Start — 5 Minutes

Guide ultra-rapide pour lancer le dashboard EYNOR.

---

## 1️⃣ Installation (2 min)

```bash
# Clone
git clone https://github.com/eynorsite/eynor-dashboard-immersive.git
cd eynor-dashboard-immersive

# Install
npm install

# Dev
npm run dev
```

✅ **Ouvrir** : http://localhost:3000

---

## 2️⃣ Déploiement Vercel (3 min)

### Option A : Via Interface

1. Aller sur https://vercel.com
2. Se connecter avec GitHub
3. Cliquer "Add New..." → "Project"
4. Sélectionner `eynor-dashboard-immersive`
5. Cliquer "Deploy"
6. ✅ URL live générée

### Option B : Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

✅ **URL live** : https://eynor-dashboard-immersive.vercel.app

---

## 3️⃣ Personnalisation Express

### Changer Couleurs

`tailwind.config.ts` :
```ts
primary: { DEFAULT: '#VotreCouleur' }
teal: { DEFAULT: '#VotreCouleur' }
```

### Modifier Données

`app/page.tsx` :
```tsx
// Ligne 23 : KPI values
value="2,847" → value="Votre chiffre"

// components/Timeline3D.tsx
// Ligne 12 : Events
title: 'Votre formation'
```

---

## 📚 Docs Complètes

- **README.md** : Vue d'ensemble + installation
- **FEATURES.md** : Liste features techniques
- **ARCHITECTURE.md** : Structure code détaillée
- **CUSTOMIZATION.md** : Guide personnalisation
- **DEPLOY.md** : Déploiement complet
- **LIVRAISON.md** : Récap livraison

---

## 🎯 Checklist Post-Installation

- [ ] Dev server démarre (`npm run dev`)
- [ ] Page charge à http://localhost:3000
- [ ] Particules 3D animées
- [ ] Hover 3D sur cartes fonctionne
- [ ] Curseur custom visible (desktop)
- [ ] Responsive OK sur mobile

---

## 🆘 Problèmes Communs

### Port 3000 déjà utilisé ?
```bash
npm run dev -- -p 3001
```

### Build error ?
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Three.js lag ?
→ Réduire particules : `components/ParticlesBackground.tsx` ligne 10  
`5000` → `3000`

---

## 🚀 Next Steps

1. ✅ Installer localement
2. ✅ Déployer sur Vercel
3. ⏩ Personnaliser couleurs/données
4. ⏩ Connecter API réelle
5. ⏩ Ajouter analytics

---

**Prêt en 5 minutes** ⚡

Questions ? → Lire `README.md` ou `ARCHITECTURE.md`
