"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
  components?: Record<string, any>;
}

export default function MDXContent({ source, components }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
}
