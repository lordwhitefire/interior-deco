// app/hooks/useAISearch.ts
// The talent agent: checks the archivist first, phones the oracle only when necessary

import { useState, useEffect } from 'react';
import { useSearchCache } from './useSearchCache';

interface AISearchResult {
  question: string;
  answer: string;
  slug: string;
  confidence: number;
}

export function useAISearch(query: string, isActive: boolean) {
  const { getCached, setCached } = useSearchCache();

  const [results, setResults] = useState<AISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive || !query || query.trim().length < 3) {
      setResults([]);
      setError(null);
      return;
    }

    const normalized = query.trim();

    // 1. Archivist check
    const cached = getCached(normalized);
    if (cached) {
      const mapped: AISearchResult[] = cached.answers.map((a) => ({
        question: normalized,
        answer: a.answer,
        slug: a.slug,
        confidence: 0.9,
      }));
      setResults(mapped);
      setLoading(false);
      setError(null);
      return;
    }

    // 2. Talent agent picks up the phone
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    const fetchAnswers = async () => {
      try {
        const res = await fetch(`${window.location.origin}/api/ai-search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            question: normalized,
            context: 'interior design',
            company: "Whitefire's company in Anambra",
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: { results?: AISearchResult[] } = await res.json();

        if (data.results && data.results.length > 0) {
          // 3. Hand scrolls to archivist for filing
          setCached(
            normalized,
            data.results.map((r) => ({ answer: r.answer, slug: r.slug }))
          );
          setResults(data.results);
          setError(null);
        } else {
          setResults([]);
          setError('No answers returned');
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message || 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    // 1-second debounce
    const timer = setTimeout(fetchAnswers, 1000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isActive, getCached, setCached]);

  return { results, loading, error };
}