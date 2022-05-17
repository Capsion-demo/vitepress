/*!
 * @Author: CPS
 * @email: 373704015@qq.com
 * @Date:
 * @Last Modified by: CPS
 * @Last Modified time: 2021-10-21 16:04:34.524514
 * @Projectname
 * @file_path "W:\CPS\MyProject\cps\NoteBooks\.vitepress"
 * @Filename "config.ts"
 * @Description: 功能描述
 */

"use strict";
import { defineConfig } from "vitepress";
import * as path from "path";

import baseNav from "./Nav";

const docsDir = path.join(path.resolve("."), "Notebooks");

export const config = defineConfig({
  title: "Capsion的学习笔记",
  lang: "zh-CN",
  description: docsDir,
  // description: "好记性不如烂笔头",
  base: "/", // 部署时的路径 默认 /  可以使用二级地址 /base/
  themeConfig: {
    // repo: "mucpsing/mucpsing",
    // repoLabel: "github",
    editLinks: false,
    nav: baseNav(docsDir).themeConfig.nav,
  },
});

export default config;
