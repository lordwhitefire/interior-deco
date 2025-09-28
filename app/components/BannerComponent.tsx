import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import "../tailwind.css?__remix_sideEffect__";
import testimonials from './Testimonials';
import stylishImage from '../assets/images/sylish_kitchen.jpg';

const BannerComponent = () => {
  const backgrounds = ['f1', 'f2', 'f3', 'f4'];
  const [currentBackground, setCurrentBackground] = useState('f1');
  const [isVisible, setIsVisible] = useState(false);

  // Modern fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Background rotation with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground(prev => {
        const currentIndex = backgrounds.indexOf(prev);
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        return backgrounds[nextIndex];
      });
    }, 4000); // Slower, more elegant timing

    return () => clearInterval(interval);
  }, []);

  const servicesData = [
    { id: '1', name: 'Project Plan', description: 'Strategic planning for your dream space' },
    { id: '2', name: 'Interior Work', description: 'Expert craftsmanship and attention to detail' },
    { id: '3', name: 'Realization', description: 'Bringing your vision to life beautifully' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Modern Animation */}
      <div className={`flex mb-4 justify-center rounded-bl-[10rem] w-full text-amber-400 ${currentBackground} transition-all duration-1000 ease-in-out`}>
        <div className="flex justify-center flex-col pt-8 h-[28rem] sm:h-[30rem] w-11/12 mb-16 overflow-hidden">
          
          {/* Modern fade-up animation */}
          <div className={`bg-white bg-opacity-60 p-4 sm:p-8 ml-4 sm:ml-8 lg:ml-40 lg:mt-28 text-black shadow-sm w-11/12 sm:w-7/12 lg:w-6/12 rounded-tl-[2rem] rounded-br-[3rem] sm:rounded-tl-[4rem] sm:rounded-br-[5rem] transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Staggered text animation */}
            <h1 className="text-3xl sm:text-5xl font2 w-10/12 sm:w-4/5 lg:w-3/5 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
              Let your Home be unique
            </h1>
            
            <p className="sm:mt-3 text-md w-4/5 sm:text-xl sm:w-[18rem] transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
              There are many variations of lorem ipsum available.
            </p>
            
            {/* Modern button with hover effect */}
            <div className="transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}">
              <Link to="/contact">
                <button className="mt-2 w-[8rem] sm:w-[8rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Started
                  <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-white"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section with Modern Card Animations */}
      <div className="mt-2 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="group flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 border-x slate-900 sm:mx-0 lg:mx-0 rounded-lg shadow-lg justify-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <h2 className="text-xl sm:text-xl font2 font-medium mb-4 group-hover:text-gray-800 transition-colors duration-300">
              {service.name}
            </h2>
            <p className="text-xs sm:text-sm mb-4 w-4/5 text-gray-600">
              {service.description}
            </p>
            <Link to={`/services/${service.id}`}>
              <button className="flex gap-x-2 bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 group-hover:bg-gray-700 group-hover:scale-105">
                Read More
                <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4"></span>
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Stylish Section with Modern Image Animation */}
      <div className="sm:flex sm:justify-center sm:items-center mx-auto max-w-[50rem] sm:mt-12">
        <div className="py-16 sm:w-1/2">
          <div className="container mx-auto w-4/5">
            <h2 className="text-4xl font2 font-semibold mb-4 animate-fade-in">
              We Create the Art of Stylish Living Stylishly
            </h2>
            <p className="text-gray-700 text-[0.8rem] w-4/5 sm:w-5/5 mb-4 animate-fade-in-delay-1">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The point
              of using that it has a more-or-less normal.
            </p>
            
            {/* Phone section with modern hover */}
            <div className="sm:-ml-40 flex items-center sm:justify-center mb-8 group">
              <div className="flex justify-center h-16 w-16 items-center bg-customColor rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <span className="mt-[0.3rem] sm:mt-[0.3rem] text-customColor2 icon-[bi--telephone] w-8 h-8"></span>
              </div>
              <p className="flex flex-col ml-3 text-gray-700">
                123-456-7890<span className="text-gray-700">Call us anytime</span>
              </p>
            </div>
            
            <Link to="/contact">
              <button className="-ml-2 sm:ml-0 mt-2 w-[11rem] sm:w-[11rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get free estimate
                <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-customColor2"></span>
              </button>
            </Link>
          </div>
        </div>
        
        {/* Modern image hover effect */}
        <div className="hidden sm:block mb-4 sm:mt-12 p-4 sm:w-1/2">
          <div className="overflow-hidden rounded-tr-[5rem] rounded-bl-[3rem] sm:rounded-tr-[14rem] sm:rounded-bl-[5rem] group">
            <img
              src={stylishImage}
              className="h-[13rem] sm:h-[27rem] sm:min-w-[24rem] sm:max-w-[25rem] transition-all duration-700 ease-in-out group-hover:scale-110"
              alt="Stylish Kitchen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;