// app/components/LoveDesignSection.tsx
import React from "react";

type Props = {
  data: {
    loveDesignHeadline: string;
    loveDesignText: string;
    loveDesignImages: string[]; // URLs from builder.image().url()
  };
};

const LoveDesignSection: React.FC<Props> = ({ data }) => {
  const { loveDesignHeadline, loveDesignText, loveDesignImages } = data;
  // use first two images (or one if only one supplied)
  const imgs = loveDesignImages.slice(0, 2);

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* text block */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold font1 text-gray-900 mb-4">
            {loveDesignHeadline}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{loveDesignText}</p>
          <button className="w-max flex items-center gap-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md">
            Our Portfolio
            <span className="icon-solar--arrow-right-linear w-4 h-4 text-customColor2"></span>
          </button>
        </div>

        {/* image block */}
        <div className={`grid gap-4 ${imgs.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {imgs.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Love design ${i + 1}`}
              className="w-full h-64 object-cover rounded-2xl shadow"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveDesignSection;