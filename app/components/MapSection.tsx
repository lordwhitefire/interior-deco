// app/components/MapSection.tsx
import React, { useRef, useState } from "react";

type Props = { videoUrl: string; poster: string };

const MapSection: React.FC<Props> = ({ videoUrl, poster }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [debugSrc, setDebugSrc] = useState(""); // what we inject
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const startVideo = () => {
    if (!videoUrl) return; // blank ID guard
    const src = `https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0&modestbranding=1`;
    setDebugSrc(src);
    setShowPlayer(true);
    // push src after render so ref is attached
    setTimeout(() => {
      if (iframeRef.current) iframeRef.current.src = src;
    }, 0);
  };

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          {/* Poster */}
          {!showPlayer && (
            <>
              <img
                src={poster}
                alt="Video poster"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <button
                onClick={startVideo}
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90
                           flex items-center justify-center
                           hover:scale-110 transition-transform duration-300"
              >
                <span className="icon-[solar--play-bold] w-6 h-6 sm:w-8 sm:h-8 text-customColor2" />
              </button>
            </>
          )}

          {/* Iframe + second debug badge */}
          {showPlayer && (
            <>
              <div className="absolute top-3 left-3 z-10 px-2 py-1 text-xs bg-black/70 text-white rounded">
                {debugSrc ? `src set → ${videoUrl}` : "src not set"}
              </div>
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                src=""
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapSection;