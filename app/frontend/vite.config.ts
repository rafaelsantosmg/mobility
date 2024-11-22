import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexões externas
    port: 80,      // Porta configurada no docker-compose.yml
    strictPort: true // Garante que a porta seja fixa
  },
})
