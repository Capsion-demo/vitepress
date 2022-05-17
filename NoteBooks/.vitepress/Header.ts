/*!
 * @Author: CPS
 * @email: 373704015@qq.com
 * @Date: 2022-05-17 15:21:10.732487
 * @Last Modified by: CPS
 * @Last Modified time: 2022-05-17 15:21:10.732487
 * @Projectname
 * @file_path "W:\CPS\MyProject\cps\NoteBooks\.vitepress"
 * @Filename "Header.ts"
 * @Description: 功能描述
 */

"use strict";
import { HeadConfig } from "vitepress";

export function getHeader() {
  return [
    /*meta标签*/
    ["meta", { name: "author", content: "Capsion 2021" }],
    ["meta", { name: "email", content: "373704015@qq.com" }],

    /*link标签*/
    // 改变title的图标
    ["link", { rel: "icon", href: "/img/linktolink.png" }],
  ];
}
