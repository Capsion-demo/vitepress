## 基本概念


- 是一个代表二进制数据的基本对象(只读)，在它的基础上，又衍生出一系列相关的API，用来操作文件所有文件对象都继承自 blob

- 一个封装了一层的二进制只读数据对象

---
## 基本使用
```js
//语法
let blob = new Blob(Array,options); //所有参数都是可选

//新建一个blob
let blob = new Blob(data, { "type" : "text\/xml" })
```

- data(可选)： 是一个由`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 等对象构成的 Array ，或者其他类似对象的混合体。（暂时可以不用理解，就可以看作是一堆数据）


- options（可选）：一个对象，用来
设置Blob的一些属性。主要的是一个type属性，表示Blob的类型（其他暂时也不用管）。
简单来说，就是可以通过向new Blob()传一堆数据，生成一个Blob对象

- 实例属性
  - `size` (只读) Blob对象中包含的数据大小（字节）
  - `type` (只读) 表明该Blob对象所包含数据的MIME类型。

- 实例方法
    ```js
    Blob.slice(start, end ,contentType)
    ```
  - slice 实现对文件的分割, （注意这里并不违背Blob的只读性，slice只是只是复制指定范围内的Blob数据）。
    - start :开始索引，可以为负数，语法类似于数组的slice方法。默认值为0。
    - end:结束索引，可以为负数，语法类似于数组的slice方法。默认值为最后一个索引。
    - contentType：新的Blob对象的MIME类型，这个值将会成为新的Blob对象的type属性的值，默认为一个空字符串。


## 总结
1. Blob 就是一个只读的二进制文件，我们可以知道它的文件大小（size），文件类型（type），并可以对其作出分割（slice）。
2. Blob 相对于ArragBuffer 更高级,打包了更多api供开发者使用


### 使用实例1 - 动态生成文件

```js
//点击后提示下载文本文件hello-world.txt
//文件内容为“Hello World”。

var blob = new Blob(["Hello World"]);
var a = document.createElement("a");

a.href = window.URL.createObjectURL(blob);
a.download = "hello-world.txt";
a.textContent = "Download Hello World!";
body.appendChild(a);
```
### 使用实例2 - 通过 blob 将大文件分片上传
```js
//下面是一个使用XMLHttpRequest对象，将大文件分割上传
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(blobOrFile);
}
 
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  var blob = this.files[0];
 
  const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
  const SIZE = blob.size;
 
  var start = 0;
  var end = BYTES_PER_CHUNK;
 
  while(start < SIZE) {
    upload(blob.slice(start, end));
 
    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, false);
 
})();
```

