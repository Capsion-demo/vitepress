# 基础使用

## 安装

```bash
npm i electron-packager -g
```



```json
// package.json
"scirpt":{
	"packager":"electron-packager ./ YYS --platform=win32 --out ./pack --arch=ia32 --electron-version 6.0.0 --overwrite"
}
```



```bash
# 打包
electron-packager ./ --a

electron-packager ./ name --all
```



## 使用帮助

```
<sourcedir>	-	打包的目标
 <appname>	-	打包的名字
--platform=<platform>	-	打包的平台	darwin/linux/mas/win32/all
--arch=<arch>		-	打包的位数	ia32/x64
[optional flags...]
--electron-version	-	打包的版本,必须对应开发的版本
--overwrite	-	覆盖原有的包
--out		-	输出的目录	--out ./
--icon	-	--icon=./static/img/logo.ico : 指定icon
```

