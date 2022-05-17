# Motrix 

- Electron 11.x
- vue2 + element-ui + axios + loadsh
- aria2

一个开源内核使用 Aria2 的下载器，

主要技术栈：

- vue-electron + ElementUI  + axios

主要依赖包：

| 包名                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| clipboard-polyfill  | 旧版浏览器用的复制粘贴包，现代浏览器采用：`navigator.clipboard.write` |
| vue-i18next/i18next | 多语言包                                                     |
| electron-debug      |                                                              |
| electron-is         |                                                              |
| electron-log        |                                                              |
| electron-updater    |                                                              |
| electron-store      |                                                              |
| ws                  | web socket 模块                                              |
| lodash              |                                                              |



# 项目基础架构

```
项目依赖 aria2的二进制程序，所以 engine存放该二进制入口
```



```bash
MOTRIX
│  .babelrc     
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .travis.yml
│  app-update.yml
│  appveyor.yml
│  CODE_OF_CONDUCT.md
│  CONTRIBUTING-CN.md
│  CONTRIBUTING.md
│  jsconfig.json
│  LICENSE
│  package.json
│  README-CN.md
│  README.md
│  yarn.lock
├─.electron-vue  # electron-vue的配置文件，打包配置等
│      build.js  # webpack 编译配置文件
│      dev-client.js # 里面是webpack 热更新的一些配置，未找到引入文件
│      dev-runner.js # npm run dev 调用的入口
│      webpack.main.config.js
│      webpack.renderer.config.js
│      webpack.web.config.js
├─.github
│  ├─ISSUE_TEMPLATE
│  └─workflows
├─build  # 最终编译导出的目录
├─extra  # aira2 实体引擎文件和配置文件
├─extra  # extra/${darwin|linux|win32}/engine/aria2客户端
│  │  README.md
│  ├─darwin 
│  │  └─engine                       
│  │          aria2.conf
│  │          aria2c
│  ├─linux
│  │  └─engine
│  │          aria2.conf
│  │          aria2c
│  └─win32
│      └─engine
│              aria2.conf
│              aria2c.exe
├─screenshots # 软件相关截图  
│      *.png
├─src           # 源码存放
│  ├─main       # 🔴主进程
│  ├─renderer   # 🔴渲染进程，vue全家桶
│  └─shared     # 主进程和渲染进程都会用到的一些共同api
│      ├─aria2  # node 调用 aria2的模块
│      │  └─lib
│      ├─locales # i18n 的多语言模块
│      │  └─zh-TW
│      └─utils  # 公共的api函数库
└─static        # 静态资源， 各种icon png 图标存放
    └─icons
```



# 主进程

## **目录结构**

```
project/src/
├─main # 主进程相关逻辑
│  Application.js
│  index.dev.js
│  index.js
│  Launcher.js
│
├─configs   # 内置配置
│      engine.js
│      page.js
│      protocol.js
│
├─core      # 业务代码
│      AutoLaunchManager.js 
│      ConfigManager.js
│      Context.js
│      EnergyManager.js
│      Engine.js
│      EngineClient.js
│      ExceptionHandler.js
│      Logger.js
│      ProtocolManager.js
│      UpdateManager.js
│      UPnPManager.js
│
├─menus      # Electron 菜单数据
│      darwin.json
│      linux.json
│      touchBar.json
│      tray.json
│      win32.json
│
├─pages      # 独立页面
│      about.html
│      index.html
│
├─ui         # 界面元素配置
│      DockManager.js
│      Locale.js
│      MenuManager.js
│      ThemeManager.js
│      TouchBarManager.js
│      TrayManager.js
│      WindowManager.js
│
└─utils
       index.js
       menu.js
```

## **执行流程**

```flow
st=>start: start
en=>end: end

1=>operation: 入口：main/index.js
1、通过package设置appid
2、执行 @electron/remote/main.initalize 初始化了remote
3、获取 static 目录，用来存放 icons和一些应用图标资源
4、引入 main/Launcher.Lanuncher
5、实例化 Lanuncher 并挂载到全局
6、更新了 global.__static 这个目录到全局

2=>operation: 加载层：main/Launcher.js
1、Launcher 继承了 EventEmitter
2、创建Launcher实例，并挂载到global
3、加载了 main/core/Logger.js 日志管理
4、加载了 main/core/ExceptionHandler 错误处理
5、加载了 main/Application.js 

3=>operation: 程序层：main/Application.js
1、Application 继承了 EventEmitter
2、导入 core下所有业务模块
3、导入 ui下所有模块
4、Application 设置 isReady = falst
5、执行 Application.init() 初始化 core和ui模块里面的所有初始化函数
6、首先初始化 config 配置对象





st->1->2->3

3->en

```



# 渲染进程

```bash
W:\CPS\MYPROJECT\DEMO\MOTRIX
├─src
│  │  index.ejs
│  │
│  ├─main # 主进程相关逻辑
│  │  │  Application.js
│  │  │  index.dev.js
│  │  │  index.js
│  │  │  Launcher.js
│  │  │
│  │  ├─configs   # 内置配置
│  │  │      engine.js
│  │  │      page.js
│  │  │      protocol.js
│  │  │
│  │  ├─core  # 业务代码
│  │  │      AutoLaunchManager.js
│  │  │      ConfigManager.js
│  │  │      Context.js
│  │  │      EnergyManager.js
│  │  │      Engine.js
│  │  │      EngineClient.js
│  │  │      ExceptionHandler.js
│  │  │      Logger.js
│  │  │      ProtocolManager.js
│  │  │      UpdateManager.js
│  │  │      UPnPManager.js
│  │  │
│  │  ├─menus
│  │  │      darwin.json
│  │  │      linux.json
│  │  │      touchBar.json
│  │  │      tray.json
│  │  │      win32.json
│  │  │
│  │  ├─pages
│  │  │      about.html
│  │  │      index.html
│  │  │
│  │  ├─ui
│  │  │      DockManager.js
│  │  │      Locale.js
│  │  │      MenuManager.js
│  │  │      ThemeManager.js
│  │  │      TouchBarManager.js
│  │  │      TrayManager.js
│  │  │      WindowManager.js
│  │  │
│  │  └─utils
│  │          index.js
│  │          menu.js
│  │
│  ├─renderer # 渲染进程逻辑 vue 逻辑
│  │  ├─api
│  │  │      Api.js
│  │  │      index.js
│  │  │
│  │  ├─assets
│  │  │  │  .gitkeep
│  │  │  │  app-icon.png
│  │  │  │  logo-mini.svg
│  │  │  │  logo.svg
│  │  │  │  no-task.svg
│  │  │  │  theme-auto@2x.png
│  │  │  │  theme-dark@2x.png
│  │  │  │  theme-light@2x.png
│  │  │  │
│  │  │  └─icons
│  │  │          *.svg
│  │  │
│  │  ├─components
│  │  │  │  About.vue
│  │  │  │  Main.vue
│  │  │  │
│  │  │  ├─About
│  │  │  │      AboutPanel.vue
│  │  │  │      AppInfo.vue
│  │  │  │      Copyright.vue
│  │  │  │
│  │  │  ├─Aside
│  │  │  │      Index.vue
│  │  │  │
│  │  │  ├─Browser
│  │  │  │      index.vue
│  │  │  │
│  │  │  ├─CommandManager
│  │  │  │      index.js
│  │  │  │      instance.js
│  │  │  │
│  │  │  ├─Dragger
│  │  │  │      Index.vue
│  │  │  │
│  │  │  ├─DragSelect
│  │  │  │      Index.vue
│  │  │  │
│  │  │  ├─Icons
│  │  │  │      *.js
│  │  │  │
│  │  │  ├─Locale
│  │  │  │      index.js
│  │  │  │
│  │  │  ├─Logo
│  │  │  │      Logo.vue
│  │  │  │      LogoMini.vue
│  │  │  │      Mascot.vue
│  │  │  │
│  │  │  ├─Msg
│  │  │  │      index.js
│  │  │  │
│  │  │  ├─Native
│  │  │  │      DynamicTray.vue
│  │  │  │      EngineClient.vue
│  │  │  │      Ipc.vue
│  │  │  │      SelectDirectory.vue
│  │  │  │      ShowInFolder.vue
│  │  │  │      TitleBar.vue
│  │  │  │
│  │  │  ├─Preference
│  │  │  │      Advanced.vue
│  │  │  │      Basic.vue
│  │  │  │      Index.vue
│  │  │  │      Lab.vue
│  │  │  │      ThemeSwitcher.vue
│  │  │  │
│  │  │  ├─Speedometer
│  │  │  │      Speedometer.vue
│  │  │  │
│  │  │  ├─Subnav
│  │  │  │      PreferenceSubnav.vue
│  │  │  │      SubnavSwitcher.vue
│  │  │  │      TaskSubnav.vue
│  │  │  │
│  │  │  ├─Task
│  │  │  │      AddTask.vue
│  │  │  │      Index.vue
│  │  │  │      SelectTorrent.vue
│  │  │  │      TaskActions.vue
│  │  │  │      TaskItem.vue
│  │  │  │      TaskItemActions.vue
│  │  │  │      TaskList.vue
│  │  │  │      TaskProgress.vue
│  │  │  │      TaskProgressInfo.vue
│  │  │  │      TaskStatus.vue
│  │  │  │
│  │  │  ├─TaskDetail
│  │  │  │      Index.vue
│  │  │  │      TaskActivity.vue
│  │  │  │      TaskFiles.vue
│  │  │  │      TaskGeneral.vue
│  │  │  │      TaskPeers.vue
│  │  │  │      TaskTrackers.vue
│  │  │  │
│  │  │  ├─TaskGraphic
│  │  │  │      Atom.vue
│  │  │  │      Index.vue
│  │  │  │
│  │  │  └─Theme
│  │  │      │  Dark.scss
│  │  │      │  Default.scss
│  │  │      │  Index.scss
│  │  │      │  Variables.scss
│  │  │      │
│  │  │      ├─Dark
│  │  │      │      Variables.scss
│  │  │      │
│  │  │      └─Light
│  │  │              Variables.scss
│  │  │
│  │  ├─pages
│  │  │  └─index
│  │  │          App.vue
│  │  │          commands.js
│  │  │          main.js
│  │  │
│  │  ├─router
│  │  │      index.js
│  │  │
│  │  ├─store
│  │  │  │  index.js
│  │  │  │
│  │  │  └─modules
│  │  │          app.js
│  │  │          index.js
│  │  │          preference.js
│  │  │          task.js
│  │  │
│  │  ├─utils
│  │  │      native.js
│  │  │      task.js
│  │  │
│  │  └─workers
│  │          tray.worker.js
│
└─static
    │  *.png
    │  *.ico
    └─icons
            *.png

```

# 共用部分



```
├─src
│  │  index.ejs
│  │
│  └─shared # 公共用到的模块 
│      │  colors.json                 # 一些预置颜色
│      │  configKeys.js               # needRestartKeys|systemKeys|userKeys
│      │  constants.js                # 常量，所有魔术变量都卸载这里进行了语义化
│      │  keymap.json                 # 软件快捷键
│      │  ua.js                       # 软件版本信息（chrome|aria2|du(百度管家))
│      │
│      ├─aria2
│      │  │  index.js
│      │  │
│      │  └─lib
│      │          Aria2.js
│      │          debug.js
│      │          Deferred.js
│      │          JSONRPCClient.js
│      │          JSONRPCError.js
│      │          promiseEvent.js
│      │
│      ├─locales
│      │  │  all.js
│      │  │  app.js
│      │  │  index.js
│      │  │  LocaleManager.js
│      │  ├─zh-CN
│      │  │      about.js
│      │  │      app.js
│      │  │      edit.js
│      │  │      help.js
│      │  │      index.js
│      │  │      menu.js
│      │  │      preferences.js
│      │  │      subnav.js
│      │  │      task.js
│      │  │      window.js
│      │  │
│      │  └─zh-TW
│      │          about.js
│      │          app.js
│      │          edit.js
│      │          help.js
│      │          index.js
│      │          menu.js
│      │          preferences.js
│      │          subnav.js
│      │          task.js
│      │          window.js
│      │
│      └─utils
│              index.js
│              rename.js
│              tracker.js
│              tray.js
```

