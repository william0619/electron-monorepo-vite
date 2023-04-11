import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import type { IToMainEvents, IToRendererEvents } from './ipc/ipcEvent'
import type { IToMainInvoke } from './ipc/ipcInvoke'

export const electronHandler = {
  ipcRenderer: {
    // 发消息给 main
    send<K extends keyof IToMainEvents>(channel: K, args: IToMainEvents[K]) {
      ipcRenderer.send(channel, args)
    },
    // 从 main 接受消息
    on<K extends keyof IToRendererEvents>(channel: K, func: (args: IToRendererEvents[K]) => void) {
      const subscription = (_event: IpcRendererEvent, args: IToRendererEvents[K]) => func(args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    // 从 main 接受消息
    once<K extends keyof IToRendererEvents>(
      channel: K,
      func: (args: IToRendererEvents[K]) => void
    ) {
      ipcRenderer.once(channel, (_event, args) => func(args))
    },
    // 发消息给 main 再异步获取
    invoke<K extends keyof IToMainInvoke>(
      channel: K,
      args: IToMainInvoke[K]['args']
    ): Promise<IToMainInvoke[K]['return']> {
      return ipcRenderer.invoke(channel, args)
    },
  },
  // 是否windows 平台
  isWin32: () => {
    return process.platform === 'win32'
  }
}
contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
