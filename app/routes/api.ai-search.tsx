// app/routes/api.ai-search.tsx
// The cloud switchboard: stateless, only talks to Groq, keeps nothing.

import { json, ActionFunction } from "@remix-run/node";

const MODEL = "llama-3.1-8b-instant";
const TEMP_BASE = 0.5;
const ANGLES = 6;

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST")
    return json({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await request.json();
    const { question, context, company } = body;

    if (!question || typeof question !== "string" || question.trim().length < 3)
      return json({ error: "Invalid question" }, { status: 400 });

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey)
      return json({ error: "Missing Groq key" }, { status: 500 });

    const results: {
      question: string;
      answer: string;
      slug: string;
      confidence: number;
    }[] = [];

    for (let i = 0; i < ANGLES; i++) {
      const temp = TEMP_BASE + i * 0.1; // 0.5 → 1.0
      const prompt = `${question.trim()} (angle ${i + 1})`;

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
           { 
            role: "system", 
            content: `You are an expert interior decorator from ${company}. 
            Give helpful, creative answers about home and interior design. 
            Keep every response under 250 words, but make sure it's complete and well-rounded.`
          },

            { role: "user", content: prompt },
          ],
          temperature: temp,
          max_tokens: 330,
        }),
      });

      if (!res.ok) continue; // skip failed angle

      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content?.trim() ?? "";
      if (!answer) continue;

      results.push({
        question: question.trim(),
        answer,
        slug: `ai-${Date.now()}-${i}`,
        confidence: 0.9,
      });
    }

    if (results.length === 0)
      return json({ error: "No answers generated" }, { status: 400 });

    return json({ results });
  } catch (err) {
    console.error("[api.ai-search] uncaught error:", err);
    return json({ error: "Search failed" }, { status: 500 });
  }
};