import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import { lazy, Suspense } from "react";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BedDouble,
  Boxes,
  Building2,
  ChefHat,
  Hammer,
  LayoutGrid,
  Minus,
  Play,
  Sofa,
  Sparkles,
  Store,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";

const ClientTestimonials = lazy(() =>
  import("~/components/whitefire/ClientTestimonials")
);

import { SectionEyebrow } from "~/components/whitefire/SectionEyebrow";
import { seo } from "~/utils/seo";
import { NewsletterForm } from "~/components/whitefire/NewsletterForm";
import { getHomePageData, getSiteConfig } from "~/lib/content";
import { handleNewsletterAction, NewsletterActionData } from "~/lib/forms";

interface ImageAsset {
  src: string;
  alt: string;
}

interface HeroData {
  eyebrow: string;
  title: string[];
  description: string;
  primaryCta: { label: string; href: string };
  showreel: { label: string; href: string };
  image?: ImageAsset;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
}

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  location: string;
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

function IconForService({ name }: { name: string }) {
  const className = "h-7 w-7 stroke-[1.2]";

  switch (name) {
    case "LayoutGrid":
      return <LayoutGrid className={className} />;
    case "Armchair":
      return <LayoutGrid className={className} />;
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
      return <LayoutGrid className={className} />;
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

function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9A7A4A]">
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif text-[36px] leading-[1.02] text-[#211F1B] sm:text-[40px] ${
          align === "center" ? "mx-auto max-w-[560px]" : "max-w-[560px]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function HomeHero({
  image,
  hero,
}: {
  image?: string | null;
  hero: HeroData;
}) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#171716] sm:min-h-[680px] lg:min-h-[720px]">
      <ResponsiveImage
        src={image ?? hero.image?.src ?? ""}
        alt={hero.image?.alt ?? ""}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

      <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-center px-6 pt-24 sm:min-h-[680px] sm:px-8 lg:min-h-[720px] lg:px-20 lg:pt-12">
        <div className="max-w-[590px]">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#C3A56E]">
            {hero.eyebrow}
          </p>

          <h1 className="font-serif text-[48px] leading-[0.98] tracking-[-0.025em] text-white sm:text-[62px] lg:text-[72px]">
            {hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[440px] text-sm leading-6 text-white/85 sm:text-[15px]">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 bg-[#B89558] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#A8844D]"
            >
              {hero.primaryCta.label}
              <ArrowRight size={14} />
            </a>

            <a
              href={hero.showreel.href}
              className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 transition-colors group-hover:bg-white group-hover:text-black">
                <Play size={12} fill="currentColor" />
              </span>
              {hero.showreel.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({
  services,
  eyebrow,
  title,
}: {
  services: ServiceItem[];
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="bg-[#F7F4EE] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
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

function HomeStudioStatement({
  image,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  image?: string | null;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-[#171716] text-white">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative min-h-[390px] overflow-hidden lg:min-h-[460px]">
          <ResponsiveImage
            src={image ?? ""}
            alt="Elegant interior seating area"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="flex min-h-[390px] items-center bg-[#181817] px-8 py-14 sm:px-12 lg:min-h-[460px] lg:px-20">
          <div className="max-w-[480px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C3A56E]">
              {eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-[40px] leading-[1.02] sm:text-[48px]">
              {title}
            </h2>

            <p className="mt-6 max-w-[430px] text-sm leading-6 text-white/75">
              {body}
            </p>

            <a
              href={ctaHref}
              className="mt-7 inline-flex border border-white/30 px-5 py-3 text-[9px] font-medium uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black"
            >
              {ctaLabel}
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
  clientsEyebrow,
  clientsTitle,
  brandsEyebrow,
}: {
  logos: ClientLogo[];
  testimonials: Testimonial[];
  clientsEyebrow: string;
  clientsTitle: string;
  brandsEyebrow: string;
}) {
  const hasLogos = logos.length > 0;

  return (
    <section className="bg-[#F7F4EE]">
      <div className="mx-auto grid max-w-[1280px] lg:grid-cols-[0.9fr_1.5fr]">
        <div className="min-w-0 px-8 py-16 lg:border-r lg:border-[#25221E]/15 lg:px-12 lg:py-20">
          <Suspense fallback={null}>
            <ClientTestimonials
              testimonials={testimonials}
              clientsEyebrow={clientsEyebrow}
              clientsTitle={clientsTitle}
            />
          </Suspense>
        </div>

        <div className="min-w-0 px-8 py-16 lg:px-12 lg:py-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9A7A4A]">
            {brandsEyebrow}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {(logos.length > 0 ? logos : []).map((logo) => (
              <div
                key={logo.id}
                className="flex min-h-[42px] items-center justify-center"
              >
                {hasLogos ? (
                  <ResponsiveImage
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
      <ResponsiveImage
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

function FeaturedProjectsSection({
  projects,
  eyebrow,
  title,
  ctaLabel,
}: {
  projects: ProjectCardData[];
  eyebrow: string;
  title: string;
  ctaLabel: string;
}) {
  return (
    <section className="bg-[#F7F4EE] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} />

          <a
            href="/projects"
            className="inline-flex self-start border border-[#6C604F]/40 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302C26] transition-colors hover:bg-[#302C26] hover:text-white sm:self-auto"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeStats({ stats }: { stats: StatItem[] }) {
  return (
    <section className="bg-[#171716] text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
        <ResponsiveImage
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

function LatestArticlesSection({
  articles,
  eyebrow,
  title,
  ctaLabel,
}: {
  articles: ArticleCardData[];
  eyebrow: string;
  title: string;
  ctaLabel: string;
}) {
  return (
    <section className="bg-[#F7F4EE] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} />

          <a
            href="/blog"
            className="inline-flex self-start border border-[#6C604F]/40 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302C26] transition-colors hover:bg-[#302C26] hover:text-white sm:self-auto"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterCTA({ image }: { image?: string | null }) {
  const actionData =
    useActionData<typeof action>() as NewsletterActionData | undefined;

  return (
    <section className="relative overflow-hidden bg-[#332B24] text-white">
      <ResponsiveImage
        src={image ?? ""}
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

        <div className="mx-auto mt-8 max-w-[620px]">
          <NewsletterForm variant="home" actionData={actionData} />
        </div>
      </div>
    </section>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return handleNewsletterAction(request, "home-newsletter");
}

export async function loader() {
  const [home, config] = await Promise.all([getHomePageData(), getSiteConfig()]);

  return json({
    ...home,
    heroImageFallback: "",
    newsletter: {
      eyebrow: config?.newsletterEyebrow ?? "JOIN OUR COMMUNITY",
      title: config?.newsletterTitle ?? "Design Inspiration Straight to Your Inbox",
      body:
        config?.newsletterBody ??
        "Get the latest trends, project updates and exclusive design tips delivered to your inbox.",
    },
  });
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#E8E2D8]">
      <div className="mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <HomeHero image={data.heroImages[0]} hero={data.hero as HeroData} />

        <main>
          <ServicesSection
            services={data.services}
            eyebrow={data.servicesEyebrow}
            title={data.servicesTitle}
          />
          <HomeStudioStatement
            image={data.studioImage}
            eyebrow={data.studioEyebrow}
            title={data.studioTitle}
            body={data.studioBody}
            ctaLabel={data.studioCtaLabel}
            ctaHref={data.studioCtaHref}
          />
          <TestimonialsTrustSection
            logos={data.clientLogos}
            testimonials={data.testimonials}
            clientsEyebrow={data.clientsEyebrow}
            clientsTitle={data.clientsTitle}
            brandsEyebrow={data.brandsEyebrow}
          />
          <FeaturedProjectsSection
            projects={data.projects}
            eyebrow={data.projectsEyebrow}
            title={data.projectsTitle}
            ctaLabel={data.projectsCtaLabel}
          />
          <HomeStats stats={data.stats} />
          <LatestArticlesSection
            articles={data.articles}
            eyebrow={data.articlesEyebrow}
            title={data.articlesTitle}
            ctaLabel={data.articlesCtaLabel}
          />
          <NewsletterCTA image={data.heroImages[1]} />
        </main>

        </div>
    </div>
  );
}

export const meta: MetaFunction = ({ data }) => {
  return seo({
    title:
      (data as any)?.metaTitle || "Whitefire Interior — Amsterdam Interior Design Studio",
    description:
      (data as any)?.metaDescription ||
      "Whitefire Interior — an Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.",
    path: "/",
    image:
      "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max",
  });
};

export const links = () => [];