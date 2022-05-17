# 



```js
// Set application name for Windows 10+ notifications
// 设置软件的名称，win10系统
if (process.platform === "win32") {
    app.setAppUserModelId(app.getName());
}
```

