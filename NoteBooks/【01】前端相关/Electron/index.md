# 基础使用

## 安装

```bash
# 设置镜像源
npm config set electron_mirror http://npm.taobao.org/mirrors/electron/
npm config set electron_mirror https://github.com/electron/electron

# 安装32位（如果要调用dll，一般采用32）
npm i -g --arch=ia32 --no-bin-links electron --registry=https://registry.npm.taobao.org
npm i -g --arch=ia32 --no-bin-links electron@6.0.0 --registry=https://registry.npm.taobao.org
```

# 主要模块

- **BrowserWindow** 创建窗口`gui`相关模块 - 只存在于主进程 
- **app** 主程序的窗口实例 
- **remote** 可以在渲染进程中调用主进程的模块 
- **ipcmain** 主进程通讯 
- **ipcrendener** 渲染进程通讯              



