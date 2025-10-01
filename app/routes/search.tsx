import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

type Result = {
  _id: string;
  question: string;
  slug: string;
  answerPreview: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();

  if (!q) return json({ query: "", results: [] });

  const payload = { question: q }; // <-- exact shape your endpoint expects
  console.log("[search loader] calling /api/ai-search with:", payload);

  const res = await fetch(`${url.origin}/api/ai-search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("[search loader] response status:", res.status);
  if (!res.ok) {
    const text = await res.text();
    console.error("[search loader] body error:", text);
    throw new Response("Search failed", { status: res.status });
  }

  const data = await res.json();
  console.log("[search loader] received:", data);
  if (!data?.answer) return json({ query: q, results: [] });

  const results: Result[] = [
    {
      _id: data.slug || q,
      question: data.question || q,
      slug: data.slug || q.replace(/\s+/g, "-").toLowerCase(),
      answerPreview: data.answer.substring(0, 160) + "…",
    },
  ];

  return json({ query: q, results });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `"${data.query}" – Search results` },
];

export default function SearchPage() {
  const { query, results } = useLoaderData<typeof loader>();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">
        {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
      </h1>

      {results.length === 0 && query && (
        <p className="text-slate-600">No answers yet – try another term.</p>
      )}

      <ul className="divide-y divide-slate-200">
        {results.map((r) => (
          <li key={r._id} className="py-4">
            <Link
              to={`/ai-answers/${r.slug}`}
              className="block group hover:bg-slate-50 -mx-2 px-2 py-2 rounded"
            >
              <h2 className="text-lg font-medium text-indigo-700 group-hover:underline">
                {r.question}
              </h2>
              <p className="mt-1 text-slate-600 line-clamp-2">{r.answerPreview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}