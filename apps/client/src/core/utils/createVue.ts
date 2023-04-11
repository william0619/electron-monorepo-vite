/**
 author: william   email:362661044@qq.com
 create_at:2023-04-06 下午 02:39
 **/
import type { App, Component } from '@vue/runtime-core'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '../router'
import '@/assets/main.css'
// import ArcoVue from '@arco-design/web-vue'
// import '@arco-design/web-vue/dist/arco.css'

type IProps = {
  root: Component
  winName: string
  rootContainer?: string
  useRouter?: boolean
}

const createVueInstance = (args: IProps): App => {
  const { root, rootContainer, winName } = args
  const app = createApp(root)
  app.use(createPinia())
  app.use(router)
  // app.use(ArcoVue)
  app.mount(rootContainer ?? '#app')
  window.winName = winName

  return app
}

export { createVueInstance }
