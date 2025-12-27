import { serialize } from "next-mdx-remote/serialize";
import MDXContent from "@/components/MDXContent";
import { translateMDX } from "@/lib/translateMDX";
import ReadTracker from "@/components/ReadTracker";
import Link from "next/link";
import { fetchAllSlugsServer } from "@/utils/allslug";

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

  const currentIndex = allSlugs.findIndex((s) => s === slugPath);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full flex flex-col mx-auto py-16 px-8 max-w-3xl">
 
        <MDXContent key={slugPath} source={mdxSource} />
        <ReadTracker slugPath={slugPath} allSlugs={allSlugs} />

        <div className="flex justify-between mt-10">
          {prevSlug ? (
            <Link
              href={`/docs/${prevSlug}`}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              ← Previous
            </Link>
          ) : (
            <Link
              href="/"
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
               Home
            </Link>
          )}

          {nextSlug ? (
            <Link
              href={`/docs/${nextSlug}`}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Next →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
