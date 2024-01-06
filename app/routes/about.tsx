import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';

import NavigationBar from '../components/NavigationBar';
import Footer  from "~/components/Footer";


import oldImage from '../assets/images/about-old.jpg';
import finishedImage from '../assets/images/project7.jpeg';
import guyImage from '../assets/images/team-guy.jpg';
import lady3Image from '../assets/images/team-lady3.jpg';
import lady2Image from '../assets/images/team-lady2.jpg';


export const meta: MetaFunction = () => {
    return [
      { name: "description", content: "Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style." },
      { property: "og:title", content: "Interior Decorators Inc. - Transforming Spaces" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://drive.google.com/uc?export=view&id=1G6deIUVFQG1pD-yxvBXrSRhe591u1REy" },
      { property: "og:url", content: "https://interior-deco-kappa.vercel.app/" },
      { property: "og:description", content: "Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style." },
      { property: "og:site_name", content: "Interior Decorators Inc." },
    ];
  };
  
  // Rename the function to Services
  export default function About() {
    // State for Exclusive dropdown in Navbar
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function for Exclusive dropdown
    const toggleMenuDropdown = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const BannerSection =  (
          <div className="relative">
            <div className="h-60 bg-cover bg-center about-background"></div>
            <div className="absolute inset-0 flex justify-center items-end">
              <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
                <h2 className="text-3xl font-bold font1">About us</h2>
                <p className="text-center text-gray-700">home/About us </p>
              </div>
            </div>
          </div>
        );
  
        const QuoteSection = (
              <div className="w-screen flex justify-center sm:mt-4 mt-2">
                <div className="sm:max-w-[35rem] sm:max-h-[17rem] max-h-[12rem] min-w-[20rem] max-w-[20rem] sm:min-w-[34rem] flex justify-center border border-customColor sm:border-[1rem] border-[0.5rem] sm:rounded-[3rem] rounded-[1.5rem] sm:my-10 my-5">
                  <div className="sm:max-w-[16.2rem] sm:min-w-[16.2rem] max-w-[16.2rem] min-w-[16.2rem] flex justify-center relative sm:-top-10 -top-3 sm:h-[20rem] h-[15rem] bg-white">
                    <div className="sm:max-w-[10rem] max-w-[10rem] border-x slate-300 flex justify-center">
                      <div className="flex flex-col items-center justify-center sm:min-w-[24rem] min-w-[20rem] max-w-[22rem] sm:max-w-[25rem]">
                        <span className="icon-[raphael--quote] w-6 h-6"></span>
          
                        <p className="italic text-center sm:text-lg text-sm font-medium">
                          I like an interior that defies labelling, I don't
                          <br />
                          really want someone to walk into a room and
                          <br />
                          know that I did it.
                        </p>
                        <p className="text-right mt-2">- Bunny Williams</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

const WhatWeDoSection =  (
    <>
      {/* What We Do Section */}
      <div className="sm:flex  mx-auto gap-x-2 sm:justify-between items-center max-w-[43rem] sm:mt-12">
        <div className=" ">
          <div className="">
            <h2 className="text-2xl sm:w-4/5 mb-2 sm:text-4xl font2">What we do</h2>
            <p className="text-gray-500 text-xs font2 sm:w-[17rem] mb-2">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using that it has a more-or-less normal.
            </p>

            <button className="w-[8rem]  text-[0.8rem] sm:text-xs flex items-center gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md sm:rounded-md">
              Our concept
              <span className=" icon-[solar--arrow-right-linear] w-4 h-4 text-white"></span>
            </button>
          </div>
        </div>
        <div className="mb-4   sm:mt-4 ">
          <img src={oldImage} alt="Old" className=" h-[13rem]  w-[23rem] object-cover rounded-[3rem] sm:rounded-[3rem]" />
        </div>
      </div>

      {/* The End Result Section */}
      <div className="sm:flex sm:justify-between items-center   mx-auto max-w-[43.5rem]  sm:mt-12 mb-12">
        <div className="hidden sm:block mb-4 sm:mt-4   max-w-[24rem] ">
          <img src={finishedImage} alt="Finished" className="h-[13rem]  w-[23rem] object-cover rounded-[3rem] sm:rounded-[3rem]" />
        </div>
        <div className="">
          <div className="">
            <h2 className="text-2xl mb-2 sm:text-4xl font2">The end result</h2>
            <p className="text-gray-500 text-xs font2 sm:w-[17rem] mb-4">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using that it has a more-or-less normal.
            </p>

            <button className="w-[9rem]  text-[0.8rem] sm:text-xs flex gap-x-2  items-center bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md sm:rounded-md">
              Our Portfolio
              <span className=" icon-[solar--arrow-right-linear] w-4 h-4 text-white"></span>
            </button>
          </div>
        </div>
        <div className="sm:hidden mb-4 sm:mt-4">
          <img src={finishedImage} alt="Finished" className="h-[13rem]  w-[23rem] object-cover rounded-[3rem] sm:rounded-[5rem]" />
        </div>
      </div>
    </>
  );

const TestimonialSection = (
      <div className="flex-col flex bg-customColor p-8 sm:py-24 items-center mt-[3rem] rounded-[2rem]">
        <h1 className="sm:w-1/2 mb-4 sm:mb-8 text-2xl sm:text-4xl sm:mt-0 text-center font2 mt-16">
          what the people think <br /> about us
        </h1>
        <div className="flex flex-col sm:flex-row sm:gap-x-2 gap-y-4">
          {/* First testimony card */}
          <div>
            <img className="sm:w-[9rem] object-cover w-[10rem] rounded-xl h-[12rem]" src={guyImage} alt="Team Member" />
          </div>
  
          {/* Second testimony card */}
          <div>
            <img className="sm:w-[9rem] w-[10rem] object-cover rounded-xl h-[12rem]" src={lady3Image}  alt="Team Member" />
          </div>
  
          {/* Third testimony card */}
          <div className="sm:max-w-[12rem] w-[9rem] rounded-xl bg-white h-[12rem] flex flex-col justify-around rounded-xl items-center sm:p-4">
            <div>
              <h3 className="text-sm font-medium font1">Raymond Gario</h3>
              <h5 className="text-xs">Sydney, Australia</h5>
            </div>
            <div className="flex gap-x-2 sm:gap-x-4">
              <span className="icon-[basil--facebook-solid] w-4 h-4 text-black"></span>
              <span className="icon-[mdi--twitter] w-4 h-4 text-black"></span>
              <span className="icon-[ri--linkedin-fill] w-4 h-4 text-black"></span>
              <span className="icon-[ri--instagram-line] w-4 h-4 text-black"></span>
            </div>
            <p className="flex flex-col text-gray-700 text-xs">
              123-456-7890
              <span className="text-gray-700">imdigo@gmail</span>
            </p>
          </div>
  
          {/* Fourth testimony card */}
          <div>
            <img className="sm:w-[9rem] w-[10rem] rounded-xl h-[12rem] object-cover" src={lady2Image}   alt="Team Member" />
          </div>
        </div>
      </div>
    );  


const FormSection =  (
    <form className="max-w-[50rem] mx-auto mt-24 p-4 flex flex-col items-center">
      <fieldset className="flex flex-col items-center">
        <legend className="sm:text-3xl text-xl text-center font2 mb-8">
          Creative Project? Let's have  <br /> a productive talk
        </legend>

        <div className="flex flex-col sm:flex-row  justify-between sm:gap-x-4 gap-y-4 w-[30rem] mb-2">
          <div className="mb-4">
            <input
              className="border-b bg-transparent sm:w-[15rem]  w-full py-2  border-black border-b focus:outline-none focus:shadow-outline font-bold text-xs"
              id="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <input
              className="border-b bg-transparent w-full sm:w-[15rem] py-2 border-black focus:outline-none focus:shadow-outline  font-bold text-xs"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>

        <textarea
          className="border-b bg-transparent w-full py-2   sm:w-[30rem] border-b border-black focus:outline-none focus:shadow-outline font-bold text-xs sm:h-20 h-20"
          id="message"
          placeholder="Hello! I am interested in..."
        ></textarea>

        <div>
          <button className="mt-6 w-[8rem] sm:w-[9rem] text-[0.8rem] sm:text-xs flex items-center gap-x-2 bg-gray-800 text-white hover:bg-blue-700  font-bold py-3 sm:py-3 sm:pl-4 pl-4 rounded-md sm:rounded-xl">
            Send now
            <span className=" icon-[solar--arrow-right-linear] w-4 h-4 text-customColor2" ></span>
          </button>
        </div>
      </fieldset>
    </form>
  );

    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {BannerSection}
        {QuoteSection}
        {WhatWeDoSection}
        {TestimonialSection}
        {FormSection}
        <Footer />
      </div>
    );
  }
  