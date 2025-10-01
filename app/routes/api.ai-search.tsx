import { json, ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { question, context, company } = body;
    
    console.log("🤖 AI Search API - Question:", question);
    console.log("📍 Context:", context);
    console.log("🏢 Company:", company);

    // Call Gemini API
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: `You are an expert interior decorator from ${company}. Answer this question about ${context}: ${question}. Keep it under 200 words and be specific.`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]) {
      const answer = data.candidates[0].content.parts[0].text;
      console.log("✅ AI generated answer:", answer.substring(0, 100) + "...");
      
      return json({
        results: [{
          question: question,
          answer: answer,
          slug: `ai-${Date.now()}`,
          confidence: 0.9
        }]
      });
    }
    
    return json({ error: "No answer generated" }, { status: 400 });
  } catch (error) {
    console.error("❌ AI Search API error:", error);
    return json({ error: "Search failed" }, { status: 500 });
  }
};
