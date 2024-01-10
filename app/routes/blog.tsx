import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { Link } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import BlogArticles from '../components/blogsss';

import Footer  from "~/components/Footer";

import blogImage from '../assets/images/Blog-1.jpeg';

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
            <div className="h-60 bg-cover bg-center background5"></div>
            <div className="absolute inset-0 flex justify-center items-end">
              <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
                <h2 className="text-3xl font-bold font1">Articles & News</h2>
                <p className="text-center text-gray-700">home/blog</p>
              </div>
            </div>
          </div>
        );

    const LatestPostSection =  (
            <div className="sm:flex sm:justify-center  mx-auto max-w-[50rem] sm:mt-12 sm:items-center">
              <h2 className="text-2xl sm:hidden font2 font-medium mt-12 mb-4 px-6">Latest News</h2>
        
             
              <div className="sm:hidden sm:basis-2/5  mb-6">
                <div className="container px-6">
                  <h2 className="text-xl font2 mb-3 font-medium">low cost latest invented interior </h2>
                  <p className="text-gray-700 font2 text-sm mb-2">
                  It is a long established fact that a reader will be distracted <br /> by the readable content of a page when looking at its in <br />contrast to it's belief layout.
                  </p>
                  <p className="text-gray-700 text-sm font2">The point of using that it has a more-or-less normal <br /> in a piece of classica.</p>
                  <Link to= {`/blogs/7`}>
                  <div className="flex text-gray-800  mt-4 items-center w-[20rem] justify-between">
                    <p className="">
                      <span className="text-sm text-gray-800">3rd October, 2023</span>
                    </p>
                      <div className=" h-8 w-8 rounded-full bg-customColor  flex items-center justify-center">
                        <span className="icon-[ooui--next-ltr] w-3 h-3"></span>
                      </div>
                   
                  </div>
                  </Link>
                </div>
              </div>
             
              <div className="mb-4 sm:mt-12 sm:p-4 sm:basis-3/5">
                <h2 className="hidden sm:block text-3xl pl-2 font-medium font2 mb-8 ">Latest News</h2>
                <img
                  src={blogImage}
                  className="h-[18rem] sm:h-[18rem] rounded-[1.5rem] sm:rounded-[3rem] object-cover w-[80vw] mx-auto sm:min-w-[28rem] sm:max-[28.5rem] sm:m-0"
                />
              </div>

         <Link to= {`/blogs/7`}>
              <div className="hidden sm:block sm:basis-2/5 sm:mt-32">
                <div className="container mx-auto">
                  <h2 className="text-lg font2 sm:mb-3 font-medium">low cost latest invented interior <br />designing ideas</h2>
                  <p className="text-gray-700 text-xs font2 sm:mb-2">
                    It is a long established fact that a reader will be distracted <br /> by the readable content of a page when looking at its in <br />contrast to it's belief layout.
                  </p>
                  <p className="text-gray-700 text-xs font2">The point of using that it has a more-or-less normal <br /> in a piece of classica.</p>
                  <div className="flex text-gray-800 justify-between">
                    <p className="mt-4">
                      <span className="text-xs font2 text-gray-800">3rd October, 2023</span>
                    </p>
                   
                      <div className="mt-1 h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                        <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
                      </div>
                      
                  </div>
                </div>
              </div>
              </Link>
            </div>
            
          );        

  
         
          
  const NumberedButtons =  (
      <div className="flex justify-center">
        <div className="flex justify-between w-[13rem]">
          <div className="mt-1 h-10 w-10 rounded-full bg-customColor flex items-center justify-center">
            01
          </div>
          <div className="mt-1 h-10 w-10 rounded-full border border-customColor2 flex items-center justify-center">
            02
          </div>
          <div className="mt-1 h-10 w-10 rounded-full border border-customColor2 flex items-center justify-center">
            03
          </div>
          <div className="mt-1 h-10 w-10 rounded-full border border-customColor2 flex items-center justify-center">
            <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {BannerSection}
        {LatestPostSection}
        <BlogArticles />
        {NumberedButtons}
        <Footer />
      </div>
    );
  }