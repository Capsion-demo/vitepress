# electron对应node版本 	

https://www.cnblogs.com/mdorg/p/10417945.html



# 渲染进程中无法使用 require

BrowserWindow 参数添加 nodeIntegration: true

```js
let newWindow = BrowserWindow({nodeIntegration: true}) 
```



# 使用require引入的时候提示路劲错误

引入第三方路径的时候也应该使用 __dirname 配合相对路径进行，不能单纯使用相对或者绝对路径



# 无法引入ffi模块

1、首次遇到错误代码为 **106x(镜像源问题)**的，使用**node-gyp** 单独命令更换镜像源后解决: 

```bash
【node-gyp rebuild --target=4.0.0 --arch=ia32 --dist-url=**https://npm.taobao.org/mirrors/atom-shell** --build-from-source --msvs_version=2015】

D:/CPS/nodejs/v10.16.1/node.exe 

D:/CPS/MyProject/test/node_modules/node-gyp/bin/node-gyp.js 

rebuild 

--target=4.0.0 

--arch=ia32 

--dist-url=**https://npm.taobao.org/mirrors/atom-shell (4.0.0文件夹)**

--build-from-source

--msvs_version=2015
```

2、使用node-gyp 单独重建ffi的时候发生错误 **1127** ,原因直指 node.lib 文件，发现其大小与网络**https://npm.taobao.org/mirrors/atom-shell (4.0.0文件夹内的不匹配)**，手动下载到报错目录，然后再重新手动执行编译命令，成功执行



# 某些win7启动软件的时候黑屏

- 解决1：设置禁用gpu可以解决问题，但不能透明。

- 解决2：用快捷方式 程序启动，加上参数“ --disable-gpu”

- 解决3：win7黑屏可以这样设置；还有一种方法是楼上说的，在`app.on('ready',()=>{})`之前，禁用gpu加速： app.disableHardwareAcceleration()，本来我想判断系统是win7才禁用的，但是找(zhen)了(de)很(tai)久(cai)，没找到如何判断系统版本的方法。

- 解决4：使用兼容模式 选择vista，不推荐