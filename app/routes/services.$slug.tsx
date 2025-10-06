// interior-deco/app/routes/app/services/[serviceId].tsx
import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { useParams } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import ServiceSingleBanner from '../components/ServiceSingleBanner';
import SetTheTrendSection from '../components/SetTheTrendSection';
import LogoSection from '../components/LogoSection';
import InteriorSection from '../components/InteriorSection';
import LoveDesignSection from '../components/LoveDesignSection';
import MapSection from '../components/MapSection';
import ExperienceSection from '../components/ExperienceSection';
import Footer from "~/components/Footer";

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

export default function Servisesingle() {
  // State for Exclusive dropdown in Navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for Exclusive dropdown
  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Use useParams() to get the dynamic parameter
  const { serviceid } = useParams();

  return (
    <div>
      <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
      <ServiceSingleBanner />
      <SetTheTrendSection />
      <LogoSection />
      {/* Pass serviceId as a prop to MapSection */}
      <MapSection serviceId={serviceid} />
      <InteriorSection />
      <LoveDesignSection />
      <ExperienceSection />
      <Footer />
    </div>
  );
}
