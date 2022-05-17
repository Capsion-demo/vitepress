bind、apply和call



bind、apply、call，统称**老王三剑客**，永远不知道你的对象背着你跟多少其他对象发生了关系！~



- 用痒痒鼠来举例：

```javascript
// 大号里有鬼吞
const big = {
  name: "大号",
  spGuiTun: function () {
    console.log(this.name, "我是sp鬼吞");
  },
};

// 小号啥都没有
const small = {
  name: "小号",
};

big.spGuiTun.call(small);
```

从上面代码可以知道，我的大号里有人权卡，但是小号没有，日常组队是不需要说一定要有鬼吞的，但是一些活动只能单机，这时候官方有个借好友式神的功能，我的小号就可以通过借式神的方式，就可以使用自己没有的式神了

- 用call借一个鬼吞

  ```javascript
  // 小号借用大号的鬼吞用一下啦
  big.sp酒吞.bind(small)() // 小号 我是sp鬼吞
  
  ```

  



- 用bind借一个鬼吞并使用

  ```javascript
  // 小号借用大号的鬼吞用一下啦
  big.sp酒吞.call(small) // 小号 我是sp鬼吞
  ```



# 区别

社区口诀：A useful mnemonic is "A for array and C for comma"

- 运行方式不同

  - **apply**、**call**：修改指向后会马上执行该方法

  - **bind**：修改指向后不会马上调用，自由度更高，实际开发中用bind更多



- 传入参数的方式不同
  - **apply**：所有参数以一个数组的形式进行传递
  - **bind**、**call**：跟原函数接受参数的方式一样



# 应用场景

- 借调：一些已经存在的功能，但不在当前对象上，不需为了该功能重写一边函数来实现
- 隐式调用：这中使用方式可能是个坑，导致后面维护的小伙伴只能添加不能删除，你永远不知道谁在背后调用了谁，（老王？？？）



# 总结

三者的作用都是改变当前对象的this指向，其中call和apply他们的传参方式不同，call可以传多个形参，而apply只能接受一个数组形参。而bing与apply、call的执行方式也不同，前者不会马上执行，后者会马上执行。