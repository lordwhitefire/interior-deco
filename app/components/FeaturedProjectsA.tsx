// components/FeaturedProjectsA.tsx
import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import project1Image from '../assets/images/Modern_kitchen.jpg';
import project2Image from '../assets/images/modern_cupboard.jpg';
import project3Image from '../assets/images/modern_dining.jpg';
import project4Image from '../assets/images/modern_reading.jpg';

const projects = [
  {
    id: 1,
    title: 'Modern Luxury Kitchen',
    type: 'Kitchen Design',
    description: 'Sleek minimalist design with premium appliances',
    image: project1Image,
    category: 'kitchen'
  },
  {
    id: 2,
    title: 'Contemporary Living Space',
    type: 'Living Room',
    description: 'Open concept design with natural lighting',
    image: project2Image,
    category: 'living-room'
  },
  {
    id: 3,
    title: 'Elegant Master Bedroom',
    type: 'Bedroom Design',
    description: 'Serene retreat with custom storage solutions',
    image: project3Image,
    category: 'bedroom'
  },
  {
    id: 4,
    title: 'Sophisticated Dining Area',
    type: 'Dining Room',
    description: 'Perfect for entertaining with statement lighting',
    image: project4Image,
    category: 'dining-room'
  },
  {
    id: 5,
    title: 'Modern Luxury Kitchen',
    type: 'Kitchen Design',
    description: 'Sleek minimalist design with premium appliances',
    image: project1Image,
    category: 'kitchen'
  },
  {
    id: 6,
    title: 'Contemporary Living Space',
    type: 'Living Room',
    description: 'Open concept design with natural lighting',
    image: project2Image,
    category: 'living-room'
  }
];

const FeaturedProjectsA = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font2">
            Our Signature Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how we've transformed spaces into stunning, functional environments
          </p>
        </div>

        {/* Masonry Grid - Image Focused */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative group cursor-pointer ${
                index % 3 === 0 ? 'sm:row-span-2' : '' // Tall cards for visual interest
              }`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link to={`/projects/${project.id}`}>
                {/* Large Image Container */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-w-16 aspect-h-12 sm:aspect-h-16">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Hover Overlay - Reveals Details */}
                  <div className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-all duration-300 ${
                    hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-center text-white p-6">
                      <span className="text-sm font-medium text-yellow-400 uppercase tracking-wide">
                        {project.type}
                      </span>
                      <h3 className="text-2xl font-bold mt-2 mb-3">{project.title}</h3>
                      <p className="text-gray-200 mb-4">{project.description}</p>
                      <span className="inline-flex items-center text-yellow-400 font-medium">
                        View Project
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  {/* Always Visible - Minimal Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-sm font-medium text-yellow-400 uppercase tracking-wide">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font2 text-lg"
          >
            View All Projects
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsA;