// app/routes/_index.tsx
// Home page implemented from Whitefire_Home_UI_Implementation_Package.md (§7),
// with /mock/* image paths replaced by real repo assets.
import React, { useState } from "react";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  ArrowRight,
  Armchair,
  Award,
  BadgeCheck,
  BedDouble,
  Boxes,
  Building2,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Hammer,
  LayoutGrid,
  Minus,
  PanelsTopLeft,
  Play,
  Sofa,
  Sparkles,
  Store,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";

import { SiteHeader } from "~/components/whitefire/SiteHeader";
import { SiteFooter } from "~/components/whitefire/SiteFooter";
import { SectionHeading } from "~/components/whitefire/SectionHeading";
import { seo } from "~/utils/seo";

import heroImage from "~/assets/images/living_design.jpg";
import studioImage from "~/assets/images/Concept.jpg";
import newsletterImage from "~/assets/images/Perfect.jpg";
import projectsData from "~/data/projects.json";
import { articles } from "~/data/blogMock";
import bedroomsRetreats from "~/data/services/bedrooms-retreats.json";
import boutiqueTransitional from "~/data/services/boutique-transitional.json";
import compactMicroSpaces from "~/data/services/compact-micro-spaces.json";
import hospitalityRetail from "~/data/services/hospitality-retail.json";
import kitchensDining from "~/data/services/kitchens-dining.json";
import livingSpaces from "~/data/services/living-spaces.json";
import minimalistScandinavian from "~/data/services/minimalist-scandinavian.json";
import workspaces from "~/data/services/workspaces.json";

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
    id: "bedrooms-retreats",
    title: bedroomsRetreats.hero.title,
    description: bedroomsRetreats.hero.description,
    href: "/services/bedrooms-retreats",
    icon: "BedDouble",
  },
  {
    id: "boutique-transitional",
    title: boutiqueTransitional.hero.title,
    description: boutiqueTransitional.hero.description,
    href: "/services/boutique-transitional",
    icon: "Store",
  },
  {
    id: "compact-micro-spaces",
    title: compactMicroSpaces.hero.title,
    description: compactMicroSpaces.hero.description,
    href: "/services/compact-micro-spaces",
    icon: "Boxes",
  },
  {
    id: "hospitality-retail",
    title: hospitalityRetail.hero.title,
    description: hospitalityRetail.hero.description,
    href: "/services/hospitality-retail",
    icon: "UtensilsCrossed",
  },
  {
    id: "kitchens-dining",
    title: kitchensDining.hero.title,
    description: kitchensDining.hero.description,
    href: "/services/kitchens-dining",
    icon: "ChefHat",
  },
  {
    id: "living-spaces",
    title: livingSpaces.hero.title,
    description: livingSpaces.hero.description,
    href: "/services/living-spaces",
    icon: "Sofa",
  },
  {
    id: "minimalist-scandinavian",
    title: minimalistScandinavian.hero.title,
    description: minimalistScandinavian.hero.description,
    href: "/services/minimalist-scandinavian",
    icon: "Minus",
  },
  {
    id: "workspaces",
    title: workspaces.hero.title,
    description: workspaces.hero.description,
    href: "/services/workspaces",
    icon: "Building2",
  },
];

const mockProjects: ProjectCardData[] = [
  {
    id: "amsterdam-jordaan-flower-shop",
    title: "Amsterdam Jordaan Flower Shop",
    location: "Jordaan, Amsterdam",
    image: {
      src: projectsData["amsterdam-jordaan-flower-shop"].cardUrl,
      alt: "Amsterdam Jordaan flower shop interior",
    },
    href: "/projects/amsterdam-jordaan-flower-shop",
  },
  {
    id: "berlin-mitte-tech-hq",
    title: "Berlin Mitte Tech HQ",
    location: "Mitte, Berlin",
    image: {
      src: projectsData["berlin-mitte-tech-hq"].cardUrl,
      alt: "Berlin Mitte tech headquarters interior",
    },
    href: "/projects/berlin-mitte-tech-hq",
  },
  {
    id: "brooklyn-brownstone-kitchen",
    title: "Brooklyn Brownstone Kitchen",
    location: "Park Slope, Brooklyn",
    image: {
      src: projectsData["brooklyn-brownstone-kitchen"].cardUrl,
      alt: "Brooklyn brownstone kitchen interior",
    },
    href: "/projects/brooklyn-brownstone-kitchen",
  },
  {
    id: "chicago-warehouse-loft",
    title: "Chicago Warehouse Loft",
    location: "West Loop, Chicago",
    image: {
      src: projectsData["chicago-warehouse-loft"].cardUrl,
      alt: "Chicago warehouse loft interior",
    },
    href: "/projects/chicago-warehouse-loft",
  },
  {
    id: "copenhagen-nordhavn-showroom",
    title: "Copenhagen Nordhavn Showroom",
    location: "Nordhavn, Copenhagen",
    image: {
      src: projectsData["copenhagen-nordhavn-showroom"].cardUrl,
      alt: "Copenhagen Nordhavn showroom interior",
    },
    href: "/projects/copenhagen-nordhavn-showroom",
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
    id: articles[0].slug,
    category: articles[0].category,
    title: articles[0].title,
    date: articles[0].date,
    readTime: articles[0].readTime,
    image: articles[0].image,
    href: `/blog/${articles[0].slug}`,
  },
  {
    id: articles[1].slug,
    category: articles[1].category,
    title: articles[1].title,
    date: articles[1].date,
    readTime: articles[1].readTime,
    image: articles[1].image,
    href: `/blog/${articles[1].slug}`,
  },
  {
    id: articles[2].slug,
    category: articles[2].category,
    title: articles[2].title,
    date: articles[2].date,
    readTime: articles[2].readTime,
    image: articles[2].image,
    href: `/blog/${articles[2].slug}`,
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
    case "BedDouble":
      return <BedDouble className={className} />;
    case "Store":
      return <Store className={className} />;
    case "Boxes":
      return <Boxes className={className} />;
    case "UtensilsCrossed":
      return <UtensilsCrossed className={className} />;
    case "ChefHat":
      return <ChefHat className={className} />;
    case "Sofa":
      return <Sofa className={className} />;
    case "Minus":
      return <Minus className={className} />;
    case "Building2":
      return <Building2 className={className} />;
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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

function TestimonialsTrustSection({
  logos,
  testimonials,
}: {
  logos?: ClientLogo[];
  testimonials: Testimonial[];
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const items = testimonials.length > 0 ? testimonials : [mockTestimonial];
  const swipable = items.length > 1;
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

            <div className="w-full max-w-[330px]">
              <Swiper
                modules={[Autoplay]}
                loop={swipable}
                speed={500}
                autoplay={
                  swipable
                    ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }
                    : false
                }
                onSwiper={setSwiper}
                className="w-full"
              >
                {items.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="!h-[260px]">
                    <div className="flex h-full flex-col overflow-hidden">
                      <p className="text-sm leading-6 text-[#37332E]">
                        {testimonial.quote}
                      </p>
                      <p className="mt-5 text-xs font-semibold text-[#2C2925]">
                        — {testimonial.clientName}
                      </p>
                      <p className="mt-1 text-[11px] text-[#777066]">
                        {testimonial.location}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => swiper?.slidePrev()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2925]/20 transition-colors hover:bg-[#2C2925]/5"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => swiper?.slideNext()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2925]/20 transition-colors hover:bg-[#2C2925]/5"
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

function FeaturedProjectsSection() {
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
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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

function LatestArticlesSection() {
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
          {mockArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
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
    const [heroDoc, stylishDoc, clientsDoc, testimonialsDoc] = await Promise.all([
      sanityClient.fetch(groq`*[_type == "hero"][0]{images}`),
      sanityClient.fetch(groq`*[_type == "stylish"][0]{images}`),
      sanityClient.fetch(
        groq`*[_type == "client"] | order(id asc){id, name, logo}`
      ),
      sanityClient.fetch(
        groq`*[_type == "testimonial"] | order(date desc){_id, clientName, clientLocation, review}`
      ),
    ]);

    const heroImages: string[] = (heroDoc?.images ?? []).map((img: any) =>
      urlFor(img).url()
    );
    const studioImage: string | null = stylishDoc?.images?.[0]
      ? urlFor(stylishDoc.images[0]).url()
      : null;
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
    const testimonials: Testimonial[] = (testimonialsDoc ?? [])
      .slice(0, 6)
      .map((t: any) => ({
        id: t._id,
        quote: t.review ?? "",
        clientName: t.clientName ?? "",
        location: t.clientLocation ?? "",
      }));

    return json({
      heroImages,
      studioImage,
      clientLogos,
      testimonials,
    });
  } catch {
    return json({
      heroImages: [],
      studioImage: null,
      clientLogos: [],
      testimonials: [],
    });
  }
}

export default function HomePage() {
  const { heroImages, studioImage, clientLogos, testimonials } =
    useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#E8E2D8]">
      <div className="mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <HomeHero image={heroImages[0]} />

        <main>
          <ServicesSection />
          <HomeStudioStatement image={studioImage} />
          <TestimonialsTrustSection logos={clientLogos} testimonials={testimonials} />
          <FeaturedProjectsSection />
          <HomeStats />
          <LatestArticlesSection />
          <NewsletterCTA image={heroImages[1]} />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return seo({
    title: "Whitefire Interior — Amsterdam Interior Design Studio",
    description:
      "Whitefire Interior — an Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.",
    path: "/",
    image:
      "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max",
  });
};

export const links = () => [];