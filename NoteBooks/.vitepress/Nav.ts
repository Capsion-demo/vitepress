/*!
 * @Author: CPS
 * @email: 373704015@qq.com
 * @Date: 2022-05-17 15:21:10.732487
 * @Last Modified by: CPS
 * @Last Modified time: 2022-05-17 15:21:10.732487
 * @Projectname
 * @file_path "W:\CPS\MyProject\cps\NoteBooks\.vitepress"
 * @Filename "Nav.ts"
 * @Description: 功能描述
 */
import { defineConfig } from "vitepress";
// import { readD } from "./utils";

// 导航栏的基本格式
const TEMPLATE = [
  { text: "普通链接", link: "/【01】前端相关/" },
  {
    text: "下拉链接",
    items: {
      text: "子项目名称",
      link: "链接",
    },
  },
];

const MY_REPO = [
  {
    text: "我的仓库",
    items: [
      {
        text: "github",
        link: "https://github.com/mucpsing/mucpsing",
      },
      {
        text: "gitee",
        link: "https://gitee.com/capsion",
      },
    ],
  },
];

const WEB_BOOK = [
  {
    text: "前端相关",
    items: [
      {
        text: "1",
        link: "2",
      },
    ],
  },
];

const SERVER_BOOK = [
  {
    text: "后端相关",
    items: [
      {
        text: "2",
        link: "3",
      },
    ],
  },
];

// export function createNavByDir({ dir = "", title = "" }) {
//   const result: = {};

//   const fullPath: string = path.resolve(basePath, dir);
//   console.log("fullPath: ", fullPath);
//   const text: string = path.basename(fullPath).split(".")[0];
//   const items: any[] = [];

//   const res = fs
//     .readdirSync(fullPath, { withFileTypes: true })
//     .forEach(item => {
//       if (item.isDirectory() && !item.name.startsWith(".")) {
//         let text = item.name.toString();
//         let link = `/${basePath}/${dir}${text}`;
//         items.push({ text, link });
//       }
//     });

//   if (items.length > 0) {
//     result.items = items;
//     result.text = title ? title : text;
//     // console.log(`${result.text}: `, result);
//   }

//   return result;
// }

export default (path?: string, extendPath?: string[]) => {
  return defineConfig({
    themeConfig: {
      nav: [...WEB_BOOK, ...SERVER_BOOK, ...MY_REPO],
    },
  });
};
