import * as fs from "fs";
import * as path from "path";
import * as globby from "globby";

// { text: "目录", children: readD() }
export function readD(dir: string) {
  let basePath = path.resolve(path.dirname(dir));
  console.log("basePath: ", basePath);
  let fullPath: string = path.resolve(dir);
  console.log("fullPath: ", fullPath);

  if (!fs.lstatSync(fullPath)) return [];

  let title = path.basename(dir);
  let reslut: any[] = [];

  for (let each of fs.readdirSync(fullPath, {
    withFileTypes: true,
  })) {
    let text = each.name.split(".")[0];
    let link = `/${basePath}/${dir}/${text}`;

    if (each.isDirectory()) {
      reslut.push({
        text,
        children: readD(path.join(dir, each.name)),
      });
    } else {
      if (!each.name.endsWith(".md")) continue;
      reslut.push({ text, link });
    }
  }

  return reslut;
}

const basePath =
  "W:/CPS/MyProject/demo/cps-cli/vitepress-template/Notebooks";

const exclude = ["public"];

const basePathInfo = fs
  .readdirSync(basePath, { withFileTypes: true })
  .filter(
    Dirrent =>
      Dirrent.isDirectory() &&
      !Dirrent.name.startsWith(".") &&
      !exclude.includes(Dirrent.name)
  )
  .map(item => item.name.toString());

let t = path.join(basePath, "/*.md");
console.log("t: ", t);
console.log(
  "basePathInfo: ",
  globby.sync(basePath, {
    expandDirectories: {
      extensions: ["md"],
    },
  })
);
