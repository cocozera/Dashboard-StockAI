# 🚀 Guía de Deployment - Stock AI Dashboard

## Opción 1: Vercel (La más fácil y rápida)

### Método A: Desde la interfaz web (RECOMENDADO)

1. Subí tu código a GitHub (si aún no lo hiciste):
```bash
git init
git add .
git commit -m "Dashboard Stock AI completo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

2. Andá a [vercel.com](https://vercel.com)
3. Hacé clic en "Sign Up" o "Login" (podés usar tu cuenta de GitHub)
4. Hacé clic en "New Project"
5. Importá tu repositorio de GitHub
6. Vercel detectará automáticamente que es un proyecto Vite
7. Hacé clic en "Deploy"
8. ¡Listo! En 1-2 minutos tenés tu URL pública

### Método B: Desde la terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deployar (te va a pedir login la primera vez)
vercel

# Para production
vercel --prod
```

## Opción 2: Netlify

### Método A: Desde la interfaz web

1. Subí tu código a GitHub (igual que arriba)
2. Andá a [netlify.com](https://netlify.com)
3. Hacé clic en "Add new site" → "Import an existing project"
4. Conectá con GitHub y seleccioná tu repositorio
5. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Hacé clic en "Deploy"
7. ¡Listo! Tu sitio está online

### Método B: Drag & Drop (sin GitHub)

```bash
# Primero, construí el proyecto
npm run build

# Esto crea una carpeta "dist"
```

Luego:
1. Andá a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastrá la carpeta `dist` a la página
3. ¡Listo! URL instantánea

### Método C: Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deployar
netlify deploy --prod
```

## Opción 3: GitHub Pages (Gratis pero requiere config extra)

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Agregar estos scripts en package.json:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deployar
npm run deploy
```

Luego en GitHub:
1. Settings → Pages
2. Source: gh-pages branch
3. Listo!

## ⚡ Deployment Rápido (5 minutos)

**Para tu presentación, te recomiendo Vercel:**

```bash
# 1. Construir
npm run build

# 2. Instalar y deployar con Vercel
npx vercel --prod
```

Te va a dar una URL tipo: `https://stock-ai-dashboard.vercel.app`

## 🎯 Después del Deployment

1. **Guardá la URL** para tu presentación
2. **Probá el sitio** en diferentes dispositivos
3. **Compartí el link** con tu equipo

## 📱 URLs de Ejemplo

Después del deployment vas a tener algo como:
- Vercel: `https://stock-ai-dashboard-usuario.vercel.app`
- Netlify: `https://stock-ai-dashboard.netlify.app`

## 🔧 Troubleshooting

### Error: "Build failed"
```bash
# Probá localmente primero
npm run build
npm run preview
```

### Error: "Command not found"
```bash
# Asegurate de tener las dependencias
npm install
```

### Página en blanco
- Revisá que `dist/` se generó correctamente
- Verificá la configuración en `vercel.json` o `netlify.toml`

## 💡 Tips para la Presentación

1. **Abrí la URL antes** de presentar (no durante)
2. **Testeá en modo presentación** de tu navegador (F11)
3. **Tené un screenshot de backup** por si falla internet
4. **La URL es shareable** - podés proyectarla y otros la pueden ver en sus dispositivos

---

**¿Dudas?** Todo está configurado y listo para deployar. Solo elegí un método y seguí los pasos. ¡Suerte con la presentación! 🚀

