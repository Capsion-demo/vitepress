# Composition API

#### Composition API 风格
在`vue2`的`options API`中，我们将`methods`，`computed`、`watch`、`data`等定义成属性和方法，在同一页面进行逻辑编写。

在项目比较小的时候，代码300-500行内时是非常便于管理和查看的。

但当项目达到一定代码量，功能越来越多的时候，各个功能的代码散落在不同位置的代码块，非常不好维护，要么重新进行代码的抽离，要么使用minx分离

在vue3中采用了新的Composition API ，所有逻辑都卸载setup函数内，而所有属性都通过ref进行声明，通过reactive进行倒数



## optionsAPI 和 CompositionAPI 对比
- **optionsAPI (vue2)** 
```js
export default {
  components: { ../ 组建注册},
  computed:{},
  created() {},
  mounted() {},
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

  data() {
    return {}
  },

  methods: {},
}
```

- **CompositionAPI (vue3)**
```js
import { onMounted,onCreated,onUpdate } from 'vue'
import { ref, defineComponent, reactive, refs, watch, computed } from 'vue'

export default defineComponent({
  name:"",
  components: {},
  setup(props, context){
    watch('xxxx',()=>{})
    
    onCreated(()=>{})
    onMounted(()=>{})
    
    // 普通data
    const xxxx = ref('xxxx')
    
    // computed
    let t = computed( ()=>xxxx.value*3 )
    
    const foo = ()=>{ ../ }
    
    return {
        xxxxx,
        foo,
    }
  }
})


```


#### 关键语法
- **ref**
- **rective**
- **setup**
- **toRef** - 解构响应式对象
    > setup(props, context) 

    setup()函数会收到两个参数
    - props - (不能使用ES6的结构方式赋值，会丢失响应式的特性)
    - context - 主要提供 attrs、slot、emit

```js
import { ref, rective, defineComponent } from "vue"

export default defineComponent({
    setup(){
        const var1 = ref('ccvb')
        const var2 = ref(2)
        
        var2.value = var2.value + 1
    }
})

// Or

export default defineComponent(()=>{
    const var1 = ref('ccvb')
}}

```

