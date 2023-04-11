/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import vitePaths from './vite.paths'
import * as path from 'path'
import { builtins } from './externalModule'

export default defineConfig({
  publicDir: false,
  build: {
    rollupOptions: {
      external: builtins
    },
    lib: {
      entry: {
        main: path.join(vitePaths.srcMainPath, './main.ts'),
        preload: path.join(vitePaths.srcMainPath, './preload.ts')
      },
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    outDir: path.join(vitePaths.releaseAppPath, './main'),
    emptyOutDir: true,
    minify: true
  },

  resolve: {
    // #98
    // Since we're building for electron (which uses Node.js), we don't want to use the "browser" field in the packages.
    // It corrupts bundling packages like `ws` and `isomorphic-ws`, for example.
    mainFields: ['module', 'jsnext:main', 'jsnext']
  }
})
