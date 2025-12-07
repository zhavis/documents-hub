export interface TreeItem {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeItem[];
}

export async function fetchTree(path: string[] = []): Promise<TreeItem[]> {
  const rawRepo = process.env.GITHUB_DOCS_REPO;
  if (!rawRepo) throw new Error("GITHUB_DOCS_REPO env variable is not defined");


  const parts = rawRepo.replace(/^https?:\/\//, "").split("/").slice(1, 4);
  if (parts.length < 3) throw new Error("GITHUB_DOCS_REPO must be in format https://github.com/owner/repo/branch");
  const [owner, repo, branch] = parts;


  const indexUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/_index.json`;

  let tree: TreeItem[] = [];
  try {
    const res = await fetch(indexUrl, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`Failed to fetch _index.json: ${res.status}`);
      return [];
    }
    tree = await res.json();
  } catch (err) {
    console.warn("Error fetching _index.json:", err);
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
