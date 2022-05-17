# 实现Web端自定义截屏(JS版)

[![img](https://p9-passport.byteacctimg.com/img/user-avatar/732186508929940c0ea6978021bc9f76~300x300.image)](https://juejin.cn/user/3984285870859614)

[神奇的程序员 ![lv-5](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg)](https://juejin.cn/user/3984285870859614)

2021年02月22日 09:57 · 阅读 9397

已关注

![实现Web端自定义截屏(JS版)](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/247cea8a3eaa43b1811ad68035065c4d~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp)

## 前言

前几天我发布了一个web端自定义截图的插件，在使用过程中有开发者反馈这个插件无法在vue2项目中使用，于是，我就开始找问题，发现我的插件是基于Vue3的开发的，由于Vue3的插件和Vue2的插件完全不兼容，因此插件也就只能在Vue3项目中使用。

经过一番考虑后，我决定用原生js来重构这个插件，让其不依赖任何库，这样它就能运行在任意一台支持js的设备上，本文就跟大家分享下我重构这个插件的过程，欢迎各位感兴趣的开发者阅读本文。

运行结果视频：[实现web端自定义截屏](https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1Ey4y127cV%2F)

## 写在前面

本文不讲解插件的具体实现思路，对插件实现思路感兴趣的开发者请移步：[实现Web端自定义截屏](https://juejin.cn/post/6924368956950052877)

## 搭建开发环境

我想使用ts、scss、eslint、prettier来提升插件的可维护性，又嫌麻烦，不想手动配置webpack环境，于是我决定使用Vue CLI来搭建插件开发环境。

本文不细讲Vue CLI搭建插件开发环境的过程，对此感兴趣的开发者请移步：[使用CLI开发一个Vue3的npm库](https://juejin.cn/post/6907428535510499336)。

### 移除vue相关依赖

我们搭建好插件的开发环境后，CLI默认会在package.json中添加Vue的相关包，我们的插件不会依赖于vue，因此我们把它删除即可。

```diff
{
- "vue": "^3.0.0-0",
- "vue-class-component": "^8.0.0-0"
}

复制代码
```

### 创建DOM

为了方便开发者使用dom，这里选择使用js动态来创建dom，最后将其挂载到body中，在vue3版本的截图插件中，我们可以使用[vue组件](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fscreen-shot%2Fblob%2Fmaster%2Fsrc%2Fcomponents%2Fscreen-short.vue)来辅助我们，这里我们就要基于组件来使用js来创建对应的dom，为其绑定对应的事件。

部分实现代码如下，完整代码请移步：[CreateDom.ts](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fjs-screen-shot%2Fblob%2Fmaster%2Fsrc%2Flib%2Fmain-entrance%2FCreateDom.ts)

```typescript
import toolbar from "@/lib/config/Toolbar";
import { toolbarType } from "@/lib/type/ComponentType";
import { toolClickEvent } from "@/lib/split-methods/ToolClickEvent";
import { setBrushSize } from "@/lib/common-methords/SetBrushSize";
import { selectColor } from "@/lib/common-methords/SelectColor";
import { getColor } from "@/lib/common-methords/GetColor";

export default class CreateDom {
  // 截图区域canvas容器
  private readonly screenShortController: HTMLCanvasElement;
  // 截图工具栏容器
  private readonly toolController: HTMLDivElement;
  // 绘制选项顶部ico容器
  private readonly optionIcoController: HTMLDivElement;
  // 画笔绘制选项容器
  private readonly optionController: HTMLDivElement;
  // 文字工具输入容器
  private readonly textInputController: HTMLDivElement;

  // 截图工具栏图标
  private readonly toolbar: Array<toolbarType>;
  
    constructor() {
    this.screenShortController = document.createElement("canvas");
    this.toolController = document.createElement("div");
    this.optionIcoController = document.createElement("div");
    this.optionController = document.createElement("div");
    this.textInputController = document.createElement("div");
    // 为所有dom设置id
    this.setAllControllerId();
    // 为画笔绘制选项角标设置class
    this.setOptionIcoClassName();
    this.toolbar = toolbar;
    // 渲染工具栏
    this.setToolBarIco();
    // 渲染画笔相关选项
    this.setBrushSelectPanel();
    // 渲染文本输入
    this.setTextInputPanel();
    // 渲染页面
    this.setDomToBody();
    // 隐藏所有dom
    this.hiddenAllDom();
  }
  
  /** 其他代码省略 **/
  
}
复制代码
```

### 插件入口文件

在开发vue插件时我们需要暴露一个install方法，由于此处我们不需要依赖vue，我们就无需暴露install方法，我的预想效果是：用户在使用我插件时，直接实例化插件就能正常运行。

因此，我们默认暴露出一个class，无论是使用script标签引入插件，还是在其他js框架里使用import来引入插件，都只需要在使用时new一下即可。

部分代码如下，完整代码请移步：[main.ts](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fjs-screen-shot%2Fblob%2Fmaster%2Fsrc%2Fmain.ts)

```typescript
import CreateDom from "@/lib/main-entrance/CreateDom";
// 导入截图所需样式
import "@/assets/scss/screen-short.scss";
import InitData from "@/lib/main-entrance/InitData";
import {
  cutOutBoxBorder,
  drawCutOutBoxReturnType,
  movePositionType,
  positionInfoType,
  zoomCutOutBoxReturnType
} from "@/lib/type/ComponentType";
import { drawMasking } from "@/lib/split-methods/DrawMasking";
import { fixedData, nonNegativeData } from "@/lib/common-methords/FixedData";
import { drawPencil, initPencil } from "@/lib/split-methods/DrawPencil";
import { drawText } from "@/lib/split-methods/DrawText";
import { drawRectangle } from "@/lib/split-methods/DrawRectangle";
import { drawCircle } from "@/lib/split-methods/DrawCircle";
import { drawLineArrow } from "@/lib/split-methods/DrawLineArrow";
import { drawMosaic } from "@/lib/split-methods/DrawMosaic";
import { drawCutOutBox } from "@/lib/split-methods/DrawCutOutBox";
import { zoomCutOutBoxPosition } from "@/lib/common-methords/ZoomCutOutBoxPosition";
import { saveBorderArrInfo } from "@/lib/common-methords/SaveBorderArrInfo";
import { calculateToolLocation } from "@/lib/split-methods/CalculateToolLocation";

export default class ScreenShort {
  // 当前实例的响应式data数据
  private readonly data: InitData;

  // video容器用于存放屏幕MediaStream流
  private readonly videoController: HTMLVideoElement;
  // 截图区域canvas容器
  private readonly screenShortController: HTMLCanvasElement | null;
  // 截图工具栏dom
  private readonly toolController: HTMLDivElement | null;
  // 截图图片存放容器
  private readonly screenShortImageController: HTMLCanvasElement;
  // 截图区域画布
  private screenShortCanvas: CanvasRenderingContext2D | undefined;
  // 文本区域dom
  private readonly textInputController: HTMLDivElement | null;
  //  截图工具栏画笔选项dom
  private optionController: HTMLDivElement | null;
  private optionIcoController: HTMLDivElement | null;
  // 图形位置参数
  private drawGraphPosition: positionInfoType = {
    startX: 0,
    startY: 0,
    width: 0,
    height: 0
  };
  // 临时图形位置参数
  private tempGraphPosition: positionInfoType = {
    startX: 0,
    startY: 0,
    width: 0,
    height: 0
  };
  // 裁剪框边框节点坐标事件
  private cutOutBoxBorderArr: Array<cutOutBoxBorder> = [];
  // 当前操作的边框节点
  private borderOption: number | null = null;

  // 点击裁剪框时的鼠标坐标
  private movePosition: movePositionType = {
    moveStartX: 0,
    moveStartY: 0
  };

  // 鼠标点击状态
  private clickFlag = false;
  private fontSize = 17;
  // 最大可撤销次数
  private maxUndoNum = 15;
  // 马赛克涂抹区域大小
  private degreeOfBlur = 5;

  // 文本输入框位置
  private textInputPosition: { mouseX: number; mouseY: number } = {
    mouseX: 0,
    mouseY: 0
  };
  constructor() {
    // 创建dom
    new CreateDom();
    this.videoController = document.createElement("video");
    this.videoController.autoplay = true;
    this.screenShortImageController = document.createElement("canvas");
    // 实例化响应式data
    this.data = new InitData();
    // 获取截图区域canvas容器
    this.screenShortController = this.data.getScreenShortController() as HTMLCanvasElement | null;
    this.toolController = this.data.getToolController() as HTMLDivElement | null;
    this.textInputController = this.data.getTextInputController() as HTMLDivElement | null;
    this.optionController = this.data.getOptionController() as HTMLDivElement | null;
    this.optionIcoController = this.data.getOptionIcoController() as HTMLDivElement | null;
    this.load();
  }
  
  /** 其他代码省略 **/
}
复制代码
```

### 对外暴露default属性

做完上述配置后我们的插件开发环境就搭建好了，我执行build命令打包插件后，在vue2项目中使用import形式正常运行，在使用script标签时引入时却报错了，于是我将暴露出来的`screenShotPlugin`变量打印出来后发现他还有个default属性，default属性才是我们插件暴露出来的东西。

求助了下我朋友[@_Dreams](https://juejin.cn/user/3790771823314397)找到了解决方案，需要配置下webpack中的`output.libraryExport`属性，我们的插件是使用Vue CLI开发的，有关webpack的配置需要在需要在`vue.config.js`中进行配置，代码如下：

```javascript
module.exports = {
    // 自定义webpack配置
  configureWebpack: {
    output: {
      // 对外暴露default属性
      libraryExport: "default"
    }
  }
}
复制代码
```

> 这一块的配置在Vue CLI文档中也有被提到，感兴趣的开发者请移步：[build-targets.html#vue-vs-js-ts-entry-files](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fguide%2Fbuild-targets.html%23vue-vs-js-ts-entry-files)

## 使用webrtc截取整个屏幕

插件一开始使用的是html2canvas来将dom转换为canvas的，因为他要遍历整个body中的dom，然后再转换成canvas，而且图片还不能跨域，如果页面中图片一多，它会变得非常慢。

在[上一篇文章](https://juejin.cn/post/6924368956950052877)的评论区中有位开发者 [@名字什么的都不重要](https://juejin.cn/user/1978776662326392) 建议我使用webrtc来替代html2canvas，于是我就看了下webrtc的相关文档，最终实现了截屏功能，它截取出来的东西更精确、性能更好，不存在卡顿问题也不存在css问题，而且它把选择权交给了用户，让用户决定来共享屏幕的那一部分内容。

### 实现思路

接下来就跟大家分享下我的实现思路：

- 使用`getDisplayMedia`来捕获屏幕，得到`MediaStream`流
- 将得到的`MediaStream`流输出到video标签中
- 使用canvas将video标签中的内容绘制到canvas容器中

> 有关getDisplayMedia的具体用法，请移步：[使用屏幕捕获API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FScreen_Capture_API%2F%E4%BD%BF%E7%94%A8%E5%B1%8F%E5%B9%95%E6%8D%95%E8%8E%B7API)

### 实现代码

接下来，我们来看下具体的实现代码，完整代码请移步：[main.ts](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fjs-screen-shot%2Fblob%2Fmaster%2Fsrc%2Fmain.ts)

```typescript
  // 加载截图组件
  private load() {
    // 设置截图区域canvas宽高
    this.data.setScreenShortInfo(window.innerWidth, window.innerHeight);
    // 设置截图图片存放容器宽高
    this.screenShortImageController.width = window.innerWidth;
    this.screenShortImageController.height = window.innerHeight;
    // 显示截图区域容器
    this.data.showScreenShortPanel();
    // 截取整个屏幕
    this.screenShot();
  }

  // 开始捕捉屏幕
  private startCapture = async () => {
    let captureStream = null;

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // 捕获屏幕
      captureStream = await navigator.mediaDevices.getDisplayMedia();
      // 将MediaStream输出至video标签
      this.videoController.srcObject = captureStream;
    } catch (err) {
      throw "浏览器不支持webrtc" + err;
    }
    return captureStream;
  };

  // 停止捕捉屏幕
  private stopCapture = () => {
    const srcObject = this.videoController.srcObject;
    if (srcObject && "getTracks" in srcObject) {
      const tracks = srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.videoController.srcObject = null;
    }
  };

  // 截屏
  private screenShot = () => {
    // 开始捕捉屏幕
    this.startCapture().then(() => {
      setTimeout(() => {
        // 获取截图区域canvas容器画布
        const context = this.screenShortController?.getContext("2d");
        if (context == null || this.screenShortController == null) return;

        // 赋值截图区域canvas画布
        this.screenShortCanvas = context;
        // 绘制蒙层
        drawMasking(context);
        // 将获取到的屏幕截图绘制到图片容器里
        this.screenShortImageController
          .getContext("2d")
          ?.drawImage(
            this.videoController,
            0,
            0,
            this.screenShortImageController?.width,
            this.screenShortImageController?.height
          );
        // 添加监听
        this.screenShortController?.addEventListener(
          "mousedown",
          this.mouseDownEvent
        );
        this.screenShortController?.addEventListener(
          "mousemove",
          this.mouseMoveEvent
        );
        this.screenShortController?.addEventListener(
          "mouseup",
          this.mouseUpEvent
        );
        // 停止捕捉屏幕
        this.stopCapture();
      }, 300);
    });
  };
复制代码
```

## 插件地址

至此，插件的实现过程就分享完毕了。

- 插件在线体验地址：[chat-system](https://link.juejin.cn/?target=https%3A%2F%2Fwww.kaisir.cn%2Fchat-system%2Findex.html)
- 插件GitHub仓库地址：[screen-shot](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fjs-screen-shot)
- 开源项目地址：[chat-system-github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flikaia%2Fchat-system)

## 写在最后

- 文中如有错误，欢迎在评论区指正，如果这篇文章帮到了你，欢迎点赞和关注😊
- 本文首发于掘金，未经许可禁止转载💌