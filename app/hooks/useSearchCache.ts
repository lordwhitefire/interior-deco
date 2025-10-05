// app/hooks/useSearchCache.ts
// The archivist: keeps the last 20 queries in localStorage under key "whitefireSearch"

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'whitefireSearch';
const MAX_ENTRIES  = 20;
const TTL_MS       = 24 * 60 * 60 * 1000; // 24 h

type CachedQuery = {
  question: string;
  answers: Array<{
    answer: string;
    slug: string;
  }>;
  cachedAt: number;
};

export function useSearchCache() {
  // client-only mount guard (avoid SSR mismatch)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // in-memory mirror for instant reads
  const [cache, setCache] = useState<Map<string, CachedQuery>>(new Map());

  // initial load from localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = new Map<string, CachedQuery>(JSON.parse(raw));
        pruneAndSet(parsed);
      }
    } catch {
      // corrupted → start fresh
    }
  }, [isClient]);

  // persist on every change
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(cache.entries()))
      );
    } catch {
      // quota exceeded → silent fail
    }
  }, [cache, isClient]);

  // helper: remove expired & keep newest MAX_ENTRIES
  const pruneAndSet = (m: Map<string, CachedQuery>) => {
    const now = Date.now();
    const valid: Array<[string, CachedQuery]> = [];
    for (const [k, v] of m.entries()) {
      if (now - v.cachedAt < TTL_MS) valid.push([k, v]);
    }
    valid.sort((a, b) => b[1].cachedAt - a[1].cachedAt);
    const trimmed = new Map(valid.slice(0, MAX_ENTRIES));
    setCache(trimmed);
  };

  // public API
  const getCached = (question: string): CachedQuery | undefined =>
    cache.get(question.trim().toLowerCase());

  const setCached = (
    question: string,
    answers: Array<{ answer: string; slug: string }>
  ) => {
    const key = question.trim().toLowerCase();
    const next = new Map(cache);
    next.set(key, { question, answers, cachedAt: Date.now() });
    pruneAndSet(next);
  };

  const clearCache = () => {
    setCache(new Map());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return { getCached, setCached, clearCache };
}