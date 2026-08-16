import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import { useEffect, useState } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  MapPin,
  Ruler,
  Sparkles,
  Tags,
  X,
} from "lucide-react";
import { JsonLd, seo } from "~/utils/seo";
import { Breadcrumbs } from "~/components/whitefire/Breadcrumbs";
import { PrimaryButton } from "~/components/whitefire/PrimaryButton";
import { getProjectDetailData, getSiteConfig, img, withParams } from "~/lib/content";

const CATEGORY_LABELS: Record<string, string> = {
  commercial: "Commercial",
  "living-room": "Living Room",
  kitchen: "Kitchen",
  "home-office": "Home Office",
  bedroom: "Bedroom",
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export interface ProjectDetailData {
  slug: string;
  title: string;
  location: string;
  category: string;
  categoryLabel: string;
  completionDate: string;
  squareFootage: number | null;
  challenge: string;
  solution: string;
  process: string;
  materials: string[];
  colorPalette: string[];
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  storyImage: string;
  gallery: { url: string; caption: string }[];
  ctaImage: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { projectid } = params;

  const project = await getProjectDetailData(projectid ?? "");

  if (!project) {
    throw new Response("Project not found", { status: 404 });
  }

  const config = await getSiteConfig();

  const categoryLabel =
    CATEGORY_LABELS[project.category] || project.category || "Project";

  const data: ProjectDetailData = {
    ...project,
    categoryLabel,
    completionDate: formatDate(project.completionDate),
    heroImageAlt:
      project.heroImageAlt ||
      `${project.title}${project.location ? ` — ${project.location}` : ""}`,
    ctaImage: img(config?.servicesCtaImage, 1600, 1200),
  };

  return json(data);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const project = data as ProjectDetailData | undefined;
  if (!project) return [{ title: "Project | Whitefire Interior" }];

  return seo({
    title: `${project.metaTitle || project.title} | Whitefire Interior`,
    description:
      project.metaDescription ||
      project.challenge ||
      "Explore a Whitefire Interior project.",
    path: `/projects/${project.slug}`,
    image: project.heroImage,
  });
};

export default function ProjectDetailRoute() {
  const project = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#1C1A17]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://interior-deco-kappa.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "Projects", item: "https://interior-deco-kappa.vercel.app/projects" },
              { "@type": "ListItem", position: 3, name: project.title },
            ],
          }}
        />
        {project.heroImage ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "ImageObject",
              contentUrl: project.heroImage,
              representativeOfPage: true,
              caption: project.heroImageAlt || project.title,
              name: project.title,
            }}
          />
        ) : null}

        <main>
          <ProjectHero project={project} />
          <ProjectOverview project={project} />
          <ProjectStory project={project} />
          <ProjectGallery images={project.gallery} />
          <ProjectHighlights project={project} />
          <ProjectCta image={project.ctaImage} />
        </main>

        </div>
    </div>
  );
}

/* ----------  Hero  ---------- */

function ProjectHero({ project }: { project: ProjectDetailData }) {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[#0B0B0A] text-white">
      <ResponsiveImage
        src={project.heroImage}
        alt={project.heroImageAlt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,.94)_0%,rgba(5,5,4,.72)_30%,rgba(5,5,4,.30)_65%,rgba(5,5,4,.48)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1440px] flex-col px-6 pb-12 pt-7 md:px-10 lg:px-14">
        <Breadcrumbs
          dark
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        <div className="mt-auto max-w-[510px]">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89451]">
            {project.categoryLabel} Project
          </p>

          <h1 className="font-serif text-[42px] leading-[0.98] tracking-[-0.025em] md:text-[56px] lg:text-[64px]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[430px] text-[14px] leading-[1.75] text-white/90 md:text-[15px]">
            {project.challenge}
          </p>

          <a
            href="#gallery"
            className="mt-7 inline-flex items-center gap-5 bg-[#B89451] px-5 py-3.5 text-[10px] font-semibold tracking-[0.08em] transition-colors hover:bg-[#9E7C43]"
          >
            VIEW PROJECT GALLERY <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <a
        href="#gallery"
        aria-label="View all project photos"
        className="absolute bottom-8 right-8 z-10 hidden h-[88px] w-[88px] flex-col items-center justify-center rounded-full border border-[#B89451] bg-black/25 text-center transition-colors hover:bg-black/45 md:flex md:bottom-10 md:right-12"
      >
        <Camera size={20} strokeWidth={1.2} />
        <span className="mt-2 text-[8px] font-semibold leading-[1.2] tracking-[0.08em]">
          VIEW ALL
          <br />
          PHOTOS
        </span>
      </a>
    </section>
  );
}

/* ----------  Overview / facts  ---------- */

function ProjectOverview({ project }: { project: ProjectDetailData }) {
  return (
    <section className="border-b border-[#DDD8CF] bg-[#F5F2EC]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-7 md:px-10 lg:grid-cols-[1.05fr_2fr] lg:px-14 lg:py-8">
        <div className="max-w-[360px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#876B45]">
            Project Overview
          </p>
          <p className="mt-3 text-[12px] leading-[1.8] text-[#383530] md:text-[13px]">
            {project.challenge}
          </p>
        </div>

        <div className="grid grid-cols-2 border-[#DDD8CF] md:grid-cols-4 lg:border-l">
          <ProjectFact
            icon="map-pin"
            label="Location"
            value={project.location || "—"}
          />
          <ProjectFact
            icon="tags"
            label="Category"
            value={project.categoryLabel}
          />
          <ProjectFact
            icon="calendar-days"
            label="Completed"
            value={project.completionDate}
          />
          <ProjectFact
            icon="ruler"
            label="Size"
            value={
              project.squareFootage ? `${project.squareFootage} sq ft` : "—"
            }
          />
        </div>
      </div>
    </section>
  );
}

function ProjectFact({
  icon,
  label,
  value,
}: {
  icon: "map-pin" | "tags" | "calendar-days" | "ruler";
  label: string;
  value: string;
}) {
  const Icon =
    icon === "map-pin"
      ? MapPin
      : icon === "tags"
        ? Tags
        : icon === "calendar-days"
          ? CalendarDays
          : Ruler;

  return (
    <div className="flex min-h-[108px] flex-col items-center justify-center border-r border-[#DDD8CF] px-4 text-center last:border-r-0">
      <Icon size={24} strokeWidth={1.1} className="text-[#967445]" aria-hidden="true" />
      <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#4B4842]">
        {label}
      </span>
      <span className="mt-2 text-[11px] text-[#4B4842]">{value}</span>
    </div>
  );
}

/* ----------  Story  ---------- */

function ProjectStory({ project }: { project: ProjectDetailData }) {
  return (
    <section className="bg-[#F5F2EC]">
      <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-10 md:py-10 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.7fr] lg:gap-12">
          <div className="max-w-[320px]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#876B45]">
              About the Project
            </p>

            <h2 className="mt-3 font-serif text-[34px] leading-[1.05] tracking-[-0.02em] md:text-[42px]">
              The Story
            </h2>

            <p className="mt-5 text-[12px] leading-[1.8] text-[#4A4741] md:text-[13px]">
              {project.challenge}
            </p>

            <a
              href="#design-approach"
              className="mt-6 inline-flex items-center gap-4 border border-[#A78345] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#745B39] transition-colors hover:bg-[#A78345] hover:text-white"
            >
              The Design Approach <ArrowRight size={13} strokeWidth={1.3} />
            </a>
          </div>

          <figure className="overflow-hidden">
            <ResponsiveImage
              src={project.storyImage}
              alt={`${project.title} — interior view`}
              loading="lazy"
              className="aspect-[1.7/1] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ----------  Gallery + lightbox  ---------- */

function ProjectGallery({ images }: { images: ProjectDetailData["gallery"] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const previous = () =>
    setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () =>
    setActive((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <section id="gallery" className="bg-[#F5F2EC] px-4 pb-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5 md:overflow-visible">
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setActive(index)}
                className="group relative min-w-[205px] overflow-hidden focus-visible:ring-2 focus-visible:ring-[#A9854D] md:min-w-0"
                aria-label={`Open project photo ${index + 1}`}
              >
                <ResponsiveImage
                  src={image.url}
                  alt={image.caption}
                  loading="lazy"
                  className="aspect-[1.05/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 p-2 text-white transition-colors hover:text-[#C09A5A]"
          >
            <X size={26} strokeWidth={1.2} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white transition-colors hover:text-[#C09A5A] md:left-8"
          >
            <ChevronLeft size={30} strokeWidth={1.1} />
          </button>

          <figure
            className="flex max-h-[88vh] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ResponsiveImage
              src={withParams(images[active].url.split("?")[0], 1920, 1080)}
              alt={images[active].caption}
              className="max-h-[82vh] max-w-[92vw] object-contain"
            />
            {images[active].caption && (
              <figcaption className="mt-3 max-w-[92vw] text-center text-[10px] tracking-[0.12em] text-white/75">
                {images[active].caption}
              </figcaption>
            )}
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white transition-colors hover:text-[#C09A5A] md:right-8"
          >
            <ChevronRight size={30} strokeWidth={1.1} />
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.12em] text-white/75">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}

/* ----------  Highlights  ---------- */

function ProjectHighlights({ project }: { project: ProjectDetailData }) {
  return (
    <section
      id="design-approach"
      className="border-t border-[#DDD8CF] bg-[#F5F2EC]"
    >
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-3">
        <HighlightBlock
          icon="sparkles"
          eyebrow="Our Solution"
          description={project.solution}
        />

        <HighlightBlock
          icon="lightbulb"
          eyebrow="The Process"
          description={project.process}
        />

        <article className="px-6 py-7 md:px-10 lg:px-8">
          <div className="flex gap-5">
            <div className="shrink-0 pt-0.5 text-[#967445]">
              <Sparkles size={25} strokeWidth={1.05} />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#4B4842]">
                Materials & Finishes
              </p>

              {project.colorPalette.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  {project.colorPalette.map((hex) => (
                    <span
                      key={hex}
                      title={hex}
                      aria-label={hex}
                      className="h-8 w-8 rounded-full border border-black/10"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              )}

              <p className="mt-4 text-[11px] leading-[1.75] text-[#4C4943]">
                {project.materials.length > 0
                  ? project.materials.join(", ")
                  : "—"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function HighlightBlock({
  icon,
  eyebrow,
  description,
}: {
  icon: "lightbulb" | "sparkles";
  eyebrow: string;
  description: string;
}) {
  return (
    <article className="border-b border-[#DDD8CF] px-6 py-7 md:px-10 lg:border-b-0 lg:border-r lg:px-8">
      <div className="flex gap-5">
        <div className="shrink-0 pt-0.5 text-[#967445]">
          {icon === "sparkles" ? (
            <Sparkles size={25} strokeWidth={1.05} />
          ) : (
            <Lightbulb size={25} strokeWidth={1.05} />
          )}
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#4B4842]">
            {eyebrow}
          </p>
          <p className="mt-3 text-[11px] leading-[1.75] text-[#4C4943]">
            {description || "—"}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ----------  CTA  ---------- */

function ProjectCta({ image }: { image: string }) {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0A] text-white">
      <ResponsiveImage
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute right-0 top-0 h-full w-[44%] object-cover opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0B0B0A] via-[#0B0B0A]/95 to-[#0B0B0A]/25"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-9 md:px-10 lg:px-14 lg:py-10">
        <div className="max-w-[560px]">
          <h2 className="font-serif text-[30px] leading-[1.1] md:text-[36px]">
            Have a Project in Mind?
          </h2>

          <p className="mt-2 text-[12px] text-white/85 md:text-[13px]">
            Let's create a space that reflects your vision and inspires.
          </p>

          <div className="mt-5">
            <PrimaryButton href="/contact">GET IN TOUCH</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}