// components/ClientShowcase.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from '@remix-run/react';

import icon1 from '../assets/icon/01.svg';
import icon2 from '../assets/icon/02.svg';
import icon3 from '../assets/icon/03.svg';
import icon4 from '../assets/icon/04.svg';
import icon5 from '../assets/icon/05.svg';


const clientLogos = [
  { id: 1, name: 'Modern Home Designs', logo: icon1, alt: 'Modern Home Designs logo' },
  { id: 2, name: 'Elite Interiors', logo: icon2, alt: 'Elite Interiors logo' },
  { id: 3, name: 'Luxury Living Co', logo: icon3, alt: 'Luxury Living Co logo' },
  { id: 4, name: 'Style & Space', logo: icon4, alt: 'Style & Space logo' },
  { id: 5, name: 'Design Studio Pro', logo: icon5, alt: 'Design Studio Pro logo' },
  { id: 6, name: 'Home Harmony', logo: icon1, alt: 'Home Harmony logo' },
  { id: 7, name: 'Premier Designs', logo: icon2, alt: 'Premier Designs logo' },
  { id: 8, name: 'Contemporary Spaces', logo: icon3, alt: 'Contemporary Spaces logo' }
];

const ClientShowcase = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've had the privilege of working with some of the most respected names in home design and architecture
          </p>
        </div>

        {/* Fixed Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 60
              }
            }}
            className="w-full"
          >
            {clientLogos.map((client) => (
              <SwiperSlide key={client.id} className="flex items-center justify-center">
                <div className="group w-full h-24 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:bg-white/80 group-hover:scale-105 group-hover:shadow-lg">
                    <img
                      src={client.logo}
                      alt={client.alt}
                      className="max-w-full max-h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    />
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

    

{/* Fixed Navigation Buttons */}
<div className="flex justify-center items-center mt-8 space-x-4">
  <button 
    className="swiper-prev-custom bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20"
    onClick={() => {
      const swiper = document.querySelector('.swiper').swiper;
      swiper.slidePrev();
    }}
  >
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  
  <button 
    className="swiper-next-custom bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20"
    onClick={() => {
      const swiper = document.querySelector('.swiper').swiper;
      swiper.slideNext();
    }}
  >
    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to join our list of satisfied clients?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font2"
          >
            Start Your Project
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;