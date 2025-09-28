// components/Article.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';


import blog1 from '../assets/images/Blog-1.jpeg';
import blog2 from '../assets/images/blog-2.jpeg';
import blog3 from '../assets/images/blog-3.jpeg';
import blog4 from '../assets/images/blog-4.jpeg';


// Static blog articles with specific categories
const articles = [
  {
    id: 1,
    title: 'Modern Kitchen Design Trends 2024',
    excerpt: 'Discover the latest innovations in kitchen design, from smart appliances to sustainable materials that are transforming culinary spaces.',
    category: 'Kitchen Design',
    author: 'Sarah Mitchell',
    date: '2024-01-15',
    readTime: '5 min read',
    image: blog1,
    featured: true,
    tags: ['Kitchen', 'Modern', 'Trends']
  },
  {
    id: 2,
    title: 'Creating Serene Bedroom Retreats',
    excerpt: 'Learn how to transform your bedroom into a peaceful sanctuary with the right color palettes, lighting, and storage solutions.',
    category: 'Bedroom Design',
    author: 'James Chen',
    date: '2024-01-12',
    readTime: '4 min read',
    image: blog2,
    featured: false,
    tags: ['Bedroom', 'Serene', 'Lighting']
  },
  {
    id: 3,
    title: 'Sustainable Living Room Makeovers',
    excerpt: 'Eco-friendly design solutions that don\'t compromise on style. Discover sustainable materials and energy-efficient lighting options.',
    category: 'Living Room',
    author: 'Emma Thompson',
    date: '2024-01-10',
    readTime: '6 min read',
    image: blog3,
    featured: false,
    tags: ['Sustainable', 'Eco-friendly', 'Living Room']
  },
  {
    id: 4,
    title: 'Luxury Bathroom Design Essentials',
    excerpt: 'Transform your bathroom into a spa-like retreat with premium fixtures, smart storage, and luxurious materials that create wow factor.',
    category: 'Bathroom Design',
    author: 'Michael Rodriguez',
    date: '2024-01-08',
    readTime: '7 min read',
    image: blog4,
    featured: true,
    tags: ['Bathroom', 'Luxury', 'Spa']
  }
];

const Article = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font2">
            Latest Design Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and inspiration from our design experts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All Articles', 'Kitchen Design', 'Bedroom Design', 'Living Room', 'Bathroom Design'].map((category) => (
            <button
              key={category}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden">
            
            {/* Articles Track */}
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {articles.map((article, index) => (
                <div key={article.id} className="w-full flex-shrink-0 px-4">
                  
                  {/* Article Card */}
                  <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <Link to={`/blog/${article.id}`}>
                      
                      {/* Image Container with Hover Effect */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                            {article.category}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {article.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-yellow-500 text-gray-900 text-xs px-3 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          </div>
                        )}
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{formatDate(article.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                          {article.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Read More CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-medium group-hover:text-gray-700 transition-colors">
                            Read More
                          </span>
                          <ArrowRight className="w-5 h-5 text-gray-900 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentSlide 
                      ? 'bg-gray-800 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                    }
                  `}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next article"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font2 text-lg"
          >
            View All Articles
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Article;