
基于多窗体electron 应用

```shell
├─.erb    配置文件
├─assets  打包后的静态文件
├─build   electron package 使用资源文件夹
└─src
    ├─assets  资源文件
    ├─const   常量
    ├─core    业务代码核心
    │  ├─router
    │  ├─stores
    │  ├─utils
    │  └─view
    ├─main    主线程
    │  └─ipc
    ├─renderer  渲染进程多窗体入口
    │  ├─main
    │  └─order-detail
    └─web   web窗体入口
```