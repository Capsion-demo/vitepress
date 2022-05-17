## 处理初次使用Electron下载慢，Electron-builder打包慢的问题。

发布于：2020-03-021381 次浏览0 条评论

> 以下结论整理至网络，本人亲测有效，电脑系统 macOS：版本：Mojave 10.14.6

因为 `Electron` 的源在国外，如果我们直接使用 `npm` 进行安装，由于众所周知的原因，如果你没有一个好的梯子，通常下载速度只有几 k 到十几 k的速度。如图：

![electronslow.jpg](http://static.brandhuang.com/admin-158315413420245.jpg)

运气非常好时，可能能跑到100多k。而这个包有差不多 50MB，可想而知，如果是以几k的龟速，不知道要下载到猴年马月。

反正有一次晚上项目更新，由于我之前把它玩坏了，需要全部重新下载，然后启动项目的时候就是为了安装它的依赖，让我们多熬了接近4个小时！

如果你在搜索引擎输入关键词 `electron 下载慢`，得到的最多的答案就是如图的教程：

![elctronslowchange.png](http://static.brandhuang.com/admin-158315417758668.png)

然鹅，这样设置后，下载速度依然是看运气，似乎没多少用处啊。
甚至还有网友反馈，yarn不能用了，cnpm也有问题：

![electronslowbug.png](http://static.brandhuang.com/admin-158315420256373.png)



# 一、解决 electron 下载慢的问题

**下面开始讲重点**

一共分为下面几步：

1、设置 npm 源为 `npm config set registry https://registry.npm.taobao.org/`
2、用浏览器，前往 `https://npm.taobao.org/mirrors/electron/` 下载你所需要的版本（通常需要下载 mac 和 win 两个，看自己项目需求）

我下载的版本和所需的文件如下（我的项目需要在 Windows 和 Mac 上使用）

**注意下载的 SHASUMS文件，记得在最后加上你所使用的版本号，否则会去重新下载**

![electronslowdownload.png](https://gitee.com/capsion/markdown-image/raw/master/image/202202261033057.png)

3、将下载的文件拷贝到下列对应的文件夹中：

3.1、 Linux：`$XDG_CACHE_HOME` 或 `~/.cache/electron/`

3.2、 macOS：`~/Library/Caches/electron/`

3.3、Windows：`~/AppData/local/electron/Cache`

4、在你的项目中运行 `npm install`

执行完上述步骤，就能分分钟装好依赖了。

# 二、解决 Electron-builder 第一次打包时下载慢的问题

如果你是第一次在你电脑时使用 `electron-builder` 来打包，你很大可能会卡在下面的几个地方（==如有不同，请视情况酌情处理，但是处理的方式都是一样的==）

如果你的打包卡在了图中这样，一直在 downloading，那么你可以点击图中的链接，去浏览器下载对应的几个包。

![biulderwinCodeSign.png](http://static.brandhuang.com/admin-158316089584899.png)
![biuldernsis.png](http://static.brandhuang.com/admin-158316114236447.png)
![biuldernsisresource.png](http://static.brandhuang.com/admin-158316115907174.png)

**包的版本请根据你的项目需要下载，不知道你的项目需要那个版本的时候，可以在执行打包时，卡住了就去下载。下载后进行如下操作：**（以 Mac 为例，其他平台类似）

我打包 Windows 和 macOS 两个平台运行包，一共下载了如下几个文件，

![yilai1.png](http://static.brandhuang.com/admin-158316157268775.png)

然后，在 `~/Library/Caches/electron-builder` 文件夹下面，先新建三个文件夹 `nsis`、 `wine` 和 `winCodeSign`。

**注意文件名大小写**。

然后将前面下载的文件分别解压到对应的文件夹中

**注意文件夹名称！**

![nsis1.png](http://static.brandhuang.com/admin-158316189957242.png)

![wincode1.png](http://static.brandhuang.com/admin-158316190802116.png)

![wine1.png](http://static.brandhuang.com/admin-15831619175730.png)

这样就能顺利的进行打包了，不会因为网络问题，一直卡在下载那一步。

祝你操作顺利～





# 总结

1. 设置 npm 源为 npm config set registry https://registry.npm.taobao.org/

2. 用浏览器，前往 https://npm.taobao.org/mirrors/electron/ 下载你所需要的版本（通常需要下载 mac 和 win 两个，看自己项目需求）

3. 注意下载的 SHASUMS文件，记得在最后加上你所使用的版本号，否则会去重新下载

   ![electronslowdownload.png](https://gitee.com/capsion/markdown-image/raw/master/image/202202261033057.png)

4. 将下载的文件拷贝到下列对应的文件夹中：

```
Linux：$XDG_CACHE_HOME 或 ~/.cache/electron/
macOS：~/Library/Caches/electron/
Windows：~/AppData/local/electron/Cache
```

5. 在你的项目中运行 npm install 执行完上述步骤，就能分分钟装好依赖了。