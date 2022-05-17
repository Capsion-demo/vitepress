# 关闭node注入

```js
webPreferences:{
  nodeIntegration:false
}
```



# 修改页面代码

```js
//新建一个 script标签引入 jquery
window.$ = window.jQuery = require('xxxx/jquery.js') 

if(typeof module==='object'){
    window.jQuery = window.$ = module.exports
}
```

# 重新命名 requrie

```js
// 重定向 requrie模块
window.nodeRequire = require

// 去掉 commentjs的模块
delete window.require
delete window.exports
delete window.module
```

