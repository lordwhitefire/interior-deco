import React from 'react';


const DescriptionSection = () => {
  return (
    <div className="mt-2 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
    {/* Division One */}
    <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12  border-x slate-900 sm:mx-0 lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-110">
      <h2 className="text-xl sm:text-xl font2 font-medium mb-4">Project Plan</h2>
      <p className="text-xs sm:text-xs mb-4 w-4/5">There are many variations of the lorem ipsum from available majority</p>
      <a href="servicesingle.html">
        <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
          Read More
          <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
        </button>
      </a>
    </div>

    {/* Division Two */}
    <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12  border-x slate-900  sm:mx-0 lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-110">
      <h2 className="text-xl sm:text-xl font2  font-medium mb-4">Interior work</h2>
      <p className="w-4/5 sm:text-xs text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
      <button className="flex gap-x-2 hover:bg-gray-700 text-sm text-black hover:text-white font-medium py-2 px-4 rounded-lg">
        Read More
        <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4  "></span>
      </button>
    </div>

    {/* Division Three */}
    <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 sm:mx-0  border-x slate-900  lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-110">
      <h2 className="text-xl sm:text-xl font2 font-medium mb-4">Realization</h2>
      <p className="w-4/5 text-xs sm:text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
      <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
        Read More
        <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
      </button>
    </div>

     {/* Division four */}
    <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 sm:mx-0  border-x slate-900  lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-110">
      <h2 className="text-xl sm:text-xl fon2 font-medium mb-4">2D/3D Art Work</h2>
      <p className="w-4/5 text-xs sm:text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
      <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
        Read More
        <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
      </button>
    </div>

     {/* Division five */}
     <div className="flex flex-col items-center  sm:px-6 bg-customColor sm:py-20 py-6 mx-12 sm:mx-0  border-x slate-900  lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-110">
      <h2 className="text-xl sm:text-xl font2 font-medium mb-4">Interior Work</h2>
      <p className="w-4/5 text-xs sm:text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
      <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
        Read More
        <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
      </button>
    </div>

     {/* Division six */}
     <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 sm:mx-0  border-x slate-900  lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-110">
      <h2 className="text-xl sm:text-xl font2  font-medium mb-4">Decortion Work</h2>
      <p className="w-4/5 text-xs sm:text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
      <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
        Read More
        <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
      </button>
    </div>
  </div>

  );
};

export default DescriptionSection;
