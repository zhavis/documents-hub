export interface TreeItem {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeItem[];
}

export async function fetchTree(path: string[] = []): Promise<TreeItem[]> {
  const rawRepo = process.env.GITHUB_DOCS_REPO!;
  const [owner, repo, branch] = rawRepo.replace(/^https?:\/\//, "").split("/").slice(1, 4);

  const indexUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/_index.json`;

  let tree: TreeItem[] = [];
  try {
    const res = await fetch(indexUrl);
    if (!res.ok) return [];
    tree = await res.json();
  } catch (err) {
    console.warn("Failed to fetch _index.json:", err);
    return [];
  }

  let currentLevel = tree;
  for (const segment of path) {
    const found = currentLevel.find((t) => t.name === segment && t.type === "dir");
    if (!found || !found.children) return [];
    currentLevel = found.children;
  }

  return currentLevel;
}
