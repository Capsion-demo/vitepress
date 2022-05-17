![image-20220224192448412](https://gitee.com/capsion/markdown-image/raw/master/image/202202241925213.png)

> 本篇笔记是看完阮一峰老师的[grid布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)后，为加深记忆的笔记总结。





# 📃基础概念

![image-20220223192240903](https://gitee.com/capsion/markdown-image/raw/master/image/202202231922933.png)

![image-20220223192146696](https://gitee.com/capsion/markdown-image/raw/master/image/202202231921744.png)



- **容器** -  grid布局的基础单位
- **项目** - 容器的顶层元素，就是该容器的项目，仅此一层。
- **行** - 横向排列的元素
- **列** - 纵向排列的元素





# 容器属性 - content

**行内的grid**：

![image-20220223212321591](https://gitee.com/capsion/markdown-image/raw/master/image/202202232123634.png)

```stylus
    display: inline-grid
```



## 尺寸控制

**相关属性：**

- grid-template-rows

- grid-template-columns

```stylus
// 绝对单位
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px; // 3x3列， 列宽为100px
  grid-template-rows: 100px 100px 100px;    // 3x3行， 行高为100px
}
```



- 百分比

```stylus
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}

// 使用repeat 可以方便的重复编写
// repeat(重复次数, 值)
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%); //
  grid-template-rows: repeat(3, 33.33%);    //
}
```



- 自动填充 auto-fill

```stylus
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```



- fr - 比例

```stylus
// 表示采用两列，然后宽度平均计算
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

// 12列的杉栏布局
.container {
    grid-template-columns: repeat(12, 1fr);
}
    
// 与指定尺寸配合使用
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr; // 第一列采用150px 第二列为的第三列的一般宽度
}
```



- 限制范围

```stylus
// 让列宽保持在100px到1/3的容器宽度之间
.container {
    grid-template-columns: 1fr 1fr minmax(100px, 1fr);
}
```

## 间距

**相关属性：**

- grid-row-gap - 行距
- grid-column-gap - 列距
- grid-gap - 简写， grid-gap <grid-row-gap> <grid-column-gap>

```stylus
// 设置间距
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

// 等价与
.container {
  grid-row: 20px 20px;
}

// 等价与
.container {
  grid-row: 20px;
}
```



## 区域 （命名，别名）

对一些区域进行命名，方便用其他属性对其进行尺寸，位置等属性的定制

**相关属性：**

- grid-template-areas

```stylus
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";

// 配合使用 "." 对不需要命名的区域进行忽略
grid-template-areas: "header header ."
                     "main main ."
                     "footer footer .";
```

**联动属性：**

- **grid-area** - 可以指定元素采用具体那个别名的区域
- **网格线** - 区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`。

## 网格线的命名

比如，区域名为`header`，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`。



## 布局顺序

**相关属性：**

- grid-auto-flow

```stylus
grid-auto-flow: row
grid-auto-flow: column

grid-auto-flow: row dense    //  
grid-auto-flow: column dense // 填补错误，
```



## 项目对齐

![image-20220224192114814](https://gitee.com/capsion/markdown-image/raw/master/image/202202241921866.png)





**相关属性：**

- **justify-items** - 设置单元格内容的水平位置（左中右）
- **align-items**    - 设置单元格内容的垂直位置（上中下）
- **place-items**   - `align-items`属性和`justify-items`属性的合并简写形式。
  - `place-items: <align-items> <justify-items>;`

> **通用取值：**
>
> - **start**：对齐单元格的起始边缘。
> - **end**：对齐单元格的结束边缘。
> - **center**：单元格内部居中。
> - **stretch**：拉伸，占满单元格的整个宽度（默认值）。



```stylus
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```



## 内容对齐

引用自元老师的图片（以后有空自己画一个）

![image-20220224192326213](C:\Users\M2-WIN10\AppData\Roaming\Typora\typora-user-images\image-20220224192326213.png)

![image-20220224192341858](https://gitee.com/capsion/markdown-image/raw/master/image/202202241923926.png)





**相关属性：**

- **justify-content** - 整个内容区域在容器里面的水平位置（左中右）
- **align-content**   - 整个内容区域的垂直位置（上中下）
- **place-content**  - `align-content`属性和`justify-content`属性的合并简写形式
  - `place-content: <align-content> <justify-content>`

> **通用取值（跟flex的justify-content类似）：**
>
> - start
> - end
> - center
> - stretch
> - space-around
> - space-between
> - space-evenly

```stylus
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```







# 项目属性（item）

项目属性，既指作用在 item 上面的属性



## 设置起始网格（合并单元格）

项目的尺寸控制跟容器的有很大区别，按照传统设置宽和高的方式，那么容器层的行高和列宽已经做了，项目层面的尺寸则是对当前元素占用多少个区域，采用网格线来做尺寸单位。



**相关属性：**

- **grid-column-start**  - 左边框所在的垂直网格线
- **grid-column-end **   - 右边框所在的垂直网格线
- **grid-column**      - `grid-column-start`和`grid-column-end`的合并简写形式
- **grid-row-start**  - 上边框所在的水平网格线
- **grid-row-end**    - 下边框所在的水平网格线
- **grid-row**             - `grid-row-start`和`grid-row-end`的合并简写形式

> 注意：
>
> - 行的网格线总数是：行数+1，起始为1
>
> - 列的网格线总数是：列数+1，起始为1
>
> - 使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

```stylus
// 指定网格线索引
.item-1 {
  grid-column-start: 1;
  grid-column-end: 4;
}

// 指定网格线的名字
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}

// 使用跨越合并
.item-1 {
  grid-column-start: span 2;
}
```



**合并属性的使用：**

```stylus
// 用 "/" 分隔
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

// 等同于
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

// 等同于
.item-1 {
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

> 斜杠以及后面的部分可以省略，默认跨越一个网格。



## 放置区域

**相关属性：**

- **grid-area** - 属性指定项目放在哪一个区域。

```stylus
// 将item1放置到区域 "e" 
// 区域 "center" 通过容器上定义 "grid-template-areas" 属性定义
.item-1 {
  grid-area: center;
}
```



## 内容对齐

item 内部的对齐方式

![image-20220224192150362](C:\Users\M2-WIN10\AppData\Roaming\Typora\typora-user-images\image-20220224192150362.png)





**相关属性：**

- **justify-self** - 设置单元格内容的水平位置（左中右），对应容器的`justify-items`属性，用法完全一致
- **align-self**   - 设置单元格内容的垂直位置（上中下），对应容器的`align-items`属性，用法完全一致
- **place-self** - align-self属性和justify-self属性的合并简写形式
  - `place-self: <align-self> <justify-self>;`
  - `place-self: center center;`
  - 如果省略第二个值，`place-self`属性会认为这两个值相等

> **通用取值：**
>
> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）

```stylus
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```



















