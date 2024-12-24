'use client';

import { useState, useEffect } from 'react';
import { useSearchStore } from '@/lib/search-store';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  allTags: string[];
}

export function BlogSearch({ allTags }: BlogSearchProps) {
  const { query, selectedTags, setQuery, setSelectedTags } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(query);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const clearSearch = () => {
    setLocalQuery('');
    setQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          size={14}
        />
        <input
          type="text"
          placeholder="Search posts..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full pl-9 pr-3 h-8 rounded-md border border-neutral-300 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-500"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowTags(!showTags)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs"
        >
          {showTags ? 'Hide Tags' : 'Search with Tags'}
        </button>
        {(query || selectedTags.length > 0) && (
          <button
            onClick={clearSearch}
            className="text-red-400 hover:text-red-500 text-xs"
          >
            Clear
          </button>
        )}
      </div>
      {showTags && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}