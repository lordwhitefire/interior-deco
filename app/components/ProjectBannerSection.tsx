import React from 'react';

const ProjectBannerSection = () => {
  return (
    <div className="relative">
      <div className="h-60 bg-cover bg-center project-banner"></div>
      <div className="absolute inset-0 flex justify-center items-end">
        <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
          <h2 className="text-3xl font-bold font1">Our project</h2>
          <p className="text-center text-gray-700">home/project</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectBannerSection;
