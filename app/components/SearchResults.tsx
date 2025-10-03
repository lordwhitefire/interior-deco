import { Link } from '@remix-run/react';
import { useAISearch } from '~/hooks/useAISearch';

interface SearchResultsProps {
  query: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function SearchResults({ query, isVisible, onClose }: SearchResultsProps) {
  const { results, loading, error } = useAISearch(query, isVisible);
  const shouldShow = isVisible && (results.length > 0 || loading || error);
  if (!shouldShow) return null;

  const first = results[0]; // only 1 card
  if (!first) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
      {loading && (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
          <p className="mt-2">Whitefire's AI is thinking...</p>
        </div>
      )}
      {error && <div className="p-4 text-center text-red-600"><p>{error}</p></div>}
      <div className="py-2">
        <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">Whitefire's Interior Design Insights</div>
        <Link
          to={`/ai-answers/${first.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
          onClick={onClose}
        >
          <div className="font-medium text-gray-900">{first.question}</div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
            {first.answer.slice(0, 100)}{(first.answer.length > 100 ? "…" : "")}
          </div>
        </Link>
        <div className="px-4 py-2 border-t border-gray-100">
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View all results for "{query}" →
          </Link>
        </div>
      </div>
    </div>
  );
};