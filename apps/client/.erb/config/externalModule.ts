
import { builtinModules } from 'node:module'
// @ts-ignore
import pkg from '../../package.json'
const builtins = builtinModules.filter((e) => !e.startsWith('_'))
const _externalList = [...Object.keys(pkg.dependencies || {})]
builtins.push('electron', ..._externalList, ...builtins.map((m) => `node:${m}`))
export { builtins }
