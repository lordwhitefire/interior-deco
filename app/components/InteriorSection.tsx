import React from 'react';

const InteriorSection = () => {
  return (
    <div className="sm:mx-auto max-w-[35rem] flex flex-col items-center mt-6 sm:mt-16 sm:justify-between sm:flex-row sm:gap-x-4 ">
      {/* Section 1: Use of Interior */}
      <div className="flex flex-col justify-center  sm:mb-0 mb-4rem">
        <h2 className="font-medium font2 text-4xl mb-4">Use of Interior</h2>
        <p className="font2 mb-4 font-extralight sm:text-xs  ">
          <span className=" text-customColor2  ">1.</span> We provide high-quality services
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xss">
          <span className="text-customColor2  font-extralight  sm:text-xs">2.</span> Project on time and latest design
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 sm:text-xs">3.</span> Scientific getting a better result
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 text-xs">4.</span> Renovations benefit of service
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 sm:text-xs">5.</span> We are confident about our projects
        </p>
      </div>

      {/* Section 2: Make an Art */}
      <div className="flex flex-col justify-center mt-6 sm:mt-0 ">
        <h2 className="font-medium font2 text-4xl mb-4">Make an Art</h2>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 sm:text-xs">1.</span> We provide high-quality services
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 sm:text-xs">2.</span> Project on time and latest design
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 text-xs">3.</span> Scientific getting a better result
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 sm:text-xs">4.</span> Renovations benefit of service
        </p>
        <p className="font2 mb-4 font-extralight sm:text-xs">
          <span className="text-customColor2 sm:text-xs">5.</span> We are confident about our projects
        </p>
      </div>
    </div>
  );
};

export default InteriorSection;
