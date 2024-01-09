// src/components/Description.tsx
import React from 'react';
import { Link } from '@remix-run/react';

const Description = () => {
  // Array of service data
  const servicesData = [
    { id: '1', name: 'Project Plan' },
    { id: '2', name: 'Interior Work' },
    { id: '3', name: 'Realization' },
    { id: '4', name: '2D/3D Art Work' },
    { id: '5', name: 'Interior Work' },
    { id: '6', name: 'Decoration Work' },
  ];

  return (
    <div className="mt-2 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
      {servicesData.map((service) => (
        <div
          key={service.id}
          className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 border-x slate-900 sm:mx-0 lg:mx-0 rounded-lg shadow-lg justify-center transform transition-transform hover:scale-110"
        >
          <h2 className="text-xl sm:text-xl font2 font-medium mb-4">{service.name}</h2>
          <p className="text-xs sm:text-xs mb-4 w-4/5">
            There are many variations of the lorem ipsum from available majority
          </p>
          <Link to={`/services/${service.id}`}> {/* Updated link */}
            <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
              Read More
              <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );

};

export default Description;
