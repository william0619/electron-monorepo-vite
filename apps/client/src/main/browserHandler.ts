
import { app, BrowserWindow, screen } from 'electron'
import { isDev, resolveHtmlPath } from './utils'
import path from 'path'
import { winName } from '../const/index'
import { ipcMainHandler } from './ipc/ipcMainHandler'
import * as process from 'process'

type ICreateBrowser = {
  name: winName | string
}

const isMac = process.platform === 'darwin'

class BrowserHandler {
  browserMap = new Map<string, BrowserWindow>()

  constructor() {
    this.listener()
  }

  listener() {
    ipcMainHandler.onMulti({
      channels: ['minimize', 'shutdown', 'changeMaximize'],
      handle: (params) => {
        const { channel, data } = params
        switch (channel) {
          case 'shutdown':
            this.onClose(data.winName)
            break
          case 'minimize':
            this.onMinimize(data.winName)
            break
          case 'changeMaximize':
            this.onChangeMaximize(data.winName)
            break
        }
      }
    })
  }

  // 创建单一个种类窗体
  createBrowser(args: ICreateBrowser): BrowserWindow {
    const { name } = args

    // const { width, height } = screen.getPrimaryDisplay().workAreaSize
    // const _width = width / 2
    // const _height = height / 2
    // console.log('width', screen)
    const _width = 1280
    const _height = 800
    const win = new BrowserWindow({
      width: _width,
      minWidth: _width,
      height: _height,
      minHeight: _height,
      // icon: path.resolve(__dirname, '../../build/24x24.png'),
      autoHideMenuBar: true,
      title: 'vedo client',
      titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
      // trafficLightPosition: { x: 10, y: 10 },
      frame: false,
      webPreferences: {
        devTools: !app.isPackaged,
        nodeIntegration: false,
        contextIsolation: true,
        preload: isDev
          ? path.join(__dirname, '../../.erb/dll/preload.js')
          : path.join(__dirname, 'preload.js'),
        webSecurity: true
      }
    })
    // win.setWindowButtonOverlay()

    this.browserMap.set(name, win)

    win.loadURL(resolveHtmlPath(`${name}/index.html`))

    win.webContents.openDevTools()

    win.once('ready-to-show', () => {
      if (!win) {
        throw new Error('"mainWindow" is not defined')
      }
      if (process.env.START_MINIMIZED) {
        win.minimize()
      } else {
        win.show()
      }
      ipcMainHandler.sendToBrowser({ win, channel: 'setWinName', data: name })
    })

    win.once('closed', () => {
      this.browserMap.delete(name)
    })

    win.on('maximize', () => {
      ipcMainHandler.sendToBrowser({
        win,
        channel: 'changeMaximize',
        data: { state: 'maximize' }
      })
    })

    win.on('unmaximize', () => {
      ipcMainHandler.sendToBrowser({
        win,
        channel: 'changeMaximize',
        data: { state: 'unmaximize' }
      })
    })

    return win
  }

  createMultiBrowser(args: ICreateBrowser & { id: string }) {
    const { name: _name, id } = args
    const name = _name + '-' + id
    this.createBrowser({ name })
  }

  onMinimize(name: string) {
    const win = this.browserMap.get(name)
    if (win) {
      win.minimize()
    }
  }

  onChangeMaximize(name: string) {
    const win = this.browserMap.get(name)
    if (win) {
      const currentState = win.isMaximized()
      currentState ? win.unmaximize() : win.maximize()
    }
  }

  onClose(name: string) {
    const win = this.browserMap.get(name)
    if (win) {
      if (name === winName.main) {
        this.browserMap.forEach((win) => {
          win.close()
        })
      } else {
        win.close()
      }
    }
  }
}

export const browserHandler = new BrowserHandler()
