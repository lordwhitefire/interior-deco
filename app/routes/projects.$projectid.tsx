// interior-deco/app/routes/app/services/[serviceId].tsx
import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { useParams } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import ProjectsDetails from '../components/ProjectsDetails';
import SearchBanner from '../components/SearchBanner';
import OtherProjectsSection from '../components/OtherProjectsSection';
import Footer from "~/components/Footer";

import projectImage from '../assets/images/project1.jpg';
import projectImage2 from '../assets/images/other2.jpeg';
import projectImage3 from '../assets/images/project3.jpeg';
import projectImage5 from '../assets/images/progect5.jpg';
import projectImage4 from '../assets/images/project4.jpeg';
import projectImage6 from '../assets/images/project6.jpeg';
import projectImage7 from '../assets/images/project7.jpeg';
import projectImage8 from '../assets/images/other.jpeg';


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
  

export default function ProjectSingle() {
    // State for Exclusive dropdown in Navbar
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function for Exclusive dropdown
    const toggleMenuDropdown = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    // Use useParams() to get the dynamic parameter
    const { projectid } = useParams();
  
    const BannerSection = (
          <div className="relative">
            <div className="h-60 bg-cover bg-center project-banner"></div>
          </div>
        );

     const projects = [
            { id: '1', imagePath: projectImage, title: 'UrbanGlow Living Space', description: 'Decor/Architecture' },
            { id: '2', imagePath: projectImage2, title: 'GlamSeat Terrace', description: 'Decor/Architecture' },
            { id: '3', imagePath: projectImage3, title: 'PlushPine Parlor', description: 'Decor/Architecture' },
            { id: '4', imagePath: projectImage4, title: 'GoldenGlow Creativespace', description: 'Decor/Architecture' },
            { id: '5', imagePath: projectImage5, title: 'Celestial Scape lounge', description: 'Decor/Architecture' },
            { id: '6', imagePath: projectImage6, title: 'Starburst Serenity Suite', description: 'Decor/Architecture' },
            { id: '7', imagePath: projectImage7, title: 'BlissfulAsh Escape', description: 'Decor/Architecture' },
            { id: '8', imagePath: projectImage8, title: 'WhiteWaltz Retreat', description: 'Decor/Architecture' },
            // Add other projects with their details
          ];
    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {BannerSection}
        <ProjectsDetails />
        {/* Pass projectId as a prop to SearchBanner */}
        <SearchBanner projectId={projectid} />
        <OtherProjectsSection selectedProjectId={projectid} />

        
        <Footer />
      </div>
    );
  }