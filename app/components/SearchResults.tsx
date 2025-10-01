import { Link } from '@remix-run/react';
import { useAISearch } from '~/hooks/useAISearch';

interface SearchResultsProps {
  query: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function SearchResults({ query, isVisible, onClose }: SearchResultsProps) {
  const { results, loading, error } = useAISearch(query, isVisible);

  console.log("📊 SearchResults - Query:", query, "Visible:", isVisible, "Results:", results.length, "Loading:", loading);

  // Show if: visible AND (has results OR is loading OR has error)
  const shouldShow = isVisible && (results.length > 0 || loading || error);
  
  if (!shouldShow) {
    console.log("🚫 SearchResults not showing - conditions:", { isVisible, hasResults: results.length > 0, loading, error });
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
      {loading && (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
          <p className="mt-2">Whitefire's AI is thinking...</p>
        </div>
      )}
      
      {error && (
        <div className="p-4 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}
      
      {results.length > 0 && (
        <div className="py-2">
          <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
            Whitefire's Interior Design Insights
          </div>
          {results.map((result, index) => (
            <Link
              key={index}
              to={`/ai-answers/${result.slug}`}
              className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
              onClick={onClose}
            >
              <div className="font-medium text-gray-900">{result.question}</div>
              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                {result.answer}
              </div>
              {result.confidence > 0.8 && (
                <div className="text-xs text-green-600 mt-1">✅ High confidence</div>
              )}
            </Link>
          ))}
          
          <div className="px-4 py-2 border-t border-gray-100">
            <Link
              to={`/search?q=${encodeURIComponent(query)}`}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              onClick={onClose}
            >
              View all results for "{query}" →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
