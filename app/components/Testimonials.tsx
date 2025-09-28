// components/Testimonials.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// Fixed image imports (you had typos)
import person1Image from '../assets/images/person1.jpg';
import person2Image from '../assets/images/person2.jpg';
import person3Image from '../assets/images/person3.jpg';
import person4Image from '../assets/images/lady3.jpg';
import person5Image from '../assets/images/guy3.jpg';
import person6Image from '../assets/images/lady4.jpg';

const testimonials = [
  {
    id: 1,
    img: person1Image,
    name: 'Sarah Mitchell',
    location: 'Manhattan, New York',
    rating: 5,
    text: 'Transformed our living space beyond imagination. The attention to detail and creative vision made our house feel like a luxury hotel. Absolutely thrilled with the results!',
    verified: true,
    project: 'Living Room Design'
  },
  {
    id: 2,
    img: person2Image,
    name: 'James Chen',
    location: 'San Francisco, CA',
    rating: 5,
    text: 'Professional, creative, and delivered exactly what we envisioned. The 3D renderings helped us see the final result before committing. Worth every penny!',
    verified: true,
    project: 'Kitchen Remodel'
  },
  {
    id: 3,
    img: person3Image,
    name: 'Emma Thompson',
    location: 'Austin, Texas',
    rating: 5,
    text: 'Outstanding service from start to finish. They listened to our needs and created a space that perfectly reflects our personality. Highly recommend!',
    verified: true,
    project: 'Bedroom Design'
  },
  {
    id: 4,
    img: person4Image,
    name: 'Michael Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    text: 'The team exceeded all expectations. Their ability to blend modern aesthetics with comfort is remarkable. Our home feels like a designer showcase!',
    verified: true,
    project: 'Complete Home Design'
  },
  {
    id: 5,
    img: person5Image,
    name: 'Lisa Park',
    location: 'Seattle, WA',
    rating: 5,
    text: 'Incredible transformation! They maximized our small space and made it feel twice as big. The storage solutions are both beautiful and functional.',
    verified: true,
    project: 'Small Space Design'
  },
  {
    id: 6,
    img: person6Image,
    name: 'David Kim',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'Professional, punctual, and passionate about design. They transformed our outdated office into a modern, inspiring workspace. Our team loves it!',
    verified: true,
    project: 'Office Design'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const testimonialContainerRef = useRef(null);

  // Auto-play with pause on hover
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Setup touch event listeners
  useEffect(() => {
    const container = testimonialContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  // Get visible testimonials for desktop carousel
  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [prev, currentIndex, next];
  };

  // Single testimonial component (used in mobile view)
  const TestimonialCard = ({ testimonial, isSingle = false }) => (
    <div className={`
      bg-white rounded-2xl shadow-xl p-6 flex flex-col
      ${isSingle ? 'max-w-md mx-auto' : 'h-full'}
      transform transition-all duration-300 hover:shadow-2xl
    `}>
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-6 h-6 text-gray-300" />
      </div>

      {/* Stars */}
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
        {testimonial.text}
      </p>

      {/* Author Info */}
      <div className="flex items-center">
        <img
          src={testimonial.img}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
          <p className="text-xs text-gray-500">{testimonial.project}</p>
        </div>
        {testimonial.verified && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
            ✓ Verified
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from homeowners who've transformed their spaces with us
          </p>
        </div>

        {/* Desktop Carousel - 3 cards */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="flex items-center justify-center space-x-8">
              {getVisibleTestimonials().map((testimonialIndex, position) => {
                const testimonial = testimonials[testimonialIndex];
                const isActive = position === 1;
                
                return (
                  <div
                    key={testimonial.id}
                    className={`
                      relative transition-all duration-500 ease-out
                      ${isActive ? 'w-96 scale-100 opacity-100 z-20' : 'w-80 scale-90 opacity-60 z-10'}
                      ${position === 0 ? 'transform -translate-x-8' : ''}
                      ${position === 2 ? 'transform translate-x-8' : ''}
                    `}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet - Single card with swipe */}
        <div className="lg:hidden">
          <div 
            ref={testimonialContainerRef}
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`
              mx-auto max-w-md transition-all duration-300 ease-out
              ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
            `}>
              <TestimonialCard testimonial={testimonials[currentIndex]} isSingle={true} />
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`
                    rounded-full transition-all duration-300 ease-out
                    ${index === currentIndex 
                      ? 'bg-gray-800 w-10 h-3' 
                      : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                    }
                  `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Instructions */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Tap dots to navigate or swipe left/right
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm">4.9/5 Average Rating</span>
            </div>
            <div className="text-sm">
              500+ Happy Clients
            </div>
            <div className="text-sm">
              100% Satisfaction Guaranteed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;