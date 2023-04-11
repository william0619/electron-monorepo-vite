
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import { BrowserWindow, dialog, ipcMain } from 'electron'

export class AppUpdater {
  constructor(public mainWin: BrowserWindow) {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    // // 设置自动下载为false，也就是说不开始自动下载
    autoUpdater.autoDownload = false

    // autoUpdater.setFeedURL({
    //   provider: 'generic',
    //   url: 'http://127.0.0.1:4000/download'
    // })

    // 检查更新
    autoUpdater.checkForUpdates().then((res) => {
      console.log('checkForUpdates', res)
    })
    // const options: AllPublishOptions = {
    //   requestHeaders: {
    //     // Any request headers to include here
    //   },
    //   provider: 'generic',
    //   url: 'https://example.com/auto-updates'
    // }
    //
    // const autoUpdater = new NsisUpdater(options)
    // // autoUpdater.addAuthHeader(`Bearer ${token}`)
    // autoUpdater.checkForUpdatesAndNotify()
    this.listener()
  }

  listener() {
    // 检测到不需要更新时
    autoUpdater.on('update-not-available', () => {
      // 这里可以做静默处理，不给渲染进程发通知，或者通知渲染进程当前已是最新版本，不需要更新
      //  sendUpdateMessage(message.updateNotAva)
    })

    // .新有可用时，触发事件
    autoUpdater.on('update-available', () => {
      // 关闭应用程序
      // 下载并安装更新
      autoUpdater.downloadUpdate()
    })

    // 更新下载进度
    autoUpdater.on('download-progress', (progress) => {
      // 直接把当前的下载进度发送给渲染进程即可，有渲染层自己选择如何做展示
      // mainWindow.webContents.send('downloadProgress', progress)
      console.log(progress)
    })

    // 当需要更新的内容下载完成后
    autoUpdater.on('update-downloaded', () => {
      // 给用户一个提示，然后重启应用；或者直接重启也可以，只是这样会显得很突兀
      dialog
        .showMessageBox({
          title: '安装更新',
          message: '更新下载完毕，应用将重启并进行安装'
        })
        .then(() => {
          // 退出并安装应用
          setImmediate(() => autoUpdater.quitAndInstall())
        })
    })
  }
}
