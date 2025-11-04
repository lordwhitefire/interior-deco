// app/routes/projects.$projectid.tsx
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState, useEffect,useRef } from "react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Create Sanity client inline
const sanityClient = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});

// Create image URL builder inline
const builder = imageUrlBuilder(sanityClient);
const urlForImage = (source: any) => builder.image(source);

export const meta: MetaFunction = ({ data }) => {
  if (!data?.project) {
    return [
      { title: "Project Not Found" },
      { name: "description", content: "The requested project could not be found." },
    ];
  }

  const { project } = data;
  return [
    { title: `${project.title} - Interior Design Project` },
    { name: "description", content: project.metaDescription || project.challenge },
    { property: "og:title", content: project.metaTitle || project.title },
    { property: "og:description", content: project.metaDescription || project.challenge },
    { property: "og:image", content: urlForImage(project.heroImage).width(1200).height(630).url() },
    { property: "og:type", content: "website" },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { projectid } = params;

  if (!projectid) {
    throw new Response("Project ID is required", { status: 400 });
  }

  // Fetch single project with all related data
  const project = await sanityClient.fetch(groq`
    *[_type == "projectPage" && slug.current == $projectid][0] {
      _id,
      title,
      slug,
      location,
      category,
      style,
      budget,
      squareFootage,
      timeline,
      completionDate,
      featured,
      challenge,
      solution,
      process,
      materials,
      colorPalette,
      furniture,
      tags,
      metaTitle,
      metaDescription,
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
      "gallery": gallery[]{
        "asset": asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        caption,
        category,
        isFeatured
      },
      "relatedProjects": relatedProjects[]->{
        _id,
        title,
        slug,
        location,
        category,
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
      },
      "testimonial": testimonial->{
        clientName,
        clientLocation,
        rating,
        review,
        clientImage
      }
    }
  `, { projectid });

  // Handle 404 if project not found
  if (!project) {
    throw new Response("Project not found", { status: 404 });
  }

  // Fetch more related projects if needed (fallback)
  if (!project.relatedProjects || project.relatedProjects.length < 3) {
    const additionalProjects = await sanityClient.fetch(groq`
      *[_type == "projectPage" && slug.current != $projectid && (category == $category || style[0] in $style)] | order(completionDate desc) [0..${3 - (project.relatedProjects?.length || 0)}] {
        _id,
        title,
        slug,
        location,
        category,
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
    `, { 
      projectid, 
      category: project.category,
      style: project.style || []
    });

    project.relatedProjects = [...(project.relatedProjects || []), ...additionalProjects];
  }

  return json({ project });
}

// Before/After Slider Component
function BeforeAfterSlider({
  beforeImage,
  afterImage,
  caption,
}: {
  beforeImage: any;
  afterImage: any;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* ----------  shared move handler  ---------- */
  const handleMove = (clientX: number) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPos(pct);
  };

  /* ----------  mouse  ---------- */
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  /* ----------  touch  ---------- */
  const onTouchStart = (e: React.TouchEvent) => {
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  if (!beforeImage || !afterImage) return null;

  return (
    <div
      ref={rootRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 select-none cursor-ew-resize"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After (full) */}
      <img
        src={urlForImage(afterImage).width(1200).height(750).quality(90).url()}
        alt="After renovation"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={urlForImage(beforeImage).width(1200).height(750).quality(90).url()}
          alt="Before renovation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
          <svg
            className="w-6 h-6 text-stone-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {caption && (
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
          <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-full inline-block">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { project } = useLoaderData<typeof loader>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Separate gallery images by category
  const beforeAfterImages = project.gallery?.filter((img: any) => img.category === 'before' || img.category === 'after') || [];
  const beforeImage = beforeAfterImages.find((img: any) => img.category === 'before')?.asset;
  const afterImage = beforeAfterImages.find((img: any) => img.category === 'after')?.asset;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const totalImages = project.gallery?.length || 0;
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Format budget display
  const formatBudget = (budget: string) => {
    return budget.replace('-', ' - ').replace('k', 'K').replace('under', 'Under ').replace('over', 'Over ');
  };

  // Get year from completion date
  const completionYear = project.completionDate 
    ? new Date(project.completionDate).getFullYear() 
    : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] z-0">
        <div className="absolute inset-0">
          <img
            src={urlForImage(project.heroImage).width(1920).height(1080).quality(90).url()}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 text-white/90 mb-4">
                <span className="capitalize">{project.category.replace('-', ' ')}</span>
                <span>•</span>
                <span>{project.location}</span>
                <span>•</span>
                <span>{completionYear}</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl">
                {project.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats Bar */}
      <section className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.squareFootage && (
              <div>
                <p className="text-sm text-stone-500 mb-1">Square Footage</p>
                <p className="text-lg font-semibold text-stone-900">
                  {project.squareFootage.toLocaleString()} sq ft
                </p>
              </div>
            )}
            
            {project.budget && (
              <div>
                <p className="text-sm text-stone-500 mb-1">Budget Range</p>
                <p className="text-lg font-semibold text-stone-900">
                  {formatBudget(project.budget)}
                </p>
              </div>
            )}
            
            {project.timeline && (
              <div>
                <p className="text-sm text-stone-500 mb-1">Timeline</p>
                <p className="text-lg font-semibold text-stone-900">
                  {project.timeline}
                </p>
              </div>
            )}
            
            <div>
              <p className="text-sm text-stone-500 mb-1">Completion</p>
              <p className="text-lg font-semibold text-stone-900">
                {completionYear}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Challenge & Solution Section */}
        <section className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="font-serif text-3xl text-stone-900 mb-6">The Challenge</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>
          
          <div>
            <h2 className="font-serif text-3xl text-stone-900 mb-6">Our Solution</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Before/After Gallery */}
        {beforeImage && afterImage && (
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-stone-900 mb-8 text-center">Transformation</h2>
            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider
                beforeImage={beforeImage}
                afterImage={afterImage}
                caption="Drag the slider to see the transformation"
              />
            </div>
          </section>
        )}

        {/* Process Section */}
        {project.process && (
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-stone-900 mb-6">The Process</h2>
            <p className="text-lg text-stone-600 leading-relaxed max-w-4xl">
              {project.process}
            </p>
          </section>
        )}

        {/* Technical Details */}
        {(project.materials || project.colorPalette || project.furniture) && (
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-stone-900 mb-8">Design Details</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Materials */}
              {project.materials && project.materials.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Materials</h3>
                  <ul className="space-y-2">
                    {project.materials.map((material: string, index: number) => (
                      <li key={index} className="text-stone-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-stone-400 rounded-full"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Color Palette */}
              {project.colorPalette && project.colorPalette.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Color Palette</h3>
                  <div className="flex gap-4 flex-wrap">
                    {project.colorPalette.map((color: string, index: number) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-16 h-16 rounded-full border-2 border-white shadow-lg mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-stone-500">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Furniture */}
              {project.furniture && project.furniture.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Key Pieces</h3>
                  <ul className="space-y-2">
                    {project.furniture.map((piece: string, index: number) => (
                      <li key={index} className="text-stone-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-stone-400 rounded-full"></span>
                        {piece}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-stone-900 mb-8">Project Gallery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image: any, index: number) => (
                <div 
                  key={image.asset._id} 
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={urlForImage(image.asset).width(600).height(450).quality(90).url()}
                      alt={image.caption || `${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                      <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Image category badge */}
                  {image.category && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-stone-700 capitalize">
                        {image.category}
                      </span>
                    </div>
                  )}

                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Testimonial */}
        {project.testimonial && (
          <section className="mb-20">
            <div className="bg-stone-100 rounded-2xl p-8 md:p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  {[...Array(project.testimonial.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-2xl text-stone-700 mb-6 italic">
                  "{project.testimonial.review}"
                </blockquote>
                
                <cite className="text-stone-600">
                  <span className="font-semibold not-italic">{project.testimonial.clientName}</span>
                  {project.testimonial.clientLocation && (
                    <span className="ml-2">• {project.testimonial.clientLocation}</span>
                  )}
                </cite>
              </div>
            </div>
          </section>
        )}

        {/* Project Details Sidebar */}
        <section className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {project.process && (
              <div>
                <h2 className="font-serif text-3xl text-stone-900 mb-6">Our Process</h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  {project.process}
                </p>
              </div>
            )}

            {project.materials && project.materials.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl text-stone-900 mb-4">Materials & Finishes</h3>
                <div className="flex flex-wrap gap-3">
                  {project.materials.map((material: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.furniture && project.furniture.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl text-stone-900 mb-4">Key Furniture Pieces</h3>
                <ul className="space-y-2">
                  {project.furniture.map((piece: string, index: number) => (
                    <li key={index} className="flex items-center text-stone-600">
                      <svg className="w-4 h-4 text-stone-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {piece}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl text-stone-900 mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Category</p>
                  <p className="font-medium text-stone-900 capitalize">
                    {project.category.replace('-', ' ')}
                  </p>
                </div>
                
                {project.style && project.style.length > 0 && (
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Style</p>
                    <div className="flex flex-wrap gap-2">
                      {project.style.map((style: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm capitalize"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-stone-500 mb-1">Location</p>
                  <p className="font-medium text-stone-900">{project.location}</p>
                </div>
                
                {project.timeline && (
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Timeline</p>
                    <p className="font-medium text-stone-900">{project.timeline}</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-stone-900 text-white rounded-xl p-6">
              <h3 className="font-serif text-xl mb-3">Ready to Start?</h3>
              <p className="text-stone-300 text-sm mb-4">
                Let's discuss how we can bring your vision to life.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors w-full justify-center"
              >
                Get In Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-stone-900 mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.relatedProjects.map((relatedProject: any) => (
                <Link
                  key={relatedProject._id}
                  to={`/projects/${relatedProject.slug.current}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={urlForImage(relatedProject.heroImage).width(600).height(450).quality(90).url()}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-stone-500 mt-1">
                        {relatedProject.location} • {relatedProject.category.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && project.gallery && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-stone-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main image */}
            <div className="relative">
              <img
                src={urlForImage(project.gallery[currentImageIndex].asset).width(1600).height(900).quality(90).url()}
                alt={project.gallery[currentImageIndex].caption || `Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Image counter and caption */}
            <div className="text-center mt-4 text-white">
              <p className="text-sm mb-2">
                {currentImageIndex + 1} / {project.gallery.length}
              </p>
              {project.gallery[currentImageIndex].caption && (
                <p className="text-lg">
                  {project.gallery[currentImageIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}