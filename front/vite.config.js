import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/ws': {
          target: env.VITE_SOCKET_URL,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  }
})
