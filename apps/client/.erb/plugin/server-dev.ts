
import { spawn } from 'child_process'
import { Plugin } from 'vite'

export default function electronServerDev(): Plugin {
  return {
    name: 'electron-server-dev',
    apply: 'serve',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        console.log('Starting preload.js builder...')
        const preloadProcess = spawn('npm', ['run', 'dev:preload'], {
          shell: true,
          stdio: 'inherit'
        })
          .on('close', (code: number) => process.exit(code!))
          .on('error', (spawnError) => console.error(spawnError))

        console.log('Starting Main Process...')
        spawn('npm', ['run', 'dev:main'], {
          shell: true,
          stdio: 'inherit'
        })
          .on('close', (code: number) => {
            preloadProcess.kill()
            process.exit(code!)
          })
          .on('error', (spawnError) => console.error(spawnError))
      })
    }
  }
}

// export async function startup(argv = ['.', '--no-sandbox']) {
//   const { spawn } = await import('node:child_process')
//   // @ts-ignore
//   const electron = await import('electron')
//   const electronPath = <any>(electron.default ?? electron)
//
//   startup.exit()
//   // Start Electron.app
//   process.electronApp = spawn(electronPath, argv, { stdio: 'inherit' })
//   // Exit command after Electron.app exits
//   process.electronApp.once('exit', process.exit)
//
//   if (!startup.hookProcessExit) {
//     startup.hookProcessExit = true
//     process.once('exit', startup.exit)
//   }
// }
// startup.hookProcessExit = false
// startup.exit = () => {
//   if (process.electronApp) {
//     process.electronApp.removeAllListeners()
//     process.electronApp.kill()
//   }
// }
