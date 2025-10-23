import React, { useState } from "react";

type Props = {
  headline: string;
  subText?: string;
  buttonText: string;
  mailchimpTag?: string; // ← NEW
};

export const AboutCtaForm: React.FC<Props> = ({ headline, subText, buttonText, mailchimpTag = "project-lead" }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: mailchimpTag }), // ← SEND TAG
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSent(true);
        setEmail("");
        setTimeout(() => setSent(false), 5000); // 5s banner
      } else {
        setError(data.error || "Please try again.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (sent)
    return (
      <section className="py-16 px-6 text-center bg-amber-50">
        <p className="text-amber-800">Thanks! Check your inbox (or spam) for the confirmation link in 1-2&nbsp;min.</p>
      </section>
    );

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 font1">{headline}</h3>
        {subText && <p className="text-gray-600 mb-8">{subText}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            required
            className={`flex-1 px-4 py-3 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-amber-400`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition disabled:opacity-60"
          >
            {loading ? "Sending…" : buttonText}
          </button>
        </form>

        {error && (
          <p id="email-error" className="text-sm text-red-600 mt-2" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};