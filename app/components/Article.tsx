// app/components/Article.tsx
import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

/* ---------- 1.  hosted images ---------- */
const fallbackArticles = [
  {
    id: '1',
    title: 'Modern Kitchen Design Trends 2024',
    excerpt: 'Discover the latest innovations in kitchen design, from smart appliances to sustainable materials that are transforming culinary spaces.',
    category: 'Kitchen Design',
    author: 'Sarah Mitchell',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/Modern_kitchen.jpg',
    featured: true,
    tags: ['Kitchen', 'Modern', 'Trends'],
    slug: '/blog/modern-kitchen-trends-2024'
  },
  {
    id: '2',
    title: 'Creating Serene Bedroom Retreats 2025',
    excerpt: 'Learn how to transform your bedroom into a peaceful sanctuary with the right color palettes, lighting, and storage solutions.',
    category: 'Bedroom Design',
    author: 'James Chen',
    date: '2024-01-12',
    readTime: '4 min read',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/blog-4.jpeg',
    featured: false,
    tags: ['Bedroom', 'Serene', 'Lighting'],
    slug: '/blog/serene-bedroom-retreats'
  },
  {
    id: '3',
    title: 'Sustainable Living Room Makeovers 2022',
    excerpt: 'Eco-friendly design solutions that don\'t compromise on style. Discover sustainable materials and energy-efficient lighting options.',
    category: 'Living Room',
    author: 'Emma Thompson',
    date: '2024-01-10',
    readTime: '6 min read',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/blog-5.jpeg',
    featured: false,
    tags: ['Sustainable', 'Eco-friendly', 'Living Room'],
    slug: '/blog/sustainable-living-room-makeovers'
  },
  {
    id: '4',
    title: 'Luxury Bathroom Design Essentials 2021',
    excerpt: 'Transform your bathroom into a spa-like retreat with premium fixtures, smart storage, and luxurious materials that create wow factor.',
    category: 'Bathroom Design',
    author: 'Michael Rodri',
    date: '2024-01-08',
    readTime: '7 min read',
    image: 'https://lordwhitefire.github.io/interior-deco-assets/images/Perfect.jpg',
    featured: true,
    tags: ['Bathroom', 'Luxury', 'Spa'],
    slug: '/blog/luxury-bathroom-essentials'
  }
];

/* ---------- 2.  types ---------- */
type Article = typeof fallbackArticles[0];
type ArticleProps = { data?: Article[] };

export default function Article({ data }: ArticleProps) {
  const articles = data && data.length ? data : fallbackArticles;

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* preload images */
  useEffect(() => {
    articles.forEach((a) => {
      const img = new Image();
      img.src = a.image;
    });
  }, [articles]);

  /* autoplay */
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % articles.length), 5000);
    return () => clearInterval(t);
  }, [isPaused, articles.length]);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  /* ---------- 3.  SMALL card → details on hover ---------- */
  const Card = ({ a }: { a: Article }) => (
    <article
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={a.image}
          alt={a.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* category + featured badge */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="bg-gray-900 text-white text-xs px-2.5 py-1 rounded-full font-medium">{a.category}</span>
          {a.featured && (
            <span className="bg-yellow-500 text-gray-900 text-xs px-2.5 py-1 rounded-full font-medium">Featured</span>
          )}
        </div>
      </div>

      {/* visible base – title + author / read-time */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">{a.title}</h3>

        <div className="flex items-center gap-3 text-lg text-gray-500 mt-2 sm:mb-6">
          <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{a.author}</span></div>
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{a.readTime}</span></div>
        </div>

        {/* HOVER overlay – shows excerpt, date, tags, CTA */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white text-center max-w-full">
            <div className="flex items-center justify-center gap-3 text-xs mb-2">
              <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span>{formatDate(a.date)}</span></div>
            </div>
            <p className="text-gray-200 mb-3 text-sm leading-snug">{a.excerpt}</p>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {a.tags.map((t) => (
                <span key={t} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded">{t}</span>
              ))}
            </div>
            <Link to={a.slug} className="contents">
              <span className="inline-flex items-center gap-1 text-amber-400 font-medium text-sm">
                Read More <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );

  /* ---------- 4.  RENDER – desktop 3 / 4  |  mobile 1 / 4 ---------- */
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font2">Latest Design Insights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stay updated with trends, tips & inspiration from our experts</p>
        </div>

        {/* desktop – seamless loop */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl sm:rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${(current * 100) / 3}%)` }}
                onTransitionEnd={() => {
                  if (current >= articles.length) setCurrent(current - articles.length);
                }}
              >
                {[...articles, ...articles.slice(0, 3)].map((a, idx) => (
                  <div key={idx} className="w-1/3 flex-shrink-0 px-2">
                    <Card a={a} />
                  </div>
                ))}
              </div>
            </div>

            {/* arrows */}
            <button
              onClick={() => setCurrent((c) => (c - 1 + articles.length) % articles.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 mr-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              aria-label="Previous"
            >
              <ArrowRight className="w-6 h-6 text-gray-600 rotate-180" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % articles.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 ml-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              aria-label="Next"
            >
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gray-800 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to article ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* mobile / tablet – 1 card in view, swipe or dots */}
        <div className="lg:hidden">
          <div className="relative max-w-sm mx-auto md:max-w-2xl md:grid-cols-2 md:grid md:gap-4">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {articles.map((a) => (
                  <div key={a.id} className="w-full flex-shrink-0 px-2">
                    <Card a={a} />
                  </div>
                ))}
              </div>
            </div>

            {/* dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {articles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gray-800 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to article ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/blog" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg font2 text-lg">
            View All Articles
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}