/*!
 * @Author: CPS
 * @email: 373704015@qq.com
 * @Date: 2022-05-17 15:21:10.732487
 * @Last Modified by: CPS
 * @Last Modified time: 2022-05-17 15:21:10.732487
 * @Projectname
 * @file_path "W:\CPS\MyProject\cps\NoteBooks\.vitepress"
 * @Filename "Sidebar.ts"
 * @Description: 功能描述
 */

"use strict";
// import {} 'vitepress'

// interface sideBarItems {
//   text: string;
//   children?: sideBarItems[];
//   link?: string;
// }

export const DEFAULT_SIDEBAR = {
  "/": [
    {
      text: "入门",
      children: [
        {
          text: "简介",
          link: "/getting/why.html",
        },
        {
          text: "模板脚手架简介",
          link: "/getting/template_introduction.html",
        },
      ],
    },
  ],
};

// function getSidebar({
//   dir,
//   tag = "",
// }: {
//   dir: string;
//   tag?: string;
// }) {
//   const reslut: any = {};
//   const text = `${tag ? tag : "/" + dir + "/"}`;
//   reslut[text] = readD(dir);

//   return reslut;
// }
