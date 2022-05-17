# 基础使用



## 安装

```bash
npm i axios -S

yarn add axios
```



## 引入

- CDN

```bash
<script src="axios_url"></script>

https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
https://unpkg.com/axios/dist/axios.min.js
```



- CommonJS

```js
const axios = require('axios').default;

axios.get()
axios.post()
```



## **直接使用**

### 基础配置

```js
axios.defaults.baseUrl = 'xxxx'
axios.defaults.timeout = 3000
```



```js
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```



### **通过对象参数形式 ( { params:{} } )**

```js
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
```



### **async/await 写法**

```js
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```



### **promise 写法**

```js
async function getUser(){
	return new Promise(resolve=>{
		const res = await axios.get('/user?ID=12345');
		resolve(res)
	})
}
```



## 创建实例使用

```js
const http = axios.create({
	baseUrl,
	timeout,
	...
})
  
const res = await http.get('/', {
  params:{}
})
```









## Axios API 写法

### **基础语法 `axios(url[, config])`** 

```js
// get
axios('/user/12345');
```



### **get**

```js
// GET request for remote image in node.js
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```



### **post**

```js
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```



axios还将所有常用的请求通过别名的方式作为api暴露了了出来

##### `axios.request(config)`

##### `axios.get(url[, config])`

##### `axios.delete(url[, config])`

##### `axios.head(url[, config])`

##### `axios.options(url[, config])`

##### `axios.post(url[, data[, config]])`

##### `axios.put(url[, data[, config]])`

##### `axios.patch(url[, data[, config]])`





## Axios 对象写法

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
  baseURL: 'https://api.example.com'
});

instance.get('userId')
instance.post({userID:"xxx"})
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```



**实例方法：**
**`.request(config)`**
**`.get(url[, config])`**
**`.delete(url[, config])`**
**`.head(url[, config])`**
**`.options(url[, config])`**
**`.post(url[, data[, config]])`**
**`.put(url[, data[, config]])`**
**`.patch(url[, data[, config]])`**
**`.getUri([config])#5 `**





# 配置

设置默认配置

```js
axios.defaults.baseURL = 'https://api.example.com';

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


```



# 其他用例


## 多个请求并行时

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
```



## 请求拦截

### 拦截 request

在数据求情发送之前，对其进行拦截，此时数据还没发送

```js
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
```



### 拦截 response

在数据回来，但还会到handler之前对其拦截，此时数据已经得到

```js
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```







## 使用 axios 案例



```js
async function giteeUpload(content, filename) {
  const { username, repo, branch, accessToken } = getConfig();
  const dir = getDir();
  const dateFilename = getDateFilename(filename);
  const url = `https://gitee.com/api/v5/repos/${username}/${repo}/contents/${dir}/${dateFilename}`;
  const res = await fetch({
    url,
    method: "POST",
    data: {
      content,
      branch,
      access_token: accessToken,
      message: `Upload by ${window.location.href}`,
    },
  });
  return encodeURI(res.content.download_url);
}
```

