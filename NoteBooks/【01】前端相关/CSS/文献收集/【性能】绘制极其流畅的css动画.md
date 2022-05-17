# 制作极其流场的css动画

在 web 上创建的动画会卡顿，低效，主要有下面几个原因：

- 使用了会触发重绘的css属性
- 没有对元素开启硬件加速



# 对元素进行硬件加速

如果要对一个元素进行硬件加速，可以应用以下任何一个 property (并不是需要全部，任意一个就可以)：

```css
perspective: 1000px;
backface-visibility: hidden;
transform: translateZ(0);
```



# 如何查看那些CSS属性会触发重绘或者回流



1、通过csstriggers.com

![image-20220217150953829](https://gitee.com/capsion-images/notebook/raw/master/image/202202171509080.png)

这里主要关注每个属性的三种特性触发的越少，性能就越佳：

- Layout：
- Paint：
- Composite：

对应上方列名称是不同的内核，其中

- Blink：基于 [WebKit](https://baike.baidu.com/item/WebKit) 的 fork Web 渲染引擎：Blink。代表浏览器：Chrome

- Gecko：Firefox内核

- WebKit：,Chrome内核原型,开源，代表浏览器：Apple Safari

- EdgeHTML：EDGE专用内核