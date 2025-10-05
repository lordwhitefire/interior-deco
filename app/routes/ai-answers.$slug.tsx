// app/routes/ai-answers.$slug.tsx
import { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';

type Answer = { question: string; answer: string };

export default function AnswerPage() {
  const { slug } = useParams() as { slug: string };
  const [answer, setAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    // client-side only
    const all = Object.entries(window.localStorage)   // ← change here
      .filter(([k]) => k.startsWith('whitefireSearch'))
      .flatMap(([, v]) => {
        try {
          return Array.from(new Map(JSON.parse(v)).values()) as CachedQuery[];
        } catch {
          return [];
        }
      });

    const hit = all
      .flatMap((q) => q.answers.map((a) => ({ question: q.question, ...a })))
      .find((a) => a.slug === slug);

    if (!hit) window.location.replace('/404'); // or show a message
    else setAnswer(hit);
  }, [slug]);

  if (!answer) return null; // or a loading skeleton

  const html = answer.answer
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+\.)\s+/gm, '<br /><strong>$1</strong> ');

  return (
    <article className="max-w-3xl mx-auto mt-12 px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">{answer.question}</h1>
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
}