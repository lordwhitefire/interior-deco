// app/components/InteriorSection.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = { data: { interiorHeadline: string; interiorText: string; interiorGallery: string[] } };

const InteriorSection: React.FC<Props> = ({ data }) => {
  const { interiorHeadline, interiorText, interiorGallery } = data;
  const stripRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  const images = interiorGallery.slice(0, 12); // keep all
  const count = images.length;
  if (!count) return null;

  /* ---- scroll 1 slide forward ---- */
  const next = () => {
    const el = stripRef.current;
    if (!el) return;
    const slideW = el.scrollWidth / count;
    const atEnd = Math.round(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 2;

    if (atEnd) {
      el.scrollTo({ left: 0 }); // instant warp to start
      setIdx(0);
    } else {
      el.scrollBy({ left: slideW, behavior: "smooth" });
    }
  };

  /* ---- auto advance ---- */
  useEffect(() => {
    timerRef.current = window.setInterval(next, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /* ---- spy: keep dot in sync ---- */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideW = el.scrollWidth / count;
      const newIdx = Math.round(el.scrollLeft / slideW) % count;
      if (newIdx !== idx) setIdx(newIdx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [idx, count]);

  /* ---- pause while dragging ---- */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const stop = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
    const start = () => {
      stop();
      timerRef.current = window.setInterval(next, 3000);
    };
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("touchend", () => setTimeout(start, 1000), { passive: true });
    el.addEventListener("mousedown", stop);
    el.addEventListener("mouseup", () => setTimeout(start, 1000));
    return () => {
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("touchend", start);
      el.removeEventListener("mousedown", stop);
      el.removeEventListener("mouseup", start);
    };
  }, []);

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font1 text-gray-900">{interiorHeadline}</h2>
          {interiorText && <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">{interiorText}</p>}
        </div>

        <div className="relative w-full">
          {/* scrollable strip */}
          <div ref={stripRef} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide">
            {images.map((url, i) => (
              <div key={i} className="snap-start w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                <img src={url} alt={`Interior ${i + 1}`} className="w-full h-72 object-cover rounded-2xl shadow" />
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {images.map((_, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-customColor2" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorSection;