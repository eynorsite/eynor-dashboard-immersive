#!/bin/bash

# Script pour enregistrer une démo du dashboard
# Utilise Chrome headless + ffmpeg

# Prérequis :
# - Chrome/Chromium installé
# - ffmpeg installé

echo "🎬 Enregistrement démo EYNOR Dashboard Immersif"
echo ""

# Variables
URL="http://localhost:3000"
OUTPUT="docs/demo.mp4"
DURATION=10

# Vérifier que le serveur dev tourne
if ! curl -s $URL > /dev/null; then
    echo "❌ Serveur dev non démarré. Lancez 'npm run dev' d'abord."
    exit 1
fi

echo "✅ Serveur détecté sur $URL"
echo "⏱️  Enregistrement de ${DURATION}s..."

# Créer le dossier docs si nécessaire
mkdir -p docs

# Enregistrement avec ffmpeg (méthode X11)
ffmpeg -video_size 1920x1080 \
       -framerate 60 \
       -f x11grab \
       -i :0.0+0,0 \
       -t $DURATION \
       -vcodec libx264 \
       -preset ultrafast \
       -crf 18 \
       $OUTPUT

echo "✅ Vidéo sauvegardée : $OUTPUT"
echo ""
echo "💡 Pour convertir en GIF :"
echo "   ffmpeg -i $OUTPUT -vf 'fps=30,scale=800:-1:flags=lanczos' docs/demo.gif"
