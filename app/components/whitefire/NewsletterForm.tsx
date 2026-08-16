// app/components/whitefire/NewsletterForm.tsx
import { useEffect, useState } from "react";
import { Form, useNavigation } from "@remix-run/react";
import type { NewsletterActionData } from "~/lib/forms";

interface NewsletterFormProps {
  variant: "home" | "sidebar";
  actionData?: NewsletterActionData | null;
}

export function NewsletterForm({ variant, actionData }: NewsletterFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (actionData?.ok) {
      setStatus("success");
      setEmail("");
    } else if (actionData?.errors || actionData?.error) {
      setStatus("error");
    }
  }, [actionData]);

  if (variant === "sidebar" && status === "success") {
    return (
      <p
        role="status"
        className="mt-5 border border-[#B99658]/40 px-3 py-3 text-[10px] leading-5 text-[#D1B77E]"
      >
        {actionData?.alreadySubscribed
          ? "You’re already subscribed."
          : "Thank you. You’re on the list."}
      </p>
    );
  }

  const message =
    status === "error"
      ? actionData?.errors?.email ??
        actionData?.error ??
        "Please enter a valid email address."
      : status === "success"
        ? actionData?.alreadySubscribed
          ? "You’re already subscribed."
          : "Thank you. You’re subscribed."
        : variant === "home"
          ? "We respect your privacy. Read our Privacy Policy. Unsubscribe anytime."
          : null;

  return (
    <Form method="post" noValidate>
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {variant === "home" ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter your email address"
            aria-invalid={status === "error"}
            className="min-h-12 flex-1 border border-white/20 bg-white px-4 text-sm text-[#25221E] outline-none placeholder:text-[#8B857B] focus:border-[#C3A56E]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 bg-[#B89558] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-[#A8844D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </div>
      ) : (
        <>
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Your email address"
            aria-invalid={status === "error"}
            className="h-9 w-full border border-white/15 bg-transparent px-3 text-[10px] text-white outline-none placeholder:text-white/40 focus:border-[#B99658] focus:ring-1 focus:ring-[#B99658]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex h-9 w-full items-center justify-center bg-[#B99658] text-[9px] font-semibold uppercase tracking-[0.13em] text-[#171615] transition hover:bg-[#C5A86E] disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </>
      )}

      <label
        className={
          variant === "home"
            ? "mt-3 flex items-start justify-center gap-2 text-[10px] leading-[1.6] text-white/60"
            : "mt-2.5 flex items-start gap-2 text-[9px] leading-[1.5] text-white/55"
        }
      >
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-0.5 shrink-0"
        />
        <span>
          I agree to receive design inspiration and updates from Whitefire
          Interior. Unsubscribe anytime.
        </span>
      </label>

      {message && (
        <p
          className={
            variant === "home"
              ? "mt-4 min-h-5 text-[10px] text-white/60"
              : "mt-2 text-[9px] text-[#D6A7A0]"
          }
          role={status === "idle" ? undefined : "status"}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </Form>
  );
}