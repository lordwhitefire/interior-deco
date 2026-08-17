import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  location: string;
}

export default function ClientTestimonials({
  testimonials,
  clientsEyebrow,
  clientsTitle,
}: {
  testimonials: Testimonial[];
  clientsEyebrow: string;
  clientsTitle: string;
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const items = testimonials.length > 0 ? testimonials : [];
  const swipable = items.length > 1;

  return (
    <>
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9A7A4A]">
        {clientsEyebrow}
      </p>

      <h2 className="mt-4 max-w-[300px] font-serif text-[28px] leading-[1.05] text-[#211F1B] sm:text-[36px] sm:leading-[1.02]">
        {clientsTitle}
      </h2>

      <div className="mt-6 flex items-start gap-5">
        <span className="font-serif text-5xl leading-none text-[#5B554B]">
          “
        </span>

        <div className="w-full min-w-0 max-w-[330px]">
          <Swiper
            modules={[Autoplay]}
            loop={swipable}
            slidesPerView={1}
            speed={500}
            resizeObserver
            autoplay={
              swipable
                ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
            onSwiper={setSwiper}
            className="w-full"
          >
            {items.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-[170px]">
                <div className="flex h-full flex-col overflow-hidden">
                  <p className="line-clamp-4 text-sm leading-6 text-[#37332E]">
                    {testimonial.quote}
                  </p>
                  <p className="mt-5 text-xs font-semibold text-[#2C2925]">
                    — {testimonial.clientName}
                  </p>
                  <p className="mt-1 text-[11px] text-[#777066]">
                    {testimonial.location}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => swiper?.slidePrev()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2925]/20 transition-colors hover:bg-[#2C2925]/5"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => swiper?.slideNext()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2925]/20 transition-colors hover:bg-[#2C2925]/5"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </>
  );
}