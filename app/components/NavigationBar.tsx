// components/NavigationBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import logoImage from '../assets/logo/Logo.png';
import SearchResults from '~/components/SearchResults';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false); // ← tiny flag
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Desktop: activate on focus
  const handleSearchClick = () => {
    setIsSearchActive(true);
    setTimeout(() => searchInputRef.current?.focus(), 300);
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setIsThinking(false);
  };

  // 4-second debounce + console + error log
 useEffect(() => {
   console.log('[Navbar] effect check – isActive:', isSearchActive, '| query:', searchQuery, '| length:', searchQuery?.length);
  if (!isSearchActive || !searchQuery || searchQuery.length < 3) return;

  console.log('[Navbar] 4-second debounce started for:', searchQuery);
  setIsThinking(true);

  const timer = setTimeout(async () => {
    console.log('[Navbar] 4s elapsed – starting fetch');
    try {
      const res = await fetch(`${window.location.origin}/api/ai-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: searchQuery,
          context: 'interior design',
          company: "Whitefire's company in Anambra"
        })
      });

      console.log('[Navbar] fetch response status:', res.status);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log('[Navbar] fetch success:', data);
    } catch (err) {
      console.error('[Navbar] fetch failed:', err);
    } finally {
      setIsThinking(false);
    }
  }, 1000);

  return () => {
    clearTimeout(timer);
    console.log('[Navbar] debounce cancelled');
  };
}, [searchQuery, isSearchActive]);

  // click-outside close
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
          
          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <Link to="/" className="flex items-center group">
              <img className="h-12 w-auto transition-all duration-300 group-hover:scale-105" src={logoImage} alt="Interior Decorators Inc." />
            </Link>

            <div className="flex items-baseline space-x-8">
              <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/service" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">Services</Link>
              <Link to="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">About us</Link>
              <Link to="/blog" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">Blog</Link>
              <Link to="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">Contact us</Link>
            </div>

            {/* Desktop Search - FIXED */}
           {/* Desktop Search - FIXED + bubble-stop */}
        <div className="relative search-container" onClick={(e) => e.stopPropagation()}>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              console.log("✏️ Search query:", e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Ask Whitefire about interior design..."
            className="w-[20rem] pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 hover:border-gray-300"
            onFocus={() => setIsSearchActive(true)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                e.preventDefault();
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
          />

          {isSearchActive && searchQuery.length > 2 && (
           <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          <div className="flex items-center space-x-3">
            <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full"></div>
            <span className="text-sm text-gray-700 font-medium">Whitefire’s AI is thinking…</span>
          </div>
        </div>
          )}

          <SearchResults 
            query={searchQuery} 
            isVisible={isSearchActive && searchQuery.length > 2}
            onClose={() => {
              console.log("✅ SearchResults closed");
              handleSearchClose();
            }}
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
          </div>

          {/* Mobile Layout */}
        <div className="sm:hidden flex items-center justify-between w-full">
  <div className={`flex items-center transition-all duration-300 ${isSearchActive ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
    <Link to="/" className="flex items-center">
      <img className="h-10 w-auto" src={logoImage} alt="Interior Decorators Inc." />
    </Link>
  </div>

  {/* Mobile Search - bubble-stop wrapper */}
  <div className="search-container flex items-center justify-end flex-1 mx-4" onClick={(e) => e.stopPropagation()}>
    {/* Icon that disappears when search opens */}
    <div className={`transition-all duration-300 ${isSearchActive ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
      <button onClick={handleSearchClick} onFocus={handleSearchClick} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-300" aria-label="Open search">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>

    {/* Search input that slides in */}
    <div className={`absolute left-4 right-16 transition-all duration-300 ${isSearchActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
      <div className="relative">
          <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => {
          console.log("✏️ Search query:", e.target.value);
          setSearchQuery(e.target.value);
        }}
        placeholder="Ask Whitefire about design..."
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white/90 backdrop-blur-sm"
        onFocus={() => setIsSearchActive(true)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && searchQuery.trim()) {
            e.preventDefault();
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          }
        }}
      />

      {/* Mobile “Thinking…” loader – same style as desktop */}
      {isSearchActive && searchQuery.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          <div className="flex items-center space-x-3">
            <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full"></div>
            <span className="text-sm text-gray-700 font-medium">Whitefire’s AI is thinking…</span>
          </div>
        </div>
      )}

      <SearchResults 
        query={searchQuery} 
        isVisible={isSearchActive && searchQuery.length > 2}
        onClose={() => {
          console.log("✅ SearchResults closed");
          handleSearchClose();
        }}
      />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Close button – ALWAYS visible when search is active */}
    {isSearchActive && (
      <button onClick={handleSearchClose} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-300 ml-2 z-20" aria-label="Close search">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>

  <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="p-2 text-gray-600 hover:text-gray-800 z-10 hover:bg-gray-100 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-label="Toggle menu">
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
          <div className="absolute top-20 left-0 right-0 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            <div ref={dropdownRef} className="bg-white/90 backdrop-blur-md mx-4 rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 ease-out" style={{ transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)', opacity: isMenuOpen ? 1 : 0 }}>
              <div className="px-4 py-3 space-y-1">
                <Link to="/" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">Home</Link>
                <Link to="/service" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">Services</Link>
                <Link to="/about" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">About us</Link>
                <Link to="/blog" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">Blog</Link>
                <Link to="/contact" className="block px-4 py-3 text-gray-800 hover:bg-white/50 hover:text-gray-900 rounded-xl transition-all duration-300 text-base font-medium">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;