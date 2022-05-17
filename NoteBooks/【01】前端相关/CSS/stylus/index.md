# 使用

- 包安装

```bash
npm install stylus -g

npm i -D stylus
yarn add -D stylus stylus-loader
```





# 导入导出

- 基础语法

```stylus
// 使用@import的时候建议将要引入的文件改为 .styl,不要使用.stylus，可能出现坑
@import "xxx.styl"

```





# 基础语法

高自由度的语法书写是stylus最明显的特点：



- 支持传统语法

```stylus
body{
    width:20px;
    height:30px;
}
```



- 支持类似 yaml 纯缩进语法

```stylus
body
  width 20px
  height 30px
```



- 更加随意的组合语法

```stylus
body{
	width 20px
	height:30px
}
```





# 变量定义

- 定义

```stylus
name = xxx
// 或者
$name = #xxx
```



> 注意：虽然stylus支持各种逻辑控制，各种变量定义，但是实际开发中，为了团队的高可维护性，一般不建议使用。个人项目随意





# 跳出符 "/"（重要）

跳出符，是stylus一个人非常有用的技巧，很好的解决了选择器嵌套太深的问题，又不需要修改嵌套关系

- 预处理前

```stylus
// "/" - 放在css样式前面，该样式最终会生成在跟路径下

body{
    div{
        span{
            width:5px
           /.ccvb{with:10px,height:12px}
        }
    }
}
```

- 预处理后

```stylus
body div span{
	width:5px;
}

// 直接生成在最外层
.ccvb{
	with:10px,height:12px
}

```

- 高级使用

```stylus
// 配合变量定义就算很长的类名也可以轻松搞定
/{var-name}-class-function{xxxxx}
```



# mixn

- 定义 name(xxx=xxx) {}

```stylus
// 支持默认参数
name(borderwidth= 2px){
    border:borderwidth solid #fff;
    color: #ff2;
}
```

- 使用

```stylus
body{
    width:10px;
    name(2px);
}
```

- 输出

```stylus
body{
  width:20px;
  border:2px solid #fff;
}
```



# 内置颜色函数

```stylus
lighten(color, 10%); 
darken(color, 10%);  
saturate(color, 10%);  
desaturate(color, 10%);
```

****