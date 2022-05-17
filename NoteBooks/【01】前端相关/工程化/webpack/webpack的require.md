### 相关资料
- [基础使用](https://blog.csdn.net/weixin_44869002/article/details/109702090)
- 

### 语法：
> #### require.context(directory, useSubdirectories, regExp);

- **directory**
- **useSubdirectories**
- **regExp**

参数 | 描述 | 类型 | 备注
---|---|---|---|---
directory| 要查找的目录的路径 |string
useSubdirectories| 是否查找子目录| boolean
regExp| 要匹配文件的正则表达式 | /*\\.vue/

### Example
```
// 查找当前目录下的 modules 文件夹下的所有 js 文件
let modules = require.context('./modules', false, /\.js/)

// 获取查找到的第一个模块
let first = modules.keys()[0]

// 加载对应模块
modules(first) 
```

```
vue-router 自动加载当前文件夹所有路径
