// app/routes/_index.tsx
// Home page implemented from Whitefire_Home_UI_Implementation_Package.md (§7),
// with /mock/* image paths replaced by real repo assets.
import React, { useState } from "react";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  ArrowRight,
  Armchair,
  Award,
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Hammer,
  LayoutGrid,
  PanelsTopLeft,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";

import { SiteHeader } from "~/components/whitefire/SiteHeader";
import { SiteFooter } from "~/components/whitefire/SiteFooter";
import { SectionHeading } from "~/components/whitefire/SectionHeading";

import heroImage from "~/assets/images/living_design.jpg";
import studioImage from "~/assets/images/Concept.jpg";
import projectVillaImage from "~/assets/images/project1.jpg";
import projectApartmentImage from "~/assets/images/project3.jpeg";
import projectJordaanImage from "~/assets/images/project4.jpeg";
import projectOfficeImage from "~/assets/images/project7.jpeg";
import projectResidenceImage from "~/assets/images/progect5.jpg";
import articleTrendsImage from "~/assets/images/blog-2.jpeg";
import articleSmallSpaceImage from "~/assets/images/blog-3.jpeg";
import articleMaterialsImage from "~/assets/images/blog-6.jpg";
import newsletterImage from "~/assets/images/Perfect.jpg";

const sanityClient = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

interface ImageAsset {
  src: string;
  alt: string;
}

interface CTAData {
  label: string;
  href: string;
}

interface HeroData {
  eyebrow: string;
  title: string[];
  description: string;
  primaryCta: CTAData;
  showreel: CTAData;
  image: ImageAsset;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  location: string;
}

interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
}

interface ProjectCardData {
  id: string;
  title: string;
  location: string;
  image: ImageAsset;
  href: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface ArticleCardData {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: ImageAsset;
  href: string;
}

const mockHero: HeroData = {
  eyebrow: "LUXURY INTERIOR DESIGN STUDIO",
  title: ["Designing Spaces.", "Elevating Lives."],
  description:
    "We create timeless, functional and beautiful spaces that reflect who you are.",
  primaryCta: {
    label: "VIEW OUR PROJECTS",
    href: "/projects",
  },
  showreel: {
    label: "PLAY SHOWREEL",
    href: "#showreel",
  },
  image: {
    src: heroImage,
    alt: "Luxury contemporary living room interior",
  },
};

const mockServices: ServiceItem[] = [
  {
    id: "interior-design",
    title: "Interior Design",
    description:
      "Bespoke interior design solutions tailored to your lifestyle.",
    href: "/services/interior-design",
    icon: "PanelsTopLeft",
  },
  {
    id: "space-planning",
    title: "Space Planning",
    description:
      "Smart layouts that maximize flow, comfort and functionality.",
    href: "/services/space-planning",
    icon: "LayoutGrid",
  },
  {
    id: "custom-furniture",
    title: "Custom Furniture",
    description:
      "Bespoke furniture and joinery crafted with exceptional detail.",
    href: "/services/custom-furniture",
    icon: "Armchair",
  },
  {
    id: "renovation",
    title: "Renovation",
    description:
      "Transforming existing spaces with creativity and precision.",
    href: "/services/renovation",
    icon: "Hammer",
  },
  {
    id: "styling-decor",
    title: "Styling & Decor",
    description:
      "Curated décor and styling to bring personality to your space.",
    href: "/services/styling-decor",
    icon: "Sparkles",
  },
];

const mockProjects: ProjectCardData[] = [
  {
    id: "modern-luxury-villa",
    title: "Modern Luxury Villa",
    location: "Bangalore, India",
    image: {
      src: projectVillaImage,
      alt: "Modern luxury villa interior",
    },
    href: "/projects/modern-luxury-villa",
  },
  {
    id: "urban-apartment",
    title: "The Urban Apartment",
    location: "Mumbai, India",
    image: {
      src: projectApartmentImage,
      alt: "Urban apartment interior",
    },
    href: "/projects/the-urban-apartment",
  },
  {
    id: "jordaan-flower-shop",
    title: "Jordaan Flower Shop",
    location: "Amsterdam, Netherlands",
    image: {
      src: projectJordaanImage,
      alt: "Jordaan flower shop interior",
    },
    href: "/projects/jordaan-flower-shop",
  },
  {
    id: "contemporary-office",
    title: "Contemporary Office",
    location: "Gurugram, India",
    image: {
      src: projectOfficeImage,
      alt: "Contemporary office interior",
    },
    href: "/projects/contemporary-office",
  },
  {
    id: "minimalist-residence",
    title: "Minimalist Residence",
    location: "Pune, India",
    image: {
      src: projectResidenceImage,
      alt: "Minimalist residence interior",
    },
    href: "/projects/minimalist-residence",
  },
];

const mockStats: StatItem[] = [
  {
    value: "350+",
    label: "Projects Completed",
    icon: "Building2",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: "BadgeCheck",
  },
  {
    value: "12+",
    label: "Years of Experience",
    icon: "Award",
  },
  {
    value: "20+",
    label: "Design Awards",
    icon: "Trophy",
  },
];

const mockArticles: ArticleCardData[] = [
  {
    id: "interior-design-trends",
    category: "DESIGN TRENDS",
    title: "Top 7 Interior Design Trends to Watch in 2024",
    date: "May 10, 2024",
    readTime: "5 min read",
    image: {
      src: articleTrendsImage,
      alt: "Contemporary interior design details",
    },
    href: "/blog/interior-design-trends",
  },
  {
    id: "small-space",
    category: "TIPS & GUIDE",
    title: "How to Make a Small Space Feel Bigger",
    date: "May 5, 2024",
    readTime: "4 min read",
    image: {
      src: articleSmallSpaceImage,
      alt: "Bright small living space",
    },
    href: "/blog/small-space",
  },
  {
    id: "sustainable-materials",
    category: "MATERIALS",
    title: "Sustainable Materials for Modern Interiors",
    date: "Apr 28, 2024",
    readTime: "6 min read",
    image: {
      src: articleMaterialsImage,
      alt: "Natural sustainable interior materials",
    },
    href: "/blog/sustainable-materials",
  },
];

const mockTestimonial: Testimonial = {
  id: "priya-sharma",
  quote:
    "Whitefire Interior transformed our apartment into a space that feels both luxurious and like home.",
  clientName: "Priya Sharma",
  location: "Mumbai, India",
};

const mockClientLogos: ClientLogo[] = [
  { id: "dlf", name: "DLF", src: "/mock/logos/dlf.svg", alt: "DLF" },
  {
    id: "godrej",
    name: "Godrej Properties",
    src: "/mock/logos/godrej.svg",
    alt: "Godrej Properties",
  },
  {
    id: "oberoi",
    name: "Oberoi Realty",
    src: "/mock/logos/oberoi.svg",
    alt: "Oberoi Realty",
  },
  {
    id: "asian",
    name: "Asian Paints",
    src: "/mock/logos/asian-paints.svg",
    alt: "Asian Paints",
  },
  {
    id: "tata",
    name: "Tata Housing",
    src: "/mock/logos/tata.svg",
    alt: "Tata Housing",
  },
  {
    id: "prestige",
    name: "Prestige Group",
    src: "/mock/logos/prestige.svg",
    alt: "Prestige Group",
  },
  {
    id: "phoenix",
    name: "Phoenix Marketcity",
    src: "/mock/logos/phoenix.svg",
    alt: "Phoenix Marketcity",
  },
  {
    id: "brigade",
    name: "Brigade",
    src: "/mock/logos/brigade.svg",
    alt: "Brigade",
  },
  { id: "dlf-2", name: "DLF", src: "/mock/logos/dlf.svg", alt: "DLF" },
  {
    id: "godrej-2",
    name: "Godrej Properties",
    src: "/mock/logos/godrej.svg",
    alt: "Godrej Properties",
  },
  {
    id: "oberoi-2",
    name: "Oberoi Realty",
    src: "/mock/logos/oberoi.svg",
    alt: "Oberoi Realty",
  },
  {
    id: "asian-2",
    name: "Asian Paints",
    src: "/mock/logos/asian-paints.svg",
    alt: "Asian Paints",
  },
];

function IconForService({ name }: { name: string }) {
  const className = "h-7 w-7 stroke-[1.2]";

  switch (name) {
    case "LayoutGrid":
      return <LayoutGrid className={className} />;
    case "Armchair":
      return <Armchair className={className} />;
    case "Hammer":
      return <Hammer className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    default:
      return <PanelsTopLeft className={className} />;
  }
}

function IconForStat({ name }: { name: string }) {
  const className = "h-6 w-6 stroke-[1.2]";

  switch (name) {
    case "BadgeCheck":
      return <BadgeCheck className={className} />;
    case "Award":
      return <Award className={className} />;
    case "Trophy":
      return <Trophy className={className} />;
    default:
      return <Building2 className={className} />;
  }
}

function HomeHero({ image }: { image?: string | null }) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#171716] sm:min-h-[680px] lg:min-h-[720px]">
      <img
        src={image ?? mockHero.image.src}
        alt={mockHero.image.alt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

      <SiteHeader activePath="/" />

      <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-center px-6 pt-24 sm:min-h-[680px] sm:px-8 lg:min-h-[720px] lg:px-20 lg:pt-12">
        <div className="max-w-[590px]">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#C3A56E]">
            {mockHero.eyebrow}
          </p>

          <h1 className="font-serif text-[48px] leading-[0.98] tracking-[-0.025em] text-white sm:text-[62px] lg:text-[72px]">
            {mockHero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[440px] text-sm leading-6 text-white/85 sm:text-[15px]">
            {mockHero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={mockHero.primaryCta.href}
              className="inline-flex items-center gap-2 bg-[#B89558] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#A8844D]"
            >
              {mockHero.primaryCta.label}
              <ArrowRight size={14} />
            </a>

            <a
              href={mockHero.showreel.href}
              className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 transition-colors group-hover:bg-white group-hover:text-black">
                <Play size={12} fill="currentColor" />
              </span>
              {mockHero.showreel.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-[#F7F4EE] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="Comprehensive Interior Design Services"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {mockServices.map((service, index) => (
            <a
              key={service.id}
              href={service.href}
              className={`group px-6 py-5 text-center transition-transform hover:-translate-y-1 lg:py-3 ${
                index > 0 ? "lg:border-l lg:border-[#24211D]/15" : ""
              }`}
            >
              <div className="mx-auto flex h-9 w-9 items-center justify-center text-[#B89558]">
                <IconForService name={service.icon} />
              </div>

              <h3 className="mt-5 font-serif text-lg text-[#25221E]">
                {service.title}
              </h3>

              <p className="mx-auto mt-3 max-w-[180px] text-[12px] leading-5 text-[#4C4841]">
                {service.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeStudioStatement({ image }: { image?: string | null }) {
  return (
    <section className="bg-[#171716] text-white">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative min-h-[390px] overflow-hidden lg:min-h-[460px]">
          <img
            src={image ?? studioImage}
            alt="Elegant interior seating area"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="flex min-h-[390px] items-center bg-[#181817] px-8 py-14 sm:px-12 lg:min-h-[460px] lg:px-20">
          <div className="max-w-[480px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C3A56E]">
              STYLISH SPACES
            </p>

            <h2 className="mt-4 font-serif text-[40px] leading-[1.02] sm:text-[48px]">
              Where Aesthetics
              <br />
              Meet Function
            </h2>

            <p className="mt-6 max-w-[430px] text-sm leading-6 text-white/75">
              We believe that great design is more than beautiful spaces. It's
              about creating environments that inspire, support, and elevate
              everyday living.
            </p>

            <a
              href="/about"
              className="mt-7 inline-flex border border-white/30 px-5 py-3 text-[9px] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black"
            >
              About Our Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsTrustSection({ logos }: { logos?: ClientLogo[] }) {
  const [active, setActive] = useState(0);
  const testimonials = [mockTestimonial];
  const hasLogos = Boolean(logos && logos.length > 0);

  return (
    <section className="bg-[#F7F4EE]">
      <div className="mx-auto grid max-w-[1280px] lg:grid-cols-[0.9fr_1.5fr]">
        <div className="px-8 py-16 lg:border-r lg:border-[#25221E]/15 lg:px-12 lg:py-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9A7A4A]">
            CLIENTS LOVE US
          </p>

          <h2 className="mt-4 max-w-[300px] font-serif text-[36px] leading-[1.02] text-[#211F1B]">
            What Our Clients
            <br />
            Are Saying
          </h2>

          <div className="mt-9 flex items-start gap-5">
            <span className="font-serif text-5xl leading-none text-[#5B554B]">
              “
            </span>

            <div>
              <p className="max-w-[330px] text-sm leading-6 text-[#37332E]">
                {testimonials[active].quote}
              </p>
              <p className="mt-5 text-xs font-semibold text-[#2C2925]">
                — {testimonials[active].clientName}
              </p>
              <p className="mt-1 text-[11px] text-[#777066]">
                {testimonials[active].location}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() =>
                setActive((value) =>
                  value === 0 ? testimonials.length - 1 : value - 1
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2925]/20"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() =>
                setActive((value) => (value + 1) % testimonials.length)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2925]/20"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div className="px-8 py-16 lg:px-12 lg:py-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9A7A4A]">
            TRUSTED BY LEADING BRANDS
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {(logos && logos.length > 0 ? logos : mockClientLogos).map((logo) => (
              <div
                key={logo.id}
                className="flex min-h-[42px] items-center justify-center"
              >
                {hasLogos ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="max-h-8 max-w-[110px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#5B554B]/80">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <a
      href={project.href}
      className="group relative block aspect-[1.28/1] overflow-hidden bg-[#DDD6CA]"
    >
      <img
        src={project.image.src}
        alt={project.image.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-serif text-[20px] leading-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/75">
          {project.location}
        </p>
      </div>
    </a>
  );
}

function FeaturedProjectsSection({ images }: { images?: string[] }) {
  return (
    <section className="bg-[#F7F4EE] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="FEATURED PROJECTS"
            title="Spaces We're Proud Of"
          />

          <a
            href="/projects"
            className="inline-flex self-start border border-[#6C604F]/40 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302C26] transition-colors hover:bg-[#302C26] hover:text-white sm:self-auto"
          >
            View All Projects
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {mockProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{
                ...project,
                image: {
                  ...project.image,
                  src: images?.[index] ?? project.image.src,
                },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeStats() {
  return (
    <section className="bg-[#171716] text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center px-5 py-12 text-center ${
              index > 0 ? "border-l border-white/10" : ""
            } ${index === 2 ? "lg:border-l" : ""}`}
          >
            <div className="text-[#B89558]">
              <IconForStat name={stat.icon} />
            </div>

            <p className="mt-4 font-serif text-4xl text-[#B89558] sm:text-5xl">
              {stat.value}
            </p>

            <p className="mt-2 text-[11px] tracking-wide text-white/75">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <a
      href={article.href}
      className="group block border border-[#25221E]/15 bg-[#F7F4EE]"
    >
      <div className="aspect-[1.8/1] overflow-hidden">
        <img
          src={article.image.src}
          alt={article.image.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A7A4A]">
          {article.category}
        </p>

        <h3 className="mt-3 font-serif text-[23px] leading-[1.1] text-[#26231F]">
          {article.title}
        </h3>

        <p className="mt-5 text-[10px] text-[#777066]">
          {article.date} <span className="mx-2">•</span> {article.readTime}
        </p>
      </div>
    </a>
  );
}

function LatestArticlesSection({ images }: { images?: string[] }) {
  return (
    <section className="bg-[#F7F4EE] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="INSIGHTS & IDEAS" title="Latest Articles" />

          <a
            href="/blog"
            className="inline-flex self-start border border-[#6C604F]/40 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302C26] transition-colors hover:bg-[#302C26] hover:text-white sm:self-auto"
          >
            View All Articles
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {mockArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={{
                ...article,
                image: {
                  ...article.image,
                  src: images?.[index] ?? article.image.src,
                },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterCTA({ image }: { image?: string | null }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    window.setTimeout(() => {
      setStatus("success");
    }, 600);
  }

  return (
    <section className="relative overflow-hidden bg-[#332B24] text-white">
      <img
        src={image ?? newsletterImage}
        alt="Warmly lit interior with decorative objects"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto max-w-[1000px] px-6 py-16 text-center sm:px-8 lg:py-20">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C3A56E]">
          JOIN OUR COMMUNITY
        </p>

        <h2 className="mx-auto mt-4 max-w-[650px] font-serif text-4xl leading-[1.03] sm:text-5xl">
          Design Inspiration
          <br />
          Straight to Your Inbox
        </h2>

        <p className="mx-auto mt-5 max-w-[600px] text-sm leading-6 text-white/80">
          Get the latest trends, project updates and exclusive design tips
          delivered to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-[620px] flex-col gap-2 sm:flex-row"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter your email address"
            aria-invalid={status === "error"}
            className="min-h-12 flex-1 border border-white/20 bg-white px-4 text-sm text-[#25221E] outline-none placeholder:text-[#8B857B] focus:border-[#C3A56E]"
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="min-h-12 bg-[#B89558] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-[#A8844D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting..." : "Subscribe"}
          </button>
        </form>

        <p
          className="mt-4 min-h-5 text-[10px] text-white/60"
          aria-live="polite"
        >
          {status === "error"
            ? "Please enter a valid email address."
            : status === "success"
              ? "Thank you. You're subscribed."
              : "We respect your privacy. Unsubscribe anytime."}
        </p>
      </div>
    </section>
  );
}

export async function loader() {
  try {
    const [heroDoc, stylishDoc, projectsDoc, articlesDoc, clientsDoc] =
      await Promise.all([
        sanityClient.fetch(groq`*[_type == "hero"][0]{images}`),
        sanityClient.fetch(groq`*[_type == "stylish"][0]{images}`),
        sanityClient.fetch(
          groq`*[_type == "project"] | order(id asc){id, image}`
        ),
        sanityClient.fetch(
          groq`*[_type == "article"] | order(date desc){title, image}`
        ),
        sanityClient.fetch(
          groq`*[_type == "client"] | order(id asc){id, name, logo}`
        ),
      ]);

    const heroImages: string[] = (heroDoc?.images ?? []).map((img: any) =>
      urlFor(img).url()
    );
    const studioImage: string | null = stylishDoc?.images?.[0]
      ? urlFor(stylishDoc.images[0]).url()
      : null;
    const projectImages: string[] = (projectsDoc ?? []).map((project: any) =>
      urlFor(project.image).url()
    );
    const articleImages: string[] = (articlesDoc ?? []).map((article: any) =>
      urlFor(article.image).url()
    );
    const baseLogos: ClientLogo[] = (clientsDoc ?? []).map((client: any) => ({
      id: String(client.id),
      name: client.name,
      src: urlFor(client.logo).url(),
      alt: client.name,
    }));
    const clientLogos: ClientLogo[] = Array.from({ length: 12 }, (_, index) => {
      const logo = baseLogos[index % baseLogos.length];
      return { ...logo, id: `${logo.id}-${index}` };
    });

    return json({
      heroImages,
      studioImage,
      projectImages,
      articleImages,
      clientLogos,
    });
  } catch {
    return json({
      heroImages: [],
      studioImage: null,
      projectImages: [],
      articleImages: [],
      clientLogos: [],
    });
  }
}

export default function HomePage() {
  const { heroImages, studioImage, projectImages, articleImages, clientLogos } =
    useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#E8E2D8]">
      <div className="mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <HomeHero image={heroImages[0]} />

        <main>
          <ServicesSection />
          <HomeStudioStatement image={studioImage} />
          <TestimonialsTrustSection logos={clientLogos} />
          <FeaturedProjectsSection images={projectImages} />
          <HomeStats />
          <LatestArticlesSection images={articleImages} />
          <NewsletterCTA image={heroImages[1]} />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Interior Decorators Inc. – Award-Winning Interior Design" },
    { name: "description", content: "Transform your home or office with our expert interior-design team. See portfolios, book a free consultation and get the space you deserve." },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },

    // open-graph / social cards
    { property: "og:title", content: "Interior Decorators Inc. – Award-Winning Interior Design" },
    { property: "og:description", content: "Transform your home or office with our expert interior-design team. See portfolios, book a free consultation and get the space you deserve." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://interior-deco-kappa.vercel.app" },
    { property: "og:image", content: "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max" },
    { property: "og:site_name", content: "Interior Decorators Inc." },

    // Twitter card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Interior Decorators Inc. – Award-Winning Interior Design" },
    { name: "twitter:description", content: "Transform your home or office with our expert interior-design team. See portfolios, book a free consultation and get the space you deserve." },
    { name: "twitter:image", content: "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max" },
  ];
};

export const links = () => [
  { rel: 'icon', href: 'https://cdn.sanity.io/images/pzhistba/production/aedb15b805047b47c8a57f60f5bfcbcd43c6223e-1600x896.jpg?w=32&h=32&fit=crop', type: 'image/jpeg' },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css' },
];