# 下载依赖

```javascript
# 插件
yarn add eacharts

# 类型提示
yarn add @types/echarts --dev
```



# 创建 `shims-*.d.ts` 文件

> shims-echarts.d.ts

```js
import Vue from "vue"
import * as echarts from 'echarts'

declare module 'vue/types/vue' {
	interface Vue {
		$echarts:any
	}
}
```



# 引入 echarts， 并设置属性

> main.ts 

```js
import Echart from 'echarts'
Vue.prototype.$echarts = Echart
```



# 组件中使用

> src/*.vue

```js
<template>
  <div>
    <div id="myEcharts" style="height: 400px;"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({})

export default class Home extends Vue {
  public $echarts: any;
  options（写形参） {
          return{
               //里面写要显示的echarts图标
          }
  };
  private mounted() {
    const ele = document.getElementById('myEcharts');
    const chart: any = this.$echarts.init(ele);
    //调接口获取数据
    chart.setOption(this.options（写实参），true);
  }
}
</script>
```



# 全局使用

