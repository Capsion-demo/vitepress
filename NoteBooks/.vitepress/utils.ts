import * as fs from "fs";
import * as path from "path";

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
