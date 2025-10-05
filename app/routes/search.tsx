// app/routes/search.tsx
// Reads localStorage, no server cache, no loader deps.

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { useSearchCache } from '~/hooks/useSearchCache';

type Result = {
  _id: string;
  question: string;
  slug: string;
  answerPreview: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  // server-side: just echo the query; actual data lives in browser localStorage
  return json({ query: q, results: [] as Result[] });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `"${data.query}" – Search results` },
];

export default function SearchPage() {
  const { query } = useLoaderData<typeof loader>();
  const { getCached } = useSearchCache();

  // read the same localStorage key the hooks use
  const cached = getCached(query);
  const results: Result[] = cached
    ? cached.answers.map((a, i) => ({
        _id: `${a.slug}-${i}`,
        question: cached.question,
        slug: a.slug,
        answerPreview: a.answer.slice(0, 100) + (a.answer.length > 100 ? "…" : ""),
      }))
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-gray-800">
      <main className="flex-grow pt-20">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-semibold mb-4">
            {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
          </h1>
          {results.length === 0 && query && (
            <p className="text-slate-600">No answers yet – try another term.</p>
          )}
          <ul className="divide-y divide-slate-200">
            {results.map((r) => (
              <li key={r._id} className="py-4">
                <Link
                  to={`/ai-answers/${r.slug}`}
                  target="_blank"
                  className="block group hover:bg-slate-50 -mx-2 px-2 py-2 rounded"
                >
                  <h2 className="text-lg font-medium text-indigo-700 group-hover:underline">{r.question}</h2>
                  <p className="mt-1 text-slate-600 line-clamp-2">{r.answerPreview}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}