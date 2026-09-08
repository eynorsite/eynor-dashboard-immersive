# 🚀 Déploiement Automatique

Ce projet utilise **Vercel** pour le déploiement continu.

## Status

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Feynorsite%2Feynor-dashboard-immersive)

## Workflow

Chaque push sur `main` :
1. ✅ Build automatique Next.js 15
2. ✅ Tests TypeScript
3. ✅ Deploy production Vercel

## URLs

- **Production** : À configurer après premier déploiement
- **Preview** : Généré pour chaque branche/PR

## Custom Domain

Pour configurer `dashboard.eynor.fr` :

1. Vercel Dashboard → Settings → Domains
2. Add `dashboard.eynor.fr`
3. DNS OVH :
   ```
   Type: CNAME
   Name: dashboard
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

## Performance

Optimisations activées :
- ✅ Edge Network (120+ régions)
- ✅ Image Optimization
- ✅ Font Optimization
- ✅ Brotli compression
- ✅ HTTP/3

## Monitoring

Dashboard Vercel → Analytics :
- Real User Monitoring
- Core Web Vitals
- Request logs
