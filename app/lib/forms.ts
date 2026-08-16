// app/lib/forms.ts
import { json } from "@remix-run/node";
import { writeClient } from "~/lib/sanity";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FIELD_LIMITS = {
  email: 254,
  fullName: 100,
  phone: 30,
  subject: 200,
  message: 5000,
} as const;

export interface FieldErrors {
  [field: string]: string | undefined;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map<string, number[]>();

export function rateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    const oldest = hits[0];
    return { allowed: false, retryAfter: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000) };
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  return { allowed: true, retryAfter: 0 };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isHoneypotFilled(formData: FormData): boolean {
  return Boolean((formData.get("website") ?? "").toString().trim());
}

export async function parseForm(request: Request) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  return {
    formData,
    get: (key: string) => (raw[key]?.toString() ?? "").trim(),
  };
}

export function parseEmail(value: string): string {
  return value.toLowerCase();
}

export function fieldError(field: string, message: string) {
  return json({ ok: false, errors: { [field]: message } }, { status: 400 });
}

export function rateLimited() {
  return json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
}

export function serverError() {
  return json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
}

export function createDoc(type: string, fields: Record<string, unknown>) {
  return writeClient.create({
    _type: type,
    submittedAt: new Date().toISOString(),
    ...fields,
  });
}

export interface NewsletterActionData {
  ok: boolean;
  alreadySubscribed?: boolean;
  errors?: { email?: string; consent?: string };
  error?: string;
}

export async function handleNewsletterAction(
  request: Request,
  source: string
): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false }, { status: 405 });

  const { formData, get } = await parseForm(request);

  if (isHoneypotFilled(formData)) return json({ ok: true });

  const { allowed } = rateLimit(clientIp(request));
  if (!allowed) return rateLimited();

  const email = parseEmail(get("email"));
  if (!EMAIL_PATTERN.test(email) || email.length > FIELD_LIMITS.email)
    return fieldError("email", "Please enter a valid email address.");

  if (!get("consent"))
    return fieldError("consent", "Please agree to receive emails.");

  try {
    const existing = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "newsletterSubscriber" && email == $email][0]{_id}`,
      { email }
    );
    if (existing) return json({ ok: true, alreadySubscribed: true });

    await createDoc("newsletterSubscriber", {
      email,
      source,
      status: "subscribed",
      consent: true,
    });
    return json({ ok: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return serverError();
  }
}