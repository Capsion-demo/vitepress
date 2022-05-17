# Webpack 学习笔记

## 安装

```bash
npm i -D webpack webpack-cli -g
```





## 基础概念：

![image-20211223101540313](https://gitee.com/capsion/markdown-image/raw/master/image/202112231015869.png)



核心思想：**webpack将所有静态资源都似作模块**



# 配置文件

> xxxx.config.js

```js
// 基础配置
```



# 插件

插件和加载器是不一样的，一定要分清

- uglifyjs-webpack-plugin

# 常用加载器

加载器有很多很多，说到底都是因为`webpack`不是专门为前端设计的，很多功能都没有内置，需要我们通过加载器来告诉`webpack`哪些文件需要怎处理，哪些文件需要处理等等

注意：加载器在编写时是有顺序要求的

- pug-loader          
- ejs-loader    
- vue-loader       
- postcss-loader
- less-loader
- style-loader
- css-loader
- ......

# 监听模式  Watch

webpack 可以通过监听文件的更新来触发重新编译

```js
// 配置文件 webpack.config.js
module.export={
    watch:true,  //开启监听
    watchOptions:{
        ignored:/node_modules/,// 不监听的目录
        
        // 监听到变化的延时执行时间，防止文件更新太快，导致重新编译率太高
        // 默认300，
        // 实际使用时优化到1000，对配置低的本本比较友好，一般个人使用600
        aggregateTimeout:600,
        
        // 默认每秒询问系统1000次
        // 常用优化webpack选项之一
        // 判断文件是否发生变化是通过不停的轮询系统指定文件有没有变化实现的
        poll:600 
    }
}
```



# dev-server配置

架设服务器，定制更多自定义测试条件

```js
// webpack.config.js
module.exports={
    devServer:{
        contentBase:路径	//设置要监听的路径
        hot:true		 //启动 HMR 模块热刷新
    },
    plugins:[
        new webpack.NameModulesPlugin().
        new webpack.HotModuleReplacementPlugin() //加载 HMR 模块
    ]
}

// dev-server 配置
const devServerOptions = {
    headers: {
        // 配置响应头
        "X-foo": "bar",
    },
    https: false, // 默认关闭 https服务
    contentBase: "./dist", // 配置项目根目录
    publicPath: path.resolve(__dirname, "../build/"), //指定公共目录
    hot: true, // 是否开启热更新
    host: "localhost", // 配置0.0.0.0 可以让外部访问 配合 disableHostCheck:true
    port: 8080, //指定端口
    inline: true, // 是否开启注入？？？
    historyApiFallback: true, // 任何请求都返回 index.html， 路由配置
    historyApiFallback: {
        rewrites: [
            { from: /^\/user/, to: "/user.html" },
            { from: /^\/main/, to: "/main.html" },
            { from: /./, to: "/index.html" }, //其他一律返回 index
        ],
    },
};
```



- 外部调用：`node dev-server.js`

```js
// dev-server.js
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

//关联配置
const config = require('./webpack.config.js'); 
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

