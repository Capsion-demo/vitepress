import * as fs from "fs";
import * as path from "path";
import * as globby from "globby";
import * as fse from "fs-extra";

// { text: "目录", children: readD() }

const exclude = ["public", ".", "..", ".vitepress", "index.md"];

function renameWithoutSpace(fileName: string, tag = "_"): void {
  let res = fileName.indexOf(" ");
  if (res > 0) {
    console.log(fileName);
    let newName = fileName.replace(new RegExp(" ", "g"), tag);
    console.log(newName);

    fse.renameSync(fileName, newName);
  }
}

/**
 * @Description - 每个目录地下生成一个md文件列表:index.md中
 *
 * @param {string} dir  - {description}
 *
 * @returns {void } - {description}
 *
 */
function createIndexMd(dir: string, basename?: string): void {
  const result: any[] = [];
  const fullPath = path.resolve(dir);

  basename = basename ? path.join(basename, path.basename(dir)) : path.basename(dir);

  if (!fs.lstatSync(fullPath)) return;
  const dirList = fs.readdirSync(fullPath, { withFileTypes: true });

  let data = "";
  const end = `\n\n`;
  let hasIndexMd = false;
  for (let each of dirList) {
    // if (each.name == "index.md") hasIndexMd = true;

    if (each.isDirectory()) {
      data += `# [${each.name}](%{basename}/${each.name}/index.md)${end}`;
      createIndexMd(path.join(fullPath, each.name));
    } else if (each.name.endsWith(".md")) {
      renameWithoutSpace(each.name);
      data += `# [${each.name}](%{basename}/${each.name})${end}`;
    }
  }

  if (!hasIndexMd) fse.writeFile(path.join(fullPath, "index.md"), data);
}

export function readD(dir: string): any[] {
  const result: any[] = [];
  const fullPath = path.resolve(dir);
  const basename = path.basename(dir);

  if (!fs.lstatSync(fullPath)) return result;

  const dirList = fs.readdirSync(fullPath, { withFileTypes: true });

  for (let each of dirList) {
    if (exclude.includes(each.name)) continue;
    if (each.isDirectory()) {
      result.push({
        text: each.name,
        children: readD(path.join(dir, each.name)),
      });
    } else {
      if (!each.name.endsWith(".md")) continue;

      result.push({
        text: each.name.split(".")[0],
        link: `/${basename}/${each.name}`,
      });
    }
  }

  return result;
}

// home
const basePath = "D:/CPS/MyProject/demo/cps-cli/cps-cli-vitepress/Notebooks/【01】前端相关/";

// office
// const basePath =
//   "W:/CPS/MyProject/demo/cps-cli/vitepress-template/Notebooks/【01】前端相关/";

const res = readD(basePath);
if (res) {
  // fse.writeJson("test.json", res, { spaces: 2 });
  createIndexMd(basePath);
}
