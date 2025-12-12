"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Doc {
  slug: string;
  text: string;
}

export default function Home() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);

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
    loadSearch();
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Search Docs
        </h1>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Type to search..."
          className="w-full px-5 py-4 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
        />

        {results.length > 0 && (
          <ul className="mt-6 bg-white border border-gray-200 rounded-lg shadow divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {results.map((doc) => (
              <li
                key={doc.slug}
                className="p-4 hover:bg-blue-50 transition-colors duration-150"
              >
                <Link href={`/docs/${doc.slug.replace(/\.mdx?$/, "")}`}>
                  <span className="text-blue-600 font-medium hover:underline text-lg">
                    {doc.slug.replace(/\.mdx$/, "")}
                  </span>
                </Link>
                <p className="text-gray-600 text-sm mt-1 truncate">
                  {doc.text.replace(/\n/g, " ").slice(0, 120)}...
                </p>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No results found for "{query}"
          </p>
        )}
      </div>
    </div>
  );
}
