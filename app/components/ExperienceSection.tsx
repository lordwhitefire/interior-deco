import React from 'react';

const ExperienceSection = () => {
  return (
    <div className="w-full bg-customColor py-10">
      <div className="flex justify-between items-center mx-auto max-w-[50rem] font2 font-medium p-4 sm:py-8 sm:px-16">
        {/* Division 1 */}
        <div className="w-1/4 h-20 flex items-center justify-center border-r-[0.07rem] border-customColor2">
          {/* Content for Division 1 */}
          <div className="sm:hidden">
            <span className="font1 text-5xl text-customColor2">12</span><br />
            <span className="text-xs">years of <br />experience</span>
          </div>
          <div className="hidden sm:block sm:flex flex-col items-center justify-center">
            <span className="font1 text-5xl text-customColor2">12</span>
            <span className="text-xs">years of experience</span>
          </div>
        </div>

        {/* Division 2 */}
        <div className="w-1/4 h-20 flex items-center justify-center border-r-[0.07rem] border-customColor2">
          {/* Content for Division 2 */}
          <div className="sm:hidden">
            <span className="font1 text-5xl text-customColor2">85</span><br />
            <span className="text-xs">success <br />projects</span>
          </div>
          <div className="hidden sm:block sm:flex flex-col items-center justify-center">
            <span className="font1 text-5xl text-customColor2">85</span>
            <span className="text-xs">success Projects</span>
          </div>
        </div>

        {/* Division 3 */}
        <div className="w-1/4 h-20 flex items-center justify-center border-r-[0.07rem] border-customColor2">
          {/* Content for Division 3 */}
          <div className="sm:hidden">
            <span className="font1 text-5xl text-customColor2">15</span><br />
            <span className="text-xs">Active </span><br />
            <span className="text-xs">projects </span>
          </div>
          <div className="hidden sm:block sm:flex flex-col items-center justify-center">
            <span className="font1 text-5xl text-customColor2">15</span>
            <span className="text-xs">success projects </span>
          </div>
        </div>

        {/* Division 4 */}
        <div className="w-1/4 h-20 flex items-center justify-center">
          {/* Content for Division 4 */}
          <div className="sm:hidden">
            <span className="font1 text-5xl text-customColor2">95</span><br />
            <span className="text-xs">Happy <br />customers</span>
          </div>
          <div className="hidden sm:block sm:flex flex-col items-center justify-center">
            <span className="font1 text-5xl text-customColor2">95</span>
            <span className="text-xs">happy customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
