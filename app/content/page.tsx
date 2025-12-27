"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TreeNode {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeNode[];
}

// Recursive Tree component
function Tree({ nodes }: { nodes: TreeNode[] }) {
  return (
    <ul className="space-y-1 ml-4">
      {nodes.map((node) => (
        <TreeNodeComponent key={node.path} node={node} />
      ))}
    </ul>
  );
}

function TreeNodeComponent({ node }: { node: TreeNode }) {
  const [open, setOpen] = useState(false);

  if (node.type === "dir") {
    return (
      <li>
        <div
          className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200 hover:text-blue-500"
          onClick={() => setOpen(!open)}
        >
          <span className="mr-2">{open ? "📂" : "📁"}</span>
          {node.name}
        </div>
        {open && node.children && node.children.length > 0 && (
          <Tree nodes={node.children} />
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/${node.path.replace(/\.mdx?$/, "")}`}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500"
      >
        <span className="mr-2">📄</span>
        {node.name}
      </Link>
    </li>
  );
}

export default function ContentPage() {
  const [tree, setTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    async function fetchTree() {
      try {
        const res = await fetch("/api/tree");
        if (!res.ok) throw new Error("Failed to fetch tree");
        const data: TreeNode[] = await res.json();
        setTree(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTree();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Content Tree</h2>
      {tree.length > 0 ? <Tree nodes={tree} /> : <p>Loading...</p>}
    </div>
  );
}
