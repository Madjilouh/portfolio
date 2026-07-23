# Portfolio — Madiou

Site personnel (React + Vite + Tailwind CSS), thème "terminal / sysadmin".

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée dans le terminal (en général http://localhost:5173).

## Build de production

```bash
npm run build
```

Le résultat est généré dans `dist/`, prêt à être déployé (Netlify, Vercel, GitHub Pages...).

## Personnaliser

Tout le contenu (email, GitHub, LinkedIn, projets, compétences, formation) se trouve
en haut du fichier `src/App.jsx`, dans les constantes `CONTACT`, `SKILLS`, `PROJECTS`
et `TIMELINE`. Remplace les valeurs marquées `[À COMPLÉTER]`.
