// components/NavigationBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';
import logoImage from '../assets/logo/Logo.png';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle search activation
  const handleSearchClick = () => {
    setIsSearchActive(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  };

  // Handle search deactivation
  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  // Handle click outside for both menu and search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isMenuOpen) setIsMenuOpen(false);
      }
      if (isSearchActive && !event.target.closest('.search-container')) {
        handleSearchClose();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, isSearchActive]);

  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed z-10 w-full shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Desktop Layout - Stays the same */}
          <div className="hidden sm:flex items-center justify-between w-full">
            {/* Desktop Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center group">
                <img 
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105" 
                  src={logoImage} 
                  alt="Interior Decorators Inc." 
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="flex items-baseline space-x-8">
              <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/service" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                About us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/blog" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group">
                Contact us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 hover:border-gray-300"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Self-contained, no prop drilling! */}
          <div className="sm:hidden flex items-center justify-between w-full">
            
            {/* Logo - Smart overlay behavior */}
            <div className={`flex items-center transition-all duration-300 ${isSearchActive ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
              <Link to="/" className="flex items-center">
                <img 
                  className="h-10 w-auto" 
                  src={logoImage} 
                  alt="Interior Decorators Inc." 
                />
              </Link>
            </div>

            {/* Search Container - The magic happens here! */}
            <div className="search-container flex items-center justify-end flex-1 mx-4">
              
              {/* Search Icon (visible when not searching) */}
              <div className={`transition-all duration-300 ${isSearchActive ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                <button
                  onClick={handleSearchClick}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-300"
                  aria-label="Open search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Search Input (appears when searching) */}
              <div className={`absolute left-4 right-16 transition-all duration-300 ${isSearchActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white/90 backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Close Search Button (visible when searching) */}
              <div className={`transition-all duration-300 ${isSearchActive ? 'opacity-100 w-auto z-10' : 'opacity-0 w-0'}`}>
                <button
                  onClick={handleSearchClose}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-300 ml-2"
                  aria-label="Close search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Button - Fixed click handling! */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling!
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-2 text-gray-600 hover:text-gray-800 z-10 hover:bg-gray-100 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - OVERLAYS the page content, doesn't push it! */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-20 pointer-events-none">
          <div 
            className="absolute top-20 left-0 right-0 pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          >
            <div 
              ref={dropdownRef} 
              className="bg-white/90 backdrop-blur-md mx-4 rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 ease-out"
              style={{
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              <div className="px-4 py-3 space-y-1">
                <Link to="/" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">
                  Home
                </Link>
                <Link to="/service" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">
                  Services
                </Link>
                <Link to="/about" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">
                  About us
                </Link>
                <Link to="/blog" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">
                  Blog
                </Link>
                <Link to="/contact" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;