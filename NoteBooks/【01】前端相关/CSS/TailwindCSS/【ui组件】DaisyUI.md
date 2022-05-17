[网址](https://daisyui.com/docs/config/)

[[ui组件]] [[tailwindcss]]





# 安装

```bash
npm i daisyui
```



```js
// taiwindcss.config.js
module.exports = {
  content: [
    "./packages/renderer/src/index.html",
    "./packages/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 添加到插件位置
  plugins: [require("daisyui")],
};
```





