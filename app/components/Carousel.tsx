// components/Carousel.tsx
// components/Carousel.tsx
import React, { useState, useEffect } from 'react';

const Carousel = ({ items, visibleItems }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [items]);

  const cardWidth = 100 / visibleItems; // Calculate the width of each card based on the number of visible items

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className={`flex transition-transform ease-in-out duration-300 transform -translate-x-full`}
        style={{ width: `${items.length * 100}%` }}
      >
        {items.map((item, index) => (
          <div key={index} className={`w-full px-4 sm:w-${cardWidth}`}>
            {/* Your item content goes here */}
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <h5 className="text-sm">{item.location}</h5>
              <p className="text-gray-700 mt-2">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;


