import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'production' === process.env.NODE_ENV ? '/你要部署的仓库名称/' : `./`,
})
