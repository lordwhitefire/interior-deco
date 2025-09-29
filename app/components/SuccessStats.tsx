// app/components/SuccessStats.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Briefcase, Users, Star } from 'lucide-react';

/* ---------- 1.  string → component lookup ---------- */
const ICON_MAP = {
  Calendar,
  Briefcase,
  Users,
  Star,
} as Record<string, React.ElementType>;

/* ---------- 2.  hard-coded fallback ---------- */
const fallbackStats = [
  {
    id: '1',
    number: '12',
    suffix: '',
    label: 'Years of Experience',
    icon: 'Calendar',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: '2',
    number: '85',
    suffix: '+',
    label: 'Successful Projects',
    icon: 'Briefcase',
    color: 'from-green-500 to-green-600',
  },
  {
    id: '3',
    number: '15',
    suffix: '',
    label: 'Active Projects',
    icon: 'Star',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: '4',
    number: '95',
    suffix: '+',
    label: 'Happy Customers',
    icon: 'Users',
    color: 'from-purple-500 to-purple-600',
  },
];

/* ---------- 3.  types ---------- */
type Stat = {
  id: string;
  number: string;
  suffix: string;
  label: string;
  icon: string; // ← string only
  color: string;
};
type SuccessStatsProps = { data?: Stat[] };

export default function SuccessStats({ data }: SuccessStatsProps) {
  const stats = data && data.length ? data : fallbackStats;

  const [counters, setCounters] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ---------- 4.  intersection observer ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCounters();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isVisible]);

  /* ---------- 5.  animated counters ---------- */
  const startCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat) => {
      const target = parseInt(stat.number, 10);
      const key = stat.id;
      const increment = target / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(increment * currentStep), target);
        setCounters((prev) => ({ ...prev, [key]: currentValue }));
        if (currentStep >= steps) clearInterval(timer);
      }, stepDuration);
    });
  };

  /* ---------- 6.  render (identical markup) ---------- */
  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-95"
          style={{ clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 75%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-1">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-400 to-white bg-clip-text text-transparent mb-4 font2">
            Our Track Record Speaks
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-1">
          {stats.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon]; // ← convert string → component
            const counterValue = counters[stat.id] || 0;
            return (
              <div
                key={stat.id}
                className={`relative group cursor-pointer ${
                  index % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'
                } hover:rotate-0 transition-all duration-500`}
              >
                <div
                  className={`
                    bg-white/10 backdrop-blur-md rounded-2xl p-8
                    border border-white/20
                    hover:bg-white/20 hover:border-white/30
                    transition-all duration-300
                    hover:scale-105 hover:shadow-2xl
                  `}
                >
                  <div className={`absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="relative mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 font2">
                      {counterValue}{stat.suffix}
                    </div>
                    <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 relative z-1">
          <p className="text-gray-300 text-lg mb-6">Ready to add your project to our success story?</p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl font2 text-lg">
            Start Your Project Today
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 right-8 w-14 h-14 bg-white/5 rounded-full" />
      </div>
    </section>
  );
}