# Electron-log

[[electron]] [[日志]] [npm](https://www.npmjs.com/package/electron-log)



# 基础日志等级

- **error** - 错误
- **warn** - 警告
- **info** - 普通信息
- **verbose** - 详细
- **debug** - debug
- **silly** - 严重错误



**设置日志目录：**

> 默认路径：
>
> - **on Linux:** `~/.config/{app name}/logs/{process type}.log`
> - **on macOS:** `~/Library/Logs/{app name}/{process type}.log`
> - **on Windows:** `%USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log`

```js
log.transports.file.resolvePath = () => {
    path.join(APP_DATA, 'logs/${APP_NAME}.log');
}
```



**基本设置：**

```js
  // 日志文件等级，默认值：false
  log.transports.file.level = 'debug';
  // 日志控制台等级，默认值：false
  log.transports.console.level = 'debug';
  // 日志文件名，默认：main.log
  log.transports.file.fileName = 'main.log';
  // 日志格式，默认：[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}
  log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}';
  // 日志大小，默认：10485760（10M），达到最大上限后，备份文件并重命名为：main.old.log，有且仅有一个备份文件
  log.transports.file.maxSize = 1048576;
  // 日志文件位置：C:\Users\%USERPROFILE%\AppData\Roaming\Electron\logs
  // 完整的日志路径：log.transports.file.file，优先级高于 appName、fileName
 
  // 日志范围
  const userLog = log.scope('xxw');
 
  log.error('Hello, log error');
  log.warn('Hello, log warn');
  log.info('Hello, log info');
  log.verbose('Hello, log verbose');
  log.debug('Hello, log debug');
  log.silly('Hello, log silly');
  log.info('中文');
 
  userLog.info('指定范围的日志');
```

