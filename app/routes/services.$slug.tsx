import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "~/components/whitefire/Breadcrumbs";
import { ServiceProcessStep } from "~/components/whitefire/ServiceProcessStep";
import { ProjectCard } from "~/components/whitefire/ProjectCard";
import { ServiceInclusionItem } from "~/components/whitefire/ServiceInclusionItem";
import { JsonLd, seo } from "~/utils/seo";
import { TrustItem } from "~/components/whitefire/TrustItem";
import { PrimaryButton } from "~/components/whitefire/PrimaryButton";
import { getServicePageData } from "~/lib/content";

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

export interface ServiceGalleryEntry {
  project: string;
  title: string;
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
  inclusionsProject: string;
  inclusionsImage: string;
  inclusionsImageAlt: string;
  process: ServiceProcessStepData[];
  gallery: ServiceGalleryItem[];
  galleryHeading: string;
  galleryTitle: string;
  cta: ServiceCtaData;
  trust: TrustItemData[];
}

/* ----------  Loader: query Sanity by slug  ---------- */

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw redirect("/services");
  }

  const data = await getServicePageData(slug);

  if (!data) {
    throw redirect("/services");
  }

  return json(data);
}

/* ----------  Meta  ---------- */

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Not found" }];

  return seo({
    title: `${data.hero.title} | Whitefire Interior`,
    description: data.hero.description,
    path: `/services/${data.slug}`,
    image:
      "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max",
  });
};

/* ----------  Components  ---------- */

function ServiceHero({ data }: { data: ServiceHeroData }) {
  return (
    <section className="relative isolate min-h-[610px] overflow-hidden bg-[#171614] text-white sm:min-h-[640px] lg:min-h-[680px]">
      <ResponsiveImage
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
          <ResponsiveImage
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

function ServiceGalleryStrip({
  items,
  heading,
  title,
}: {
  items: ServiceGalleryItem[];
  heading: string;
  title: string;
}) {
  return (
    <section className="border-b border-black/10 bg-[#F4F1EA] px-6 py-10 sm:px-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#9C794A]">
              {heading}
            </p>

            <h2 className="mt-2 font-serif text-[31px] leading-none tracking-[-0.02em] text-[#20201E] sm:text-[38px]">
              {title}
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
            <ProjectCard key={item.title} {...item} alt={item.imageAlt} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationCta({ data }: { data: ServiceCtaData }) {
  return (
    <section className="relative overflow-hidden bg-[#171716] text-white">
      <ResponsiveImage
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: data.hero.title,
            description: data.hero.description,
            serviceType: data.hero.title,
            provider: {
              "@type": "LocalBusiness",
              name: "Whitefire Interior",
              url: "https://interior-deco-kappa.vercel.app",
            },
            areaServed: "Amsterdam, Netherlands",
          }}
        />

        <main>
          <ServiceHero data={data.hero} />

          <ServiceInclusions
            items={data.inclusions}
            image={data.inclusionsImage}
            imageAlt={data.inclusionsImageAlt}
          />

          <ServiceProcess steps={data.process} />

          <ServiceGalleryStrip
            items={data.gallery}
            heading={data.galleryHeading}
            title={data.galleryTitle}
          />

          <ConsultationCta data={data.cta} />

          <ServiceTrustStrip items={data.trust} />
        </main>

        </div>
    </div>
  );
}