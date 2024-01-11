import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { Link } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import TeamSection from '../components/TeamSection';
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
        <div className="h-60 bg-cover bg-center team-background"></div>
        <div className="absolute inset-0 flex justify-center items-end">
          <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
            <h2 className="text-3xl font-bold font1">Our team</h2>
            <p className="text-center text-gray-700">home/Team </p>
          </div>
        </div>
      </div>
        );

    const NewsletterSignup =  (
              <div className="bg-gray-100 max-w-[50rem] py-12 sm:rounded-xl mx-auto my-[4.2rem]">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-600">Stay updated with our latest news and updates. Don't miss out!</p>
                  </div>
                  <form className="max-w-lg mx-auto">
                    <div className="flex items-center justify-center">
                      <input
                        type="email"
                        className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none"
                        placeholder="Your Email Address"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-r-md focus:outline-none"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );

    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {BannerSection}
        <TeamSection />
        {NewsletterSignup}
        <Footer />
      </div>
    );
  }