// app/routes/search.tsx
import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { CACHE } from "~/routes/api.ai-search";

type Result = {
  _id: string;
  question: string;
  slug: string;
  answerPreview: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();
  console.log("[search loader] received query:", q);

  if (!q) {
    console.log("[search loader] empty query → returning 0 results");
    return json({ query: "", results: [] });
  }

  /* ----------  read the 6 answers that navbar already cached  ---------- */
  const results: Result[] = [];
  for (let i = 0; i < 6; i++) {
    const key = q + `-${i}`;               // same keys navbar used
    const cached = CACHE.get(key);
    if (!cached) {
      console.log(`[search loader] cache miss for key: ${key}`);
      break;                               // fewer than 6 → stop early
    }
    console.log(`[search loader] cache hit for key: ${key}`);
    results.push({
      _id: `${cached.slug}-${i}`,
      question: cached.question,
      slug: cached.slug,
      answerPreview: cached.answer.slice(0, 100) + (cached.answer.length > 100 ? "…" : "")
    });
  }

  console.log("[search loader] final result count:", results.length, "for query:", q);
  return json({ query: q, results });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `"${data.query}" – Search results` },
];

export default function SearchPage() {
  const { query, results } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-gray-800">
      <main className="flex-grow pt-20"> {/* Add pt-20 to account for fixed navbar */}
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
                <Link to={`/ai-answers/${r.slug}`} target="_blank" className="block group hover:bg-slate-50 -mx-2 px-2 py-2 rounded">
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