import React from "react";

type Props = {
  headline: string;
  subText?: string;
  slug: string;
};

export const AboutHero: React.FC<Props> = ({ headline, subText, slug }) => (
  <div className="relative">
    <div className="h-60 bg-cover bg-center bg-gradient-to-br from-gray-100 to-gray-200" />

    {/* mobile: narrow card + wrap  |  desktop: original wide card */}
    <div className="absolute inset-0 flex justify-center items-end px-4 sm:px-0">
      <div className="bg-white py-6 px-6 rounded-t-2xl flex flex-col items-center w-full max-w-xs sm:max-w-xl sm:py-8 sm:px-16">
        <h2 className="text-2xl sm:text-3xl font-bold font1 text-center break-words">
          {headline}
        </h2>
        {subText && (
          <p className="text-center text-gray-700 mt-2 text-sm sm:text-base break-words">
            home/{slug}
          </p>
        )}
      </div>
    </div>
  </div>
);