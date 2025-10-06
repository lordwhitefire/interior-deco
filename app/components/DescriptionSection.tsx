// app/components/DescriptionSection.tsx
import React from 'react';
import { Link } from '@remix-run/react';

type Service = {
  title: string;
  slug: string;
  shortDesc: string;
};

type Props = {
  services: Service[];
};


const DescriptionSection: React.FC<Props> = ({ services }) => {
  return (
    <div className="mt-2 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
      {services.map((s) => (
        <div
          key={s.slug}
          className="flex flex-col items-center bg-white sm:px-6 sm:py-16 py-6 mx-12 border-x slate-900 sm:mx-0 lg:mx-0 rounded-lg shadow-lg justify-center transform transition-transform hover:scale-110"
        >
          <h2 className="text-xl px-6 sm:px-0 sm:text-xl font2 font-medium mb-4">{s.title}</h2>
          <p className="text-xs sm:text-xs mb-4 w-4/5">{s.shortDesc}</p>
          <Link to={`/services/${s.slug}`}>
            <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
              Read More
              <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4" />
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DescriptionSection;