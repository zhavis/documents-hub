'use client';

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface ReadTrackerProps {
  slugPath: string;
  allSlugs: string[];
}

export default function ReadTracker({ slugPath, allSlugs }: ReadTrackerProps) {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);
  const [percent, setPercent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const saved = Cookies.get("readSlugs");
    if (saved) setReadSlugs(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setPercent(Math.round((readSlugs.length / allSlugs.length) * 100));
  }, [readSlugs, allSlugs.length]);

  const markAsRead = () => {
    if (!readSlugs.includes(slugPath)) {
      const updated = [...readSlugs, slugPath];
      setReadSlugs(updated);
      Cookies.set("readSlugs", JSON.stringify(updated), { expires: 365 });
    }
  };

  if (isLoading) {
    return (
      <div className="mb-4 flex flex-col gap-2 w-full">
        <div className="h-10 w-32 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div className="h-4 w-40 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-col items-start gap-2">
      <button
        onClick={markAsRead}
        className={`px-4 py-2 rounded-lg font-semibold transition
          ${readSlugs.includes(slugPath)
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        {readSlugs.includes(slugPath) ? "Read ✅" : "Mark as Read"}
        
      </button>
      <span className="text-gray-700 dark:text-gray-300 text-sm">
      {percent}%
      </span>
    </div>
  );
}
