const fs = require("fs");
const path = require("path");

const ROOT = path.join(process.cwd(), "docs");

function walk(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.map((e) => {
    const fullPath = path.join(dir, e.name);
    const relativePath = path.join(base, e.name);

    if (e.isDirectory()) {
      return {
        name: e.name,
        type: "dir",
        path: relativePath.replace(/\\/g, "/"),
        children: walk(fullPath, relativePath),
      };
    }

    if (e.isFile() && e.name.endsWith(".mdx")) {
      return {
        name: e.name.replace(/\.mdx$/, ""),
        type: "file",
        path: relativePath.replace(/\\/g, "/"),
      };
    }

    return null;
  }).filter(Boolean);
}

const tree = walk(ROOT);

fs.writeFileSync("_index.json", JSON.stringify(tree, null, 2));

console.log("Generated _index.json");