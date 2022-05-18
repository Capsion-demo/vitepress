# 下载依赖

```javascript
# 插件
yarn add eacharts

# 类型提示
yarn add @types/echarts --dev
```





# 以组件形式使用

> /src/*.vue

```html
<template lang="pug">
.echarts(ref="myChart", style="width:100%; height:100%")
</template>
```

```html
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as Echarts from "echarts";

const myChart = ref<HTMLElement>();
const myCHarts = ref<any>();

const initEcharts = (option: any) => {
  console.log("initEcharts: ", option);
  setTimeout(() => {
    myCHarts.value = Echarts.init(myChart.value!);
    myCHarts.value.setOption(option);
  }, 100);
};

const props = withDefaults(
  defineProps<{
    options?: object;
  }>(),
  {}
);

onMounted(() => {
  const option = {
    title: { text: "总用户量" },
    tooltip: {},
    xAxis: {
      data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
    },
    yAxis: {},
    series: [
      {
        name: "用户量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  initEcharts(option);
});
</script>
```





# 全局引用

> src/plugins/Echarts.ts

