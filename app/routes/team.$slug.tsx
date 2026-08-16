import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  ArrowRight,
  Armchair,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Instagram,
  Leaf,
  Linkedin,
  MapPin,
  Medal,
  Pencil,
  PencilRuler,
  ShieldCheck,
  Sprout,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import { JsonLd, seo } from "~/utils/seo";
import { getTeamMemberData } from "~/lib/content";

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await getTeamMemberData(params.slug ?? "");

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(data);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.member) {
    return [{ title: "Team Member | Whitefire Interior" }];
  }
  const member = data.member;
  return seo({
    title: member.metaTitle || `${member.fullName} | Whitefire Interior`,
    description:
      member.metaDescription ||
      member.bio ||
      "Meet a member of the Whitefire Interior team.",
    path: `/team/${member.slug}`,
    image: member.photoUrl,
  });
};

export default function TeamMemberRoute() {
  const { member, previous, next, profileFixture, approachFixture, consultationCta } =
    useLoaderData<typeof loader>() as TeamMemberData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: member.fullName,
            jobTitle: member.role,
            image: member.photoUrl,
            description: member.bio,
            worksFor: {
              "@type": "Organization",
              name: "Whitefire Interior",
              url: "https://interior-deco-kappa.vercel.app",
            },
            ...(Array.isArray(member.social) && member.social.length > 0
              ? { sameAs: member.social.map((s: { url: string }) => s.url) }
              : {}),
          }}
        />

        <main>
          <TeamMemberHero member={member} />
          <ProfileSection member={member} profileFixture={profileFixture} />
          <FeaturedProjects member={member} />
          <ApproachSection member={member} approachFixture={approachFixture} />
          {previous && next && <TeamMemberPager previous={previous} next={next} />}
          <ConsultationCTA cta={consultationCta} />
        </main>

        </div>
    </div>
  );
}

type LoadedMember = {
  slug: string;
  fullName: string;
  role: string;
  bio: string;
  photoUrl: string;
  metaTitle?: string;
  metaDescription?: string;
  social: { platform: string; url: string }[];
  heroImage: { src: string; alt: string } | null;
  featuredProjects: {
    slug: string;
    title: string;
    location: string;
    image: string;
    imageAlt: string;
    href: string;
}[];
};

type TeamMemberData = {
  member: LoadedMember;
  previous: LoadedMember | null;
  next: LoadedMember | null;
  profileFixture: ProfileFixture;
  approachFixture: ApproachFixture;
  consultationCta: {
    eyebrow: string;
    headline: string;
    description: string;
    image: { src: string; alt: string };
    buttonLabel: string;
    buttonHref: string;
  };
};

function TeamMemberHero({ member }: { member: LoadedMember }) {
  const firstName = member.fullName.split(" ")[0];

  return (
    <section className="relative min-h-[286px] overflow-hidden bg-[#080807] text-white lg:min-h-[390px]">
      <ResponsiveImage
        src={member.heroImage?.src ?? ""}
        alt={member.heroImage?.alt ?? ""}
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

      <div className="relative mx-auto flex min-h-[286px] max-w-[1440px] flex-col justify-end px-7 pb-10 pt-28 sm:px-10 lg:min-h-[390px] lg:px-14 lg:pb-16 xl:px-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.12em]"
        >
          <Link to="/" className="text-white/65 transition hover:text-white">
            Home
          </Link>
          <span aria-hidden="true" className="text-[#c18b45]">
            /
          </span>
          <Link to="/team" className="text-[#c18b45] transition hover:text-[#d8a766]">
            Team
          </Link>
          <span aria-hidden="true" className="text-white/45">
            /
          </span>
          <span className="text-white/95">{member.fullName}</span>
        </nav>

        <h1 className="font-serif text-[34px] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[42px] lg:text-[48px]">
          {member.fullName}
        </h1>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c18b45]">
          {member.role}
        </p>

        <p className="mt-3 max-w-[480px] text-[13px] leading-6 text-white/85 lg:mt-4">
          {member.bio}
        </p>

        <div className="mt-5 flex items-center gap-3">
          {member.social.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              aria-label={`${member.fullName} on ${s.platform}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-[#c18b45] hover:text-[#c18b45]"
            >
              <SocialIcon platform={s.platform} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "linkedin") return <Linkedin size={17} strokeWidth={1.6} />;
  if (platform === "instagram") return <Instagram size={17} strokeWidth={1.6} />;
  return <span className="font-serif text-[11px]">P</span>;
}

function ProfileSection({
  member,
  profileFixture,
}: {
  member: LoadedMember;
  profileFixture: ProfileFixture;
}) {
  const firstName = member.fullName.split(" ")[0];

  return (
    <section className="bg-[#f5f3ef] px-6 py-12 sm:px-8 lg:px-12 xl:px-14">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 md:grid-cols-[43%_57%] md:gap-[45px] lg:gap-[55px]">
        <div className="mx-auto aspect-[0.88] w-full max-w-[520px] overflow-hidden bg-[#ddd8d0] md:mx-0">
          <ResponsiveImage
            src={member.photoUrl ?? ""}
            alt={`Portrait of ${member.fullName}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b6d36]">
            ABOUT {firstName.toUpperCase()}
          </p>

          <h2 className="mt-3 whitespace-pre-line font-serif text-[25px] font-normal leading-snug tracking-[-0.02em] text-[#171512] sm:text-[29px]">
            {profileFixture.headline}
          </h2>

          <span
            aria-hidden="true"
            className="mt-4 block h-px w-12 bg-[#a6783e]"
          />

          <div className="mt-5 space-y-4">
            {profileFixture.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-[12px] leading-7 text-[#2b2925]">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7">
            {profileFixture.facts.map((fact) => (
              <ProfileFactRow key={fact.key} fact={fact} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type ProfileFact = {
  key: string;
  label: string;
  values: string[];
  icon: string;
};

type ProfileFixture = {
  headline: string;
  paragraphs: string[];
  facts: ProfileFact[];
};

type ApproachFixture = {
  headline: string;
  description: string;
  steps: { id: string; title: string; description: string; icon: string }[];
};

function ProfileFactRow({ fact }: { fact: ProfileFact }) {
  const Icon =
    fact.icon === "graduation-cap"
      ? GraduationCap
      : fact.icon === "medal"
        ? Medal
        : fact.icon === "star"
          ? Star
          : MapPin;

  return (
    <li className="flex items-start gap-4 border-b border-[#e2ded6] py-4">
      <div
        aria-hidden="true"
        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-[#b99a6c] text-[#a16f35]"
      >
        <Icon size={20} strokeWidth={1.4} />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <p className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#a16f35]">
          {fact.label}
        </p>
        {fact.values.map((value, i) => (
          <p key={i} className="text-[12px] leading-6 text-[#1c1b18]">
            {value}
          </p>
        ))}
      </div>
    </li>
  );
}

function FeaturedProjects({ member }: { member: LoadedMember }) {
  return (
    <section className="border-t border-[#ebe7e0] bg-[#f7f4ee] px-6 py-11 sm:px-8 lg:px-12 xl:px-14">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b6d36]">
            FEATURED PROJECTS
          </p>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#171512] transition hover:text-[#a16f35]"
          >
            VIEW ALL PROJECTS
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {member.featuredProjects.map((project) => (
            <article key={project.slug} className="group">
              <Link
                to={project.href}
                className="block aspect-[16/8] overflow-hidden bg-[#ddd8d0]"
              >
                <ResponsiveImage
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </Link>

              <Link
                to={project.href}
                className="mt-3 block font-serif text-[17px] leading-tight tracking-[-0.02em] text-[#171512] transition hover:text-[#a16f35]"
              >
                {project.title}
              </Link>

              <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.13em] text-[#a16f35]">
                {project.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection({
  member,
  approachFixture,
}: {
  member: LoadedMember;
  approachFixture: ApproachFixture;
}) {
  const firstName = member.fullName.split(" ")[0];

  return (
    <section className="border-t border-[#e2ded6] bg-[#eeece8] px-6 py-11 sm:px-8 lg:px-12 xl:px-14">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 lg:grid-cols-[31%_69%]">
        <div className="max-w-[290px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b6d36]">
            {firstName.toUpperCase()}'S APPROACH
          </p>

          <h2 className="mt-3 whitespace-pre-line font-serif text-[25px] font-normal leading-snug tracking-[-0.02em] text-[#171512] sm:text-[29px]">
            {approachFixture.headline}
          </h2>

          <p className="mt-4 text-[12px] leading-7 text-[#2b2925]">
            {approachFixture.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {approachFixture.steps.map((step, i) => (
            <div
              key={step.id}
              className={i > 0 ? "lg:border-l lg:border-[#d8d3ca] lg:pl-8" : ""}
            >
              <ApproachStepIcon icon={step.icon} />
              <h3 className="mt-4 text-[11px] font-semibold text-[#11100e]">
                {step.title}
              </h3>
              <p className="mt-2 text-[10px] leading-[1.8] text-[#2b2925]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachStepIcon({ icon }: { icon: string }) {
  const Icon =
    icon === "users"
      ? Users
      : icon === "pencil"
        ? Pencil
        : icon === "armchair"
          ? Armchair
          : Sprout;
  return <Icon aria-hidden="true" size={28} strokeWidth={1.25} className="text-[#a97a40]" />;
}

function TeamMemberPager({
  previous,
  next,
}: {
  previous: { slug: string; fullName: string };
  next: { slug: string; fullName: string };
}) {
  return (
    <nav
      aria-label="Team member navigation"
      className="border-t border-[#e2ded6] bg-[#f7f4ee] px-6 py-8 sm:px-8 lg:px-12 xl:px-14"
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6">
        <Link
          to={`/team/${previous.slug}`}
          className="group flex min-w-0 items-center gap-3 text-left"
        >
          <ChevronLeft
            size={20}
            strokeWidth={1.5}
            className="shrink-0 text-[#a16f35] transition-transform duration-300 group-hover:-translate-x-1"
          />
          <div className="min-w-0">
            <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#a16f35]">
              PREVIOUS
            </p>
            <p className="truncate font-serif text-[15px] text-[#171512] transition group-hover:text-[#a16f35]">
              {previous.fullName}
            </p>
          </div>
        </Link>

        <Link
          to={`/team/${next.slug}`}
          className="group flex min-w-0 items-center gap-3 text-right"
        >
          <div className="min-w-0">
            <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#a16f35]">
              NEXT
            </p>
            <p className="truncate font-serif text-[15px] text-[#171512] transition group-hover:text-[#a16f35]">
              {next.fullName}
            </p>
          </div>
          <ChevronRight
            size={20}
            strokeWidth={1.5}
            className="shrink-0 text-[#a16f35] transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </nav>
  );
}

function ConsultationCTA({
  cta,
}: {
  cta: {
    eyebrow: string;
    headline: string;
    description: string;
    image: { src: string; alt: string };
    buttonLabel: string;
    buttonHref: string;
  };
}) {
  return (
    <section className="relative min-h-[134px] overflow-hidden bg-[#0a0a09] text-white">
      <ResponsiveImage
        src={cta.image.src}
        alt={cta.image.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(8,8,7,0.7)]"
      />

      <div className="relative mx-auto flex min-h-[134px] max-w-[1440px] flex-col items-start justify-center px-7 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 xl:px-16">
        <div className="max-w-[340px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#c28c43]">
            {cta.eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-[22px] leading-tight tracking-[-0.02em] sm:text-[24px]">
            {cta.headline}
          </h2>
        </div>

        <Link
          to={cta.buttonHref}
          className="mt-5 inline-flex items-center gap-3 bg-[#c2914e] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#d0a15f] lg:mt-0"
        >
          {cta.buttonLabel}
          <ArrowRight size={13} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}