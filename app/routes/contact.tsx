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
  export default function Contact() {
    // State for Exclusive dropdown in Navbar
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function for Exclusive dropdown
    const toggleMenuDropdown = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const ContactBanner =  (
          <div className="relative">
            <div className="h-60 bg-cover bg-center contact-banner"></div>
            <div className="absolute inset-0 flex justify-center items-end">
              <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
                <h2 className="text-3xl font-bold font1">Contact Us</h2>
                <p className="text-center text-gray-700">home/contact</p>
              </div>
            </div>
          </div>
        );

const ContactSection = (
    <div >
    <div className="sm:mt-[11rem] mt-[5rem]">
      <h2 className="sm:text-3xl text-center text-xl font2 sm:mb-8 mb-12">
        We love meeting new people  <br /> and helping them
      </h2>
      <div className="sm:flex justify-center items-center w-full sm:w-[50rem] mx-auto">

        <div className="flex flex-col items-center justify-center bg-customColor max-w-[18rem] min-w-[17rem] h-[18rem]  rounded-[3rem] mx-auto">
          <div className="flex items-center w-[14rem] mb-4">
            {/* SVG Icon */}
            <div className="flex justify-center h-10 w-10 items-center rounded-full bg-white">
              <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[ic--outline-email] text-[cda274] w-5 h-5 "></span>
            </div>
            {/* email */}
            <p className="ml-4 text-sm text-gray-700">info@yourdomain.com</p>
          </div>
          <div className="flex items-center mb-4 w-[14rem]">
            {/* SVG Icon */}
            <div className="flex justify-center h-10 w-10 items-center rounded-full bg-white">
              <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[icon-park-outline--phone-telephone] text-[cda274] w-5 h-5 "></span>
            </div>
            {/* Phone Number */}
            <p className="ml-4 text-sm text-gray-700"> +1-(123)-456-7890</p>
          </div>
          <div className="flex items-center mb-4 w-[14rem]">
            {/* SVG Icon */}
            <div className="flex justify-center h-10 w-10 items-center rounded-full bg-white">
              <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[ion--earth-outline] text-[cda274] w-5 h-5  "></span>
            </div>
            {/* Website */}
            <p className="ml-4 text-sm text-gray-700">www.yourdomain.com</p>
          </div>
          <div className="flex mt-2 gap-x-6 ml-4 sm:gap-x-4 w-[14rem] mb-4">
            <span className=" icon-[basil--facebook-solid] w-4 h-4 text-black "></span>
            <span className=" icon-[mdi--twitter] w-4 h-4 text-black "></span>
            <span className=" icon-[ri--linkedin-fill] w-4 h-4 text-black "></span>
            <span className=" icon-[ri--instagram-line] w-4 h-4 text-black "></span>
          </div>
        </div>

        {/* Form Section */}
        <form className="sm:max-w-[40rem] w-full mx-auto flex flex-col items-center sm:mt-12 mt-16">
          <fieldset className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row sm:gap-x-4 gap-y-4 mb-2 sm:w-[30rem] min-w-[17rem]">
              <div className="mb-4 sm:w-[15rem]">
                <input
                  className="border-b bg-transparent w-full py-2 border-black border-b focus:outline-none focus:shadow-outline font-bold text-sm"
                  id="name" type="text" placeholder="Name" />
              </div>
              <div className="mb-4 sm:w-[15rem]">
                <input
                  className="border-b bg-transparent w-full py-2  border-black focus:outline-none focus:shadow-outline w-full font-bold text-sm"
                  id="email" type="email" placeholder="Email" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4 gap-y-4 mb-2 sm:w-[30rem] min-w-[17rem]">
              <div className="mb-4 sm:w-[15rem]">
                <input
                  className="border-b bg-transparent w-full py-2  border-black border-b focus:outline-none focus:shadow-outline font-bold text-sm"
                  id="name" type="text" placeholder="subject" />
              </div>
              <div className="mb-4  sm:w-[15rem]">
                <input
                  className="border-b bg-transparent w-full py-2  border-black focus:outline-none focus:shadow-outline w-full font-bold text-sm"
                  id="email" type="email" placeholder="phone" />
              </div>
            </div>
            <textarea
              className="border-b bg-transparent sm:w-[30rem] w-full pt-2 min-w-[17rem] border-b border-black focus:outline-none focus:shadow-outline font-bold text-sm sm:h-20 h-20"
              id="message"
              placeholder="Hello! I am interested in...">
            </textarea>
            <div className="w-full flex justify-end">
              <button className="mt-6 w-[8rem] sm:w-[9rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-3 sm:pl-4 pl-4 rounded-md sm:rounded-xl ">
                send now
                <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-white "></span>
              </button>
            </div>
          </fieldset>
        </form>

      </div>
    </div>
    </div >
  );
 
  const MapSection = (
      <div className="sm:h-[20rem] h-[10rem] contact sm:w-[45rem] sm:rounded-[3rem] w-[20rem] rounded-[1.5rem] mx-auto sm:mt-[11rem] sm:mb-[11rem] mt-[7rem]">
        {/* Map Section */}
        {/* You can use a library or API to embed an interactive map here */}
      </div>
    );

    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {ContactBanner}
        {ContactSection}
        {MapSection}
        <Footer />
      </div>
    );
  }