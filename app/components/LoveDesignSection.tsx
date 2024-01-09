import React from 'react';

import loveImage from '../assets/images/project8.jpeg'

const LoveDesignSection = () => {
  return (
    <div className="sm:flex-row  flex flex-col sm:justify-between  max-w-[41rem] items-center sm:mt-12 mb-16 mx-auto  mt-[3rem]">
      {/* Image Section */}
      <div className="hidden sm:block mb-4">
        <img src={loveImage} className="h-[15rem] sm:w-[22rem] sm:h-[14rem] rounded-[3rem] sm:rounded-[2rem]" alt="Project" />
      </div>

      {/* Text and Button Section */}
      <div className=" mx-12 sm:mx-0">
        <div className="container">
          <h2 className="text-2xl mb-2 sm:text-2xl font2 sm:mb-0 mb-[1rem]">We love design. That's <br /> how we got here</h2>
          <p className="hidden sm:block text-gray-700 sm:text-xs font2 mb-4">
            It is a long established fact that a reader will be <br /> distracted by the readable content
          </p>
          <p className="sm:hidden text-gray-700 sm:text-xs font2 mb-4">
            It is a long established fact that a reader will be distracted by the readable content
          </p>
          <button className="w-[8rem] sm:w-[9rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-3 sm:pl-4 pl-4 rounded-md sm:rounded-md">
            Our Portfolio
            <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-solar--arrow-right-linear w-4 h-4 text-customColor2"></span>
          </button>
        </div>
      </div>

      {/* Hidden Image Section for Small Screens */}
      <div className="sm:hidden mb-4 sm:-mr-12 sm:mt-4 p-4 sm:w-[25rem] mx-[1.5rem] mt-[2rem]">
        <img src={loveImage} className="h-[18rem] w-[19rem] sm:h-[18rem] rounded-[1.5rem] sm:rounded-[5rem]" alt="Project" />
      </div>
    </div>
  );
};

export default LoveDesignSection;
