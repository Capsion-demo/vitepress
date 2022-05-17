# URL.createObjectURL() 和 FileReader.readAsDataURL()



## 具体实现

### **`URL.createObjectURL()`**

`URL.createObjectURL()` 静态方法会创建一个 `DOMString`，其中包含一个表示参数中给出的对象的`URL`。
这个 `URL` 的生命周期和创建它的窗口中的 `document` 绑定。
这个新的 `URL` 对象表示指定的 `File` 对象或 `Blob` 对象。



- 语法

  > objectURL = URL.createObjectURL(object);

- 参数

  > 用于创建 URL 的 **File 对象**、**Blob 对象**或者 **MediaSource 对象**

- 返回值

  > 一个DOMString包含了一个对象URL，该URL可用于指定源 object 的内容

- 作用
  - 该方法生成一个 URL 对象可以直接赋值给 DOM 元素的 src 属性
  - 该方法生成一个 URL 对象还可以作为 `a` 标签的 `href` 属性值，用于下载或链接到指定文件

- **注意**
  - 每次调用 `createObjectURL() `方法时，都会创建一个新的 URL 对象（即使是对同一对象多次调用）
  - 不再需要这些 URL 对象时，每个对象必须通过调用 `URL.revokeObjectURL() `方法来释放

- **理解**

  - 经过这个方法的处理后会生成一个临时的链接，可以理解为内存地址，然后直接赋值给src就行

    

- **使用方式：**

```tsx
objectURL = URL.createObjectURL(blob);


<input #fileInput="grFileUploader" type="file" style="display: none"
     (change)="fileChange(idx, fileInput.files)"
     accept=".png,.jpeg,.jpg">
<img [src] ="imgsrc"/>

imgsrc:string="";

fileChange(index: number, files?: FileList): void {
  const file = files && files.item(0);

  if (file) {
     this. imgsrc= URL.createObjectURL(file)
  }
}
```

  

​    



### **`FileReader.readAsDataURL()`**

`FileReader` 对象允许Web应用程序**异步**读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。



- 语法

  > instanceOfFileReader.readAsDataURL(blob);

- 参数

  > 即将被读取的 `Blob` 或 `File` 对象 (input/拖拽对象

- 返回值

  一个DOMString包含了一个对象URL，该URL可用于指定源 object 的内容



- 作用
  - 读取指定的 `Blob` 或 `File` 对象
  - 读取操作完成的时候，`readyState` 会变成已完成**DONE**，并触发预设的事件钩子
  - 同时 `result` 属性将包含一个`data:URL`格式的字符串（**base64编码**）以表示所读取文件的内容
  - **`result` 属性值可作为 `DOM` 元素的 src 属性**



- **注意**
  - 该方法是异步操作
  - 读取同一文件的时候，可能只会触发一次 `onload`





## 区别

- 返回值
  -  `URL.createObjectURL(blob)` 得到的是当前文件的一个内存url
  -  `FileReader.readAsDataURL(blob)` 可以得到一段base64的字符串



- 内存使用
  - `URL.createObjectURL(blob)` 得到的是一个url地址
  - `FileReader.readAsDataURL(blob)` 得到一段超长的base64的字符串



- 内存清理

  -  `URL.createObjectURL(blob)` 存在于当前`document`内，清除方式只有`upload()`事件或者`revokeObjectURL()`**<u>手动清除</u>** 
  -  `FileReader.readAsDataURL(blob)` 依照js垃圾回收机制自动从内存中清理

  

  

- 执行方式

  - `URL.createObjectURL(blob)`  直接返回，同步执行；
  - ` FileReader.readAsDataURL(blob)` 通过回调的方式f返回，异步执行；



- 多个文件
  - `URL.createObjectURL(blob)` 依次返回，没有影响；
  - ` FileReader.readAsDataURL(blob)` 同时处理多个文件时，需要一个文件对应一个FileReader对象；



- 使用场景
  - 实现图片预览等类似功能，不需要对图片进行额外修改的业务，尽量使用`URL.revokeObjectURL()`，因为该API比较早出现，所以在不同平台下兼容情况更好



## 总结

- `URL.createObjectURL(blob)` 得到本地内存容器的`URL`地址，方便预览，多次使用需要注意手动释放内存的问题，性能优秀。
- `FileReader.readAsDataURL(blob)` 胜在直接转为各种格式，读取excel，转换pdf，裁剪图片，分片上传等等等等等，功能更强大，灵活度大，消耗内存也更大



**根据功能，其实二者没有可比性，`URL.createObjectURL(blob)`业务功能是单一的，且目的性明确的，而`FileReader.readAsDataURL(blob)`功能是开放的，可以处理各种不同的业务环境。**



## 扩展阅读

- [坑1 移动设备的区别](https://www.cnblogs.com/saysmy/p/5626337.html)

