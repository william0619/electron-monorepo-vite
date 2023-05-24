"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const electronHandler = {
  ipcRenderer: {
    // 发消息给 main
    send(channel, args) {
      electron.ipcRenderer.send(channel, args);
    },
    // 从 main 接受消息
    on(channel, func) {
      const subscription = (_event, args) => func(args);
      electron.ipcRenderer.on(channel, subscription);
      return () => {
        electron.ipcRenderer.removeListener(channel, subscription);
      };
    },
    // 从 main 接受消息
    once(channel, func) {
      electron.ipcRenderer.once(channel, (_event, args) => func(args));
    },
    // 发消息给 main 再异步获取
    invoke(channel, args) {
      return electron.ipcRenderer.invoke(channel, args);
    }
  },
  // 是否windows 平台
  isWin32: () => {
    return process.platform === "win32";
  }
};
electron.contextBridge.exposeInMainWorld("electron", electronHandler);
exports.electronHandler = electronHandler;
