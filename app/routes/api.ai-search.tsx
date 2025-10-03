import { json, ActionFunction } from "@remix-run/node";

const MODELS = [{ name: "llama-3.1-8b-instant", type: "groq" }];

/* ----------  shared in-memory cache  ---------- */
export const CACHE = new Map<string, { question: string; answer: string }>();

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, { status: 405 });
  try {
    const body = await request.json();
    const { question, context, company } = body;

    /* ----------  generate 6 unique answers  ---------- */
    console.log("[api-ai-search] generating 6 answers for:", question);
    const GROQ_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_KEY) return json({ error: "No Groq key" }, { status: 500 });

    const answers: string[] = [];
    for (let i = 0; i < 6; i++) {
      const temp = 0.5 + i * 0.1;
      const prompt = `${question} (angle ${i + 1})`;
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: `You are an expert interior decorator from ${company}.` },
            { role: "user", content: prompt }
          ],
          temperature: temp,
          max_tokens: 330
        })
      });
      if (!res.ok) continue;
      const json = await res.json();
      const ans = json.choices?.[0]?.message?.content?.trim() ?? "";
      answers.push(ans);
    }

    if (answers.length === 0) return json({ error: "No answers" }, { status: 400 });

    /* ----------  store & return by unique slug  ---------- */
    const results = answers.map((a, i) => {
      const slug = `ai-${Date.now()}-${i}`;
      CACHE.set(slug, { question, answer: a });               // ← STORE BY SLUG
      console.log(`[api-ai-search] stored answer #${i + 1} under slug: ${slug}`);
      return { question, answer: a, slug, confidence: 0.9 };
    });
    return json({ results });
  } catch (err) {
    console.error("❌ AI Search API error:", err);
    return json({ error: "Search failed" }, { status: 500 });
  }
};