import type { MetaFunction } from "@remix-run/node";
import React from 'react'; // Remove useState import too

import BannerComponent from '../components/BannerComponent';
import NavigationBar from '../components/NavigationBar';
import Testimonials from '../components/Testimonials';
import Article from '../components/Article';
import Join from '../components/Join';
import Footer from "~/components/Footer";
import DescriptionSection from '../components/DescriptionSection';
import ClientShowcase from '../components/ClientShowcase';
import FeaturedProjectsB from '../components/FeaturedProjectsB';
import SuccessStats from '../components/SuccessStats';

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

export default function Index() {
  return (
    <div>
      <NavigationBar /> {/* Clean and simple! */}
      <BannerComponent />
      <Testimonials />
      <ClientShowcase />
      <FeaturedProjectsB />
      <SuccessStats />
      <Article />
      <Join />
      <Footer />
    </div>
  );
}