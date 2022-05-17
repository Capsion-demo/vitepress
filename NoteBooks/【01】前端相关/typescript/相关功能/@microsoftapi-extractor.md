# 安装

```bash
# 安装
yarn add -D @microsoft/api-extractor

# 初始化
npx api-extractor init
```



# 常用指令

```bash
# 运行api-extractor之前，确保目下已经生成过项目的 *.d.ts
tsc

#
npx api-extractor run --local --verbose

# 显示详细错误
npx api-extractor run --local --diagnostics
```



# 配置文件

```json
/* api-extractor.json */
{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
    
  // 本字段对应 package.json 的 typeings 字段
  "mainEntryPointFilePath": "lib/index.d.ts",
  "bundledPackages": [ ],
  "dtsRollup": {
    "enabled": true,
    "untrimmedFilePath": "lib/index.d.ts"
  }
}
```

```json
// package.json
{
    "typings":"lib/index.d.ts",
	"script":{
		"buid api":"npx api-extractor run --local --verbose"
	}
}
```

