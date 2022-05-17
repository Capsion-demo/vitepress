# 使用CLI开发一个Vue3的npm库

[![img](https://p9-passport.byteacctimg.com/img/user-avatar/732186508929940c0ea6978021bc9f76~300x300.image)](https://juejin.cn/user/3984285870859614)

[神奇的程序员 ![lv-5](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg)](https://juejin.cn/user/3984285870859614)

2020年12月18日 11:10 · 阅读 3587

已关注

![使用CLI开发一个Vue3的npm库](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e2d69ef269e4ee1a0f15d9d33e961b9~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp)

## 前言

前几天写了一个Vue的自定义右键菜单的npm库，主要讲了插件的设计思路以及具体的实现过程，插件的开发流程没有细讲。

本文就跟大家分享下如何使用CLI从零开始开发一个支持Vue3的库，并上传至npm，欢迎各位感兴趣的开发者阅读本文。

## 实现思路

根据Vue官方文档中有关[插件](https://link.juejin.cn/?target=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Fplugins.html%23%E7%BC%96%E5%86%99%E6%8F%92%E4%BB%B6)的介绍，我们开发的插件可以是公开`install()`方法的`Object`，也可以是工具类的`function`库。

本文我们要开发的库是需要向Vue添加一个自定义指令，属于向Vue添加全局级功能，所以需要采用公开`install`方法。

库开发完成后，就是需要打包上传至npm库了，打包这一块可以选择自己配webpack来搞，我选择用Vue Cli提供的方案来进行打包，接下来就跟大家分享下整体的思路：

- 安装[Vue CLI](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Finstallation.html)，本文安装的是4.x版本
- 使用`vue create [project-name]`命令来创建一个项目，创建时选择自定义配置。
- 删除默认创建的文件，配置依赖项
- 配置打包命令
- 配置CSS内联
- 添加库描述
- 发布至npm

## 实现过程

接下来带着大家动手操作下上述步骤。

### 安装Vue CLi

在终端执行下述命令：

```bash
yarn global add @vue/cli
# 或者
npm install -g @vue/cli
复制代码
```

### 创建项目

在终端执行下述命令，本文要创建的项目名为：**vue-right-click-menu-next**

```bash
vue create vue-right-click-menu-next
复制代码
```

在接下来的步骤中，由于Vue3底层大部分代码采用TypeScript编写，因此他可以完美的支持TS，我们创建项目时就要考虑到使用我们插件的用户启用TS的情况，因此我们要勾上`TypeScript`，此处我勾选的选项为：`vue3, node-sass, eslint+prettier, typescript`，可以按照自己的需要去选。

### 配置依赖项

项目创建好后，我们删掉CLI初始化时创建的东西，然后修改package.json中的内容。

在package.json中，CLI默认是把`vue`和`core-js`放在`dependencies`下的，我们开发的插件是要给其他开发者引用的，如果我们打包的产物中包含Vue包的话可能会引发各种问题，比如用户可能会在引入我们的包之后会在runtime时创建两个不用的Vue实例，所以vue插件的package.json里一定不能将其放在dependencies中，而是要放在`peerDependencies`中，表明会从引用者的其他的包中引入相对应的包，而不会在这个包里直接引入。

- 在package.json中添加下述代码，移除原来dependencies下的依赖。

```json
 "peerDependencies": {
    "core-js": "^3.6.5",
    "vue": "^3.0.0"
  }
复制代码
```

- 在devDependencies中添加git提交规范相关依赖

```json
{
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-angular": "^11.0.0",
    "commitizen": "^4.2.2",
    "cz-conventional-changelog": "^3.3.0",
    "husky": "^4.3.0",
}
复制代码
```

- 添加config和husky配置changelog生成地址和强制编辑器提交代码走我们定义的规范

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
复制代码
```

- 最后，在script中添加提交命令与生成changelog的命令

```json
{
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "commit": "git-cz"
}
复制代码
```

### 配置打包命令

由[文档](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fbuild-targets.html%23%E5%BA%93)可知，可以通过`vue-cli-service build --target lib --name myLib [entry]`命令，将一个单独的入口构建为一个库。

那么，我们就可以在package.json的script标签里添加build命令用以执行插件的打包，代码如下。

- vueRightMenuPlugin 打包后的文件名
- src/main.ts 插件的入口文件

```json
{
  "build": "vue-cli-service build --target lib --name vueRightMenuPlugin src/main.ts",
}
复制代码
```

由于我们的插件启用了typescript，使用它的默认打包，不会帮我们生成ts声明文件，使用我们插件的开发者项目可能会启用typescript，在引用插件时就会报错声明文件不存在，因此我们需要额外做下述操作：

- 在`tsconfig.json`z中添加下述代码，打包时在项目的指定位置自动生成配置文件。

```json
{
    "declaration": true,// 是否生成声明文件
    "declarationDir": "dist/lib",// 声明文件打包的位置
}
复制代码
```

- 创建`vue.config.js`文件，关闭并行打包的一些相关配置。

```javascript
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.module.rule("ts").uses.delete("cache-loader");
      config.module
        .rule("ts")
        .use("ts-loader")
        .loader("ts-loader")
        .tap(opts => {
          opts.transpileOnly = false;
          opts.happyPackMode = false;
          return opts;
        });
    }
  },
  parallel: false
};
复制代码
```

做完上述操作后，我们运行打包命令时就能自动生成声明文件了。

### 配置CSS内联

当我把插件开发完，测试时发现我引用的组件样式丢了，找了好久问题，最后在CLI的文档中找到了问题所在，他有个css.extract属性，它使用来配置打包时是否将css样式提取到独立的文件中，Default: 生产环境下是 `true`，开发环境下是 `false`，我们打包时他默认是`true`，用户需要单独引入这个样式文件文件。

我们可以通过手动将其设置为`false`，让其在打包时使用内联样式，这样就能解决样式失效的问题了，我们在`vue.config.js`中加入下述代码。

```javascript
module.exports = {
  // 强制css内联
  css: { extract: false }
}
复制代码
```

### 添加库描述

做完上述操作，我们跟打包有关的相关的配置就弄好了，接下来我们在package.json中添加库的相关描述，让npm可以正确识别我们的插件。

- name 插件名称
- version 版本号
- description 插件简述
- private 是否私有
- main 库的入口文件位置(打包后的入口文件)
- types 库的声明文件位置
- publisher 库发布者
- repository 仓库信息
- keywords 关键词，在npm找包时所匹配的关键词
- author 库作者
- license 库遵守的开源协议
- bugs bug反馈地址
- homepage 库主页

```json
{
  "name": "vue-right-click-menu-next",
  "version": "1.0.0",
  "description": "支持vue3的右键菜单插件",
  "private": false,
  "main": "dist/vueRightMenuPlugin.common.js",
  "types": "dist/lib/main.d.ts",
  "publisher": "magicalprogrammer@qq.com",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/likaia/vue-right-click-menu-next.git"
  },
  "keywords": [
    "vuejs",
    "vue3",
    "vue",
    "rightMenu",
    "右键菜单",
    "vueRightMenu"
  ],
  "author": "likaia",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/likaia/vue-right-click-menu-next/issues"
  },
  "homepage": "https://github.com/likaia/vue-right-click-menu-next#readme",
}
复制代码
```

### 发布至npm

至此，我们插件的整个环境就搭建好了，可以着手与插件的实现了，对本文实现的插件感兴趣的开发者可移步至我的另一篇文章：[使用vue封装右键菜单插件](https://juejin.cn/post/6906788973981466637)

插件开发完成后，我们就可以进行打包并发布至npm仓库了。

- 打包

```bash
# 打包
yarn run build
复制代码
```

- 发布

```bash
npm publish --access public
复制代码
```

插件发布成功：[vue-right-click-menu-next](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fvue-right-click-menu-next)

本文中开发的插件代码地址：[vue-right-click-menu](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fvue-right-click-menu) | [vue-right-click-menu-next)](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fvue-right-click-menu-next)

在线体验地址：[chat-system](https://link.juejin.cn/?target=https%3A%2F%2Fwww.kaisir.cn%2Fchat-system%2Findex.html%23%2F)

## 写在最后

- 文中如有错误，欢迎在评论区指正，如果这篇文章帮到了你，欢迎点赞和关注😊
- 本文首发于掘金，未经许可禁止转载💌