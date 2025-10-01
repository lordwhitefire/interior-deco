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
      
      try {
        console.log("🔍 Searching AI for:", query);
        
        // Call your Gemini API
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
          // Single answer format
          setResults([{
            question: query,
            answer: data.answer.substring(0, 200) + '...',
            slug: `ai-${Date.now()}`,
            confidence: data.confidence || 0.8
          }]);
        }
      } catch (err) {
        console.error("❌ AI search failed:", err);
        setError('Search failed');
        // Fallback to suggestions
        setResults(getFallbackResults(query));
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchAI, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query, isActive]);

  return { results, loading, error };
}

function getFallbackResults(query: string): AISearchResult[] {
  const suggestions = [
    {
      question: "How long does a kitchen renovation take?",
      answer: "Kitchen renovations typically take 6-8 weeks...",
      slug: "kitchen-timeline",
      confidence: 0.9
    },
    {
      question: "What's your interior design process?",
      answer: "Our process includes consultation, design, and implementation...",
      slug: "design-process",
      confidence: 0.8
    },
    {
      question: "Do you work in Anambra state?",
      answer: "Yes, Whitefire's company serves all of Anambra state...",
      slug: "service-area",
      confidence: 1.0
    }
  ];

  return suggestions.filter(s => 
    s.question.toLowerCase().includes(query.toLowerCase()) ||
    query.toLowerCase().includes("kitchen") ||
    query.toLowerCase().includes("process") ||
    query.toLowerCase().includes("anambra")
  );
}
