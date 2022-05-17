# 使用感受

`rollup`是实实在在建立在ES6基础上的纯js打包工具，使用起来比`webpack`快很多，打包的体积明显也小很多



# 为什么快

遵从ES6的导入机制，只打包实际引入了的代码，相对传统的`CommonJS`的在编译后再处理沉余代码有速度就更加快，性能损耗也更小，打包出来的打包也更小。





# 基础使用

- 命令行调用

- 安装：`npm i rollup -g`

```bash
#或
rollup { 入口文件.js } --file { 出口文件.js } --format { cjs/amd/es... } -w/--watch
```



- 通过npm调用
- 安装：`npm i rollup -D`

```js
// package.json
{
  "scripts": {
    "build":"rollup ./bin/main.js --file ./dist/index.js --format cjs"
  },
}
```

```bash
# 
npm run build
```



- 使用配置文件调用

```bash
rollup --config rollup.config.ts --configPlugin typescript
```
# 单文件编译多文件
将output配置为一个对象数组即可

# 多入口文件编译多出口
将整个rollup.config.js导出为数组形式即可
