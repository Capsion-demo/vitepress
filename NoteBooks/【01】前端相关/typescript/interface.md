# interface 和 type 的区别











# 可被调用的类型（函数）

[[函数重载]]

通过 interface 创建一个可调用的类型，实质上是创建一个函数结构

```typescript
// 通过 interface 创建一个可调用的类型
interface Overloaded {
  (foo: string): string;
  (foo: number): number;
}

// 声明这个类型
// 实现接口的一个例子：
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
  if (typeof foo === 'number') {
    return foo * foo;
  } else if (typeof foo === 'string') {
    return `hello ${foo}`;
  }
}

const overloaded: Overloaded = stringOrNumber;

// 调用使用
const str = overloaded(''); // str 被推断为 'string'
const num = overloaded(123); // num 被推断为 'number'
```



```typescript
// 上面声明采用内联也是同价的
let overloaded: {
  (foo: string): string;
  (foo: number): number;
};
```





# 可被实例的类型（被new实例）

声明一个可被 new 关键字实例化的类型结构，我们可以：

```typescript
// 创建这个可被实例化的类型
interface CallMeWithNewToGetString {
  new (): string;
}

// 声明这个类型
declare const Person :CallMeWithNewToGetString

// 实例化
const tar = new Person()

```

