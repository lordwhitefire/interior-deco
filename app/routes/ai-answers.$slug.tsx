import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) throw new Response("Slug missing", { status: 400 });

  const origin = new URL(request.url).origin;
  const payload = { question: slug };
  console.log("[answer loader] calling /api/ai-search with:", payload);

  const res = await fetch(`${origin}/api/ai-search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("[answer loader] response status:", res.status);
  if (!res.ok) {
    const text = await res.text();
    console.error("[answer loader] body error:", text);
    throw new Response("Answer not found", { status: res.status });
  }

  const data = await res.json();
  console.log("[answer loader] received:", data);
  if (!data?.answer) throw new Response("Malformed answer", { status: 502 });

  return json({ question: data.question, answer: data.answer, slug });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const desc = data?.answer ? data.answer.substring(0, 160) : "";
  return [
    { title: data?.question || "AI answer" },
    { name: "description", content: desc },
  ];
};

export default function AnswerPage() {
  const { question, answer } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">{question}</h1>
      <div className="prose prose-slate max-w-none mt-6">
        <p>{answer}</p>
      </div>

      <div className="mt-12 p-6 rounded-lg bg-indigo-50">
        <h3 className="text-lg font-semibold text-indigo-900">Still need help?</h3>
        <p className="mt-1 text-indigo-800">
          Book a free consultation and we’ll bring these ideas to life in your home.
        </p>
        <a
          href="/contact"
          className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Book consultation
        </a>
      </div>
    </article>
  );
}