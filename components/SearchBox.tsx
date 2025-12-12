"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Doc {
  slug: string;
  text: string;
}

export default function SearchBox({ repoSearchJsonUrl }: { repoSearchJsonUrl: string }) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);

  useEffect(() => {
    async function loadSearch() {
      try {
        const res = await fetch(repoSearchJsonUrl);
        const j: Doc[] = await res.json();
        setDocs(j);
      } catch (e) {
        console.error("Failed to load search index", e);
      }
    }
    loadSearch();
  }, [repoSearchJsonUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (!q) {
      setResults([]);
      return;
    }

    const filtered = docs.filter(doc =>
      doc.text.toLowerCase().includes(q.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search docs..."
        className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
      />

      {results.length > 0 && (
        <ul className="mt-2 bg-white border rounded-lg shadow max-h-64 overflow-y-auto">
          {results.map((doc) => (
            <li key={doc.slug} className="p-3 hover:bg-blue-50 border-b last:border-b-0">
              <Link href={`/docs/${doc.slug.replace(/\.mdx?$/, "")}`}>
                <a className="text-blue-600 hover:underline">{doc.slug}</a>
              </Link>
              <p className="text-gray-600 text-sm truncate">{doc.text.slice(0, 80)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
