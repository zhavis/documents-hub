'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface TreeNode {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeNode[];
}

interface NavigationProps {
  activeSlug: string;
}

export default function NavigationButtons({ activeSlug }: NavigationProps) {
  const [files, setFiles] = useState<TreeNode[]>([]);

  useEffect(() => {
    fetch("/api/tree")
      .then((res) => res.json())
      .then((tree: TreeNode[]) => {

        const flatten = (nodes: TreeNode[], arr: TreeNode[] = []): TreeNode[] => {
          for (const node of nodes) {
            if (node.type === "file") arr.push(node);
            if (node.type === "dir" && node.children) flatten(node.children, arr);
          }
          return arr;
        };
        setFiles(flatten(tree));
      })
      .catch(console.error);
  }, []);

  const currentIndex = files.findIndex(
    (file) => file.path.replace(/^docs\//, "").replace(/\.mdx$/, "") === activeSlug
  );

  const prev = currentIndex > 0 ? files[currentIndex - 1] : null;
  const next = currentIndex < files.length - 1 ? files[currentIndex + 1] : null;

  const linkClass = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition";

  return (
    <div className="flex justify-between mt-8">
      {prev ? (
        <Link
          href={`/docs/${prev.path.replace(/^docs\//, "").replace(/\.mdx$/, "")}`}
          className={linkClass}
        >
          ← Previous
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/docs/${next.path.replace(/^docs\//, "").replace(/\.mdx$/, "")}`}
          className={linkClass}
        >
          Next →
        </Link>
      ) : <div />}
    </div>
  );
}
