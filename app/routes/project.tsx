// app/routes/project.tsx
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Create Sanity client inline
const sanityClient = createClient({
  projectId: "pzhistba", // Replace with your Sanity project ID
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});

// Create image URL builder inline
const builder = imageUrlBuilder(sanityClient);
const urlForImage = (source: any) => builder.image(source);

export const meta: MetaFunction = () => {
  return [
    { title: "Our Projects - Interior Design Portfolio" },
    { name: "description", content: "Explore our portfolio of luxury interior design projects. From modern living spaces to traditional kitchens, see how we transform homes and commercial spaces." },
    { property: "og:title", content: "Our Projects - Interior Design Portfolio" },
    { property: "og:description", content: "Explore our portfolio of luxury interior design projects across residential and commercial spaces." },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export async function loader() {
  // Fetch all projects with essential data
  const projects = await sanityClient.fetch(groq`
    *[_type == "projectPage"] | order(featured desc, completionDate desc) {
      _id,
      title,
      slug,
      location,
      category,
      style,
      budget,
      squareFootage,
      completionDate,
      featured,
      "heroImage": heroImage.asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      "thumbnail": thumbnail.asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      challenge,
      tags
    }
  `);

  // Fetch categories for filter system
  const categories = await sanityClient.fetch(groq`
    *[_type == "projectPage"].category
  `);

  // Get unique categories
  const uniqueCategories = [...new Set(categories)];

  // Fetch featured projects for hero section
  const featuredProjects = await sanityClient.fetch(groq`
    *[_type == "projectPage" && featured == true] | order(completionDate desc) [0..2] {
      _id,
      title,
      slug,
      location,
      "heroImage": heroImage.asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      challenge
    }
  `);

  return json({ 
    projects, 
    categories: uniqueCategories,
    featuredProjects 
  });
}

export default function Projects() {
  const { projects, categories, featuredProjects } = useLoaderData<typeof loader>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // ------------------  PAGINATION STATE  ------------------
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Filter projects based on selected filters
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory !== "all" && project.category !== selectedCategory) return false;
    if (selectedStyle !== "all" && !project.style?.includes(selectedStyle)) return false;
    if (selectedBudget !== "all" && project.budget !== selectedBudget) return false;
    return true;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === "date") return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
    if (sortBy === "budget") {
      const budgetOrder = { 'under-50k': 1, '50k-100k': 2, 'over-100k': 3 };
      return budgetOrder[b.budget || 'under-50k'] - budgetOrder[a.budget || 'under-50k'];
    }
    return 0;
  });

  // ------------------  PAGINATION LOGIC  ------------------
  const totalPages = Math.ceil(sortedProjects.length / PAGE_SIZE);
  const paginatedProjects = sortedProjects.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-stone-50">
     
      {/* Hero Section with Featured Projects */}
      <section className="relative bg-gradient-to-b from-stone-100 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mt-8 mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">
              Our Design Portfolio
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Explore our collection of luxury interior design projects, from modern living spaces to timeless traditional homes.
            </p>
          </div>

          {/* Featured Projects Carousel */}
          {featuredProjects.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <div key={project._id} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={urlForImage(project.heroImage).width(800).height(600).quality(90).url()}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filter System */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>

              {/* Style Filter */}
              <select
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <option value="all">All Styles</option>
                <option value="modern">Modern</option>
                <option value="traditional">Traditional</option>
                <option value="scandinavian">Scandinavian</option>
                <option value="industrial">Industrial</option>
                <option value="transitional">Transitional</option>
                <option value="minimalist">Minimalist</option>
              </select>

              {/* Budget Filter */}
              <select
                value={selectedBudget}
                onChange={(e) => {
                  setSelectedBudget(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <option value="all">All Budgets</option>
                <option value="under-50k">Under $50K</option>
                <option value="50k-100k">$50K - $100K</option>
                <option value="over-100k">Over $100K</option>
              </select>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value="featured">Featured First</option>
              <option value="date">Most Recent</option>
              <option value="budget">Budget Range</option>
            </select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map((project) => (
              <article key={project._id} className="group relative">
                <Link to={`/projects/${project.slug.current}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Image Container */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={urlForImage(project.thumbnail || project.heroImage)
                          .width(600)
                          .height(450)
                          .quality(90)
                          .url()}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-medium text-stone-700">Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-stone-500 mb-2">
                        <span className="capitalize">{project.category.replace('-', ' ')}</span>
                        <span>•</span>
                        <span>{project.location}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-stone-900 mb-3 group-hover:text-stone-700 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                        {project.challenge}
                      </p>

                      {/* Project Stats */}
                      <div className="flex items-center justify-between text-sm text-stone-500">
                        <div className="flex items-center gap-4">
                          {project.squareFootage && (
                            <span>{project.squareFootage.toLocaleString()} sq ft</span>
                          )}
                          {project.budget && (
                            <span className="capitalize">
                              {project.budget.replace('-', ' - ').replace('k', 'K')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-stone-400 group-hover:text-stone-600 transition-colors">
                          <span>View Project</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-12 text-center text-stone-500">
            <p>
              Showing {paginatedProjects.length} of {sortedProjects.length} projects
            </p>
          </div>
        </div>
      </section>

      {/* ------------------  PAGINATION FOOTER  ------------------ */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-4 py-2 rounded-lg border ${
                  n === page
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}