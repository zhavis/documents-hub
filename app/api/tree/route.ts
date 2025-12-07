import { NextResponse } from "next/server";
import { fetchTree, TreeItem } from "@/lib/fetchDocs";

async function buildTree(path: string[] = []): Promise<TreeItem[]> {
  const items: TreeItem[] = await fetchTree(path);

  const result: TreeItem[] = [];

  for (const item of items) {
    if (item.type === "dir") {
      result.push({
        ...item,
        children: await buildTree(item.path.split("/")),
      });
    } else {
      result.push(item);
    }
  }

  return result;
}

export async function GET() {
  const tree = await buildTree();
  return NextResponse.json(tree);
}
