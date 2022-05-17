## 基本概念
- 比Blob更底层, 存储在内存中的二进制数据通用的固定长度容器,就是内存上一段连续的二进制数据。
- ArrayBuffer 它本身不复杂，只是使用方式比较丰富
- 我们可以对ArrayBuffer进行读写，但需要借助它提供的工具 TypeArray或DataView



## 基本使用
- Uint8Array / Uint16Array / Uint32Array




## 总结



### blob与ArrayBuffer的关系
- 相同点： 
  - Blob和ArrayBuffer都是二进制的容器；
- ArrayBuffer：
  - ArrayBuffer更底层，就是一段纯粹的内存上的二进制数据，我们可以对其任何一个字节进行单独的修改，也可以根据我们的需要以我们指定的形式读取指定范围的数据
- Blob：
  - Blob就是将一段二进制数据做了一个封装，我们拿到的就是一个整体，可以看到它的整体属性大小、类型；可以对其分割，但不能了解到它的细节
  联系：Blob可以接受一个ArrayBuffer作为参数生成一个Blob对象，此行为就相当于对ArrayBuffer数据做一个封装，之后就是以整体的形式展现了
- 应用上的区别：由于ArrayBuffer和Blob的特性，Blob作为一个整体文件，适合用于传输；而只有需要关注细节（比如要修改某一段数据时），才需要用到ArrayBuffer