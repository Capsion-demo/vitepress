# < transition > 标签使用动画的几种方式

方法1：配合 `animate.css` 动画

方法2、利用 `name-enter/leave` 的几个钩子

方法3、利用 `beforeEnter/enter/afterEnter` 函数钩子，在vue实例内改变样式，达到过渡



# 标签< transition > 

从 vue2.x 到vue3都存在的内置标签，其集成了 [animate.css](https://animate.style/)，引用官方原介绍：

- 自动为 CSS 过渡和动画应用 class；
- 集成第三方 CSS 动画库，例如 [animate.css](https://animate.style/) ；
- 在过渡钩子期间使用 JavaScript 直接操作 DOM；
- 集成第三方 JavaScript 动画库。



# 过渡/动画

原理是对元素标签添加和删除动画class的方式，所以相同的方法也可以实现css的动画。vue还为每次过渡时建立了6个过渡阶段，可以理解为生命周期或者钩子。

- v-enter-from
- v-enter-active
- v-enter-to
- v-leave-from
- v-leave-active
- v-leave-to

> **form**：对应进入的开始
>
> **active**：对应动画进行中的生效状态，
>
> **to**：对应过度结束的状态



**继续引用官方图解**：

>  注意：vue2与vue3的进入阶段命名不一样

<table>
    <tr>
        <td align="center">
			<img width="800" src="https://gitee.com/capsion-images/notebook/raw/master/image/202202281419377.png"/>
        </td>
    </tr>
    <tr>
        <td align="center">
            <h2>vue2</h2>
        </td>
    </tr>
    <tr>
        <td align="center">
			<img width="800" src="https://gitee.com/capsion-images/notebook/raw/master/image/202202171654270.png"/>
        </td>
    </tr>
    <tr>
        <td align="center">
            <h2>vue3</h2>
        </td>
    </tr>
</table>




# 如何使用

## 为 v-show 添加过渡

```jade
  //- =======================================产品|场景 切换区===========================================
  .slider__curtains-scroll
    transition(name="slider")
      //- 产品 start
      .slider__curtains-list(v-show="productType == 'product'")
        .slider__curtains-list-column(
          v-for="(item, index) in productList",
          :key="index",
          :class="{ 'curtains-selected': productIndex == index }",
          @click="changeProduct(index, item)"
        )
          //- img.slider__curtains-list-img(v-lazy="`${imgHost}/${item.urlThumb}`")
          img.slider__curtains-list-img(
            :src="`${imgHost}/${item.urlThumb}`",
            @error="onError($event, `${imgHost}/${item.urlThumb}`)"
          )
          .slider__curtains-list-name {{ item.product_name }}
      //- 产品 end

    transition(name="slider")
      //- 场景 start
      .slider__curtains-list(v-show="productType == 'scene'")
        .slider__curtains-list-column(
          v-for="(item, index) in sceneList",
          :key="index",
          :class="{ 'curtains-selected': sceneIndex == index }",
          @click="changeScene(index, item)"
        )
          //- img.slider__curtains-list-img(v-lazy="`${imgHost}/${item.urlThumb}`")
          img.slider__curtains-list-img(
            :src="`${imgHost}/${item.urlThumb}`",
            @error="onError($event, `${imgHost}/${item.urlThumb}`)"
          )

          .slider__curtains-list-name {{ item.name }}
      //- 场景 end
</template>
```

```stylus
// 进入的钩子，如果是vue3, 第一个钩子使用 ****-enter-from
.slider-enter
  transform translateX(200px)
  opacity 0

.slider-enter-active
  transition all 0.5s ease

.slider-to
  transform translateX(0)
  opacity 1

// 离开的钩子，如果是vue3, 第一个钩子使用 ****-enter-from
.slider-leave
  transition all 0.5s ease
  opacity 1

.slider-leave-active
  transition all 0.5s ease
  opacity 1

.slider-leave-to
  transform translateX(-200px)
  opacity 0
```





# 版本区别

1、进入的钩子名字vue2.x 采用的是 `name-enter` 而 vue3 采用了 `name-enter-from`，更加语义化了
