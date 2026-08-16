import type { MetaFunction } from "@remix-run/node";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "~/components/whitefire/SiteHeader";
import { SiteFooter } from "~/components/whitefire/SiteFooter";
import { seo } from "~/utils/seo";

import servicesHeroImage from "~/assets/images/living_design.jpg";
import livingSpacesImage from "~/assets/images/services-hero-living-spaces.jpg";
import kitchensDiningImage from "~/assets/images/services-hero-kitchens-dining.jpg";
import bedroomsRetreatsImage from "~/assets/images/services-hero-bedrooms-retreats.jpg";
import workspacesImage from "~/assets/images/services-hero-workspaces.jpg";
import hospitalityRetailImage from "~/assets/images/services-hero-hospitality-retail.jpg";
import boutiqueTransitionalImage from "~/assets/images/services-hero-boutique-transitional.jpg";
import minimalistScandinavianImage from "~/assets/images/services-hero-minimalist-scandinavian.jpg";
import compactMicroSpacesImage from "~/assets/images/services-hero-compact-micro-spaces.jpg";
import servicesCtaImage from "~/assets/images/about_closing_dark_banner_table_vase.jpg";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface ServicesHeroData {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export interface ServicesPageData {
  hero: ServicesHeroData;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: ServiceItem[];
}

const mockServicesPageData: ServicesPageData = {
  hero: {
    eyebrow: "OUR SERVICES",
    title: "Designing Spaces That Inspire",
    description:
      "From concept to completion, we offer tailored interior design services that blend aesthetics, functionality, and your unique lifestyle.",
    ctaLabel: "SCHEDULE A CONSULTATION",
    ctaHref: "/contact",
    image: servicesHeroImage,
  },

  intro: {
    eyebrow: "WHAT WE DO",
    title: "Comprehensive Interior Design Services",
    description:
      "Every space has potential. Our services are designed to bring out the best in your space with thoughtful planning, curated materials, and expert craftsmanship.",
  },

services: [
    {
      id: "living-spaces",
      number: "01",
      title: "Living Spaces",
      description:
        "Warm, layered living rooms designed for everyday comfort — from Malibu oceanfront to a Norwegian lakeside cabin.",
      image: livingSpacesImage,
      href: "/services/living-spaces",
    },
    {
      id: "kitchens-dining",
      number: "02",
      title: "Kitchens & Dining",
      description:
        "Considered kitchens that balance craftsmanship, storage, and the ritual of gathering.",
      image: kitchensDiningImage,
      href: "/services/kitchens-dining",
    },
    {
      id: "bedrooms-retreats",
      number: "03",
      title: "Bedrooms & Retreats",
      description:
        "Calm, restorative retreats — coastal, alpine, and urban bedrooms designed for deep rest.",
      image: bedroomsRetreatsImage,
      href: "/services/bedrooms-retreats",
    },
    {
      id: "workspaces",
      number: "04",
      title: "Workspaces",
      description:
        "Productive, people-first workplaces — from tech HQs to micro home offices.",
      image: workspacesImage,
      href: "/services/workspaces",
    },
    {
      id: "hospitality-retail",
      number: "05",
      title: "Hospitality & Retail",
      description:
        "Memorable hospitality and retail interiors that turn visitors into regulars.",
      image: hospitalityRetailImage,
      href: "/services/hospitality-retail",
    },
    {
      id: "boutique-transitional",
      number: "06",
      title: "Boutique & Transitional",
      description:
        "Refined transitional interiors with brass, marble, and velvet detailing.",
      image: boutiqueTransitionalImage,
      href: "/services/boutique-transitional",
    },
    {
      id: "minimalist-scandinavian",
      number: "07",
      title: "Minimalist & Scandinavian",
      description:
        "Quiet, material-led spaces rooted in simplicity, light, and natural texture.",
      image: minimalistScandinavianImage,
      href: "/services/minimalist-scandinavian",
    },
    {
      id: "compact-micro-spaces",
      number: "08",
      title: "Compact & Micro Spaces",
      description:
        "Smart, space-efficient design for micro lofts and compact homes.",
      image: compactMicroSpacesImage,
      href: "/services/compact-micro-spaces",
    },
  ],
};

function ServicesHero({ data }: { data: ServicesHeroData }) {
  return (
    <section className="relative isolate min-h-[430px] overflow-hidden bg-[#1a1815] text-white sm:min-h-[500px] lg:min-h-[540px]">
      <img
        src={data.image}
        alt="Warm contemporary interior with a large sectional sofa"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

      <div className="mx-auto flex min-h-[430px] max-w-[1440px] items-center px-6 py-20 sm:min-h-[500px] sm:px-10 lg:min-h-[540px] lg:px-20">
        <div className="max-w-[550px]">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-[#B29562]">
            {data.eyebrow}
          </p>

          <h1 className="max-w-[530px] font-serif text-[48px] leading-[0.98] tracking-[-0.02em] sm:text-[60px] lg:text-[66px]">
            Designing Spaces
            <br />
            That Inspire
          </h1>

          <p className="mt-6 max-w-[470px] text-sm leading-6 text-white/90 sm:text-[15px]">
            {data.description}
          </p>

          <a
            href={data.ctaHref}
            className="mt-7 inline-flex bg-[#A88A5A] px-6 py-4 text-[10px] font-bold tracking-[0.08em] text-white transition-colors hover:bg-[#B89A69]"
          >
            {data.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesIntroduction({
  data,
}: {
  data: ServicesPageData["intro"];
}) {
  return (
    <section className="bg-[#F7F4EF] px-6 pb-7 pt-12 sm:px-8 sm:pb-9 sm:pt-16 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#96784C]">
          {data.eyebrow}
        </p>

        <h2 className="mt-3 font-serif text-[30px] leading-tight tracking-[-0.02em] sm:text-[38px] lg:text-[42px]">
          {data.title}
        </h2>

        <p className="mx-auto mt-4 max-w-[710px] text-[13px] leading-6 text-[#45413B] sm:text-sm">
          {data.description}
        </p>
      </div>
    </section>
  );
}

function ServicesGrid({ items }: { items: ServiceItem[] }) {
  return (
    <section className="bg-[#F7F4EF] px-6 pb-16 sm:px-8 lg:px-12 lg:pb-20">
      <div className="mx-auto grid max-w-[1340px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="group overflow-hidden border border-[#DDD8D0] bg-[#F8F6F2] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(35,30,24,0.08)]">
      <a href={item.href} className="block h-full">
        <div className="relative aspect-[1.48/1] overflow-hidden">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />

          <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#A68A5E] text-[11px] font-semibold text-white shadow-sm">
            {item.number}
          </span>
        </div>

        <div className="flex min-h-[185px] flex-col px-5 pb-5 pt-4 sm:min-h-[205px]">
          <h3 className="font-serif text-[20px] leading-tight text-[#201E1B]">
            {item.title}
          </h3>

          <p className="mt-3 max-w-[250px] text-[12px] leading-5 text-[#403C36] sm:text-[13px]">
            {item.description}
          </p>

          <span className="mt-auto flex items-center gap-2 pt-5 text-[10px] font-semibold tracking-[0.13em] text-[#96784C]">
            LEARN MORE
            <ArrowRight
              size={13}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </a>
    </article>
  );
}

function ServicesCTA() {
  return (
    <section className="bg-[#171511] text-white">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[30%_42%_28%]">
        <div className="min-h-[300px] overflow-hidden">
          <img
            src={servicesCtaImage}
            alt="Decorative interior styling with a vase and branches"
            loading="lazy"
            className="h-full w-full object-cover object-center opacity-90"
          />
        </div>

        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-10 lg:py-14">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#B29562]">
            READY TO GET STARTED?
          </p>

          <h2 className="mt-3 max-w-[450px] font-serif text-[30px] leading-[1.05] sm:text-[35px]">
            Let’s Create Something
            <br />
            Extraordinary Together
          </h2>

          <p className="mt-4 max-w-[430px] text-[12px] leading-5 text-white/75">
            Tell us about your space and your vision. We’d love to help you
            bring it to life.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex w-fit bg-[#A88A5A] px-6 py-3.5 text-[10px] font-bold tracking-[0.08em] transition-colors hover:bg-[#B89A69]"
          >
            GET IN TOUCH
          </a>
        </div>

        <div className="flex flex-col justify-center gap-7 border-t border-white/10 px-8 py-10 sm:px-12 lg:border-l lg:border-t-0 lg:px-8">
          <CTAValue
            title="BESPOKE APPROACH"
            text="Every project is unique and tailored to you."
          />

          <CTAValue
            title="EXPERT TEAM"
            text="A passionate team with years of experience and a keen eye for detail."
          />

          <CTAValue
            title="QUALITY ASSURED"
            text="We use the finest materials and work with trusted craftsmen."
          />
        </div>
      </div>
    </section>
  );
}

function CTAValue({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold tracking-[0.16em] text-[#B29562]">
        {title}
      </p>
      <p className="mt-1 max-w-[260px] text-[11px] leading-5 text-white/70">
        {text}
      </p>
    </div>
  );
}

export default function ServicesPage() {
  const data = mockServicesPageData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#292725]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <SiteHeader activePath="/services" />

        <main>
          <ServicesHero data={data.hero} />
          <ServicesIntroduction data={data.intro} />
          <ServicesGrid items={data.services} />
          <ServicesCTA />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return seo({
    title: "Services | Whitefire Interior",
    description:
      "Explore Whitefire Interior's comprehensive interior design services, from space planning and custom furniture to renovation, styling, lighting, and project management.",
    path: "/services",
    image:
      "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max",
  });
};