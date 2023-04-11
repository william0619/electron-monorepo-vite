import { defineConfig } from 'vite'
import vitePaths from './vite.paths'
import { alias, plugins } from './vite.base.config'

export default defineConfig({
  root: vitePaths.srcWebPath,
  envDir: vitePaths.rootPath,
  base: './',
  build: {
    outDir: vitePaths.webDist,
    emptyOutDir: true,
    minify: true
  },
  plugins: [...plugins],
  resolve: {
    alias: {
      ...alias
    }
  }
})
