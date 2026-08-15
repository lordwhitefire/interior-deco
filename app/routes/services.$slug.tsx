import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "~/components/whitefire/SiteHeader";
import { SiteFooter } from "~/components/whitefire/SiteFooter";
import { Breadcrumbs } from "~/components/whitefire/Breadcrumbs";
import { ServiceProcessStep } from "~/components/whitefire/ServiceProcessStep";
import { ProjectCard } from "~/components/whitefire/ProjectCard";
import { ServiceInclusionItem } from "~/components/whitefire/ServiceInclusionItem";
import { TrustItem } from "~/components/whitefire/TrustItem";
import { PrimaryButton } from "~/components/whitefire/PrimaryButton";
import fs from "fs";

/* ----------  Image imports  ---------- */

import servicesHerointeriorDesignImage from "~/assets/images/services-hero-interior-design.jpg";
import servicesInclusionsinteriorDesignImage from "~/assets/images/services-inclusions-interior-design.jpg";
import servicesGalleryinteriorDesign01Image from "~/assets/images/services-gallery-interior-design-01.jpg";
import servicesGalleryinteriorDesign02Image from "~/assets/images/services-gallery-interior-design-02.jpg";
import servicesGalleryinteriorDesign03Image from "~/assets/images/services-gallery-interior-design-03.jpg";
import servicesGalleryinteriorDesign04Image from "~/assets/images/services-gallery-interior-design-04.jpg";
import servicesHerospacePlanningImage from "~/assets/images/services-hero-space-planning.jpg";
import servicesInclusionsspacePlanningImage from "~/assets/images/services-inclusions-space-planning.jpg";
import servicesGalleryspacePlanning01Image from "~/assets/images/services-gallery-space-planning-01.jpg";
import servicesGalleryspacePlanning02Image from "~/assets/images/services-gallery-space-planning-02.jpg";
import servicesGalleryspacePlanning03Image from "~/assets/images/services-gallery-space-planning-03.jpg";
import servicesGalleryspacePlanning04Image from "~/assets/images/services-gallery-space-planning-04.jpg";
import servicesHerocustomFurnitureImage from "~/assets/images/services-hero-custom-furniture.jpg";
import servicesInclusionscustomFurnitureImage from "~/assets/images/services-inclusions-custom-furniture.jpg";
import servicesGallerycustomFurniture01Image from "~/assets/images/services-gallery-custom-furniture-01.jpg";
import servicesGallerycustomFurniture02Image from "~/assets/images/services-gallery-custom-furniture-02.jpg";
import servicesGallerycustomFurniture03Image from "~/assets/images/services-gallery-custom-furniture-03.jpg";
import servicesGallerycustomFurniture04Image from "~/assets/images/services-gallery-custom-furniture-04.jpg";
import servicesHerorenovationImage from "~/assets/images/services-hero-renovation.jpg";
import servicesInclusionsrenovationImage from "~/assets/images/services-inclusions-renovation.jpg";
import servicesGalleryrenovation01Image from "~/assets/images/services-gallery-renovation-01.jpg";
import servicesGalleryrenovation02Image from "~/assets/images/services-gallery-renovation-02.jpg";
import servicesGalleryrenovation03Image from "~/assets/images/services-gallery-renovation-03.jpg";
import servicesGalleryrenovation04Image from "~/assets/images/services-gallery-renovation-04.jpg";
import servicesHerostylingDecorImage from "~/assets/images/services-hero-styling-decor.jpg";
import servicesInclusionsstylingDecorImage from "~/assets/images/services-inclusions-styling-decor.jpg";
import servicesGallerystylingDecor01Image from "~/assets/images/services-gallery-styling-decor-01.jpg";
import servicesGallerystylingDecor02Image from "~/assets/images/services-gallery-styling-decor-02.jpg";
import servicesGallerystylingDecor03Image from "~/assets/images/services-gallery-styling-decor-03.jpg";
import servicesGallerystylingDecor04Image from "~/assets/images/services-gallery-styling-decor-04.jpg";
import servicesHeromaterialSelectionImage from "~/assets/images/services-hero-material-selection.jpg";
import servicesInclusionsmaterialSelectionImage from "~/assets/images/services-inclusions-material-selection.jpg";
import servicesGallerymaterialSelection01Image from "~/assets/images/services-gallery-material-selection-01.jpg";
import servicesGallerymaterialSelection02Image from "~/assets/images/services-gallery-material-selection-02.jpg";
import servicesGallerymaterialSelection03Image from "~/assets/images/services-gallery-material-selection-03.jpg";
import servicesGallerymaterialSelection04Image from "~/assets/images/services-gallery-material-selection-04.jpg";
import servicesHerolightingDesignImage from "~/assets/images/services-hero-lighting-design.jpg";
import servicesInclusionslightingDesignImage from "~/assets/images/services-inclusions-lighting-design.jpg";
import servicesGallerylightingDesign01Image from "~/assets/images/services-gallery-lighting-design-01.jpg";
import servicesGallerylightingDesign02Image from "~/assets/images/services-gallery-lighting-design-02.jpg";
import servicesGallerylightingDesign03Image from "~/assets/images/services-gallery-lighting-design-03.jpg";
import servicesGallerylightingDesign04Image from "~/assets/images/services-gallery-lighting-design-04.jpg";
import servicesHeroprojectManagementImage from "~/assets/images/services-hero-project-management.jpg";
import servicesInclusionsprojectManagementImage from "~/assets/images/services-inclusions-project-management.jpg";
import servicesGalleryprojectManagement01Image from "~/assets/images/services-gallery-project-management-01.jpg";
import servicesGalleryprojectManagement02Image from "~/assets/images/services-gallery-project-management-02.jpg";
import servicesGalleryprojectManagement03Image from "~/assets/images/services-gallery-project-management-03.jpg";
import servicesGalleryprojectManagement04Image from "~/assets/images/services-gallery-project-management-04.jpg";
import aboutClosingImage from "~/assets/images/about_closing_dark_banner_table_vase.jpg";

/* ----------  Image map  ---------- */

const imageMap: Record<string, string> = {
  "services-hero-interior-design": servicesHerointeriorDesignImage,
  "services-inclusions-interior-design": servicesInclusionsinteriorDesignImage,
  "services-gallery-interior-design-01": servicesGalleryinteriorDesign01Image,
  "services-gallery-interior-design-02": servicesGalleryinteriorDesign02Image,
  "services-gallery-interior-design-03": servicesGalleryinteriorDesign03Image,
  "services-gallery-interior-design-04": servicesGalleryinteriorDesign04Image,
  "services-hero-space-planning": servicesHerospacePlanningImage,
  "services-inclusions-space-planning": servicesInclusionsspacePlanningImage,
  "services-gallery-space-planning-01": servicesGalleryspacePlanning01Image,
  "services-gallery-space-planning-02": servicesGalleryspacePlanning02Image,
  "services-gallery-space-planning-03": servicesGalleryspacePlanning03Image,
  "services-gallery-space-planning-04": servicesGalleryspacePlanning04Image,
  "services-hero-custom-furniture": servicesHerocustomFurnitureImage,
  "services-inclusions-custom-furniture": servicesInclusionscustomFurnitureImage,
  "services-gallery-custom-furniture-01": servicesGallerycustomFurniture01Image,
  "services-gallery-custom-furniture-02": servicesGallerycustomFurniture02Image,
  "services-gallery-custom-furniture-03": servicesGallerycustomFurniture03Image,
  "services-gallery-custom-furniture-04": servicesGallerycustomFurniture04Image,
  "services-hero-renovation": servicesHerorenovationImage,
  "services-inclusions-renovation": servicesInclusionsrenovationImage,
  "services-gallery-renovation-01": servicesGalleryrenovation01Image,
  "services-gallery-renovation-02": servicesGalleryrenovation02Image,
  "services-gallery-renovation-03": servicesGalleryrenovation03Image,
  "services-gallery-renovation-04": servicesGalleryrenovation04Image,
  "services-hero-styling-decor": servicesHerostylingDecorImage,
  "services-inclusions-styling-decor": servicesInclusionsstylingDecorImage,
  "services-gallery-styling-decor-01": servicesGallerystylingDecor01Image,
  "services-gallery-styling-decor-02": servicesGallerystylingDecor02Image,
  "services-gallery-styling-decor-03": servicesGallerystylingDecor03Image,
  "services-gallery-styling-decor-04": servicesGallerystylingDecor04Image,
  "services-hero-material-selection": servicesHeromaterialSelectionImage,
  "services-inclusions-material-selection": servicesInclusionsmaterialSelectionImage,
  "services-gallery-material-selection-01": servicesGallerymaterialSelection01Image,
  "services-gallery-material-selection-02": servicesGallerymaterialSelection02Image,
  "services-gallery-material-selection-03": servicesGallerymaterialSelection03Image,
  "services-gallery-material-selection-04": servicesGallerymaterialSelection04Image,
  "services-hero-lighting-design": servicesHerolightingDesignImage,
  "services-inclusions-lighting-design": servicesInclusionslightingDesignImage,
  "services-gallery-lighting-design-01": servicesGallerylightingDesign01Image,
  "services-gallery-lighting-design-02": servicesGallerylightingDesign02Image,
  "services-gallery-lighting-design-03": servicesGallerylightingDesign03Image,
  "services-gallery-lighting-design-04": servicesGallerylightingDesign04Image,
  "services-hero-project-management": servicesHeroprojectManagementImage,
  "services-inclusions-project-management": servicesInclusionsprojectManagementImage,
  "services-gallery-project-management-01": servicesGalleryprojectManagement01Image,
  "services-gallery-project-management-02": servicesGalleryprojectManagement02Image,
  "services-gallery-project-management-03": servicesGalleryprojectManagement03Image,
  "services-gallery-project-management-04": servicesGalleryprojectManagement04Image,
  about_closing_dark_banner_table_vase: aboutClosingImage,
};

/* ----------  Types  ---------- */

export interface ServiceHeroData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ServiceInclusion {
  title: string;
  description: string;
  icon:
    | "layout"
    | "materials"
    | "furniture"
    | "styling"
    | "lighting"
    | "management";
}

export interface ServiceProcessStepData {
  number: string;
  title: string;
  description: string;
  icon: "discover" | "design" | "plan" | "execute" | "reveal";
}

export interface ServiceGalleryItem {
  title: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface ServiceCtaData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface TrustItemData {
  title: string;
  description: string;
  icon: "personalized" | "quality" | "delivery" | "satisfaction";
}

export interface ServicePageData {
  slug: string;
  hero: ServiceHeroData;
  inclusions: ServiceInclusion[];
  inclusionsImage: string;
  inclusionsImageAlt: string;
  process: ServiceProcessStepData[];
  gallery: ServiceGalleryItem[];
  cta: ServiceCtaData;
  trust: TrustItemData[];
}

/* ----------  Loader: load JSON by slug  ---------- */

const VALID_SLUGS = [
  "interior-design",
  "space-planning",
  "custom-furniture",
  "renovation",
  "styling-decor",
  "material-selection",
  "lighting-design",
  "project-management",
];

const DATA_DIR = "app/data/services";

function resolveImages(data: any) {
  const resolve = (val: string): string => {
    const key = val.replace(/\.[^.]+$/, "");
    return imageMap[key] || val;
  };

  return {
    ...data,
    hero: {
      ...data.hero,
      image: resolve(data.hero.image),
    },
    inclusionsImage: resolve(data.inclusionsImage),
    gallery: data.gallery.map((g: any) => ({
      ...g,
      image: resolve(g.image),
    })),
    cta: {
      ...data.cta,
      image: resolve(data.cta.image),
    },
  };
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug || !VALID_SLUGS.includes(slug)) {
    throw redirect("/services");
  }

  const filePath = `${DATA_DIR}/${slug}.json`;

  if (!fs.existsSync(filePath)) {
    throw redirect("/services");
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const resolvedData = resolveImages(data);

  return json(resolvedData);
}

/* ----------  Meta  ---------- */

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Not found" }];

  return [
    { title: `${data.hero.title} | Whitefire Interior` },
    { name: "description", content: data.hero.description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: `${data.hero.title} | Whitefire Interior` },
    { property: "og:description", content: data.hero.description },
    { property: "og:url", content: `https://interior-deco-kappa.vercel.app/services/${data.slug}` },
    {
      property: "og:image",
      content:
        "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max",
    },
    { property: "og:site_name", content: "Interior Decorators Inc." },
  ];
};

/* ----------  Components  ---------- */

function ServiceHero({ data }: { data: ServiceHeroData }) {
  return (
    <section className="relative isolate min-h-[610px] overflow-hidden bg-[#171614] text-white sm:min-h-[640px] lg:min-h-[680px]">
      <img
        src={data.image}
        alt={data.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[610px] max-w-[1440px] flex-col px-5 pb-14 pt-[92px] sm:px-8 lg:min-h-[680px] lg:px-16 lg:pb-20 lg:pt-[105px]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: data.title },
          ]}
          dark
        />

        <div className="mt-auto max-w-[430px]">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-[#C5A36A]">
            {data.eyebrow}
          </p>

          <h1 className="max-w-[500px] font-serif text-[48px] leading-[0.94] tracking-[-0.025em] sm:text-[58px] lg:text-[68px]">
            {data.title}
          </h1>

          <p className="mt-5 max-w-[390px] text-[14px] leading-6 text-white/90 sm:text-[15px]">
            {data.description}
          </p>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <PrimaryButton href={data.primaryCta.href}>
              {data.primaryCta.label}
            </PrimaryButton>

            <a
              href={data.secondaryCta.href}
              className="inline-flex items-center gap-2 py-2 text-[10px] font-semibold tracking-[0.08em] text-white transition hover:text-[#C5A36A]"
            >
              {data.secondaryCta.label}
              <ArrowRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceInclusions({
  items,
  image,
  imageAlt,
}: {
  items: ServiceInclusion[];
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="border-b border-black/10 bg-[#F4F1EA]">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_1.08fr]">
        <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-14">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#9C794A]">
            WHAT'S INCLUDED
          </p>

          <h2 className="mt-3 max-w-[570px] font-serif text-[35px] leading-[1.03] tracking-[-0.02em] text-[#20201E] sm:text-[40px]">
            A Complete Transformation
            <br />
            Thoughtfully Designed
          </h2>

          <p className="mt-4 max-w-[540px] text-[13px] leading-5 text-[#383631] sm:text-[14px]">
            Our service covers every detail from layout planning and material selection to custom furniture, lighting, and styling.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {items.map((item) => (
              <ServiceInclusionItem key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="min-h-[360px] lg:min-h-[390px]">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceProcess({ steps }: { steps: ServiceProcessStepData[] }) {
  return (
    <section className="border-b border-black/10 bg-[#FAF8F3] px-6 py-12 sm:px-10 lg:px-16 lg:py-14">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#9C794A]">
          OUR PROCESS
        </p>

        <h2 className="mt-3 font-serif text-[32px] leading-none tracking-[-0.02em] text-[#20201E] sm:text-[38px]">
          From Concept to Cozy Retreat
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-5 md:gap-0">
          {steps.map((step, index) => (
            <ServiceProcessStep
              key={step.number}
              {...step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceGalleryStrip({ items }: { items: ServiceGalleryItem[] }) {
  return (
    <section className="border-b border-black/10 bg-[#F4F1EA] px-6 py-10 sm:px-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#9C794A]">
              BEDROOMS WE'VE TRANSFORMED
            </p>

            <h2 className="mt-2 font-serif text-[31px] leading-none tracking-[-0.02em] text-[#20201E] sm:text-[38px]">
              Designed for Rest. Styled for You.
            </h2>
          </div>

          <a
            href="/projects"
            className="hidden shrink-0 items-center gap-2 pb-1 text-[10px] font-semibold tracking-[0.08em] text-[#20201E] transition hover:text-[#9C794A] sm:inline-flex"
          >
            VIEW ALL PROJECTS
            <ArrowRight size={13} strokeWidth={1.5} />
          </a>
        </div>

        <div className="mt-7 flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProjectCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationCta({ data }: { data: ServiceCtaData }) {
  return (
    <section className="relative overflow-hidden bg-[#171716] text-white">
      <img
        src={data.image}
        alt={data.imageAlt}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#171716]/55" />

      <div className="relative mx-auto grid max-w-[1440px] gap-7 px-6 py-11 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-16 lg:py-12">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.2em] text-[#C5A36A]">
            READY TO TRANSFORM YOUR SPACE?
          </p>

          <h2 className="mt-3 max-w-[460px] font-serif text-[34px] leading-[0.98] tracking-[-0.02em] sm:text-[42px]">
            Let's Create Your
            <br />
            Perfect Retreat
          </h2>
        </div>

        <div className="max-w-[420px] lg:justify-self-center">
          <p className="text-[13px] leading-5 text-white/80">
            Book a consultation with our design experts and take the first step
            toward your dream space.
          </p>

          <div className="mt-5">
            <PrimaryButton href="/contact">
              SCHEDULE A CONSULTATION
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceTrustStrip({ items }: { items: TrustItemData[] }) {
  return (
    <section className="border-b border-black/10 bg-[#F7F4ED]">
      <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <TrustItem key={item.title} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}

/* ----------  Page  ---------- */

export default function ServiceDetailRoute() {
  const data = useLoaderData<typeof loader>() as ServicePageData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#292725]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <SiteHeader activePath="/services" showSearch />

        <main>
          <ServiceHero data={data.hero} />

          <ServiceInclusions
            items={data.inclusions}
            image={data.inclusionsImage}
            imageAlt={data.inclusionsImageAlt}
          />

          <ServiceProcess steps={data.process} />

          <ServiceGalleryStrip items={data.gallery} />

          <ConsultationCta data={data.cta} />

          <ServiceTrustStrip items={data.trust} />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}