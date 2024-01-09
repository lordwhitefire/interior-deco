import React from 'react';

const ServiceSingleBanner = () => {
  return (
    <div className="w-screen">
      {/* Banner Section */}
      <div className="relative">
        <div className="h-60 bg-cover bg-center background6"></div>
        <div className="absolute inset-0 flex justify-center items-end">
          <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
            <h2 className="text-3xl font-bold font1">Service Single</h2>
            <p className="text-center text-gray-700">home/services single</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSingleBanner;
