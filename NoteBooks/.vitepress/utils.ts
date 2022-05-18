import * as fs from "fs";
import * as path from "path";
import * as globby from "globby";

// { text: "目录", children: readD() }
export function readD(dir: string) {
  const exclude = ["public", "..", ".", "", ".vitepress", "Notebooks"];
  let dirname = path.dirname(dir);
  let basePath = path.basename(dir);
  let fullPath: string = path.resolve(dir);

  if (!fs.lstatSync(fullPath)) return [];

  let title = path.basename(dir);
  let reslut: any[] = [];

  for (let each of fs.readdirSync(fullPath, {
    withFileTypes: true,
  })) {
    let text = each.name.split(".")[0];
    let link = `/${title}/${each.name}`;

    if (each.isDirectory() && !exclude.includes(each.name)) {
      reslut.push({
        text,
        link: `${link}/index.md`,
        children: readD(path.join(dir, each.name)),
      });
    } else {
      if (!each.name.endsWith(".md")) continue;

      if (each.name == "index.md") {
        reslut.push({ text: basePath, link });
      } else {
        reslut.push({ text, link });
      }
    }
  }

  return reslut;
}

// const basePath = "W:/CPS/MyProject/demo/cps-cli/vitepress-template/Notebooks";

interface ItestOtions {
  exclude?: string[];
}

// const test = (basePath: string, options?: ItestOtions) => {
//   return fs
//     .readdirSync(basePath, { withFileTypes: true })
//     .filter(Dirrent => {
//       let isDirectory = Dirrent.isDirectory();
//       let isConfig = Dirrent.name.startsWith(".");
//       let exclude: any[] = [];

//       if (options && options.exclude) exclude = options.exclude;
//       let inExclude = exclude.includes(Dirrent.name);

//       return !(isDirectory || isConfig || inExclude);
//     })
//     .map(item => item.name.toString());
// };

const basePath = "D:/CPS/MyProject/demo/cps-cli/cps-cli-vitepress/Notebooks";
const dirname = path.basename(basePath);
const exclude = ["public", "..", "."];

const basePathInfo = readD(basePath);

// console.log("basePathInfo: ", basePathInfo);
console.log("basePathInfo: ", basePathInfo[2]);
