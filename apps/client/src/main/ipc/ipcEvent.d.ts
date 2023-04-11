
// renderer 中发消息给 main
export type IToMainEvents = {
  shutdown: { winName: string }
  minimize: { winName: string }

  changeMaximize: { winName: string }

}

// main 发消息给 renderer
export type IToRendererEvents = {
  setWinName: string

  changeMaximize: { state: 'unmaximize' | 'maximize' }
}
