# 新增

- Composition API
- Teleport（瞬移组件）
- Suspense（异步加载组件）
- 兼容vue2原来的option API 写法





# 性能提升

- 打包时间大幅减少40%
- 初次渲染增快50%
- 更新快130%
- 内存使用减少50%







# 不兼容

vue3官方 不再推荐使用 new Vue() 实例生成eventbus（事件总线）的方式，根实例下已经去除 `$on` 、`$once` 、`$off` 这几个api，往后的需求可以采用vuex或者第三方库（mitt、tiny-emitter）实现，或者采用其他组件通讯方式进行替代。
