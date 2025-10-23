// app/routes/api.newsletter.ts
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import mailchimp from "@mailchimp/mailchimp_marketing";

const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } = process.env;
if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID)
  throw new Error("Missing Mailchimp environment variables");

const SERVER = MAILCHIMP_API_KEY.split("-").pop()!;
mailchimp.setConfig({ apiKey: MAILCHIMP_API_KEY, server: SERVER });

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let email = "";
  let tag = "newsletter"; // ← default
  try {
    const body = await request.json();
    email = (body.email || "").trim().toLowerCase();
    tag = (body.tag || "newsletter").trim(); // ← read tag
  } catch {
    return json({ error: "Invalid body" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: "Invalid email format" }, 400);

  try {
    // add / update member (pending = double-opt-in)
    await mailchimp.lists.setListMember(MAILCHIMP_LIST_ID, email, {
      email_address: email,
      status: "pending",
    });

    // tag the member
    await mailchimp.lists.updateListMemberTags(MAILCHIMP_LIST_ID, email, {
      tags: [{ name: tag, status: "active" }],
    });

    return json({ ok: true });
  } catch (err: any) {
    if (err.title === "Member Exists") return json({ error: "Already subscribed" }, 200);
    console.error("Mailchimp error:", JSON.stringify(err, null, 2));
    return json({ error: "Service unavailable" }, 500);
  }
};