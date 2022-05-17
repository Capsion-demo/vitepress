# 内联类型注解

不明确定义对象类型的情况

```typescript
let name: {
  first: string;
  second: string;
} = {
    first:"1",
    second: "2";
}
```





# 泛型基础使用

让函数接收一个不确定的类型，且同时能返回该类型

```typescript
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverse(sample);

console.log(reversed); // 3, 2, 1

// Safety
reversed[0] = '1'; // Error
reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok
```

在上个例子中，函数 `reverse` 接受一个类型为 `T`（注意在 `reverse<T>` 中的类型参数） 的数组（`items: T[]`），返回值为类型 T 的一个数组（注意：T[]），函数 `reverse` 的返回值类型与它接受的参数的类型一样。当你传入 `const sample = [1, 2, 3]` 时，TypeScript 能推断出 `reverse` 为 `number[]` 类型，从而能给你类型安全。与此相似，当你传入一个类型为 `string[]` 类型的数组时，TypeScript 能推断 `reverse` 为 `string`[] 类型，如下例子所示：





# css/html 文件使用 import

只需要在 `global.d.ts` 内使用 `declare module '*.xxxx'` 后，即可通过import在实际开发中引入

```typescript
// 添加所有 css 文件支持
declare module "*.css"

// 添加所有 html 文件支持
declare module "*.html"
```







# Process对象`env`添加扩展



```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly PICGO_VERSION: string
  }
}
```



# 扩展一些常用格式

```tsx
/* eslint-disable @typescript-eslint/naming-convention */
declare module '*.sh' {
  const src: string
  export default src
}
declare module '*.applescript' {
  const src: string
  export default src
}
declare module '*.ps1' {
  const src: string
  export default src
}
```



# Process对象

- 添加全局

```typescript
// 如果直接执行
console.log(process); // TSError:  Cannot find name 'process'

// 声明这是一个存在的全局变量
declare let process:any
console.log(process); // success
```



# Process对象添加自定义属性

```typescript
declare namespace NodeJS {
  export interface Process {
    ccvb?: any;
  }
}
    
process.ccvb = "ccvb";
    
console.log(process.ccvb);
```





# typeof 两个作用

- 作用1： 类型保护
- 作用2： 获取类型



**类型保护：**

通过使用 **typeof** 判断某个目标是否某种类型（字符串）

```typescript
function doSome(x: number | string) {
  if (typeof x === 'string') {
    // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
    console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
    console.log(x.substr(1)); // ok
  }

  x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
}
```



**获取类型：**

通过 **typeof** 获取目标参数的类型，并独立的作为类型参数保存起来

```typescript
let tar:string = "capsion"
type targetType typeof tar

// 定义一个新的类型参数
let new_tar:targetType = "capsion"
```



# 类型断言

**应用场景：**

- 通过双重断言，明确事件返回类型

```typescript
function handler(event: Event) {
  const element = (event as any) as HTMLElement; // ok
}
```



# 结构化

只要两个类型的结构相等，内部属性名称不用一样都可以互相赋值







# 函数的重构
