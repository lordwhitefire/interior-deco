// components/SuccessStats.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Briefcase, Users, Star } from 'lucide-react';

const SuccessStats = () => {
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    active: 0,
    customers: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 1,
      number: 12,
      label: 'Years of Experience',
      suffix: '',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      number: 85,
      label: 'Successful Projects',
      suffix: '+',
      icon: Briefcase,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      number: 15,
      label: 'Active Projects',
      suffix: '',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 4,
      number: 95,
      label: 'Happy Customers',
      suffix: '+',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animated counter function
  const startCounters = () => {
    const duration = 2000; // 2 seconds animation
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(
          Math.floor(increment * currentStep),
          stat.number
        );

        setCounters((prev) => ({
          ...prev,
          [getCounterKey(index)]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  const getCounterKey = (index) => {
    const keys = ['years', 'projects', 'active', 'customers'];
    return keys[index];
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Diagonal Background Split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-95"
          style={{
            clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 75%)'
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative z-1">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r sm:from-gray-800 sm:via-gray-400 sm:via-white  sm:to-white  from-gray-800 via-gray-400 to-white bg-clip-text text-transparent mb-4 font2">
            Our Track Record Speaks
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and client satisfaction
          </p>
        </div>

        {/* Stats Grid with Diagonal Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-1">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const counterValue = counters[getCounterKey(index)];
            
            return (
              <div
                key={stat.id}
                className={`
                  relative group cursor-pointer
                  ${index % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'}
                  hover:rotate-0 transition-all duration-500
                `}
              >
                {/* Card with Glass Effect */}
                <div className={`
                  bg-white/10 backdrop-blur-md rounded-2xl p-8
                  border border-white/20
                  hover:bg-white/20 hover:border-white/30
                  transition-all duration-300
                  hover:scale-105 hover:shadow-2xl
                `}>
                  {/* Icon Background */}
                  <div className={`
                    absolute -top-4 -left-4 w-20 h-20 rounded-full
                    bg-gradient-to-br ${stat.color} opacity-20
                    group-hover:opacity-30 transition-opacity duration-300
                  `}></div>
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      bg-gradient-to-br ${stat.color} text-white
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Number with Animation */}
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 font2">
                      {counterValue}{stat.suffix}
                    </div>
                    <div className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Hover Effect - Subtle Glow */}
                  <div className={`
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-br ${stat.color} opacity-0
                    group-hover:opacity-10 transition-opacity duration-300
                    -z-10
                  `}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 relative z-1">
          <p className="text-gray-300 text-lg mb-6">
            Ready to add your project to our success story?
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl font2 text-lg">
            Start Your Project Today
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/3 right-8 w-14 h-14 bg-white/5 rounded-full"></div>
      </div>
    </section>
  );
};

export default SuccessStats;