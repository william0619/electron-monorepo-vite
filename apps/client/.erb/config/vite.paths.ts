
import * as path from 'path'

const rootPath = path.join(__dirname, '../..')

// preload dev 目录 用于watch
const dllPath = path.join(__dirname, '../dll')

// 开发目录
const srcPath = path.join(rootPath, 'src')
const srcMainPath = path.join(srcPath, 'main')
const srcRendererPath = path.join(srcPath, 'renderer')
const srcWebPath = path.join(srcPath, 'web')

// 打包目录
const releasePath = path.join(rootPath, 'release')
const releaseAppPath = path.join(releasePath, 'app')

const webDist = path.join(releasePath, 'web-dist')

export default {
  rootPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  srcWebPath,
  releasePath,
  releaseAppPath,
  dllPath,
  webDist
}
