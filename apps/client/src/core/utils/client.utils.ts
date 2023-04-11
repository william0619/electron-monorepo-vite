/**
 author: william   email:362661044@qq.com
 create_at:2023-04-04 下午 07:59
 **/
import type { ElectronHandler } from '@/main/preload'

export class ClientUtils {
  // 是否客户端
  static getClient(): ElectronHandler | null {
    return window.electron ?? null
  }

  static getWinName() {
    return window.winName ?? 'unknown'
  }
}
