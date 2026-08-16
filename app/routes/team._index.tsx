import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  ArrowRight,
  Leaf,
  Linkedin,
  PencilRuler,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { seo } from "~/utils/seo";
import { getTeamIndexData } from "~/lib/content";

export interface TeamIndexData {
  heroImage: string;
  heroImageAlt: string;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  values: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  shownMembers: {
    slug: string;
    fullName: string;
    role: string;
    order: number;
    featured: boolean;
    bio: string;
    photoUrl: string;
    social?: { platform: string; url: string }[];
  }[];
  projectCta: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    buttonLabel: string;
    buttonHref: string;
  };
  metaTitle: string;
  metaDescription: string;
}

export async function loader({}: LoaderFunctionArgs) {
  const data = await getTeamIndexData();
  return json(data satisfies TeamIndexData);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return seo({
    title: data?.metaTitle || "Our Team | Whitefire Interior",
    description:
      data?.metaDescription ||
      "Meet the designers, planners, and creatives behind Whitefire Interior's timeless spaces.",
    path: "/team",
    image: data?.heroImage,
  });
};

export default function TeamIndexRoute() {
  const data = useLoaderData<typeof loader>() as TeamIndexData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">

        <main>
          <TeamHero image={data.heroImage} imageAlt={data.heroImageAlt} />
          <TeamIntroduction intro={data.intro} />
          <TeamGrid members={data.shownMembers} />
          <ValuesSection values={data.values} />
          <ProjectCTA cta={data.projectCta} />
        </main>

        </div>
    </div>
  );
}

function TeamHero({ image, imageAlt }: { image: string; imageAlt: string }) {
  return (
    <section className="relative min-h-[397px] overflow-hidden bg-[#080807] text-white lg:min-h-[500px]">
      <ResponsiveImage
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[68%_52%]"
        loading="eager"
        fetchPriority="high"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.88)_25%,rgba(0,0,0,0.44)_48%,rgba(0,0,0,0.10)_78%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.40),transparent_45%)]"
      />

      <div className="relative mx-auto flex min-h-[397px] max-w-[1440px] items-end px-7 pb-12 pt-28 sm:px-10 lg:min-h-[500px] lg:px-14 lg:pb-20 xl:px-16">
        <div className="max-w-[540px]">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c18b45]">
            OUR TEAM
          </p>

          <h1 className="max-w-[520px] font-serif text-[42px] font-normal leading-[1.05] tracking-[-0.025em] sm:text-[50px] lg:text-[62px]">
            The People Behind Timeless Spaces
          </h1>

          <p className="mt-6 max-w-[450px] text-[13px] leading-7 text-white/90 sm:text-[14px] lg:text-[15px]">
            A passionate team of designers, planners, and creatives dedicated
            to transforming spaces and enhancing the way you live.
          </p>
        </div>
      </div>
    </section>
  );
}

function TeamIntroduction({
  intro,
}: {
  intro: TeamIndexData["intro"];
}) {
  return (
    <section className="bg-[#f5f3ef] px-6 pb-7 pt-8 text-center sm:px-8 lg:px-12 lg:pb-8 lg:pt-9">
      <div className="mx-auto max-w-[760px]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b6d36]">
          {intro.eyebrow}
        </p>

        <h2 className="mt-3 font-serif text-[26px] font-normal leading-tight tracking-[-0.02em] text-[#171512] sm:text-[30px] lg:text-[32px]">
          {intro.title}
        </h2>

        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-px w-12 bg-[#a6783e]"
        />

        <p className="mx-auto mt-5 max-w-[690px] text-[11px] leading-6 text-[#1c1b18] sm:text-[12px] lg:text-[13px]">
          {intro.description}
        </p>
      </div>
    </section>
  );
}

function TeamGrid({ members }: { members: TeamIndexData["shownMembers"] }) {
  return (
    <section
      aria-label="Whitefire Interior team members"
      className="bg-[#f5f3ef] px-6 pb-7 sm:px-8 lg:px-12 lg:pb-8 xl:px-14"
    >
      {members.length === 0 ? (
        <div className="border border-[#DDD8D0] bg-[#FAF8F4] px-6 py-12 text-center">
          <h3 className="font-serif text-2xl">No team members yet</h3>
          <p className="mt-2 text-sm text-[#5B5751]">
            Check back soon — our team is growing.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      )}
    </section>
  );
}

type StaffMember = TeamIndexData["shownMembers"][number];

function TeamCard({ member }: { member: StaffMember }) {
  const linkedIn = (member.social ?? []).find((s) => s.platform === "linkedin");

  return (
    <article className="group flex min-h-[380px] flex-col border border-[#ddd9d2] bg-[#f8f6f2] transition-colors duration-300 hover:border-[#b9935f] sm:min-h-[405px]">
      <Link
        to={`/team/${member.slug}`}
        className="relative block aspect-[0.84] overflow-hidden bg-[#ddd8d0]"
      >
        <ResponsiveImage
          src={member.photoUrl ?? ""}
          alt={`Portrait of ${member.fullName}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-3 pt-3 sm:px-4">
        <Link
          to={`/team/${member.slug}`}
          className="font-serif text-[19px] leading-tight tracking-[-0.02em] text-[#171512]"
        >
          {member.fullName}
        </Link>

        <p className="mt-2 text-[7px] font-bold uppercase tracking-[0.13em] text-[#a16f35]">
          {member.role}
        </p>

        <p className="mt-4 flex-1 text-[10px] leading-[1.8] text-[#272522]">
          {member.bio}
        </p>

        <div className="mt-4">
          <a
            href={linkedIn?.url ?? "#"}
            aria-label={`${member.fullName} on LinkedIn`}
            className="inline-flex text-[#171512] transition hover:text-[#a16f35]"
          >
            <Linkedin size={15} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </article>
  );
}

function ValuesSection({ values }: { values: TeamIndexData["values"] }) {
  return (
    <section className="border-t border-[#ebe7e0] bg-[#eeece8] px-6 py-7 sm:px-8 lg:px-12 lg:py-9">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b6d36]">
          OUR VALUES
        </p>

        <div className="mt-5 grid grid-cols-1 divide-y divide-[#d8d3ca] md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {values.map((value) => (
            <ValueItem key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}

type TeamValue = TeamIndexData["values"][number];

function ValueItem({ value }: { value: TeamValue }) {
  const Icon =
    value.icon === "users-round"
      ? UsersRound
      : value.icon === "pencil-ruler"
        ? PencilRuler
        : value.icon === "shield-check"
          ? ShieldCheck
          : Leaf;

  return (
    <article className="flex min-h-[150px] flex-col items-center px-7 py-6 text-center lg:px-8 lg:py-2">
      <Icon
        aria-hidden="true"
        size={31}
        strokeWidth={1.25}
        className="text-[#a97a40]"
      />

      <h3 className="mt-4 text-[11px] font-semibold text-[#11100e]">
        {value.title}
      </h3>

      <p className="mt-3 max-w-[215px] text-[10px] leading-[1.8] text-[#2b2925]">
        {value.description}
      </p>
    </article>
  );
}

function ProjectCTA({ cta }: { cta: TeamIndexData["projectCta"] }) {
  return (
    <section className="relative grid min-h-[186px] grid-cols-1 overflow-hidden bg-[#0e0e0c] text-white lg:grid-cols-[58%_42%]">
      <div className="relative min-h-[230px] lg:min-h-[300px]">
        <ResponsiveImage
          src={cta.image}
          alt={cta.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[35%_55%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-black/70"
        />
      </div>

      <div className="relative flex items-center bg-[#0b0b09] px-7 py-9 sm:px-10 lg:px-10 xl:px-12">
        <div className="max-w-[430px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#c28c43]">
            {cta.eyebrow}
          </p>

          <h2 className="mt-3 font-serif text-[26px] leading-tight tracking-[-0.02em] sm:text-[29px]">
            {cta.title}
          </h2>

          <p className="mt-3 max-w-[350px] text-[11px] leading-5 text-white/80">
            {cta.description}
          </p>

          <Link
            to={cta.buttonHref}
            className="mt-5 inline-flex items-center gap-3 bg-[#c2914e] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#d0a15f]"
          >
            {cta.buttonLabel}
            <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}