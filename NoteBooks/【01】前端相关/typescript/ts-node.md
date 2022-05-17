# 主要作用

ts-node 可以直接执行ts文件，不用编译，



# 安装

- 全局安装

```bash
npm i ts-node -g
# 使用
ts-node xx.ts
```



- 局部安装

```bash
npm i ts-node -D
# 使用
npx ts-node xxx.ts
```



# SublimeText 使用 ts-node

```json
{
  "shell_cmd":"ts-node $file",
  "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
  "encoding": "UTF8",
  "file_patterns": ["*.ts","*.tsx"],
  "selector": "source.ts",
  "variants": [
    {
      "name":"ts-node with ESModule (16.x.x)",
      "encoding": "UTF8",
      "shell_cmd": "ts-node --esm $file",
    },
    {
      "name":"ts-node with ESModule on cmd window (16.x.x)",
      "encoding": "UTF8",
      "shell_cmd": "start cmd /c \"ts-node --esm$file & pause \"",
    },
    {
      "name":"ts-node/ems with file (14.x.x)",
      "encoding": "UTF8",
      "shell_cmd": "node --loader ts-node/esm $file",
    },
    {
      "name":"ts-node/ems with file on cmd window (14.x.x)",
      "encoding": "UTF8",
      "shell_cmd": "start cmd /c \"ts-node $file & pause \"",
    },
    {
      "name":"build currt file",
      "encoding": "UTF8",
      "shell_cmd": "tsc $file",
    },
    {
      "name":"watch currt file",
      "encoding": "UTF8",
      "shell_cmd": "start cmd /c \"echo watching file:$file & tsc $file -w\"",
    },
    {
      "name":"watch currt project",
      "encoding": "UTF8",
      "shell_cmd": "start cmd /c \"echo watching file:$file & tsc $file -w\"",
    },
    {
    "name":"run & build",
    "encoding": "UTF8",
    "shell_cmd": "ts-node $file & tsc $file",
  }]
}
```

