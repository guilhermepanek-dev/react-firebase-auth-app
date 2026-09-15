import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // O site é publicado no GitHub Pages no subcaminho /react-firebase-auth-app/
  // (https://guilhermepanek-dev.github.io/react-firebase-auth-app/),
  // por isso o `base` precisa refletir esse caminho.
  base: '/react-firebase-auth-app/',
})
