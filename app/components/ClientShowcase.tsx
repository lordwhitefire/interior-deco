import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


/* hard-coded fallback (your original logo list) */
const fallbackClients = [
  { id: 1, name: 'Luxe Interiors',    logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/01.svg', alt: 'Luxe Interiors' },
  { id: 2, name: 'Urban Nest',        logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/02.svg', alt: 'Urban Nest' },
  { id: 3, name: 'Elite Homes',       logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/03.svg', alt: 'Elite Homes' },
  { id: 4, name: 'Modern Living',     logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/04.svg', alt: 'Modern Living' },
  { id: 5, name: 'Prestige Properties',logo:'https://lordwhitefire.github.io/interior-deco-assets/icon/05.svg', alt: 'Prestige Properties' },
  { id: 6, name: 'Signature Spaces',  logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/01.svg', alt: 'Signature Spaces' },
  { id: 7, name: 'Royal Residence',   logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/02.svg', alt: 'Royal Residence' },
  { id: 8, name: 'Diamond Designs',   logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/03.svg', alt: 'Diamond Designs' },
];

type Client = { id: number; name: string; logo: string; alt: string };
type ClientShowcaseProps = { data?: Client[] };

export default function ClientShowcase({ data }: ClientShowcaseProps) {
  const clients = data && data.length ? data : fallbackClients;

  return (
    <section className="py-16 bg-white" aria-label="Client Showcase">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the most respected names in interior design and real estate.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={false}
          className="client-swiper"
        >
          {clients.map((client) => (
            <SwiperSlide key={client.id}>
              <div className="flex items-center justify-center h-24 px-4 group cursor-pointer">
                <img
                  src={client.logo}
                  alt={client.alt}
                  className="max-h-12 max-w-full object-contain mb-8 sm:mb-0 filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />
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
        <div className="text-center mt-12">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-x-2 bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300"
          >
            View Our Portfolio
            <span className="icon-[solar--arrow-right-linear] w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}