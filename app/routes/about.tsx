// app/routes/about.tsx
// About page implemented from whitefire-about-ui-implementation.md (§7),
// copy verbatim from §22, content now served from Sanity (aboutPage doc).
import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CircleCheck, Leaf, ShieldCheck, UserRound } from "lucide-react";

import { SectionEyebrow } from "~/components/whitefire/SectionEyebrow";
import { PrimaryButton } from "~/components/whitefire/PrimaryButton";
import { seo } from "~/utils/seo";
import { getAboutPageData } from "~/lib/content";

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon: "timeless" | "sustainability" | "client" | "excellence";
}

export interface AboutProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutPageData {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: AboutImage;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: AboutImage;
  };
  values: {
    eyebrow: string;
    items: AboutValue[];
  };
  approach: {
    eyebrow: string;
    title: string;
    description: string;
    image: AboutImage;
    steps: AboutProcessStep[];
  };
  closingCta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: AboutImage;
  };
}

const mockAboutPageData: AboutPageData | null = null;

export async function loader({}: LoaderFunctionArgs) {
  const data = await getAboutPageData();
  if (!data) {
    throw new Response("About page not found", { status: 404 });
  }
  return json(data);
}

function AboutHero({ data }: { data: AboutPageData["hero"] }) {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden bg-[#11100F] md:min-h-[500px]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(10,9,8,.76) 0%, rgba(10,9,8,.55) 38%, rgba(10,9,8,.14) 78%, rgba(10,9,8,.32) 100%), linear-gradient(0deg, rgba(10,9,8,.28), rgba(10,9,8,.04)), url(${data.image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-h-[560px] max-w-[1440px] items-end px-6 pb-16 pt-32 md:min-h-[500px] md:px-10 md:pb-[66px] xl:px-[66px]">
        <div className="max-w-[590px]">
          <SectionEyebrow light>{data.eyebrow}</SectionEyebrow>

          <h1 className="mt-4 max-w-[650px] font-serif text-[47px] font-normal leading-[0.98] tracking-[-0.025em] text-white sm:text-[56px] md:text-[67px] xl:text-[75px]">
            {data.title}
          </h1>

          <p className="mt-5 max-w-[480px] text-[14px] leading-[1.6] text-white/90 md:text-[15px]">
            {data.description}
          </p>

          <div className="mt-6">
            <PrimaryButton href={data.ctaHref}>{data.ctaLabel}</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection({ data }: { data: AboutPageData["story"] }) {
  return (
    <section className="bg-[#F4F1EB] py-16 md:py-[68px]">
      <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-6 md:grid-cols-[0.84fr_1.16fr] md:gap-12 md:px-10 xl:px-[66px]">
        <div className="max-w-[405px]">
          <SectionEyebrow>{data.eyebrow}</SectionEyebrow>

          <h2 className="mt-4 font-serif text-[37px] font-normal leading-[1.05] tracking-[-0.02em] text-[#292725] md:text-[45px]">
            {data.title}
          </h2>

          <div className="mt-5 space-y-4 text-[14px] leading-[1.62] text-[#292725] md:text-[15px]">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <figure className="overflow-hidden">
          <ResponsiveImage
            src={data.image.src}
            alt={data.image.alt}
            className="h-[285px] w-full object-cover object-center md:h-[305px]"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}

function ValueIcon({ type }: { type: AboutValue["icon"] }) {
  if (type === "sustainability") {
    return <Leaf size={33} strokeWidth={1.15} />;
  }

  if (type === "client") {
    return <UserRound size={32} strokeWidth={1.15} />;
  }

  if (type === "excellence") {
    return <ShieldCheck size={33} strokeWidth={1.15} />;
  }

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="7.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12.5" cy="15" r="7.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="23.5" cy="15" r="7.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function ValuesSection({ data }: { data: AboutPageData["values"] }) {
  return (
    <section className="border-y border-[#DDD8CF] bg-[#F4F1EB] py-12 md:py-[48px]">
      <div className="mx-auto max-w-[1250px] px-6 md:px-10 xl:px-0">
        <div className="text-center">
          <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
        </div>

        <div className="mt-7 grid md:grid-cols-2 xl:grid-cols-4">
          {data.items.map((item, index) => (
            <article
              key={item.id}
              className={`px-5 py-7 text-center xl:py-2 ${
                index > 0 ? "border-t border-[#DDD8CF] xl:border-l xl:border-t-0" : ""
              }`}
            >
              <div className="flex justify-center text-[#9A7950]">
                <ValueIcon type={item.icon} />
              </div>

              <h3 className="mt-4 font-serif text-[18px] text-[#292725]">
                {item.title}
              </h3>

              <p className="mx-auto mt-2 max-w-[215px] text-[12px] leading-[1.65] text-[#45413C]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step }: { step: AboutProcessStep }) {
  return (
    <li className="flex items-start gap-2.5">
      <CircleCheck
        aria-hidden="true"
        className="mt-[2px] shrink-0 text-[#9A7950]"
        size={15}
        strokeWidth={1.3}
      />

      <span className="text-[12px] leading-[1.55] text-[#35322E]">
        <strong className="font-medium">{step.title}</strong>
        <span className="text-[#5E5952]"> — {step.description}</span>
      </span>
    </li>
  );
}

function ApproachSection({ data }: { data: AboutPageData["approach"] }) {
  return (
    <section id="our-approach" className="relative overflow-hidden bg-[#F8F6F1]">
      <div className="grid lg:grid-cols-2">
        <figure className="min-h-[310px] overflow-hidden">
          <ResponsiveImage
            src={data.image.src}
            alt={data.image.alt}
            className="h-full min-h-[310px] w-full object-cover object-center"
            loading="lazy"
          />
        </figure>

        <div className="flex items-center px-6 py-14 md:px-10 md:py-[62px] xl:px-[68px]">
          <div className="max-w-[560px]">
            <SectionEyebrow>{data.eyebrow}</SectionEyebrow>

            <h2 className="mt-4 font-serif text-[37px] font-normal leading-[1.06] tracking-[-0.02em] text-[#292725] md:text-[45px]">
              {data.title}
            </h2>

            <p className="mt-5 max-w-[500px] text-[14px] leading-[1.62] text-[#3F3B36]">
              {data.description}
            </p>

            <ol className="mt-5 space-y-2">
              {data.steps.map((step) => (
                <ProcessStep key={step.id} step={step} />
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent to-[#171614]"
      />
    </section>
  );
}

function AboutClosingCTA({
  data,
}: {
  data: AboutPageData["closingCta"];
}) {
  return (
    <section
      className="relative min-h-[330px] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(10,9,8,.82) 0%, rgba(10,9,8,.62) 48%, rgba(10,9,8,.30) 100%), url(${data.image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#171614] to-transparent"
      />
      <div className="relative z-10 mx-auto flex min-h-[330px] max-w-[1440px] items-center px-6 py-14 md:px-10 xl:px-[68px]">
        <div className="max-w-[480px]">
          <SectionEyebrow light>{data.eyebrow}</SectionEyebrow>

          <h2 className="mt-4 font-serif text-[43px] font-normal leading-[0.99] tracking-[-0.02em] text-white md:text-[52px]">
            {data.title}
          </h2>

          <p className="mt-4 max-w-[390px] text-[14px] leading-[1.6] text-white/90">
            {data.description}
          </p>

          <div className="mt-5">
            <PrimaryButton href={data.ctaHref}>
              {data.ctaLabel}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const data = useLoaderData<typeof loader>() as AboutPageData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#292725]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">

        <main>
          <AboutHero data={data.hero} />
          <StorySection data={data.story} />
          <ValuesSection data={data.values} />
          <ApproachSection data={data.approach} />
          <AboutClosingCTA data={data.closingCta} />
        </main>

        </div>
    </div>
  );
}

export default function AboutRoute() {
  return <AboutPage />;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return seo({
    title: data?.metaTitle || "About Whitefire Interior | Luxury Interior Design",
    description:
      data?.metaDescription ||
      "Discover Whitefire Interior, a luxury interior design studio creating timeless, functional spaces with thoughtful design and exceptional craftsmanship.",
    path: "/about",
    image:
      "https://cdn.sanity.io/images/pzhistba/production/5a658a27bf9f81cebbc25319f37dfbd5edcb8d38-1600x896.jpg?h=200&fit=max",
  });
};
