### 生命周期对比
---

| vue2          | vu3             | 备注                             |
| ------------- | --------------- | -------------------------------- |
| beforeCreate  | -               | vue3 setup就是围绕这一层进行部署 |
| created       | -               | vue3 setup就是围绕这一层进行部署 |
| beforeMount   | beforeMount     |                                  |
| mounted       | mounted         |                                  |
| beforeUpdate  | beforeUpdate    |                                  |
| updated       | updated         |                                  |
| beforeDestroy | beforeUnmount   |                                  |
| destroyed     | unmounted       |                                  |
| -             | errorCaptured   | 新特性                           |
| -             | renderTracked   | 新特性                           |
| -             | renderTriggered | 新特性                           |
| -             | activated       | 新特性                           |
| -             | deactivated     | 新特性                           |


- vue2 钩子写法
```js
export default{
    beforeCreate(){},
    created(){},
    beforeMount(){},
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){}
    ...
}

```


- vue3 钩子写法
```js
import { onMounted,onBeforeMount } from 'vue'
export default {
  setup() {
    onBeforeMount(() => {.../}),
    onMounted(() => {.../}),
    onRenderTriggered(() => {.../}),
  }
}
```



### 