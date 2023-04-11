import { defineConfig } from 'vite'
import * as path from 'path'
import vitePaths from './vite.paths'
import { builtins } from './externalModule'

export default defineConfig({
  publicDir: false,
  build: {
    rollupOptions: {
      external: builtins
    },
    lib: {
      entry: {
        preload: path.join(vitePaths.srcMainPath, './preload.ts')
      },
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    outDir: vitePaths.dllPath,
    emptyOutDir: false,
    minify: false
  }
})
