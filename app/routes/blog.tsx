import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';

import NavigationBar from '../components/NavigationBar';
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


  export default function About() {
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
                  <div className="flex text-gray-800  mt-4 items-center w-[20rem] justify-between">
                    <p className="">
                      <span className="text-sm text-gray-800">3rd October, 2023</span>
                    </p>
                    <a href="blogdetails.html">
                      <div className=" h-8 w-8 rounded-full bg-customColor  flex items-center justify-center">
                        <span className="icon-[ooui--next-ltr] w-3 h-3"></span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
        
              <div className="mb-4 sm:mt-12 sm:p-4 sm:basis-3/5">
                <h2 className="hidden sm:block text-3xl pl-2 font-medium font2 mb-8 ">Latest News</h2>
                <img
                  src={blogImage}
                  className="h-[18rem] sm:h-[18rem] rounded-[1.5rem] sm:rounded-[3rem] object-cover w-[80vw] mx-auto sm:min-w-[28rem] sm:max-[28.5rem] sm:m-0"
                />
              </div>
        
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
                    <a href="blogdetails.html">
                      <div className="mt-1 h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                        <span className="icon-[ooui--next-ltr] w-4 h-4"></span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );        

          const articles = [
            {
              id: 1,
              title: "Let's get solutions for building construction work",
              date: '3rd October, 2023',
              buttonLabel: 'Kitchen design',
              blog:'blog1',
            },
            {
              id: 2,
              title: "Low cost latest invented interior designing ideas",
              date: '23rd november, 2023',
              buttonLabel: 'Living design',
              blog:'blog4',
            },
            {
              id: 3,
              title: "Best for any office and business interior solution",
              date: '3rd january, 2024',
              buttonLabel: 'Interior design',
              blog:'blog3',
            },
            {
              id: 4,
              title: "Let's get solutions for building construction work",
              date: '3rd October, 2023',
              buttonLabel: 'Kitchen design',
              blog:'blog2',
            },
            {
              id: 5,
              title: "Low cost latest invented interior designing ideas",
              date: '23rd november, 2023',
              buttonLabel: 'Living design',
              blog:'blog5',
            },
            {
              id: 6,
              title: "Best for any office and business interior solution",
              date: '3rd january, 2024',
              buttonLabel: 'Interior design',
              blog:'blog6',
            },
         
          ];

const ArticlesAndNews =  (
    <div className="max-w-[50rem] mx-auto py-8 my-4 sm:mb-8">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-4xl font-medium font2 mb-4">Articles and News</h2>
        <p className="text-gray-700 text-center mx-2 sm:mx-0 text-[0.8rem] sm:text-[0.67rem] sm:w-1/2">
          It is a long established fact that a reader will be distracted by the of readable content of the page looking at its layouts points.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:px-4">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col justify-center items-center sm:mx-1 my-4 mx-8 p-3 border border-gray-300 rounded-[2rem]">
            <div className={`p-4 border border-gray-300 w-full h-[12rem] flex flex-col justify-end rounded-t-[2rem] ${article.blog}`}>
              <button className="w-[6rem] sm:w-[6rem] text-[0.6rem] flex bg-white hover:bg-blue-700 text-gray-700 font-medium font2 py-3 sm:py-2 justify-center items-center rounded-r-lg rounded-tl-xl sm:rounded-r-md sm:rounded-tl-lg">
                {article.buttonLabel}
              </button>
            </div>
            <div className="pt-2 px-2 w-full">
              <h2 className="text-md font-medium font2 w-10/12 mb-2">{article.title}</h2>
              <div className="flex text-gray-800 items-center justify-between">
                <p className="mt-0">
                  <span className="text-[0.8rem] text-gray-800">{article.date}</span>
                </p>
                <a href={article.blog}>
                  <div className="mt-1 h-8 w-8 rounded-full bg-customColor flex items-center justify-center">
                    <span className="icon-[ooui--next-ltr] w-3 h-3"></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        {ArticlesAndNews}
        {NumberedButtons}
        <Footer />
      </div>
    );
  }