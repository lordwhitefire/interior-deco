// app/components/Join.tsx
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* hard-coded fallback */
const fallbackData = {
  headline: 'Stay Ahead of the Curve',
  subline: 'Get exclusive design tips, early access to new collections, and special offers delivered to your inbox.',
  placeholder: 'Enter your email',
  buttonText: 'Join Now',
  privacy: 'No spam, unsubscribe anytime.',
  successMsg: 'Welcome! Check your inbox for confirmation.'
};

type JoinData = typeof fallbackData;
type JoinProps = { data?: JoinData };

export default function Join({ data }: JoinProps) {
  const { headline, subline, placeholder, buttonText, privacy, successMsg } = data || fallbackData;

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validate(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  if (success) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{successMsg}</h2>
          <button
            onClick={() => {
              setSuccess(false);
              setEmail('');
            }}
            className="text-sm text-amber-700 hover:text-amber-600 underline"
          >
            Join again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font2">{headline}</h2>
        <p className="text-gray-600 mb-8">{subline}</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <label className="sr-only">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={`flex-1 px-4 py-3 rounded-full border ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
            aria-invalid={!!error}
            aria-describedby={error ? 'email-error' : undefined}
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Joining…' : buttonText}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>

        {error && (
          <p id="email-error" className="text-sm text-red-600 mt-2" role="alert">
            {error}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-3">{privacy}</p>
      </div>
    </section>
  );
}