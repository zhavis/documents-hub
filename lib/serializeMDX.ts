import { serialize } from "next-mdx-remote/serialize";

export async function serializeMDX(mdxContent: string) {
  const mdxSource = await serialize(mdxContent, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return mdxSource;
}
