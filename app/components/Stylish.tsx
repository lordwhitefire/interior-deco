// app/components/Stylish.tsx
import { useInView } from "react-intersection-observer";
import { CSSProperties } from "react";

type StylishProps = {
  data: { 
    title: string; 
    description: string;
    images: string[]; // Add this
  };
};


export default function Stylish({ data }: StylishProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <>
      <style>{keyframeCss}</style>

      <section
        ref={ref}
        className="py-16 bg-neutral-100 overflow-hidden"
        aria-label="Stylish Designs Section"
      >
        <div className="sm:flex sm:justify-center sm:items-center mx-auto max-w-[50rem] sm:mt-12">
          {/* LEFT – copy + CTA */}
          <div className="py-8 sm:py-16 sm:w-1/2">
            <div className="container mx-auto w-4/5">
              <h2
                className={`text-4xl font-semibold mb-4 fade-up ${
                  inView ? "show" : ""
                }`}
              >
                {data.title}
              </h2>
              <p
                className={`text-gray-700 text-xl sm:text-xl mb-6 fade-up ${
                  inView ? "show" : ""
                }`}
                style={{ "--delay": "0.15s" } as CSSProperties}
              >
                {data.description}
              </p>

              {/* phone */}
              <div
                className={`flex items-center mb-8 fade-up ${
                  inView ? "show" : ""
                }`}
                style={{ "--delay": "0.3s" } as CSSProperties}
              >
                <div className="flex justify-center h-16 w-16 items-center bg-amber-600 rounded-full transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  <span className="text-white icon-[bi--telephone] w-8 h-8" />
                </div>
                <p className="flex flex-col text-lg ml-3 text-gray-700">
                  123-456-7890
                  <span className="text-lg text-gray-500">Call us anytime</span>
                </p>
              </div>

              {/* CTA */}
              <div
                className={`fade-up ${inView ? "show" : ""}`}
                style={{ "--delay": "0.45s" } as CSSProperties}
              >
                <a
                  href="/contact"
                  className="w-36 flex gap-x-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get free estimate
                  <span className="mt-4 icon-[solar--arrow-right-linear] w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

        
          <div className="hidden sm:block sm:w-1/2 mt-8 sm:mt-0 p-4">
            <div className="relative h-[24rem] rounded-tr-[6rem] rounded-bl-[4rem] overflow-hidden shadow-2xl">
              {data.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Stylish interior ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    /* 15 s master cycle, staggered by 5 s → 3.75 s in / 3.75 s out overlap */
                    animation: `kenBurnOverlap 12s infinite ${i * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- CSS ---------- */
const keyframeCss = `
  /* 0-3.75 s : fade-in + scale-up  
     3.75-7.5 s : fade-out + scale-down  
     7.5-15 s : dead (opacity 0) – clipped by negative start */
  @keyframes kenBurnOverlap {
    0%   { transform: scale(1)    translate(0,0);   opacity: 0; }
    50%  { transform: scale(1.15) translate(-2%,2%); opacity: 1; } /* 3.75 s peak */
    100% { transform: scale(1)    translate(0,0);   opacity: 0; } /* 7.5 s gone */
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up {
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.215,0.61,0.355,1),
                transform 0.6s cubic-bezier(0.215,0.61,0.355,1);
    transition-delay: var(--delay, 0s);
  }
  .fade-up.show {
    opacity: 1;
    transform: translateY(0);
  }
`;