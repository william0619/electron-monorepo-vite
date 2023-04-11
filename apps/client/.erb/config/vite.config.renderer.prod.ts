
/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite'
import * as fs from 'fs'
import vitePaths from './vite.paths'
import * as path from 'path'
import { InputOption } from 'rollup'
import electronServerDev from '../plugin/server-dev'
import { alias, plugins } from './vite.base.config'

const rendererNames = fs.readdirSync(vitePaths.srcRendererPath).filter((name) => {
  return !name.includes('.ts')
})

const buildRoot = path.join(vitePaths.releaseAppPath, './renderer')

const inputObj: InputOption = rendererNames.reduce((obj, name) => {
  obj[name] = path.join(vitePaths.srcRendererPath, name, 'index.html')
  return obj
}, {})

const _port = process.env.PORT || 1314
export default defineConfig({
  root: vitePaths.srcRendererPath,
  envDir: vitePaths.rootPath,
  base: './',
  build: {
    rollupOptions: {
      input: inputObj
    },
    outDir: buildRoot,
    emptyOutDir: true,
    minify: true
  },
  plugins: [...plugins, electronServerDev()],
  resolve: {
    alias: {
      ...alias
    }
  },
  server: {
    port: Number(_port),
    strictPort: true,
    cors: true
  }
})
