# MessageChannel是什么，怎么使用？

[![img](https://upload.jianshu.io/users/upload_avatars/7988872/ec99dea1-addd-46ee-87fc-d44c4bc13c2d.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp)](https://www.jianshu.com/u/fcdf49ef65bb)

[ceido](https://www.jianshu.com/u/fcdf49ef65bb)[![  ](https://upload.jianshu.io/user_badge/19c2bea4-c7f7-467f-a032-4fed9acbc55d)](https://www.jianshu.com/mobile/creator)关注

32018.06.27 16:16:43字数 950阅读 32,048

我们知道：在浏览器环境中，常见的 **macro task** 有 `setTimeout`、`MessageChannel`、`postMessage`、`setImmediate`。而常见的 **micro task** 有 `MutationObsever` 和 `Promise.then`。

Vue中对于 macro task 的实现，优先检测是否支持原生 `setImmediate`，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的`MessageChannel`，如果也不支持的话就会降级为 `setTimeout 0`。

现在我想了解一下这个`MessageChannel`，查了一下还是看规范比较好。

[W3Schools 跟 W3C 组织没有关系](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.v2ex.com%2Ft%2F303172)

> W3Schools 的内容漏洞百出，而且没有给阅读者深入了解的参考，对所有内容浅尝辄止，不是一个教程该有的态度。

另外还有W3CSchool，W3CSchool 是 W3C 中国社区的成员，网上也讲了两者的区别。总之，感觉都不是特别靠谱。

所以还是看**MDN**吧：2017年10月18日，W3C宣布加入Mozilla开发者网络合作，与Mozilla、微软、谷歌、三星一起，共同支持[MDN Web 文档（MDN Web Docs）](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2F)项目。而且也有中文的呢，虽然是大家一起翻译的一部分。

##### [MessageChannel](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FMessageChannel)

`MessageChannel API`允许我们创建一个新的消息通道，并通过它的两个`MessagePort`属性发送数据。

![img](https://upload-images.jianshu.io/upload_images/7988872-650f344aa1b6cf22.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

目前的支持度



##### 使用：

`var channel = new MessageChannel();`
这样就创建了一个管道。

##### 实例属性：



```css
channel.port1
channel.port2
```

获取实例的两个端口，注意的是，两个端口都是只读的。

简单来说，`MessageChannel`创建了一个通信的管道，这个管道有两个端口，每个端口都可以通过`postMessage`发送数据，而一个端口只要绑定了`onmessage`回调方法，就可以接收从另一个端口传过来的数据。

一个简单的例子：



```jsx
        var channel = new MessageChannel();
        var port1 = channel.port1;
        var port2 = channel.port2;
        port1.onmessage = function(event) {
            console.log("port1收到来自port2的数据：" + event.data);
        }
        port2.onmessage = function(event) {
            console.log("port2收到来自port1的数据：" + event.data);
        }

        port1.postMessage("发送给port2");
        port2.postMessage("发送给port1");
```

![img](https://upload-images.jianshu.io/upload_images/7988872-16f5ddabdb9e6985.png?imageMogr2/auto-orient/strip|imageView2/2/w/254/format/webp)

运行结果截图

###### （1）深拷贝

最近发现`MessageChannel`还可以用于深拷贝，我们都知道深拷贝一般用`JSON.parse(JSON.stringify(object))`就可以解决了，

也知道这种方法的局限性：

- 会忽略 `undefined`
- 不能序列化函数
- 不能解决循环引用的对象

`undefined`和函数会被忽略，而尝试拷贝循环引用的对象则会报错：

![img](https://upload-images.jianshu.io/upload_images/7988872-e47ee81d639a93de.png?imageMogr2/auto-orient/strip|imageView2/2/w/456/format/webp)

image.png



一般来说，这个方法都能解决大部分问题，而且性能也是最好的。

但是我最近发现`MessageChannel`的`postMessage`传递的数据也是深拷贝的，这和`web worker`的`postMessage`一样。而且还可以拷贝`undefined`和循环引用的对象。

代码：



```jsx
// 有undefined + 循环引用
    let obj = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      f: undefined
    }
    obj.c = obj.b;
    obj.e = obj.a
    obj.b.c = obj.c
    obj.b.d = obj.b
    obj.b.e = obj.b.c

    function deepCopy(obj) {
      return new Promise((resolve) => {
        const {port1, port2} = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
      });
    }

    deepCopy(obj).then((copy) => {           // 请记住`MessageChannel`是异步的这个前提！
        let copyObj = copy;
        console.log(copyObj, obj)
        console.log(copyObj == obj)
    });
```

![img](https://upload-images.jianshu.io/upload_images/7988872-ce457bac94133a38.png?imageMogr2/auto-orient/strip|imageView2/2/w/349/format/webp)

image.png

但拷贝有函数的对象时，还是会报错：



![img](https://upload-images.jianshu.io/upload_images/7988872-9182bba187713ef1.png?imageMogr2/auto-orient/strip|imageView2/2/w/506/format/webp)

image.png

这时候可能就要用到[lodash](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flodash)这样的函数库了。

###### （2）此特性在 Web Worker 中可以使用。

当我们使用多个`web worker`并想要在两个`web worker`之间实现通信的时候，`MessageChannel`也可以派上用场：



```xml
<script>
    var worker1 = new Worker("worker1.js");
    var worker2 = new Worker("worker2.js");
    var channel = new MessageChannel();
    worker1.postMessage({ port1: channel.port1 });
    worker2.postMessage({ port2: channel.port2 });
    worker2.onmessage = function(event) {
        console.log(event.data);
    }
</script>
```



```php
  self.onmessage = function(event) {
    const port1 = event.data.port1;
    setTimeout(function() {
      port1.postMessage("this is from worker2")
    }, 2000)
  }
```



```php
    self.onmessage = function(event) {
        const port2 = event.ports;
        port2.onmessage = function(event) {
            self.postMessage(event.data);
        }
   }
```

一开始我写出如上代码，结果报了这样的错误：



![img](https://upload-images.jianshu.io/upload_images/7988872-f87550201319a9b7.png?imageMogr2/auto-orient/strip|imageView2/2/w/534/format/webp)

image.png

worker的数据传递是深复制的，这里报错说`MessagePort`不能复制。
于是我查了一下[Worker.postMessage()](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWorker%2FpostMessage)。

发现这个方法有第二个可选的数组参数，可以将`MessagePort`传入，然后将控制权交给要发送到的worker。（这两句是我翻译的（如果还没有被大神改掉的话），翻译得不好别打我哈）

于是我把代码改为：



```xml
// index.html
<script>
    var w1 = new Worker("worker1.js");
    var w2 = new Worker("worker2.js");
    var ch = new MessageChannel();
    w1.postMessage("port1", [ch.port1]);
    w2.postMessage("port2", [ch.port2]);
    w2.onmessage = function(e) {
        console.log(e.data);
    }
</script>
```



```jsx
// worker1.js
  onmessage = function(e) {
    const  port = e.ports[0];
    port.postMessage("this is from worker1")        
  }
```



```jsx
// worker2.js
    onmessage = function(e) {
        const port = e.ports[0];
        port.onmessage = function(e) {
            postMessage(e.data)
        }
    }
```

由于在worker中无法使用`console.log`，因此我们通过给w2绑定`onmessage`回调函数来验证传递是否成功。最终我们可以看到控制台中输出

> this is from worker1

传递的路径为：
w1=> ch1 => ch2 => w2