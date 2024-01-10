import React from 'react';

const ProjectDetails = () => {
  return (
    <div className="sm:justify-center mt-[5rem] sm:flex sm:gap-x-6 sm:mx-auto sm:items-center sm:w-[45rem] mx-[1.5rem]">
      <div className="bg-customColor p-8 sm:w-[17rem] sm:mt-[4rem] rounded-[2rem] mb-[4rem]">
        <p className="flex gap-x-8 items-center mb-4">
          <span className="font-medium w-[3rem]">
            Client
          </span>
          <span className="w-[8rem]">
            your client name
          </span>
        </p>
        <p className="flex gap-x-8 items-center mb-4">
          <span className="font-medium w-[3rem]">
            Category
          </span>
          <span className="w-[8rem]">
            interiors
          </span>
        </p>
        <p className="flex gap-x-8 items-center mb-4">
          <span className="font-medium w-[3rem]">
            Tags
          </span>
          <span className="w-[8rem]">
            interiors, Home
          </span>
        </p>
        <p className="flex gap-x-8 items-center mb-4">
          <span className="font-medium w-[3rem]">
            Date
          </span>
          <span className="w-[8rem]">
            Date 23,07,2023
          </span>
        </p>
        <p className="flex gap-x-8 items-center">
          <span className="font-medium w-[3rem]">
            Link
          </span>
          <span className="w-[8rem]">
            link example.com
          </span>
        </p>
      </div>
      <div className="sm:w-[23rem]">
        <h1 className="text-2xl font1 mb-1">
          Minimal Look Bedrooms
        </h1>
        <p className="text-sm mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada elit eu risus malesuada vestibulum. Sed ut risus justo. Fusce ut ex sed sem venenatis bibendum. Aliquam erat volutpat.
        </p>
        <p className="text-sm">
          Praesent euismod mi vitae vestibulum lobortis. Vivamus eget magna vel ex vulputate semper. Fusce auctor augue nec mi laoreet commodo. Nunc et tempor justo. Proin ac tellus non lectus ultrices eleifend in a ante.
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;
