// app/components/InteriorSection.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = {
  data: {
    interiorHeadline: string;
    interiorText: string;
    interiorGallery: string[]; // URLs
  };
};

const InteriorSection: React.FC<Props> = ({ data }) => {
  const { interiorHeadline, interiorText, interiorGallery } = data;
  const stripRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  const log = (msg: string) => console.log(`[Interior] ${msg}`);

  // 1. keep every image (cap at sane max)
  const MAX = 12;
  const srcImages = interiorGallery.slice(0, MAX);
  const count = srcImages.length;
  if (!count) return null;

  // 2. clone first image → gives us spare width to scroll
  const images = [...srcImages, srcImages[0]];

  /* ---- advance by one snap (infinite) ---- */
  const next = () => {
    const el = stripRef.current;
    if (!el) return;
    const slideW = el.scrollWidth / count; // width of one real slide
    const current = Math.round(el.scrollLeft / slideW);
    const isClone = current === count - 1; // last item is clone

    if (isClone) {
      el.scrollTo({ left: 0 }); // instant reset to real first
      setIdx(0);
      log("wrapped to 0");
    } else {
      el.scrollBy({ left: slideW, behavior: "smooth" });
      log("scrolled +1 snap");
    }
  };

  /* ---- auto timer ---- */
  const startTimer = () => {
    stopTimer();
    timerRef.current = window.setInterval(next, 3000);
    log("timer started");
  };
  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    log("timer stopped");
  };

  /* ---- scroll spy: update idx after user swipe or auto scroll ---- */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideW = el.scrollWidth / count;
      let newIdx = Math.round(el.scrollLeft / slideW);
      if (newIdx >= count) newIdx = 0; // clamp clone index
      if (newIdx !== idx) {
        setIdx(newIdx);
        log(`scroll spy → ${newIdx}`);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [idx, count]);

  /* ---- pause on drag / touch ---- */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onStart = () => stopTimer();
    const onEnd = () => window.setTimeout(startTimer, 1000);
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("mousedown", onStart);
    el.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("mouseup", onEnd);
    };
  }, []);

  /* ---- start on mount ---- */
  useEffect(() => {
    log("mounted – starting timer");
    startTimer();
    return () => {
      stopTimer();
      log("unmounted – timer cleared");
    };
  }, []);

  /* ---- client-side width label (optional debug) ---- */
  const [widthLabel, setWidthLabel] = useState("");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setWidthLabel(w >= 1024 ? "desktop-3" : w >= 768 ? "tablet-2" : "mobile-1");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font1 text-gray-900">{interiorHeadline}</h2>
          {interiorText && <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">{interiorText}</p>}
        </div>

        {/* debug bar */}
        <div className="mb-4 text-xs bg-gray-100 text-gray-700 p-2 rounded">
          Images: {count} | Index: {idx} | {widthLabel}
        </div>

        {/* scroll strip with clone for infinite loop */}
        <div className="relative w-full">
          <div
            ref={stripRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          >
            {images.map((url, i) => (
              <div
                key={i}
                className="snap-start w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
              >
                <img
                  src={url}
                  alt={`Interior ${i + 1}`}
                  className="w-full h-72 object-cover rounded-2xl shadow"
                />
              </div>
            ))}
          </div>

          {/* dots (real slides only) */}
          <div className="mt-6 flex justify-center gap-2">
            {srcImages.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === idx ? "bg-customColor2" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorSection;