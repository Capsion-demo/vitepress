## 基本概念
- js默认的file处理对象
- 可以从 <input type="file"> 里面的 **FileList** 对象
- 可以从 元素拖拽时产生的 **e.DataTransfer** 对象获取
- 继承自Blob, 可以使用Blob的所有属性和方法



## 基本使用

```js
//语法
let selected_file = document.getElementById('input').files[0];
let fileName = selected_file.name;
let fileSize = selected_file.size;
let fileType = selected_file.type;
```


## 实例属性(非Blob继承)

- name 文件名，该属性只读。
- lastModified：文件的上次修改时间，格式为时间戳。
- lastModifiedDate：文件的上次修改时间，格式为Date对象实例。



## 实例方法(非Blob继承)



## 总结



### blob与ArrayBuffer的关系