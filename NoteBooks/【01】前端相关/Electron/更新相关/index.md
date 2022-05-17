# ELectron 升级方案汇总

[[electron]] [[自动更新]]

脑图（[参考自](https://blog.csdn.net/happydeer/article/details/122866955))：

![image-20220217105530870](https://gitee.com/capsion-images/notebook/raw/master/image/202202171055169.png)





好文参考：

- https://blog.csdn.net/happydeer/article/details/122866955





# 热更新方法

热更新可能会遇到的问题

1、打包成了asar

2、没有对应目录的写入权限

3、离线环境





- 1

  ```
  博主这个只能更新未打成asar的electron客户端
  
  对打包成asar的客户端热更新需要一个叫electron-asar-hot-updater的模块
  这个模块C#写的，可以编译成独立的应用程序再由electron调用
  ```

  