// app/components/HowWeWorkSection.tsx
import React from 'react';

type Step = {
  number: string;
  icon: string; // Iconify class
  title: string;
  intro: string;
  imageUrl?: string; // built by loader
};

type Props = {
  title: string;
  intro: string;
  steps: Step[];
};

const HowWeWorkSection: React.FC<Props> = ({ title, intro, steps }) => {
  return (
    <div className="sm:w-[40rem] w-[18rem] flex flex-col items-center justify-center mx-auto bg-customColor sm:rounded-[1rem] rounded-[0.5rem] sm:px-12 sm:py-20 py-12 mt-4 sm:mb-24 mb-12 px-4">
      <header className="mb-4 text-xl sm:text-4xl font2 font-medium">{title}</header>
      <p className="mb-4 text-center text-sm sm:mb-20">{intro}</p>
      {steps.map((s, idx) => (
        <div key={s.number} className={`sm:flex sm:justify-around sm:mb-12 mb-4 ${idx % 2 ? 'sm:flex-row-reverse' : ''}`}>
          {/* step image */}
          <div className="sm:max-w-[15rem] basis-1/2 h-[20rem] rounded-bl-[10rem] w-[15rem] rounded-tr-[3rem] mx-auto overflow-hidden">
            <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
          </div>

          {/* content */}
          <div className="sm:basis-1/2">
            <div className="sm:pr-8 sm:mt-8 flex justify-between items-center sm:mb-8">
              <span className={`${s.icon} w-20 h-20 text-customColor2`} />
              <p className="mt-5 sm:mt-0 text-7xl font2 font-medium text-white">{s.number}</p>
            </div>

            <div className="m-2">
              <header className="mb-2 font2 sm:text-xl">{s.title}</header>
              <p className="sm:text-sm text-xs">{s.intro}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowWeWorkSection;