// app/components/SetTheTrendSection.tsx
import React from "react";

type Props = {
  data: {
    trendHeader: string;
    trendParagraphs: string[];
  };
};

const SetTheTrendSection: React.FC<Props> = ({ data }) => {
  const { trendHeader, trendParagraphs } = data;

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left headline */}
        <h2 className="text-3xl md:text-4xl font-bold font1 text-gray-900 leading-tight">
          {trendHeader}
        </h2>

        {/* Right paragraphs */}
        <div className="flex flex-col gap-4 text-gray-700 text-base md:text-sm leading-relaxed">
          {trendParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SetTheTrendSection;