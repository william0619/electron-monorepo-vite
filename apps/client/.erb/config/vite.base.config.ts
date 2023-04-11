import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import * as path from 'path'
import vitePaths from './vite.paths'


const plugins = [
  vue(),
  vueJsx(),
  AutoImport({
    dirs: [path.resolve(vitePaths.srcPath)],
  }),
  Components({
    dirs: path.resolve(vitePaths.srcPath, './core'),
  }),
  createStyleImportPlugin({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        // esModule: true,
        resolveStyle: (name) => {
          // less
          const exclude = ['menu-item-group', 'menu-item', 'sub-menu', 'layout-sider']
          if (exclude.includes(name)) return ''
          return `@arco-design/web-vue/es/${name}/style/index.js`
          // return `@arco-design/web-vue/es/${name}/style/css.js`
        }
      }
    ]
  })
]

const alias = {
  '@': path.resolve(vitePaths.srcPath)
}

export { plugins, alias }
