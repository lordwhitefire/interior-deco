import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return json({ result: "❌ No API key found" });
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "What is 2+2? Just the number." }]
        }]
      })
    }
  );
  
  const data = await response.json();
  return json({ result: data.candidates[0].content.parts[0].text });
}

export default function TestGemini() {
  const { result } = useLoaderData();
  
  return (
    <div style={{padding: "3rem", textAlign: "center"}}>
      <h1>🎯 Whitefire's Gemini Test</h1>
      <div style={{background: "#f8f9fa", padding: "3rem", borderRadius: "15px", fontSize: "3rem"}}>
        {result}
      </div>
    </div>
  );
}