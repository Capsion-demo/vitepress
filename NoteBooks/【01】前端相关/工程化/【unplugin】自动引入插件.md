# 引入官方UI或者库

[[开发效率]]



## 安装

```bash
npm i -D unplugin-auto-import unplugin-vue-components

yarn add -D unplugin-auto-import unplugin-vue-components
```



# Vue 和 Vue-router

- 安装

```bash
npm i -D unplugin-auto-import
```



- **vite.config.ts**

```tsx
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      //为true时在项目根目录自动创建
      dts: 'types/auto-imports.d.ts',
    }),
  ]
})
```



- 生成类型声明文件，当执行 yarn dev 时会根据上面定义的 dts选项自动生成类型声明文件 types/auto-imports.d.ts

```json
"include": [
  ...
  "types/**/*.ts"
]
```



# 引入自定义组件

[Github](https://github.com/antfu/unplugin-vue-components) 

## 安装

- 安装

```bash
npm i -D unplugin-vue-components
```



- **vite.config.js**

```python
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
    	//自动加载的组件目录，默认值为 ['src/components']
      dirs: ['src/components'],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      //指定类型声明文件，为true时在项目根目录创建
      dts: 'types/components.d.ts',
    })
  ]
})
```



## 引入子目录

比如需要引入 `'src/components'` 目录下的a，和b，需要将 `'src/components'` 目录放在这两个目录后面，否则插件不会引入 已经添加的目录的子目录

```tsx
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
    	//自动加载的组件目录，默认值为 ['src/components']
      dirs: [
        'src/components/a', // 确保子目录在父目录之前声明引入
        'src/components/b', // 确保子目录在父目录之前声明引入
        'src/components',
        ],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      //指定类型声明文件，为true时在项目根目录创建
      dts: 'types/components.d.ts',
    })
  ]
})
```



# Element-Plus

- 安装

```bash
npm i -D unplugin-vue-components
```



- **vite.config.js**

```tsx
import { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function (plugins: Plugin[]) {
  plugins.push(
    AutoImport({
    	//引入element plus自动api支持
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      //为true时在项目根目录自动创建
      dts: 'types/auto-imports.d.ts',
    })
  )
}
```

- 使用

```javascript
ElMessage.success('自动api引入成功')
```

> 注意：有些依赖的css会识别不到造成样式错误，建议在index.html 项目模板中引入样式

```html
<link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
```



# Vant

- 安装

```bash
yarn add -D unplugin-auto-import unplugin-vue-components vant
```



- **vite.config.ts**

```javascript
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// your plugin installation
export default defineConfig({
    plugins: [
        AutoImport({
          resolvers: [VantResolver()],
        }),
        Components({
          resolvers: [VantResolver()],
        }),
    ]
})

```





# 在sublimeText内支持autoimport

sublime内支持vue3主要使用的是 通过lsp-vue调用vetur来解释vue文件，一般安装了`unplugin-auto-import`插件后，vetur一般都能正确识别，如果不能请检查以下几点

- tsconfig.json 文件内没有将 `unplugin-auto-import` 生成的types文件夹加入到 `"include"` 项内
- vetur 没有正确的识别到tsconfig.json，这种情况在项目根目录下新建 `vetur.config.js`，重新确认 `package` 和 `tsconfig`的路径，还有`projects`的目录

![image-20220215225254109](https://gitee.com/capsion/markdown-image/raw/master/image/202202152252178.png)

