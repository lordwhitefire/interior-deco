import { useState, useEffect } from 'react';

interface AISearchResult {
  question: string;
  answer: string;
  slug: string;
  confidence: number;
}

export function useAISearch(query: string, isActive: boolean) {
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive || !query || query.length < 3) {
      setResults([]);
      return;
    }

    const searchAI = async () => {
      setLoading(true);
      setError(null);
      console.log("🔍 Searching AI for:", query);

      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          context: "interior design",
          company: "Whitefire's company in Anambra"
        })
      });

      const data = await response.json();
      console.log("✅ AI search results:", data);

      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else if (data.answer) {
        setResults([{
          question: query,
          answer: data.answer.substring(0, 200) + '...',
          slug: `ai-${Date.now()}`,
          confidence: data.confidence || 0.8
        }]);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(searchAI, 1000); // ← 1-second debounce
    return () => clearTimeout(timeoutId);
  }, [query, isActive]);

  return { results, loading, error };
}