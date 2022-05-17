# 📍常用插件列表

| 插件名称                       | `插件作用`                                                   | `备注` |
| ------------------------------ | ------------------------------------------------------------ | ------ |
| `@rollup/plugin-typescript`    | 支持 `解析及编译TS插件`                                      |        |
| `rollup-plugin-typescript2`    | `rollup-plugin-typescript`的重新版，比较多人用               | 推荐   |
| `@rollup/plugin-node-resolve`  | 支持**第三方模块**直接使用`import`引入，不用知道到`index.js`等入口文件，支持`import xx from 'xxx'`语法 |        |
| `@rollup/plugin-commonjs`      | 让`rollup`识别`commonjs`类型的包,默认只支持导入`ES6`         |        |
| `@rollup/plugin-replace`       | 动态变量注入                                                 |        |
| `@rollup/plugin-alias`         | 路径别名                                                     |        |
| `@rollup/plugin-json`          | 将`.json`文件转换为`ES6`模块文件                             |        |
| `rollup-plugin-node-polyfills` | 让**内置模块**支持使用局部引入, `import {xxx} from 'xxx'`    |        |
| `rollup-plugin-eslint`         | eslint 校验                                                  |        |
| `rollup-plugin-cleandir`       | rollup文件夹清除插件                                         |        |
| `@rollup/plugin-babel`         | 使用**babel**                                                |        |
| `rollup-plugin-terser`         | 压缩js文件，生成 xx.mini.js                                  |        |
| `rollup-plugin-replace`        | 支持字符串替换, 比如动态读取package.json的version到代码      |        |
| `rollup-plugin-sourcemaps`     | 代码生成sourcemaps                                           |        |



# `plugin-babel` 

- 配置：

  ```bash
  // rollup.config.js
  import resolve from '@rollup/plugin-node-resolve';
  import babel from '@rollup/plugin-babel';
  
  export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [resolve(), babel({ babelHelpers: 'bundled' })]
  };
  ```

  ```bash
  // src/.babelrc.json
  // npm i -D @babel/core @babel/preset-env
  {
    "presets": ["@babel/env"]
  }
  ```

  

# `typescript`支持

以下两个插件都能使用

- [`@rollup/plugin-typescript`](https://www.npmjs.com/package/@rollup/plugin-typescript)：目前更新比较慢，下载量也不多
- [`rollup-plugin-typescript2`](https://www.npmjs.com/package/rollup-plugin-typescript2)：目前更新比较频繁，下载量也多

- 安装：`npm install rollup-plugin-typescript2 typescript tslib --save-dev` 

- 配置：`rollup.config.js`

  ```js
  // rollup.config.js
  import typescript from 'rollup-plugin-typescript2';
  
  /* 另外指定配置 */
  tsconfig = {
  	tsconfigOverride: { 
          compilerOptions: { declaration: false }
      }
  }
  
  export default {
  	input: './main.ts',
  	plugins: [
           resolve(),    
          
  		typescript(/*{ plugin options 插件相关配置 }*/),
           typescript(tsconfig)
          
           babel(),    // 转换成es5
      
      	terser(),   // 最后压缩
  	]
  }
  ```
  

# `plugin-node-resolve`

解析代码中依赖的node_modules

- 官方文档 https://www.npmjs.com/package/@rollup/plugin-node-resolve

- 作用：插件**可以解决 ES6模块的查找导入**，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理

- 安装：`npm install @rollup/plugin-node-resolve --save-dev`

- 作用：导出`node`支持的可执行的文件，`cjs`或者`mjs`

- 配置：`rollup.config.js`

  ```typescript
  import { nodeResolve } from '@rollup/plugin-node-resolve';
  
  export default {
    input: 'src/index.js',       // 入口文件
    output: [
        {
            file:'index.js',     // 指定输出的文件名 index.cjs
            dir: 'output',
            exports: "named",    
            format: 'cjs'        // 导出的格式为 ES5 可以是 cjs
            sourcemap: true,
        },
        { 
            file:'index.es.js',     // 指定输出的文件名 index.mjs
            dir: 'output',         
            format: 'esm',        // 导出的格式为 mjs
            sourcemap: true,
        },
    ],
    plugins: [
      nodeResolve({
        extensions:["*.json"]  // 指定处理某些文件
      }),
        typescript()           // ts 插件在这之后
    ]
  };
  ```

- 效果

  ```js
  // 使用插件前
  // ES6下引入第三方使用import引入模块需要指定到对应的入口文件 index.js
  import MyNodeModule from './MyNodeModule/index.js'
  ```

  ```js
  // 使用插件后
  // 可以直接引入
  import MyNodeModule from './MyNodeModule'
  ```

- 使用：

  ```js
  // rollup.config.js
  import resolve from '@rollup/plugin-node-resolve';
  
  export default {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  };
  ```

- 效果

  ```js
  // 不配置 @rollup/plugin-node-resolve 插件引入方式
  export foo from './foo/index.js'
  import bar from './bar/index.js'
  
  // 配置了 @rollup/plugin-node-resolve 插件引入方式
  export foo from './foo'
  import bar from './bar'
  ```


# `plugin-commonjs`

- 官方文档：https://www.npmjs.com/package/@rollup/plugin-commonjs

- 介绍：可以将`CommonJS`编写的`npm`模块通过`import`引入到`rollup`中

- 安装：

  ```bash
  npm install @rollup/plugin-commonjs --save-dev
  ```

- 配置：

  ```js
  import commonjs from '@rollup/plugin-commonjs';
  
  export default {
    input: 'src/index.js',
    output: {
      dir: 'output',
      format: 'cjs'
    },
    plugins: [commonjs({
        dynamicRequireTargets:[''], //
        exclude:['xxx.cjs'], // 排除文件
    })]
  };
  ```





# `plugin-replace`

- 官方文档：https://www.npmjs.com/package/@rollup/plugin-replace

- 作用：变量注入

- 安装：

  ```bash
  npm install @rollup/plugin-replace --save-dev
  ```

- 配置:

  ```js
  import replace from '@rollup/plugin-replace';
  
  export default {
    input: 'src/index.js',
    output: {
      dir: 'output',
      format: 'cjs'
    },
    plugins: [
      // 任何地方使用 process.env.NODE_ENV 相当于 JSON.stringify('production')
      replace({
        __dirname:() => path.pwd(),
        'process.env.NODE_ENV': JSON.stringify('production'), 
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: 15,
        preventAssignment: true, // 转换为字符串
      })
    ]
  ```
  
- 使用

```tsx
// 读取package.json
import pkg from './package.json';
export default {
    input: './src/main.ts',
    plugins: [
        // 代码中的__VERSION__字符串会被package.json中的version字段所替代
        replace({
            __VERSION__: pkg.version
        }),
    ]
}
```




# `plugin-alias`

- 官方文档：https://www.npmjs.com/package/@rollup/plugin-alias
- 作用：路径别名，使用 `@` 代替 ../../xxx/xxx

- 安装：

  ```bash
  npm install @rollup/plugin-alias --save-dev
  ```

- 配置

  ```js
  import alias from '@rollup/plugin-alias';
  
  module.exports = {
    input: 'src/index.js',
    output: {
      dir: 'output',
      format: 'cjs'
    },
    plugins: [
      alias({
        entries: [
          { find: 'utils', replacement: '../../../utils' },
          { find: 'batman-1.0.0', replacement: './joker-1.5.0' },
          { finde: '@' , replacement: path.resolve({projectRootDir}, 'src')},
          { find:/^i18n\!(.*)/, replacement: '$1.js' },
        ]
      })
    ]
  };
  ```

  

# `plugin-json`

- 官方文档：https://www.npmjs.com/package/@rollup/plugin-json

- 作用：以`ES6`的方式导入`.json`文件

- 安装：

  ```bash
  npm install @rollup/plugin-json --save-dev
  ```

- 配置：

  ```js
  import json from '@rollup/plugin-json';
   
  export default {
    input: 'src/index.js',
    output: {
      dir: 'output',
      format: 'cjs'
    },
    plugins: [json()]
  };
  ```

- 打包前

  ```js
  // src/index.js
  import pkg from './package.json';
  console.log(`running version ${pkg.version}`);
  ```

- 打包后

  ```js
  // 
  var version = 'xxxx'
  console.log(`running version ${version}`);
  ```

  

# `rollup-plugin-node-polyfills`

- 官方文档 https://www.npmjs.com/package/rollup-plugin-node-polyfills

- 安装：

  ```bash
  npm install --save-dev rollup-plugin-node-polyfills
  ```

- 配置： `rollup.config.js`

  ```js
  import nodePolyfills from 'rollup-plugin-node-polyfills';
  rollup({
    entry: 'main.js',
    plugins: [
      nodePolyfills()
    ]
  })
  ```

- 效果

  让内置模块可以使用ES6的局部引用方式编写

  ```js
  // 使用插件前
  import util from 'util'
  util.inherits
  ```

  ```js
  // 使用后
  import { inherits } from 'util';
  ```



# `rollup-plugin-terser`

- [官方地址](https://www.npmjs.com/package/rollup-plugin-terser)

- 作用：生成x.min.js，原理是去除多余的空格和缩进，将代码压缩成单行

- 安装：

  ```bash
  yarn add rollup-plugin-terser --dev
  # Or with npm: 
  npm i rollup-plugin-terser --save-dev
  ```

- 配置： `rollup.config.js`

  ```js
  import { rollup } from "rollup";
  import { terser } from "rollup-plugin-terser";
   
  rollup({
    input: "main.js",
    plugins: [terser()],
  });
  ```

  

