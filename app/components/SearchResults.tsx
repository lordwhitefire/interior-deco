// app/components/SearchResults.tsx
// The star performer: dropdown that renders loading, errors, or instant cached previews.

import { useAISearch } from '~/hooks/useAISearch';
import { Link } from '@remix-run/react';

type Props = {
  query: string;
  isActive: boolean;
  onClose: () => void;
};

export function SearchResults({ query, isActive, onClose }: Props) {
// inside SearchResults
console.count('SearchResults render');
console.log('query:', query, 'isActive:', isActive);
const { results, loading, error } = useAISearch(query, isActive);

  // don’t render anything until we’re open and valid
  if (!isActive || query.trim().length < 3) return null;

  // 1. Loading state
  if (loading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full" />
          <span className="text-sm text-gray-700 font-medium">Whitefire’s AI is thinking…</span>
        </div>
      </div>
    );
  }

  // 2. Error state
  if (error) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
        <p className="text-sm text-red-600">Something went wrong – try again.</p>
      </div>
    );
  }

  // 3. Empty state
  if (!results.length) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
        <p className="text-sm text-gray-500">No answers yet.</p>
      </div>
    );
  }

  // 4. Results preview (max 2 cards)
  const preview = results.slice(0, 2);

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <ul className="divide-y divide-gray-100">
        {preview.map((r) => (
          <li key={r.slug} className="p-3 hover:bg-gray-50 transition-colors">
            <Link
              to={`/ai-answers/${r.slug}`}
              onClick={onClose}
              className="block"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{r.question}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{r.answer}</p>
                </div>
                <span className="ml-2 shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                  {Math.round(r.confidence * 100)}%
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {results.length > 2 && (
        <div className="p-2 border-t border-gray-100">
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="block text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all {results.length} results →
          </Link>
        </div>
      )}
    </div>
  );
}