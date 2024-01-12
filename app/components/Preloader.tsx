// Loading.js
import React from 'react';

const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
    </div>
  );
};

export default Preloader;
