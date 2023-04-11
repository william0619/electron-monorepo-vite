
// ipcRenderer.invoke 与 ipcMain.handle
type IStructure<ARGS, RETURN> = {
  args: ARGS
  return: RETURN
}

export type IToMainInvoke = {
  // changeMaximize: IStructure<{ winName: string }, 'maximize' | 'unmaximize'>
}
