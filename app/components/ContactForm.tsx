// app/components/ContactForm.tsx
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export default function ContactForm() {
  const fetcher = useFetcher<{ error?: string; success?: boolean }>();
  const busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    }
  }, [fetcher.data]);

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 space-y-5">
      <h2 className="text-2xl font-serif text-stone-900">Send us a message</h2>

      <fetcher.Form
        id="contact-form"
        method="post"
        action="/contact"
        className="space-y-4"
      >
        <input type="hidden" name="_action" value="sendMessage" />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={busy}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={busy}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={busy}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Message *</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            disabled={busy}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {fetcher.data?.error && (
          <p className="text-red-700 bg-red-50 p-3 rounded-lg text-sm">{fetcher.data.error}</p>
        )}
        {fetcher.data?.success && (
          <p className="text-green-700 bg-green-50 p-3 rounded-lg text-sm">Thank you! We’ll be in touch shortly.</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full md:w-auto px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {busy ? "Sending…" : "Send message"}
        </button>
      </fetcher.Form>
    </div>
  );
}