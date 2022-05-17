# 安装



```bash
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin 
```



# 文件结构

```bash
<project_name>
 |- src                    # 项目根目录
 |
 |- .eslintignore          # 不执行代码检查的文件列表
 |
 |- .eslintrc.js           # 具体代码检查的配置，核心配置文件
 |
 |- tsconfig.eslint.json   # eslintrc.parserOptions.project 
                           # 由于该配置要求 incude 每个 ts、js 文件。
                           # 而我们仅需要打包 src 目录下的代码，
                           # 所以增加了该配置文件。
```

- **`.eslintignore`** 

- **`.eslintrc.js`** 

- **`tsconfig.eslint.json`**

  tsconfig.eslint.json 我们根目录中增加了一个 tsconfig 文件，它将用于 `eslintrc.parserOptions.project` ，由于该配置要求 incude 每个 ts、js 文件。而我们仅需要打包 src 目录下的代码，所以增加了该配置文件。

  如果 `eslintrc.parserOptions.project` 配置为 tsconfig.json 。src 文件以外的 ts、js 文件都会报错。



# 配置

### 配置  tsconfig.eslint.json

```js
/* tsconfig.eslint.json */
{
  "compilerOptions": {
    "baseUrl": ".",
    "resolveJsonModule": true,
  },
  "include": [
    "**/*.ts",
    "**/*.js"
  ]
}
```



### 配置 .eslintrc.js

```tsx
// .eslintrc.js
const eslintrc = {
    parser: '@typescript-eslint/parser',       // 使用 ts 解析器
    extends: [
        'eslint:recommended',                  // eslint 推荐规则
        'plugin:@typescript-eslint/recommended',    // ts 推荐规则
    ],
    plugins: [
        '@typescript-eslint',
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
          experimentalObjectRestSpread: true
        }
    },
    rules: {}, // 自定义
}

module.exports = eslintrc
```

