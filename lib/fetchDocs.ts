// lib/fetchDocs.ts
export async function fetchTree(path: string[] = []): Promise<any[]> {
  const raw = process.env.GITHUB_DOCS_REPO;
  if (!raw) throw new Error("GITHUB_DOCS_REPO environment variable is not defined");

  const clean = raw.replace(/^https?:\/\//, "");
  const parts = clean.split("/");

  if (parts.length < 4) {
    throw new Error("GITHUB_DOCS_REPO must be in format https://github.com/owner/repo/branch");
  }

  const [owner, repoName, branch] = parts.slice(1, 4);
  const githubPath = path.join("/");

  // Correct join:
  const githubPathStr = path.length > 0 ? path.join("/") : "";

  // Correct raw URL format
  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${githubPathStr}?ref=${branch}`;

  const res = await fetch(apiUrl, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  if (!res.ok) {
    console.warn(`Failed to fetch ${apiUrl}: ${res.status}`);
    return [];
  }

  const data = await res.json();

  return data
    .filter((item: any) => item.type === "dir" || item.name.endsWith(".mdx"))
    .map((item: any) => ({
      name: item.name.replace(/\.mdx$/, ""),
      type: item.type,
      path: item.path,
      children: item.type === "dir" ? [] : undefined,
    }));
}
