'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">

      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 lg:w-72 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-2xl border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
   
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Docs</h1>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

 
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

      
        <nav className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-5 rounded-lg bg-gray-300/50 dark:bg-gray-700/50 animate-pulse"
              />
            ))
          ) : (
            <Sidebar searchQuery={searchQuery} />
          )}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </div>
      </aside>

      <button
        className="fixed top-4 left-4 z-40 lg:hidden p-3 rounded-full bg-white/30 dark:bg-gray-900/30 shadow-md hover:shadow-lg backdrop-blur-xl transition-shadow"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

  
      <main className="flex-1 flex flex-col relative overflow-hidden ml-0 lg:ml-64">

        <div className="absolute inset-0 -z-10 flex justify-center pointer-events-none">
       
          <div className="absolute w-[800px] h-[800px] bg-blue-400/30 dark:bg-indigo-600/30 rounded-full filter blur-3xl -translate-x-64 top-1/2 -translate-y-1/2"></div>
      
          <div className="absolute w-[800px] h-[800px] bg-purple-300/30 dark:bg-purple-500/30 rounded-full filter blur-3xl translate-x-64 top-1/2 -translate-y-1/2"></div>
        </div>

        <div className="flex-1 p-12 flex flex-col overflow-auto">
          <div className="w-full h-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 transition-colors flex flex-col">
            <div className="prose prose-lg sm:prose-xl lg:prose-xl dark:prose-invert flex-1">
              {children}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
