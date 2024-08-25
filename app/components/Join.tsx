import React from 'react';

const JoinUsSection = () => {
  return (
    <div className="max-w-[50rem] sm:mx-auto  mx-4 p-6 bg-customColor3 rounded-3xl sm:rounded-6xl sm:py-8 sm:flex sm:flex-col sm:justify-center sm:items-center">
      <h2 className="text-3xl sm:text-3xl sm:text-center font-medium font2 mb-2 sm:mb-2 text-white sm:w-3/4">Wanna Join the Interno?</h2>
      <p className="text-white text-sm sm:text-center mb-4 sm:w-2/4">It is a long established fact that a reader will be distracted </p>
      <a href="/contact" className="mt-2 w-[8rem] sm:w-[8rem] text-[0.8rem] sm:text-sm flex gap-x-2 items-center bg-customColor2 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md sm:rounded-md">
        Contact Us 
        <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-customColor3"></span>
      </a>
    </div>
  );
}

export default JoinUsSection;
