// app/routes/api.newsletter.ts
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import mailchimp from "@mailchimp/mailchimp_marketing";


// 0. start-up guard
const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } = process.env;
if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID)
  throw new Error("Missing Mailchimp environment variables");


const SERVER = MAILCHIMP_API_KEY.split("-").pop()!;
mailchimp.setConfig({ apiKey: MAILCHIMP_API_KEY, server: SERVER });


export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let email = "";
  try { email = ((await request.json()).email || "").trim().toLowerCase(); }
  catch { return json({ error: "Invalid body" }, 400); }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: "Invalid email format" }, 400);

  try {
    await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: "pending", // double-opt-in
    });
    return json({ ok: true });
  } catch (err: any) {
    if (err.title === "Member Exists") return json({ error: "Already subscribed" }, 200);
    console.error("Mailchimp error:", JSON.stringify(err, null, 2));
    return json({ error: "Service unavailable or suscriber already exists" }, 500);
  }
};