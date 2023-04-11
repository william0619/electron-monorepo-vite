
import { URL } from 'url'
import * as path from 'path'

export const isDev = process.env.NODE_ENV === 'development'

export function resolveHtmlPath(htmlFileName: string) {
  if (isDev) {
    const port = process.env.PORT || 1314
    const url = new URL(`http://localhost:${port}`)
    url.pathname = htmlFileName
    return url.href
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`
}
