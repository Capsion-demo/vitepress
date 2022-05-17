# 基础使用

## 安装

```bash
# 本体
npm i prettier -D
# or 
npm i prettier -g


# 如果配合 eslint
eslint-config-prettier eslint-plugin-prettier -D
```



## 初始化

```json
// .prettierrc
{
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid"
}
```





## 配合 ESlint

```json
// .eslintrc.js
{
    // 因为安装了 eslint-config-prettier，所以只需填"prettierr"
    extend:"prettierr" 
}

```

