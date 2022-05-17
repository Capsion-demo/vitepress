# 常用Rollup配置

配置文件：`rollup.config.js`

```js
export default {
	input:{} // 入口配置
	
	output:{} // 导出单文件
	output:[] // 导出多文件
	
	plugins:[ // 插件
		plugin1(pluginOptions), 
		plugin2(pluginOptions), 
		...
    ],
}
```



# input

[官方文档](https://rollupjs.org/guide/en/#input)

```js
input:'./src/index.ts'
input:'./src/index.js'
```



# output

[官方文档](https://rollupjs.org/guide/en/#outputformat)

```tsx
output:{
	name:str // 只有在 format时iife|umd时才需要，指挂载到全局使用的名称
	file:    // 文件名
	format:  // 输出什么格式
}
```

## name



## file



## format:str

打包导出的格式，

- `amd`– 异步模块定义，与 RequireJS 等模块加载器一起使用
- `cjs`– CommonJS，适用于 Node 和其他打包工具（别名`commonjs`：）
- `es`– 将包保存为 ES 模块文件，适用于其他捆绑器并作为`<script type=module>`标签包含在现代浏览器中（别名：`esm`、、`module`）
- `iife`– 自执行功能，适合作为`<script>`标签包含。（如果你想为你的应用程序创建一个包，你可能想使用它。）。“iife”代表“立即调用的[函数表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)”
- `umd`– 通用模块定义，作为`amd`，`cjs`多`iife`合一
- `system`– SystemJS 加载器的原生格式（别名`systemjs`：）



## plugins

- plugins 必须有顺序的使用



## external

设置三方库为外部模块，以免被打包进去，体积过大
