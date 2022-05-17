# FileReader

浏览器通过 `<input>`标签或者`拖拽文件API`读取到的文件是一个叫做`Blob `的**只读**二进制对象, 如果对文件需要作其他操作，我们就要借助**`FileReader()`** ，将`Blob`转换为我们需要的格式`text`/`URL`/`BinaryString`/`Buffer`

## 语法

- **`var reader = new FileReader()`**



## 基础API

 **所有转换都是异步非阻塞的**

- `reader.readAsText(file, encoding="UTF-8")`

返回文本字符串。默认情况下，文本编码格式是’UTF-8’，可以通过可选的格式参数，指定其他编码格式的文本。



- `reader.readAsDataURL(file)`

返回一个基于Base64编码的data-uri对象。



- `reader.readAsBinaryString(file)`

返回二进制字符串，该字符串每个字节包含一个0到255之间的整数。



- `reader.readAsArrayBuffer(file)`

返回一个ArrayBuffer对象。可以用于图片格式的转换,zip的解码等



## 基础钩子

- `reader.onabort`

读取中断或调用`reader.abort()`方法时触发。



- `reader.onerror`

读取出错时触发。



- `reader.onload`

读取成功后触发。



- `reader.onloadend`

读取完成后触发，不管是否成功。触发顺序排在 onload 或 onerror 后面。



- `reader.onloadstart`

读取将要开始时触发。



- `reader.onprogress`

读取过程中周期性触发。





## 基础用法

- 以`Promise`形式调用和返回

```js
async function readFile(inputFile, type="text"){
	let reader = new FileReader()
    
    switch(type){
           case
    }
    
	reader.readAsDataURL(inputFile)
	
	return new Promise(resolve=>{
		reader.onload = async (file) => {
			let res = {
				result:file.target.result
			}
			
			resolve(res)
		}
	})
}
```



- 读取`JSON`文件

```js
// txt 文件需要采用 gb2312
reader.readAsText(file, "gb2312"); 
reader.onload = () => {
    info = JSON.parse(reader.result);
};
```



- `Blob` 读取为 `base64`

```js
reader.readAsDataURL(f);
reader.onload = (e) => {
    document.createElement('img').src = e.target.result;
};
```



- (错误处理)

```js
var reader = new FileReader();
reader.onerror = errorHandler;
 
function errorHandler(evt) {
  switch(evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break;
    default:
      alert('An error occurred reading this file.');
  };
}
```



- 进度显示

读取大文件的时候，可以配合Blob对象的slice方法，将大文件分成小段，逐一读取，这样可以加快处理速度。

```js
const reader = new FileReader();
reader.onprogress = updateProgress;

function updateProgress(evt) {
  if (evt.lengthComputable) {
    let percentLoaded = Math.round((evt.loaded / evt.totalEric Bidelman) * 100);

    let progress = document.querySelector('.percent');
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}
```



- 直接使用 `canvas` 显示图片

```js
document.querySelector('input[name=picture]').onchange = function(e){
   readFile(e.target.files[0]);
}

function readFile(file){

    var reader = new FileReader();

    reader.onload = function(e){
      applyDataUrlToCanvas ( reader.result );
    };

    reader.reaAsDataURL(file);
}
```

  

- 读取 剪切板上的数据

```js
//监听剪贴板
document.onpaste = function(e){
  e.preventDefault();
  if(e.clipboardData && e.clipboardData.items){
    // pasted image
    for(var i=0, items = e.clipboardData.items;i<items.length;i++){
      if( items[i].kind==='file' && items[i].type.match(/^image/) ){
        readFile(items[i].getAsFile());
        break;
      }
    }
  }
    
  return false;
}
```

  



## 扩展阅读

- `URL.createObjectURL() `与 `FileReader.readAsDataURL() `  [链接](https://blog.csdn.net/qq_36671474/article/details/100545250)

- 



















