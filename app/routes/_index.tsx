import type { MetaFunction } from "@remix-run/node";
import React from 'react'; // Remove useState import too
import { useLoaderData } from '@remix-run/react';
import { sanityServerClient } from '~/lib/sanity.server';
import { BANNER_DATA_QUERY } from '~/queries/bannerData';
import { json } from '@remix-run/node'; 

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

export async function loader() {
  try {
    const data = await sanityServerClient.fetch(BANNER_DATA_QUERY);
    return json(data);
  } catch (error) {
    console.error('Error fetching banner data:', error);
    return json({ bannerData: null });
  }
}


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

   const data = useLoaderData<typeof loader>();
  return (
    <div>
      <NavigationBar /> {/* Clean and simple! */}
        {/* Dynamic Banner Component */}
       <BannerComponent bannerData={data?.bannerData} />
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