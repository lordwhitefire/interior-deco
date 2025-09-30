// app/components/Hero.tsx
import { useEffect, useState } from "react";

// app/components/Hero.tsx
type HeroData = {
  title: string;
  subtitle: string;
  images: string[]; // ← 4 URLs from loader
};

type HeroProps = { data: HeroData };

/* no local fallback – loader always supplies 4 strings */

export default function Hero({ data }: HeroProps) {
  const [index, setIndex] = useState(0);
  const IMAGES = data.images; // ← Move this INSIDE the component!
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{keyframeCss}</style>

      <section
        className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden"
        role="region"
        aria-label="Hero Section"
      >
        {/* Animated background stack */}
        <div className="absolute inset-0">
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ken-burns ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Foreground content */}
        <div className="relative z-1 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-up">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 opacity-90 animate-fade-up [animation-delay:0.2s]">
            {data.subtitle}
          </p>
          <a
            href="/contact"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors duration-300 animate-fade-up [animation-delay:0.4s]"
            aria-label="Get Started with Interior Decorators"
          >
            Get Started
          </a>
        </div>
      </section>
    </>
  );
}

/* Keyframes injected into the document */
const keyframeCss = `
  @keyframes ken-burns {
    0%   { transform: scale(1) translate(0, 0); }
    100% { transform: scale(1.35) translate(-2%, 2%); }
  }
  .ken-burns {
    animation: ken-burns 24s linear infinite;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-up {
    animation: fade-up 0.8s both cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;