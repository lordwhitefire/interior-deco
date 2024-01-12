import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { Link } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';


import Footer  from "~/components/Footer";

import faqImage from '../assets/images/other3.jpeg';
import faqImage2 from '../assets/images/project3.jpeg';

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


  export default function Blog() {
    // State for Exclusive dropdown in Navbar
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function for Exclusive dropdown
    const toggleMenuDropdown = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const BannerSection = (
        <div className="relative">
      <div className="h-60 bg-cover bg-center faq-banner"></div>
      <div className="absolute inset-0 flex justify-center items-end">
        <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
          <h2 className="text-3xl font-bold font1">Faq's</h2>
          <p className="text-center text-gray-700">home/faqs</p>
        </div>
      </div>
    </div>
        );

     const FaqSection =  (
            <div className="sm:w-screen  mt-[5rem]">
              <h2 className="text-xl mb-12 sm:text-3xl text-center font2">
                Every Question Answered
              </h2>
              <div className="sm:flex sm:w-[45rem]  mx-auto justify-between items-center">
                <div className="sm:w-[23rem] mx-[1.5rem] sm:mx-0 mb-[3rem] sm:mb-0">
                  <div className="sm:w-[18.5rem] mb-2">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font2 text-xs flex items-center">
                        What is the Hipcouch interior Design Service?
                      </p>
                      <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
                    </div>
                    <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
                  </div>
                  <div className="sm:w-[18.5rem] mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font2 text-xs flex text-customColor2 items-center">
                        So, How does this work?
                      </p>
                      <span className="icon-[iconamoon--arrow-down-2] w-[16] h-[16]"></span>
                    </div>
                    <p className="sm:w-[17rem] text-justify text-xs mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      hendrerit eros id justo eleifend, vel aliquet urna porttitor. Ut
                      non volutpat justo. Vivamus nec orci vel mauris vulputate
                      fermentum. Nulla facilisi.
                    </p>
                    <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
                  </div>
                  <div className="sm:w-[18.5rem] mb-2">
                    <div className="flex justify-between items-center mb-4">
                      <p className=" font2 text-xs flex items-center">
                        Which cities do you currently operate in?
                      </p>
                      <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
                    </div>
                    <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
                  </div>
                  <div className="sm:w-[18.5rem] mb-2">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font2 text-xs flex items-center">
                        Hipcouch interior Design Service?
                      </p>
                      <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
                    </div>
                    <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
                  </div>
                  <div className="sm:w-[18.5rem] mb-2">
                    <div className="flex justify-between items-center mb-4">
                      <p className=" font2 text-xs flex items-center">
                        What kind of interior designers do you have?
                      </p>
                      <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
                    </div>
                    <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
                  </div>
                </div>
                <div className="sm:w-[25rem] ">
                  <img
                    src={faqImage}
                    className="h-[18rem] sm:h-[26rem] object-cover rounded-[1rem] sm:rounded-[1.4rem] mx-auto w-[23rem]"
                    alt="FAQ Section Image"
                  />
                </div>
              </div>
            </div>
          );

          
const ProjectQuestionsSection = (
    <div className="sm:w-screen mt-[5rem] mb-10">
      <h2 className="text-2xl mb-12 sm:text-4xl text-center font1">
        Project related Questions
      </h2>
      <div className="sm:flex sm:w-[45rem] mx-auto items-center gap-x-10">
        <div className="hidden sm:block sm:max-w-[22rem] sm:min-w-[21rem]">
          <img
            src={faqImage2}
            className="h-[18rem] sm:h-[26rem] object-cover rounded-[1rem] sm:rounded-[1.4rem] mx-auto w-[23rem]"
            alt="Project Section Image"
          />
        </div>
        <div className="sm:w-[23rem] mx-[1.5rem] mb-[3rem] sm:mb-[0rem]">
          <div className="sm:w-[18.5rem] mb-2">
            <div className="flex justify-between mx-auto items-center mb-4">
              <p className="font-medium font1 text-xs flex items-center">
                How long does it take?
              </p>
              <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
            </div>
            <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
          </div>
          <div className="sm:w-[18.5rem] mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium font1 text-xs flex text-[cda274] items-center">
                Can I use my existing furnishing?
              </p>
              <span className="icon-[iconamoon--arrow-down-2] w-[16] h-[16]"></span>
            </div>
            <p className="sm:w-[17rem] text-justify text-xs mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              hendrerit eros id justo eleifend, vel aliquet urna porttitor. Ut
              non volutpat justo. Vivamus nec orci vel mauris vulputate
              fermentum. Nulla facilisi.
            </p>
            <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
          </div>
          <div className="sm:w-[18.5rem] mb-2">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium font1 text-xs flex items-center">
                I pay into redesigning my interior?
              </p>
              <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
            </div>
            <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
          </div>
          <div className="sm:w-[18.5rem] mb-2">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium font1 text-xs flex items-center">
                What do your services cost?
              </p>
              <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
            </div>
            <hr className=" bg-customColor2 w-full sm:w-[18rem] h-[0.15rem] rounded-4"/>
          </div>
          <div className="sm:w-[18.5rem] mb-2">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium font1 text-xs flex items-center">
                Do you offer free consultation?
              </p>
              <span className="icon-[iconamoon--arrow-right-2] w-[16] h-[16]"></span>
            </div>
            <span className="icon-[pepicons-pencil--line-x] w-[20rem] h-[0.1rem] text-[cda274] -ml-2"></span>
          </div>
        </div>
      </div>
    </div>
  );



    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {BannerSection}
        {FaqSection}
        {ProjectQuestionsSection}
        
        <Footer />
      </div>
    );
  }