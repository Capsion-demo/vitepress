# 深入浏览器理解CSS animations 和 transitions的性能问题

 [FrontEnd](http://sy-tang.github.io/tags/FrontEnd/), [CSS Animate](http://sy-tang.github.io/tags/CSS Animate/)

> 原文链接: [CSS animations and transitions performance: looking inside the browser](http://blogs.adobe.com/webplatform/2014/03/18/css-animations-and-transitions-performance/)

你可能已经在一些项目中使用过CSS Animations 或者CSS Transitions（如果没有，可以到CSS-Trick上查阅相关的资料：[animations](http://css-tricks.com/almanac/properties/a/animation/)&[transitions](http://css-tricks.com/almanac/properties/t/transition/)）你所做的一些动画可能是平滑的，但其中有一部分可能会很不连贯。你想知道为什么吗？

在本文中，我们将探讨浏览器怎么处理 CSS Animations以及Transitions，这样在你编写任何代码之前，就可以大概知道一个动画是否能表现得很流畅！有了这种直觉，你就能够作出适应浏览器的设计，创造如丝般顺滑的用户体验。



## 浏览器内部

让我们打开浏览器的引擎盖，四处看看。一旦我们理解它是如何工作的，我们就可以更好的驾驭它。

现代的浏览器通常会有两个重要的执行线程，这2个线程协同工作来渲染一个网页：

- 主线程
- 合成线程

一般情况下，主线程负责：

- 运行JavaScript。
- 计算HTML 元素的 CSS 样式。
- 页面的布局
- 将元素绘制到一个或多个位图中
- 将这些位图交给合成线程

相应地，合成线程负责：

- 通过 GPU将位图绘制到屏幕上
- 通知主线程更新页面中可见或即将变成可见的部分的位图
- 计算出页面中哪部分是可见的
- 计算出当你在滚动页面时哪部分是即将变成可见的
- 当你滚动页面时将相应位置的元素移动到可视区域

长时间执行 JavaScript 或渲染一个很大的元素会阻塞主线程，在这期间，它将无法响应用户的交互。

相反，合成线程则会尽量去响应用户的交互。当一个页面发生变化时，合成线程会以每秒60 帧的间隔去不断重绘这个页面，即使这个页面不完整。

举个例子，当用户滚动页面时，合成线程会通知主线程更新页面中最新可见部分的位图。但是，如果主线程响应地不够快，合成线程不会保持等待，而是马上绘制已经生成的位图，还没准备好的部分用白色进行填充。

## GPU

刚才我提到合成线程会使用 GPU将位图绘制到屏幕上，接下来让我们快速了解一下 GPU。

目前，大多数手机、 平板电脑、 和计算机都配备了GPU芯片。它有着非常专业的定位，这意味着GPU非常擅长做某些事情（比如绘图），但在其他方面则没什么优势。

GPU的快在于：

1. 绘制位图到屏幕上
2. 一遍又一遍地绘制相同的位图
3. 将同一位图绘制到不同位置，执行旋转以及缩放处理

GPU 的慢在于：

1. 将位图加载到它的内存中

## transition: height

现在，我们已经对渲染页面的软硬件都有一些初步的理解了，接下来让我们来看看浏览器的主线程和合成线程石如何协同工作来执行一个 CSS Transition的。

假设我们要一个元素的height从 100 px 变成 200 px，就像这样：

```
div {
    height: 100px;
    transition: height 1s linear;
}

div:hover {
    height: 200px;
}
```

主线程和合成线程将按照下面的流程图执行相应的操作。注意在橘黄色方框的操作可能会比较耗时，在蓝色框中的操作是比较快速的。（*译注：懒得重新画图，流程图中的内容略过不译，下同*）
![img](http://blogs.adobe.com/webplatform/files/2014/03/animate-height-2x.png)

正如你所看到，在上图中有很多橘黄色方框，意味着，浏览器需要做大量的工作，也就是说这个动画可能会变得卡顿。

在动画的每一帧中，浏览器都要执行布局、 绘制、 以及将新的位图提交给 GPU。我们知道，将位图加载到 GPU 的内存中是一个相对较慢的操作。

浏览器需要做大量工作的原因在于每一帧中元素的内容都在不断改变。改变一个元素的高度可能导致需要同步改变它的子元素的大小，所以浏览器必须重新计算布局。布局完成后，主线程又必须重新生成该元素的位图。

## transition: transform

可以说，height属性的transition是比较消耗性能的，那么有什么更好的方案呢？

假设我们需要将一个元素的尺寸缩小一半，并使用[CSS transform](http://css-tricks.com/almanac/properties/t/transform/)属性来完成缩放，使用CSS transition属性来做缩放动画，就像这样：

```
div {
    transform: scale(0.5);
    transition: transform 1s linear;
}

div:hover {
    transform: scale(1.0);
}
```

让我们看看这种情况下的流程图：

![img](http://blogs.adobe.com/webplatform/files/2014/03/animate-transform-2x.png)

这次我们可以看到少了很多橙色的方框，意味着动画变得更流畅了！那么，为什么执行一个元素的transform动画会跟height动画表现得不一样呢？

根据定义，CSS 的transform属性不会更改元素或它周围的元素的布局。transform属性会对元素的整体产生影响，它会对整个元素进行缩放、旋转、移动处理。

这对浏览器来说是个好消息 ！浏览器只需要一次生成这个元素的位图，并在动画开始的时候将它提交给GPU去处理 。之后，浏览器不需要再做任何布局、 绘制以及提交位图的操作。从而，浏览器可以充分利用 GPU 的特长去快速地将位图绘制在不同的位置、执行旋转或缩放处理。

## 设计决策

那么，这是否意味着我们不应该设计一个元素的高度动画呢?答案是否定的。有时这正是你的设计期望的效果，这个动画效果也足够快 。也有可能你要处理的元素是孤立的，并不会导致页面中的其他部分重新布局。也许你的元素重绘起来很简单，浏览器可以快速完成。也许你的元素很小，浏览器只需提交一个很小的位图给 GPU 去处理。

显然，如果你可以用一个”更具性价比”的动画比如CSS transform，去代替一个“更昂贵”的动画比如CSS height，同时又不会对设计造成任何影响，那就应该这么去做。例如，假设你设计了一个按钮，当点击这个按钮时，展示一个菜单。那么，你就不应该使用top或height属性属性来实现这个菜单的展现动画，而是应该尝试用transform属性来实现类似的效果。

以下 CSS 属性在动画处理方面是比较快的：

- [CSS transform](http://css-tricks.com/almanac/properties/t/transform/)
- [CSS opacity](http://css-tricks.com/almanac/properties/o/opacity/)
- [CSS filter](http://css-tricks.com/almanac/properties/f/filter/)（取决于filter的复杂度以及浏览器的实现）

目前来看，这个列表是很有限的，但随着浏览器的发展，你会看到越来越多的 CSS 属性可以快速地执行动画处理。另外，不要低估了以上列表中CSS属性的作用。通过组合使用这3个属性你就能创造出许多丰富的令人惊讶的动画效果。Get creative!