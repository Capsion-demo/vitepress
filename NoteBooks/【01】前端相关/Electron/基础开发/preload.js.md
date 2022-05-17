# preload.js

正常来说，只有preload.js才具有node能力，默认情况下，renderer.js或者是在index.html，都是没有node能力的。除非，你主动赋予他们访问node功能的权利。





# 作用域

只要browserWindow在，那么preload.js就在，并且页面加载一次，就自动加载preload.js一次。并且其优先级很高，先于页面内原有的js代码。



```javascript
//...
const mainWindow = new BrowserWindow({
  //...
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    //...
  }
})
//...
```

> preload.js一次加载，多次执行。新开的窗口，默认也支持preload.js