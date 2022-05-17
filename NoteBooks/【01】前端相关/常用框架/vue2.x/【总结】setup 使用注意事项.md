Setup 和 Script Setup 里面常用
---



# 1、ref HTML实例的获取

### template 

```html
<template lang="pug">
div(ref="ref-name")
</template>
```



### Vue2

```html
<script>
const div = this.$refs['ref-name']
</script>
```



### Vue3 

```html
<script setup lang="ts">
// 因为 setup 的执行时序，此时元素还没被dom挂载，所以需要先赋值null
const refName = ref<HTMLElement|nuill>(null)
</script>
```



# 2、Props 的使用



## 定义

### Vue2

```js
export default {
  props: {
    template: {
      type: String,
      required: false,
      default:()=>{
        return ""
      },
      validator: function(value) {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      }
    }
  },
}
```



### Vue3

```tsx
// 定义props
const props = withDefaults(
  // 定义类型和是否要求
  defineProps<{
    options: object;
  }>(),
  
  // 定义默认值
  {}
);
```

