import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';


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

export default function ClientShowcaseForServicesSingle({ data }: ClientShowcaseProps) {
  const clients = data && data.length ? data : fallbackClients;

  return (
    <section className="py-16 bg-white" aria-label="Client Showcase">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
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
   
      </div>
    </section>
  );
}