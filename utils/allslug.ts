export interface TreeNode {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeNode[];
}

export function flattenTree(tree: TreeNode[]): string[] {
  let slugs: string[] = [];

  tree.forEach((node) => {
    if (node.type === "file") {
      const slug = node.path.replace(/^docs\//, "").replace(/\.mdx$/, "");
      slugs.push(slug);
    } else if (node.type === "dir" && node.children) {
      slugs = [...slugs, ...flattenTree(node.children)];
    }
  });

  return slugs;
}

let cachedSlugs: string[] | null = null;
let cachedTree: TreeNode[] | null = null;

export async function fetchAllSlugsServer(): Promise<{ slugs: string[]; total: number; tree: TreeNode[] }> {
  if (cachedSlugs && cachedTree) return { slugs: cachedSlugs, total: cachedSlugs.length, tree: cachedTree };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tree`);
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch /api/tree:", text);
    throw new Error(`Failed to fetch /api/tree: ${res.status}`);
  }

  const tree: TreeNode[] = await res.json();
  const slugs = flattenTree(tree);

  cachedTree = tree;
  cachedSlugs = slugs;

  return { slugs, total: slugs.length, tree };
}

export async function fetchAllSlugs(): Promise<{ slugs: string[]; total: number; tree: TreeNode[] }> {
  const res = await fetch("/api/tree");
  if (!res.ok) throw new Error("Failed to fetch /api/tree");

  const tree: TreeNode[] = await res.json();
  const slugs = flattenTree(tree);

  return { slugs, total: slugs.length, tree };
}
