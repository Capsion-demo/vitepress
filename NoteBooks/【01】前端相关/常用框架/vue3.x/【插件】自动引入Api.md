# 自动引入Api（unplugin-auto-import ）

[`Github`](https://github.com/antfu/unplugin-auto-import) [[vue3]] [[开发效率]]

使用 `unplugin-auto-import` 可以自动导入api，不需要import。



## 简介

一个自动引入api的包，支持主流打包引擎





# Vant 自动引入

- 安装

```bash
npm i -D unplugin-vue-components vant
```



- vite.config.js

```javascript
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import {
  //AntDesignVueResolver,
  //ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers'

// your plugin installation
Components({
  resolvers: [
    //AntDesignVueResolver(),
    //ElementPlusResolver(),
    VantResolver(),
  ]
})
```











