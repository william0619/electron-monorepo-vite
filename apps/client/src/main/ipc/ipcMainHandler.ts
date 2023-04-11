
import { BrowserWindow, ipcMain } from 'electron'
import type { IToMainEvents, IToRendererEvents } from './ipcEvent'
import type { IpcMainEvent } from 'electron'
import type { IToMainInvoke } from '@/main/ipc/ipcInvoke'

type ISend<K extends keyof IToRendererEvents> = {
  win: BrowserWindow
  channel: K
  data: IToRendererEvents[K]
}

type IOnMulti = {
  channels: Array<keyof IToMainEvents>
  handle: (params: { event: IpcMainEvent; channel: keyof IToMainEvents; data: any }) => void
}

class IpcMainHandler {
  onMulti(args: IOnMulti) {
    const { channels = [], handle } = args
    channels.forEach((channel) => {
      ipcMain.on(channel, (event, args) => {
        handle({ event, channel, data: args })
      })
    })
  }

  on<K extends keyof IToMainEvents>(channel: K, func: (args: IToMainEvents[K]) => void) {
    ipcMain.on(channel, (_event, args) => {
      func(args)
    })
  }

  once<K extends keyof IToMainEvents>(channel: K, func: (args: IToMainEvents[K]) => void) {
    ipcMain.once(channel, (_event, args) => {
      func(args)
    })
  }

  sendToBrowser<K extends keyof IToRendererEvents>(args: ISend<K>) {
    const { win, channel, data } = args
    win.webContents.send(channel, data)
  }

  handle<K extends keyof IToMainInvoke>(
    channel: K,
    func: (args: IToMainInvoke[K]['args']) => IToMainInvoke[K]['return']
  ) {
    ipcMain.handle(channel, (_, args) => {
      return func(args)
    })
  }
}

export const ipcMainHandler = new IpcMainHandler()
