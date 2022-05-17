# JS吐槽

JS是一门很强大的语言，它成功坐在互联网风口的浪潮上破浪，估计也是JS作者之初没有想过发展成今天这样，所以JS的语法非常非常宽松，甚至可以说是无任何章法约束可言。



## 创建对象

构造函数 `function` + `new`

```js
function Student(name) {
    var _name = name; // 私有成员
    // 公共方法
    this.getName = function () {}
    // 公共方式
    this.setName = function (value) {}
}
var st = new Student('tom');
```

原型+构造函数

```js
function Person(name) {
  this.name = name
  this.friends = ['lilei']
}
Person.prototype.say = function() {
  console.log(this.name)
}
var person1 = new Person('hanmeimei')
person1.say() //hanmeimei
```

还可以这样创建

```

```

[[js]][[不吐不快]]