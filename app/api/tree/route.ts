import { NextResponse } from "next/server";
import { fetchTree, TreeItem } from "@/lib/fetchDocs";

export async function GET() {

  async function build(path: string[] = []): Promise<TreeItem[]> {
    const items = await fetchTree(path);

    const result: TreeItem[] = [];

    for (const item of items) {
      if (item.type === "dir") {
        result.push({
          ...item,
          children: await build(item.path.split("/")),
        });
      } else {
        result.push(item);
      }
    }

    return result;
  }

  const tree = await build();
  return NextResponse.json(tree);
}
