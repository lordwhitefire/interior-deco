import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import "../tailwind.css?__remix_sideEffect__";
 // Adjust the path based on your actual directory structure

 import testimonials from './Testimonials';
 import stylishImage from '../assets/images/sylish_kitchen.jpg';
 import person1Image from '../assets/images/person1.jpg';
 import person2Image from '../assets/images/person2.jpg';
 import person3Image from '../assets/images/person3.jpg';

 

const YourComponent = () => {
  const backgrounds = ['f1', 'f2', 'f3', 'f4'];
  const [currentBackground, setCurrentBackground] = useState('f1');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = backgrounds.indexOf(currentBackground);
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      setCurrentBackground(backgrounds[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBackground]);

  const servicesData = [
    { id: '1', name: 'Project Plan' },
    { id: '2', name: 'Interior Work' },
    { id: '3', name: 'Realization' },
  ];

  const project =  (
    <div className="mt-2 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
    {servicesData.map((service) => (
      <div
        key={service.id}
        className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 border-x slate-900 sm:mx-0 lg:mx-0 rounded-lg shadow-lg justify-center transform transition-transform hover:scale-110"
      >
        <h2 className="text-xl sm:text-xl font2 font-medium mb-4">{service.name}</h2>
        <p className="text-xs sm:text-xs mb-4 w-4/5">
          There are many variations of the lorem ipsum from available majority
        </p>
        <Link to={`/services/${service.id}`}> {/* Updated link */}
          <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-medium py-2 px-4 rounded-lg">
            Read More
            <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
          </button>
        </Link>
      </div>
    ))}
  </div>
    );
    const stylishSection = (
       <div className="sm:flex sm:justify-center  sm:items-center mx-auto max-w-[50rem] sm:mt-12">
    <div className="py-16 sm:w-1/2">
      <div className="container mx-auto w-4/5">
        <h2 className="text-4xl font2  font-semibold mb-4">
          We Create the Art of Stylish Living Stylishly
        </h2>
        <p className="text-gray-700 text-[0.8rem] w-4/5 sm:w-5/5 mb-4">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout. The point
          of using that it has a more-or-less normal.
        </p>
        <div className="sm:-ml-40 flex items-center sm:justify-center mb-8">
          {/* SVG Icon */}
          <div className="flex justify-center h-16 w-16 items-center bg-customColor rounded-full">
            <span className="mt-[0.3rem] sm:mt-[0.3rem] text-customColor2 icon-[bi--telephone] w-8 h-8 "></span>
          </div>
          {/* Phone Number */}
          <p className="flex flex-col ml-3 text-gray-700">
            123-456-7890<span className="text-gray-700">Call us anytime</span>
          </p>
        </div>
        <button className="-ml-2 sm:ml-0 mt-2 w-[11rem] sm:w-[11rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md sm:rounded-md">
          Get free estimate
          <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-customColor2"></span>
        </button>
      </div>
    </div>
    <div className="hidden sm:block mb-4 sm:mt-12 p-4 sm:w-1/2">
      <img
        src={stylishImage}
        className="h-[13rem] sm:h-[27rem] sm:min-w-[24rem] sm:max-w-[25rem]  rounded-tr-[5rem] rounded-bl-[3rem] sm:rounded-tr-[14rem] sm:rounded-bl-[5rem]"
        alt="Stylish Kitchen"
      />
    </div>
  </div>
  );
 {/* const testimonialSection = (
    <div className="flex-col flex bg-customColor sm:mt-28 p-8 pb-16 pt-20 mx-auto max-w-[50rem] items-center rounded-[2rem] sm:rounded-[3rem]">
    <h1 className="sm:w-1/2 mb-4 sm:mb-8 font-semibold text-2xl sm:text-4xl text-center font2">
      What  the People Think About Us
    </h1>
    <div className="flex flex-col sm:flex-row gap-x-6">
      // First testimony card //
      <div className="sm:w-1/3 rounded-xl pt-8 h-[13rem] px-4  mb-8 sm:mb-0 bg-white">
        <div className="flex mb-2 sm:mb-5">
          <div className="flex-shrink-0">
            <img src= {person1Image}  alt="Person 1" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div className="ml-4 mt-1">
            <h3 className="text-md font-medium font2">John Doe</h3>
            <h5 className="text-sm font2">Sydney, USA</h5>
          </div>
        </div>
        <div>
          <p className="text-gray-800 text-[0.8rem] text-justify">
          Lauren ipsum is simply Tommy text of the type setting industry Epson has been
          </p>
        </div>
      </div>

      // Second testimony card //
      <div className="sm:w-1/3 rounded-xl pt-8 h-[13rem] px-4 mb-8 bg-white sm:mb-0">
        <div className="flex mb-2 sm:mb-5">
          <div className="flex-shrink-0">
            <img src={person2Image} alt="Person 2" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div className="ml-4 mt-1">
            <h3 className="text-md font-medium font2">Benny Roll</h3>
            <h5 className="text-sm font2">Sydney, New York</h5>
          </div>
        </div>
        <div>
          <p className="text-gray-800 text-[0.8rem] text-justify">
          Lauren Epson a simply dummy text of data setting industry Epson has been scrambled it to make a Time Book
          </p>
        </div>
      </div>

      // Third testimony card //
      <div className="sm:w-1/3 rounded-xl pt-8 h-[13rem] px-4 bg-white">
        <div className="flex mb-2 sm:mb-5">
          <div className="flex-shrink-0">
            <img src={person3Image} alt="Person 3" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div className="ml-4 mt-1">
            <h3 className="text-md font-medium font2">Raymond Gario</h3>
            <h5 className="text-sm font2">Sydney, Australia</h5>
          </div>
        </div>
        <div>
          <p className="text-gray-800 text-[0.8rem] text-justify">
          Alarm Epson is simply Timmy text of the type setting industry Epson has been scrambled
          </p>
        </div>
      </div>
    </div>
  </div>
 );*/}
  return (
    <div>
    <div className={`flex mb-4 justify-center rounded-bl-[10rem]  w-full text-amber-400 ${currentBackground}`}>
      <div className={`flex justify-center flex-col pt-8 h-[28rem] sm:h-[30rem] w-11/12  mb-16 overflow-hidden`}>
        <div className={`bg-white bg-opacity-60 p-4 sm:p-8 ml-4 sm:ml-8 lg:ml-40 lg:mt-28 text-black shadow-sm w-11/12 sm:w-7/12 lg:w-6/12  rounded-tl-[2rem] rounded-br-[3rem] sm:rounded-tl-[4rem] sm:rounded-br-[5rem]`}>
          <h1 className="text-3xl sm:text-5xl font2 w-10/12 sm:w-4/5 lg:w-3/5">
            Let your Home be unique 
          </h1>
          <p className="sm:mt-3 text-md w-4/5 sm:text-xl sm:w-[18rem]">
            There are many variations of lorem ipsum available.
          </p>
          <button className="mt-2 w-[8rem] sm:w-[8rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md sm:rounded-md">
            Get Started
            <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-white"></span>
          </button>
        </div>
      </div>
    </div>
    {project}
    {stylishSection}
    {/* {testimonialSection} */}
    
    </div>
  );
};

export default YourComponent;
