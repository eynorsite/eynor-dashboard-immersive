# 🚀 Guide Déploiement Vercel

## Méthode 1 : Import GitHub (Recommandée)

### Étape 1 : Connexion Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Autoriser l'accès au repo `eynorsite/eynor-dashboard-immersive`

### Étape 2 : Import Projet
1. Cliquer "Add New..." → "Project"
2. Sélectionner `eynor-dashboard-immersive`
3. Cliquer "Import"

### Étape 3 : Configuration (Auto-détectée)
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Pas de modification nécessaire** — Next.js détecté automatiquement.

### Étape 4 : Deploy
1. Cliquer "Deploy"
2. Attendre ~2min (build + déploiement)
3. URL preview générée : `https://eynor-dashboard-immersive-xxx.vercel.app`

### Étape 5 : Custom Domain (Optionnel)
1. Settings → Domains
2. Ajouter `dashboard.eynor.fr`
3. Configurer DNS chez OVH :
   ```
   Type: CNAME
   Name: dashboard
   Value: cname.vercel-dns.com
   ```

---

## Méthode 2 : CLI Vercel

### Installation
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy Preview
```bash
cd /data/.openclaw/workspace/repos/eynor-dashboard-immersive
vercel
```

Répondre aux questions :
- Set up and deploy? **Y**
- Which scope? **eynorsite**
- Link to existing project? **N**
- Project name? **eynor-dashboard-immersive**
- Directory? **./

### Deploy Production
```bash
vercel --prod
```

---

## Variables d'Environnement

Aucune variable nécessaire pour la version actuelle.

Si ajout API externe :
1. Vercel Dashboard → Settings → Environment Variables
2. Ajouter `NEXT_PUBLIC_API_URL` etc.

---

## Configuration Vercel (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["cdg1"]
}
```

**Region `cdg1`** : Paris (Charles de Gaulle) pour latence minimale France.

---

## Build Settings

### Node Version
Vercel utilise automatiquement Node.js 20.x (compatible).

Forcer une version spécifique dans `package.json` :
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### Output
Next.js 15 utilise le nouveau output par défaut :
- Pas besoin de `output: 'standalone'`
- ISR et SSR fonctionnent out-of-the-box

---

## Performance Vercel

### Edge Network
- 120+ régions dans le monde
- Cache CDN automatique
- HTTP/3 + Brotli

### Optimisations
- **Image Optimization** : activée par défaut
- **Font Optimization** : Google Fonts en local
- **Analytics** : disponible dans dashboard

### Monitoring
1. Dashboard → Analytics
2. Voir :
   - Real User Monitoring (Core Web Vitals)
   - Requests/jour
   - Bandwidth

---

## CI/CD Automatique

Chaque push sur `main` déclenche :
1. Build automatique
2. Deploy preview
3. Tests (si configurés)
4. Deploy production si tests OK

**Branches** :
- `main` → Production
- Autres → Preview deployments

**Pull Requests** :
- Déploiement preview automatique
- Commentaire GitHub avec lien

---

## Rollback

En cas de problème :
1. Dashboard → Deployments
2. Trouver le déploiement précédent
3. Cliquer "..." → "Promote to Production"

Ou via CLI :
```bash
vercel rollback
```

---

## Custom Headers (Sécurité)

Ajouter dans `next.config.ts` :
```ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}
```

---

## Debugging

### Build Logs
Dashboard → Deployments → [Deployment] → "View Build Logs"

### Runtime Logs
Dashboard → Functions → Logs en temps réel

### Local Preview du Build
```bash
npm run build
npm start
```

---

## Coûts

### Plan Hobby (Gratuit)
- 100 GB bandwidth/mois
- Builds illimités
- Custom domains
- SSL automatique
- **Suffisant pour ce projet**

### Plan Pro (20$/mois)
- 1 TB bandwidth
- Password protection
- Analytics avancées
- Team collaboration

---

## Checklist Déploiement

- [x] Code pushé sur GitHub
- [x] README.md complet
- [ ] Import projet dans Vercel
- [ ] Vérifier build success
- [ ] Tester URL preview
- [ ] (Optionnel) Custom domain
- [ ] Partager lien avec Ulrich

---

## Support

**Docs Vercel** : https://vercel.com/docs
**Status** : https://www.vercel-status.com
**Discord** : https://vercel.com/discord

---

**Temps estimé déploiement** : 5 minutes ⚡
