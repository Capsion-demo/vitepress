# require.context()

- 自动引入vuex的modules子模块

```
# 目录结构
```

```js
// 通过require.context引入对应的文件，加载，可以省去我们引入并使用的过程
// 以下写法是固定，所有的项目里的modules的引入都是这样的
const modules = {}
const files = require.context('./modules', true, /\.js$/) // 引入对应的资源

// console.log(files.keys()) // [所有文件的路径]
// console.log(files(路径)) // 对应路径的文件的模块内容

const _routes = []
const files = require.context('./routes', true, /\.js$/)

files.keys().forEach(path => {
  const module = files(path).default
  if (module) {
    _routes.push({
      ...module
    })
  }
})

let menuRoutes = _routes
```



- router 自动引入

```js
// 自动引入路由链接
const _routes = [];
const files = require.context('./routes',true,/\.js$/)	
 // console.log(files.keys()) // [所有文件的路径]
 // console.log(files(路径)) // 对应路径的文件的模块内容
files.keys().forEach(path=>{	
  const module = files[path].default
  if(module){
    _routes.push(module)
  }
})
```



# webpack的require()

# 同步语法 commonjs

```js
const a = require('./a');
```



# 异步加载 require.ensure

```js
require.ensure([], function(require){
    var list = require('./list');
    list.show();
});
```

此时list.js会被打包成一个单独的chunk文件，大概长这样：`1.fb874860b35831bc96a8.js`，由于可读性太差，一般建议给 ensure 传入第三个参数作为命名

```js
// 单个模块时
require.ensure([], function(require){
    var list = require('./list');
    list.show();
}, 'list');

// 引入多个模块时
require.ensure([], function(require){
    var list = require('./list');
    list.show();
    var edit = require('./edit');
    edit.display();
}, 'list_and_edit');
```

list.js和edit.js将会被打包成一个文件，并命名为list_and_edit.js。这就需要根据你的实际情况来衡量了，如果你不希望打包在一起，只能写两个require.ensure分别引用这两个文件。

多说一句，这种思维其实我是很不喜欢的，在编码阶段却要对打包的事情做出决策，明显违背了职责分离原则。



# 预加载懒执行(commonjs)

在上面的用法中，我们给require.ensure的第一个参数传了空数组，实际上这里是可以接收模块名称的，作用就是实现预加载懒执行。用法如下：

```js
require.ensure(['./list'], function(require){
    var list = require('./list');
    list.show();
});
```

给require.ensure的第一个参数传了['./list']，执行到这里的时候list.js会被[浏览器](http://www.07net01.com/tags-浏览器-0.html)下载下来，但是并不会执行list.js模块中的代码，也就是webpack官网说的，不会进行evaluate。真正进行evaluate的时候是到了后面这句var list = require('./list');这就是所谓的懒执行。

写在函数中的多个模块会被打包在一起，这一点和上面没有区别。另外，写在数组中的模块也会跟他们打包在一起，不管你有没有手动执行。

这种写法也是有点别扭的，像是commonjs和AMD的结合体，而且一个模块名称还要写两次，真是不够优雅。所以webpack自己定义了一个方法，能够实现预加载。

# require.include(webpack)

require.include是webpack自己提供的，并没有什么规范做后台，所以是个小角色。

它可以实现上面是预加载功能，而不用把模块写在数组中，用法如下：

```js
require.ensure([], function(require){
    require.include('./list');//此处只加载不执行
});
```



https://www.cnblogs.com/laneyfu/p/6262321.html

