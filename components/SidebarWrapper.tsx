'use client';

import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function SidebarWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className={`fixed z-30 inset-y-0 left-0 w-64 lg:w-72 ...`}>
      
      <nav>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 rounded-lg bg-gray-300 animate-pulse" />
          ))
        ) : (
          <Sidebar searchQuery={searchQuery} />
        )}
      </nav>
      <ThemeToggle />
    </aside>
  );
}