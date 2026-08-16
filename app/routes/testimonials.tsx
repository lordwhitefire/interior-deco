import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { CalendarDays, ChevronRight, Star, Users } from "lucide-react";
import { seo } from "~/utils/seo";
import { getTestimonialsPageData } from "~/lib/content";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return seo({
    title: data?.metaTitle || "Testimonials | Whitefire Interior",
    description:
      data?.metaDescription ||
      "Discover what Whitefire Interior clients say about their interior design projects and experiences.",
    path: "/testimonials",
    image: data?.hero.image.src,
  });
};

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  projectName: string;
  location: string;
  clientImage?: string;
  clientImageAlt?: string;
  projectSlug?: string;
}

interface TrustStat {
  id: string;
  value: string;
  label: string;
  icon: "armchair" | "users" | "star" | "calendar";
}

interface TestimonialsPageData {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string[];
    description: string;
    image: { src: string; alt: string };
  };
  intro: { eyebrow: string; title: string; description: string };
  testimonials: Testimonial[];
  stats: TrustStat[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: { src: string; alt: string };
  };
}

export const loader = async ({}: LoaderFunctionArgs) => {
  return json(await getTestimonialsPageData());
};

export default function TestimonialsRoute() {
  const data = useLoaderData<typeof loader>() as TestimonialsPageData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">

        <main>
          <TestimonialsHero hero={data.hero} />
          <Intro intro={data.intro} />
          <TestimonialGrid testimonials={data.testimonials} />
          <TrustStats stats={data.stats} />
          <ConsultationCTA cta={data.cta} />
        </main>

        </div>
    </div>
  );
}

function TestimonialsHero({
  hero,
}: {
  hero: {
    eyebrow: string;
    title: string[];
    description: string;
    image: { src: string; alt: string };
  };
}) {
  return (
    <section className="relative isolate min-h-[330px] overflow-hidden bg-[#0d0d0c]">
      <ResponsiveImage
        src={hero.image.src}
        alt={hero.image.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,7,0.97)_0%,rgba(8,8,7,0.85)_30%,rgba(8,8,7,0.38)_68%,rgba(8,8,7,0.08)_100%)]"
      />

      <div className="mx-auto flex min-h-[330px] max-w-[1440px] items-start px-6 py-[64px] sm:px-10 lg:px-[62px]">
        <div className="max-w-[430px] text-white">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b48a4a]">
            {hero.eyebrow}
          </p>

          <h1 className="font-serif text-[40px] leading-[1.13] tracking-[-0.02em] sm:text-[44px]">
            {hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="my-6 h-px w-[52px] bg-[#b48a4a]" />

          <p className="max-w-[370px] text-[14px] leading-7 text-white/90 sm:text-[15px]">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function Intro({
  intro,
}: {
  intro: { eyebrow: string; title: string; description: string };
}) {
  return (
    <header className="mx-auto max-w-[700px] px-6 pt-9 text-center sm:px-8 lg:px-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#a8783e]">
        {intro.eyebrow}
      </p>

      <h2
        id="testimonials-heading"
        className="mt-3 font-serif text-[28px] leading-tight tracking-[-0.02em] sm:text-[31px]"
      >
        {intro.title}
      </h2>

      <div className="mx-auto my-4 h-px w-[46px] bg-[#b48a4a]" />

      <p className="mx-auto max-w-[650px] text-[13px] leading-6 text-[#292929] sm:text-[14px]">
        {intro.description}
      </p>
    </header>
  );
}

function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) {
    return (
      <div className="mt-7 border border-[#ded8d0] bg-[#f1ede8] px-6 py-12 text-center">
        <p className="font-serif text-xl">Testimonials coming soon.</p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#F7F4EE] px-6 pb-7 pt-7 sm:px-8 lg:px-12 lg:pb-8"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex min-h-[228px] flex-col bg-[#efebe7] px-[21px] py-[18px]">
      <div
        aria-hidden="true"
        className="font-serif text-[39px] leading-none text-[#b08a52]"
      >
        "
      </div>

      <blockquote className="mt-1 text-[13px] leading-[1.7] text-[#171717]">
        {testimonial.quote}
      </blockquote>

      <div className="mt-auto pt-5">
        <div className="mb-4 h-px w-[26px] bg-[#c9bfb2]" />

        <div className="flex items-center gap-3">
          {testimonial.clientImage ? (
            <ResponsiveImage
              src={testimonial.clientImage}
              alt={testimonial.clientImageAlt ?? ""}
              className="h-[50px] w-[50px] shrink-0 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              aria-hidden="true"
              className="h-[50px] w-[50px] shrink-0 rounded-full bg-[#d8d1c8]"
            />
          )}

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#171717]">
              {testimonial.clientName}
            </p>
            <p className="mt-1 text-[9px] font-medium uppercase leading-[1.55] tracking-[0.11em] text-[#5e5a56]">
              {testimonial.projectSlug ? (
                <Link
                  to={`/projects/${testimonial.projectSlug}`}
                  className="transition-colors hover:text-[#a8793f]"
                >
                  {testimonial.projectName}
                </Link>
              ) : (
                testimonial.projectName
              )}
              <br />
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function TrustStats({ stats }: { stats: TrustStat[] }) {
  return (
    <section
      aria-label="Whitefire Interior statistics"
      className="mx-auto mt-2 max-w-[1320px] grid grid-cols-2 border-y border-[#ddd7d0] px-6 sm:px-8 lg:grid-cols-4 lg:px-12"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className={[
            "flex min-h-[90px] items-center justify-center gap-3 px-3 py-5",
            index % 2 !== 0 ? "border-l border-[#ddd7d0]" : "",
            index >= 2 ? "border-t border-[#ddd7d0]" : "",
            index > 0 ? "lg:border-l" : "",
            "lg:border-t-0",
          ].join(" ")}
        >
          <StatIcon type={stat.icon} />

          <div>
            <p className="font-serif text-[27px] leading-none tracking-[-0.02em] sm:text-[30px]">
              {stat.value}
            </p>
            <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#383838] sm:text-[9px]">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

function StatIcon({ type }: { type: TrustStat["icon"] }) {
  const common = {
    size: 29,
    strokeWidth: 1.35,
    className: "text-[#a8793f]",
    "aria-hidden": true as const,
  };

  switch (type) {
    case "users":
      return <Users {...common} />;
    case "star":
      return <Star {...common} />;
    case "calendar":
      return <CalendarDays {...common} />;
    case "armchair":
    default:
      return (
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center text-[25px] leading-none text-[#a8793f]"
        >
          ♧
        </span>
      );
  }
}

function ConsultationCTA({
  cta,
}: {
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: { src: string; alt: string };
  };
}) {
  return (
    <section className="grid min-h-[285px] bg-[#171717] lg:grid-cols-[55%_45%]">
      <div className="relative min-h-[230px] overflow-hidden">
        <ResponsiveImage
          src={cta.image.src}
          alt={cta.image.alt}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/15" />
      </div>

      <div className="flex items-center px-7 py-10 text-white sm:px-10 lg:px-12">
        <div className="max-w-[470px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b48a4a]">
            {cta.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-[26px] leading-[1.18] tracking-[-0.02em] sm:text-[29px]">
            {cta.title}
          </h2>

          <p className="mt-3 max-w-[390px] text-[13px] leading-6 text-white/85">
            {cta.description}
          </p>

          <Link
            to={cta.ctaHref}
            className="mt-5 inline-flex min-h-[43px] items-center gap-4 bg-[#b58a52] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c39b69] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#171717]"
          >
            {cta.ctaLabel}
            <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}