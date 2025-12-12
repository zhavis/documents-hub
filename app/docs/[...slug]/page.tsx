import { serialize } from "next-mdx-remote/serialize";
import MDXContent from "@/components/MDXContent";
import { translateMDX } from "@/lib/translateMDX";
import ReadTracker from "@/components/ReadTracker";
import Sidebar from "@/components/Sidebar";
import { fetchAllSlugsServer } from "@/utils/allslug";
import SearchBox from "@/components/SearchBox";

export default async function DocPage({ params }: { params: { slug?: string[] } }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug?.join("/") || "introduction";

  const { slugs: allSlugs, tree } = await fetchAllSlugsServer();


  const repo = process.env.GITHUB_DOCS_REPO!;
  const [owner, repoName, branch] = repo
    .replace(/^https?:\/\//, "")
    .split("/")
    .slice(1, 4);

  const url = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/docs/${slugPath}.mdx`;

  const res = await fetch(url);
  if (!res.ok) return <p>Document not found</p>;
  const mdxText = await translateMDX(await res.text());
  const mdxSource = await serialize(mdxText);

  return (
    <div className="flex min-h-screen w-full">
    
      <div className="w-full flex flex-col mx-auto py-16 px-8">
       
        <MDXContent key={slugPath} source={mdxSource} />
        <ReadTracker slugPath={slugPath} allSlugs={allSlugs} />
      </div>
    </div>
  
  );
}
