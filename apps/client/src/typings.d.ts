import { ElectronHandler } from './main/preload'
import type { Component } from 'vue'

declare module '*.json' {
  const value: any
  export default value
}

declare global {
  interface Window {
    winName?: string
    electron?: ElectronHandler
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    cnName: string
    icon?: string | Component
    auth?: string[]
  }
}
