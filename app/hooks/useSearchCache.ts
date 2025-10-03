// ~/hooks/useSearchCache.ts
import { useState, useEffect } from 'react';

export function useSearchCache() {
  const [cache, setCache] = useState<Map<string, { question: string; answer: string }>>(new Map());

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("whitefireSearch");
    if (stored) {
      try {
        const entries = JSON.parse(stored);
        setCache(new Map(entries));
      } catch (error) {
        console.error('Failed to parse cache from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever cache changes
  useEffect(() => {
    localStorage.setItem("whitefireSearch", JSON.stringify(Array.from(cache.entries())));
  }, [cache]);

  const setCachedResult = (slug: string, data: { question: string; answer: string }) => {
    setCache(prev => new Map(prev).set(slug, data));
  };

  const getCachedResult = (slug: string) => {
    return cache.get(slug);
  };

  return { setCachedResult, getCachedResult };
}