import React from "react";

type Props = { text: string; author: string };

export const AboutQuote: React.FC<Props> = ({ text, author }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <span className="icon-[raphael--quote] w-8 h-8 text-customColor2 mx-auto mb-6" />
      <blockquote className="text-xl md:text-2xl italic text-gray-800">
        “{text}”
      </blockquote>
      <cite className="block mt-4 text-gray-500">— {author}</cite>
    </div>
  </section>
);