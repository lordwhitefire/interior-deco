// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "dev-secret"], // add to .env
    secure: process.env.NODE_ENV === "production",
  },
});

export { getSession, commitSession, destroySession };