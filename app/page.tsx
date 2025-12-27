"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavigationButtons from "@/components/NavigationButtons";

interface Doc {
  slug: string;
  text: string;
}

interface TreeNode {
  name: string;
  type: "file" | "dir";
  path: string;
  children?: TreeNode[];
}

export default function Home() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [filesList, setFilesList] = useState<TreeNode[]>([]);

  const repoSearchJsonUrl =
    "https://raw.githubusercontent.com/zhavis/tailwind-docs/main/search.json";

  useEffect(() => {
    async function loadSearch() {
      try {
        const res = await fetch(repoSearchJsonUrl);
        const data: Doc[] = await res.json();
        setDocs(data);
      } catch (e) {
        console.error("Failed to load search index", e);
      }
    }

    async function loadTree() {
      try {
        const res = await fetch("/api/tree");
        const data: TreeNode[] = await res.json();
        setTree(data);

        const flatten = (nodes: TreeNode[], arr: TreeNode[] = []) => {
          for (const node of nodes) {
            if (node.type === "file") arr.push(node);
            if (node.type === "dir" && node.children) flatten(node.children, arr);
          }
          return arr;
        };
        setFilesList(flatten(data));
      } catch (e) {
        console.error("Failed to load tree", e);
      }
    }

    loadSearch();
    loadTree();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (!q) {
      setResults([]);
      return;
    }

    const filtered = docs.filter((doc) =>
      doc.text.toLowerCase().includes(q.toLowerCase())
    );
    setResults(filtered);
  };

  const firstFileSlug =
    filesList.length > 0
      ? filesList[0].path.replace(/^docs\//, "").replace(/\.mdx?$/, "")
      : "";

  return (
    <>
      <div className="fixed left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 pb-0">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search docs..."
            className="w-full px-5 py-4 bg-white/90 backdrop-blur-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-gray-900 placeholder-gray-400"
          />

          {results.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-2 backdrop-blur-md border border-gray-200 shadow-sm max-h-50 overflow-y-auto overflow-x-hidden z-50">
              {results.map((doc) => (
                <li
                  key={doc.slug}
                  className="p-3 hover:bg-blue-50 border-b last:border-b-0 cursor-pointer transition-colors duration-200"
                >
                  <Link href={`/docs/${doc.slug.replace(/\.mdx?$/, "")}`}>
                    <span className="text-blue-600 font-medium hover:underline">{doc.slug}</span>
                  </Link>
                  <p className="text-gray-600 text-sm truncate">{doc.text.slice(0, 80)}...</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      <div className="w-full pt-20 lg:pt-24 sm:px-6 mx-auto">
        <div className="max-w-2xl">
        
          <div className="flex justify-between items-center mb-6 gap-x-2">
            <a
              href="/"
              className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/content"
              className="px-3 py-2 bg-gray-700 text-white hover:bg-gray-800 shadow-md transition-colors duration-300"
            >
              List of Content
            </a>
          </div>


          <div className="space-y-5 md:space-y-8">
            <h3 className="text-2xl font-semibold">Hey everyone!</h3>
            <p className="text-lg text-gray-800 dark:text-neutral-200">
              This site teaches you the core Tailwind CSS concepts that make building layouts fast, easy.
              I’m guessing you already know a bit about HTML and CSS — selectors, properties, values, all that jazz.
              Layouts might still make you pull your hair out sometimes — that’s where Tailwind comes in.
              If you already know the basics, let’s jump in and see how Tailwind can save you hours of frustration on your next project!
            </p>
            <div className="mt-6">
              <NavigationButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
