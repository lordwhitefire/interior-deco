import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { Link, Outlet } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import DescriptionSection from '../components/DescriptionSection';
import HowWeWorkSection from '../components/HowWeWorkSection';
import Join from '../components/Join';
import Footer from '~/components/Footer';

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
export default function Services() {
  // State for Exclusive dropdown in Navbar    
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for Exclusive dropdown
  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const BannerSection =  (
      <div className="relative">
        <div className="h-60 bg-cover bg-center background6"></div>
        <div className="absolute inset-0 flex justify-center items-end">
          <div className="bg-white py-8 px-16 rounded-t-[1rem] shadow-lg flex flex-col items-center">
            <h2 className="text-3xl font-bold font1">services</h2>
            <p className="text-center text-gray-700">home/services</p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
      {BannerSection}
      <DescriptionSection />
      
      <HowWeWorkSection />
      <Join />
      <Footer />
    </div>
  );
}
