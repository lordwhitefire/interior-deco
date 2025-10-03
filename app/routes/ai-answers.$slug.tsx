import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CACHE } from "~/routes/api.ai-search";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) throw new Response("Slug missing", { status: 400 });

  const cached = CACHE.get(slug);
  if (!cached) {
    console.log(`[answer loader] ❌ cache miss for slug: ${slug}`);
    throw new Response("Answer not found", { status: 404 });
  }
  console.log(`[answer loader] ✅ cache hit for slug: ${slug}`);

  return json({ question: cached.question, answer: cached.answer, slug });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const desc = data?.answer ? data.answer.substring(0, 160) : "";
  return [
    { title: data?.question || "AI answer" },
    { name: "description", content: desc },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export default function AnswerPage() {
  const { question, answer } = useLoaderData<typeof loader>();

  // optional: convert **bold** to <strong> if you want HTML bolding
  const html = answer
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^(\d+\.)\s+/gm, "<br /><strong>$1</strong> ");

  return (
    <article className="max-w-3xl mx-auto mt-12 px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">{question}</h1>

      {/* pre-wrap keeps line-breaks; dangerouslySetInnerHTML only if you ran the regex above */}
      <div
        className="prose prose-slate max-w-none mt-6 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-12 p-6 rounded-lg bg-indigo-50">
        <h3 className="text-lg font-semibold text-indigo-900">Still need help?</h3>
        <p className="mt-1 text-indigo-800">Book a free consultation and we’ll bring these ideas to life in your home.</p>
        <a href="/contact" className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Book consultation</a>
      </div>
    </article>
  );
};