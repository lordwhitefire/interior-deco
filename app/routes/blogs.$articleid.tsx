// interior-deco/app/routes/app/services/[serviceId].tsx
import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';
import { useParams } from '@remix-run/react';

import NavigationBar from '../components/NavigationBar';
import BlogPost from '../components/BlogSection';
import Footer from "~/components/Footer";


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
  

export default function BlogSingle() {
    // State for Exclusive dropdown in Navbar
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function for Exclusive dropdown
    const toggleMenuDropdown = () => {
      setIsMenuOpen(!isMenuOpen);
    };
   // Use useParams() to get the dynamic parameter
   const { articleid } = useParams();
  
    const BannerSection = (
        <div className="relative">
          <div className="h-60 bg-cover bg-center blog-background"></div>
        </div>
      );

    return (
      <div>
        <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
        {BannerSection}
        <BlogPost  articleId={articleid} />
        
        <Footer />
      </div>
    );
  }
  