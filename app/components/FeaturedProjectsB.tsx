import React, { useState } from 'react';
import { Link } from '@remix-run/react';

/* hosted images (same ones you bundle today) */
const fallbackProjects = [
  {
    id: '1',
    title: 'Modern Luxury Kitchen',
    type: 'Kitchen Design',
    description: 'Complete renovation featuring custom cabinetry, quartz countertops, and premium appliances. Designed for both functionality and entertainment.',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/Modern_kitchen.jpg',
    category: 'kitchen',
    features: ['Custom Cabinetry', 'Quartz Countertops', 'Premium Appliances'],
    budget: '$$$',
    timeline: '6 weeks',
    link:  `/projects/1`
  },
  {
    id: '2',
    title: 'Contemporary Living Space',
    type: 'Living Room',
    description: 'Open concept transformation with natural lighting, custom built-ins, and a cohesive color palette that creates warmth and sophistication.',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_cupboard.jpg',
    category: 'living-room',
    features: ['Open Concept', 'Custom Built-ins', 'Natural Lighting'],
    budget: '$$',
    timeline: '4 weeks',
    link:  `/projects/2`
  },
  {
    id: '3',
    title: 'Elegant Master Bedroom',
    type: 'Bedroom Design',
    description: 'Serene retreat featuring custom storage solutions, ambient lighting, and a calming color scheme designed for rest and relaxation.',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_dining.jpg',
    category: 'bedroom',
    features: ['Custom Storage', 'Ambient Lighting', 'Calming Palette'],
    budget: '$$',
    timeline: '3 weeks',
    link:  `/projects/3`
  },
  {
    id: '4',
    title: 'Sophisticated Dining Area',
    type: 'Dining Room',
    description: 'Perfect entertaining space with statement lighting, custom dining table, and sophisticated color palette for memorable gatherings.',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_reading.jpg',
    category: 'dining-room',
    features: ['Statement Lighting', 'Custom Furniture', 'Sophisticated Palette'],
    budget: '$$$',
    timeline: '5 weeks',
    link:  `/projects/4`
  },
  {
    id: '5',
    title: 'Modern Home Office',
    type: 'Office Design',
    description: 'Productivity-focused workspace with ergonomic furniture, optimal lighting, and organized storage solutions for maximum efficiency.',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/Modern_kitchen.jpg',
    category: 'office',
    features: ['Ergonomic Design', 'Optimal Lighting', 'Organized Storage'],
    budget: '$',
    timeline: '2 weeks',
    link:  `/projects/5`
  },
  {
    id: '6',
    title: 'Luxury Bathroom Suite',
    type: 'Bathroom Design',
    description: 'Spa-like retreat with premium fixtures, custom vanities, and luxurious materials that create a personal sanctuary.',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_cupboard.jpg',
    category: 'bathroom',
    features: ['Premium Fixtures', 'Custom Vanities', 'Luxury Materials'],
    budget: '$$$$',
    timeline: '8 weeks',
    link:  `/projects/6`
  }
];

type Project = typeof fallbackProjects[0];
type FeaturedProjectsBProps = { data?: Project[] };

export default function FeaturedProjectsB({ data }: FeaturedProjectsBProps) {
  const projects = data && data.length ? data : fallbackProjects;
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  /* ----  EVERYTHING BELOW IS 100 % IDENTICAL TO YOUR FILE  ---- */
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font2">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of interior design solutions tailored to your lifestyle
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All Projects', 'Kitchen', 'Living Room', 'Bedroom', 'Bathroom', 'Office'].map((c) => (
            <button
              key={c}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              onMouseEnter={() => setHoveredId(Number(p.id))}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium">{p.type}</span>
                  <span className="bg-white/90 text-gray-900 text-sm px-3 py-1 rounded-full font-medium backdrop-blur-sm">{p.budget}</span>
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{p.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{p.timeline}</span>
                </div>
              </div>

              <div className={`
                absolute inset-0 bg-black/50 backdrop-blur-sm 
                flex items-center justify-center p-6
                transition-all duration-300 ease-out z-10
                ${hoveredId === Number(p.id) ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}>
                <div className="text-white text-center max-w-full">
                  <p className="text-gray-200 mb-4 text-sm leading-relaxed">{p.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {p.features.map((f, i) => (
                        <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                    <Link to={p.link}>
                    <span className="inline-flex items-center text-yellow-400 font-medium">
                      View Project Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/project"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font2 text-lg"
          >
            Browse Full Portfolio
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}