import React from 'react';

const MapSection = ({ serviceId }) => {
  // Array of service data
  // Your servicesData array (make sure it's defined)
  const servicesData = [
    { id: '1', imageClass: 'background' },
    { id: '2', imageClass: 'background3' },
    { id: '3', imageClass: 'background6' },
    { id: '4', imageClass: 'background7' },
    { id: '5', imageClass: 'background8' },
    { id: '6', imageClass: 'blog3' },
  ];

  // Find the corresponding service data based on the serviceId
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    // Handle the case where the service is not found
    return <div>Service not found</div>;
  }
  // Destructure data from the service object
  const { imageClass } = service;

  return (
    <div className={`sm:h-[15rem] h-[13rem] bg-cover bg-center max-w-[48rem] sm:rounded-[3rem] rounded-[1.2rem] mx-[1.5rem]  sm:mx-auto mt-[3rem] mb-5rem flex justify-center items-center ${imageClass}`}>
      <div className="mt-1 sm:h-20 h-12 w-12 sm:w-20 rounded-full bg-white flex items-center justify-center">
        <span className="icon-[solar--play-bold] sm:w-5 sm:h-5 text-customColor2 h-4 w-4"></span>
      </div>
    </div>
  );
};

export default MapSection;
