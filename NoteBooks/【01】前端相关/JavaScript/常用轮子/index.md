# JS 常用的轮子

记录一些自己项目中用过好用的轮子，提升开发效率永远是前端人员最破迫切的需求

1. **UI组件库**

​	日常前端项目常用的一些框架，基本都是基于`vue`或者`react`的，`jquery`系的现在开发上基本不会去选择，所以就不记录了，以前学的一大堆东西真的是说丢	就丢。



2. **文档框架**

​	能快速搭建`api`页的框架，日常开发中常用，开发的时候使用`swagger`，维护期就搭建一个专门的`api`页



3. **工具库**（网上现成）
4. **工具函数**（原创）







# 1、UI框架



## 1、Element-UI(饿了么团队)

做一些后台，中后台项目的时候非常好用，强大的表格组件，基本能胜任大部分后台、中后台项目。

公司大部分80% 的后台项目都用这个框架，容易上车，文档友好

- ### Element-ui (vue2)

  - [官方地址](https://element.eleme.cn/#/zh-CN/component/layout)

- ### Element-ui-plugs (vue3)
  - [官方地址](https://element-plus.org/#/zh-CN)



## 2、Vant有赞前端团队

**移动端UI框架，有赞前端团队**开源的移动端组件库，

- [官方地址](https://vant-contrib.gitee.io/vant/#/zh-CN/)

- [Vue2版本](https://vant-contrib.gitee.io/vant/#/zh-CN/)
- [Vue3版本](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)
- [Rect版本](https://github.com/mxdi9i7/vant-react)
- [小程序版本](https://vant-contrib.gitee.io/vant-weapp/#/home)

好用，基本每个移动端项目首选的框架

## 3、Ant Design



- [官方地址](

## 4、Vuetify

漂亮的 [Material设计风格](https://material.io/)，个人项目用过后一发不可收拾，不过内部的组件颗粒度比较细，没有想成的解决方案，想要一个表格需要自己东拼西凑，开发起来相对反而更慢了，不过架不住样式好处，很少需要自己写css的地方。

如果公司的项目不是这么赶时间，肯定会考虑上这个框架。而且有企业版，懂的都懂。



- [Vue2版本](https://vuetifyjs.com/zh-Hans/getting-started/installation/)

- [Vue3版本](https://vuetifyjs.com/zh-Hans/introduction/roadmap/#v30titan)



## semantic-ui 

国外一直比较流行的框架，需要使用glup构建，最新版的文档是英文的，暂时只在一个个人项目中用过，组件样式丰富，非常注重状态管理。

目前只用过一次，开发体验还可以，不过让在能使用element的前提下，不会选择。

- [官方地址](https://semantic-ui.com/)





## layui

一个同事非常喜欢用的框架，但是其基于 jquery，与2021年10月13日，官方正式下线，维护工作都迁移到了社区。

[官方地址](https://gitee.com/sentsin/layui/issues)



# 2、文档框架（markdown）

自从知道了`markdown`，基本日常笔记，日报，生活常记等，都已经完全离不开markdown。通过这类框架能很快生成api文档页或者将笔记转成博客文章，老实说，放弃沉重的hexo和







## 1、VuePress



- [官方地址 1.x ](https://vuepress.vuejs.org/zh/)
- [官方地址 2.x ](https://v2.vuepress.vuejs.org/zh/)

- `vuepress-plugin-baidu-autopush` (SEO百度插件)



## 2、VitePress

`VitePress` 是 `VuePress` 的小弟弟，在 Vite 上构建的。(官方原话~)

[官方地址](https://fttp.jjf-tech.cn/vitepress/)



## 3、docsify 

直接上传md文件即可生成网页，能快速搭建文档页的框架

- [官方地址](https://docsify.js.org/#/)



- https://landing.ant.design/edit/index-cn)



## 4、bisheng（Ant Design同款）



## 5、gitbook



## 6、dumi



## 7、[storybook](https://link.juejin.cn/?target=https%3A%2F%2Fstorybook.js.org%2F)







# 3、工具库





## 3.1、lodash

老司机最爱了，以前ES6还没普及的时候用的最多的一个工具库，还记得那段只有`jquery`和`lodash`的日子吗 ~

虽然随之ES6越来越多的新功能，`lodash`的使用率越来越少（仅限本人），但是这个工具库还是非常棒，源码写得很好，非常值得阅读。

- [官方地址1](https://lodash.com/)

- [官方地址2](https://www.lodashjs.com/)





## 3.2、手势拖动库

[官方地址](https://any86.github.io/any-touch/#/)

[vue版](https://github.com/MaybeQHL/v-touchshow)

![一个拖拽的js库](https://gitee.com/capsion-images/notebook/raw/master/image/202203021144937.gif)

## 3.3、拖拽库 interactjs

[demo](https://interactjs.io/)



<table>
    <!-- <标题> -->
    <tr>
        <td colspan=2 align="center">
            <h2>基础功能</h2>
            <a src="https://interactjs.io/">interactjs</a>
        </td>
    </tr>
	<!-- <内容1> -->
    <tr>
        <td colspan=1 align="center">
            <img width="500" src="https://gitee.com/capsion-images/notebook/raw/master/image/202203041441481.gif"/>
            <h3>基础功能</h3>
        </td>
        <td colspan=1 align="center">
			<img width="500" src="https://gitee.com/capsion-images/notebook/raw/master/image/202203041441875.gif"/>
            <h3>基础功能</h3>
        </td>
    </tr>
    <!-- <内容2> -->
    <tr>
        <td colspan=1 align="center">
            <img width="500" src="https://gitee.com/capsion-images/notebook/raw/master/image/202203041442121.gif"/>
            <h3>基础功能</h3>
        </td>
        <td colspan=1 align="center">
			<img width="500" src="https://gitee.com/capsion-images/notebook/raw/master/image/202203041442854.gif"/>
            <h3>基础功能</h3>
        </td>
    </tr>
</table>

# 4、CSS 动画库

## animate.css

官方地址



## Motion Design

[官方地址](https://motion.ant.design/index-cn)

![GIF 2022-3-8 14-53-58](https://gitee.com/capsion-images/notebook/raw/master/image/202203081456259.gif)

![GIF 2022-3-8 14-54-17](https://gitee.com/capsion-images/notebook/raw/master/image/202203081456561.gif)

![GIF 2022-3-8 14-54-49](C:/Users/Administrator/Desktop/Gif/GIF%202022-3-8%2014-54-49.gif)

![GIF 2022-3-8 14-55-22](C:/Users/Administrator/Desktop/Gif/GIF%202022-3-8%2014-55-22.gif)





# 5 canvas 相关

## vuetify + canvas 画板

https://im_roy.gitee.io/gogo/index.html

![image-20211210081326318](https://gitee.com/capsion/markdown-image/raw/master/image/202112100813393.png)



## 多功能，带画笔的 canvas 画板

https://im_roy.gitee.io/etchasketch/palette/zw-palette.html

![image-20211210081455036](https://gitee.com/capsion/markdown-image/raw/master/image/202112100814097.png)

