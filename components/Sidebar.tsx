'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface TreeNode {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeNode[];
}

interface SidebarProps {
  searchQuery?: string;
  activeSlug?: string;
}

export default function Sidebar({ searchQuery = "", activeSlug }: SidebarProps) {
  const [tree, setTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    fetch("/api/tree")
      .then((res) => res.json())
      .then(setTree)
      .catch(console.error);
  }, []);


  function filterTree(nodes: TreeNode[]): TreeNode[] {
    return nodes
      .map((node) => {
        if (node.type === "file") {
          if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return node;
          }
          return null;
        }

        if (node.type === "dir" && node.children) {
          const filteredChildren = filterTree(node.children);
          if (filteredChildren.length > 0 || node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return { ...node, children: filteredChildren };
          }
        }

        return null;
      })
      .filter(Boolean) as TreeNode[];
  }

  function renderNode(node: TreeNode) {
    if (node.type === "file") {
      const slug = node.path.replace(/^docs\//, "").replace(/\.mdx$/, "");
      const isActive = activeSlug === slug;
      return (
        <li key={node.path} className="py-1">
          <Link
            href={`/docs/${slug}`}
            className={`
              block px-4 py-2 rounded-lg font-medium transition
              ${isActive
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                : "bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
            `}
          >
            {node.name}
          </Link>
        </li>
      );
    }

    if (node.type === "dir" && node.children) {
      return (
        <li key={node.path} className="mb-2">
          <span className="block px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-700/30 mb-1">
            {node.name}
          </span>
          <ul className="ml-4 space-y-1">{node.children.map(renderNode)}</ul>
        </li>
      );
    }

    return null;
  }

  const filteredTree = filterTree(tree);

  return (
    <div className="flex-1 flex flex-col h-full overflow-auto">
      <ul className="space-y-2">
        {filteredTree.map(renderNode)}
      </ul>
    </div>
  );
}
