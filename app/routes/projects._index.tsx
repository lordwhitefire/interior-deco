import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Grid2X2,
  List,
} from "lucide-react";
import { seo } from "~/utils/seo";
import { PrimaryButton } from "~/components/whitefire/PrimaryButton";
import { getProjectsIndexData, getSiteConfig, img } from "~/lib/content";

const CATEGORIES = [
  "All Projects",
  "Commercial",
  "Living Room",
  "Kitchen",
  "Home Office",
  "Bedroom",
] as const;

type Category = (typeof CATEGORIES)[number];
type Sort = "newest" | "oldest" | "a-z" | "z-a";
type ViewMode = "grid" | "list";

const PAGE_SIZE = 9;

const CATEGORY_LABELS: Record<string, string> = {
  commercial: "Commercial",
  "living-room": "Living Room",
  kitchen: "Kitchen",
  "home-office": "Home Office",
  bedroom: "Bedroom",
};

const HERO_SLUG = "london-mayfair-townhouse";

export interface ProjectCardData {
  slug: string;
  title: string;
  location: string;
  category: string;
  completionDate: string | null;
  image: string;
  imageAlt: string;
}

export async function loader({}: LoaderFunctionArgs) {
  const [data, config] = await Promise.all([
    getProjectsIndexData(),
    getSiteConfig(),
  ]);

  return json({
    ...data,
    ctaImage: img(config?.servicesCtaImage, 1600, 900),
  });
}

export const meta: MetaFunction = () => {
  return seo({
    title: "Projects | Whitefire Interior",
    description:
      "Explore Whitefire Interior's curated portfolio of residential, commercial, and hospitality interiors created with timeless design and thoughtful detail.",
    path: "/projects",
  });
};

export default function ProjectsPage() {
  const data = useLoaderData<typeof loader>();
  const [category, setCategory] = useState<Category>("All Projects");
  const [sort, setSort] = useState<Sort>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let next = [...data.projects];

    if (category !== "All Projects") {
      const raw = Object.keys(CATEGORY_LABELS).find(
        (k) => CATEGORY_LABELS[k] === category
      );
      next = next.filter((p) => p.category === raw);
    }

    next.sort((a, b) => {
      if (sort === "newest")
        return (b.completionDate ?? "").localeCompare(a.completionDate ?? "");
      if (sort === "oldest")
        return (a.completionDate ?? "").localeCompare(b.completionDate ?? "");
      if (sort === "a-z") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return next;
  }, [data.projects, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changeCategory = (value: Category) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#292725]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">

        <main>
          <PortfolioHero
            image={data.heroImage}
            imageAlt={data.heroImageAlt}
          />

          <section className="bg-[#f3f1ee] px-6 py-7 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-[1312px]">
              <h2 className="sr-only">Our projects</h2>

              <PortfolioToolbar
                category={category}
                sort={sort}
                viewMode={viewMode}
                onCategoryChange={changeCategory}
                onSortChange={(value) => {
                  setSort(value);
                  setPage(1);
                }}
                onViewModeChange={setViewMode}
              />

              {visible.length > 0 ? (
                <div
                  id="projects-panel"
                  role="tabpanel"
                  aria-labelledby={tabId(category)}
                  tabIndex={0}
                  className={
                    viewMode === "grid"
                      ? "mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3"
                      : "mt-4 grid grid-cols-1 gap-3"
                  }
                >
                  {visible.map((project, index) => (
                    <PortfolioCard
                      key={project.slug}
                      project={project}
                      priority={index < 3}
                      variant={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <PortfolioEmptyState
                  onReset={() => changeCategory("All Projects")}
                />
              )}

              {filtered.length > PAGE_SIZE && (
                <PortfolioPagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </div>
          </section>

          <ConsultationCta image={data.ctaImage} />
        </main>

        </div>
    </div>
  );
}

/* ----------  Hero  ---------- */

function PortfolioHero({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate min-h-[390px] overflow-hidden bg-[#17130f] text-white sm:min-h-[430px] lg:min-h-[440px]">
      <ResponsiveImage
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        fetchPriority="high"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
      />

      <div className="relative mx-auto flex min-h-[390px] max-w-[1440px] items-end px-6 pb-10 pt-16 sm:min-h-[430px] sm:px-10 sm:pb-14 lg:min-h-[440px] lg:px-16 lg:pb-[66px]">
        <div className="max-w-[510px]">
          <p className="mb-4 text-[10px] font-semibold tracking-[0.14em] text-[#C09A5A] sm:text-[11px]">
            OUR PROJECTS
          </p>

          <h1 className="max-w-[520px] font-serif text-[46px] leading-[0.98] tracking-[-0.035em] sm:text-[58px] lg:text-[64px]">
            Spaces We're
            <br />
            Proud Of
          </h1>

          <p className="mt-5 max-w-[450px] text-[13px] leading-[1.65] text-white/85 sm:text-[15px]">
            A curated selection of spaces that reflect our passion for timeless
            design and thoughtful detail.
          </p>

          <a
            href="/contact"
            className="group mt-6 inline-flex min-h-[42px] items-center gap-5 bg-[#B79561] px-6 text-[10px] font-bold tracking-[0.08em] text-white transition-colors hover:bg-[#C6A66F]"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight
              size={16}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------  Toolbar  ---------- */

const tabId = (option: string) =>
  `projects-tab-${option.toLowerCase().replace(/\s+/g, "-")}`;

function PortfolioToolbar({
  category,
  sort,
  viewMode,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
}: {
  category: Category;
  sort: Sort;
  viewMode: ViewMode;
  onCategoryChange: (value: Category) => void;
  onSortChange: (value: Sort) => void;
  onViewModeChange: (value: ViewMode) => void;
}) {
  function handleTabKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
    currentIndex: number
  ) {
    let nextIndex = -1;

    if (event.key === "ArrowRight")
      nextIndex = (currentIndex + 1) % CATEGORIES.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = CATEGORIES.length - 1;

    if (nextIndex === -1) return;

    event.preventDefault();
    const next = CATEGORIES[nextIndex];
    onCategoryChange(next);
    document.getElementById(tabId(next))?.focus();
  }

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div
        className="-mx-1 flex overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Project categories"
        onKeyDown={(event) =>
          handleTabKeyDown(event, CATEGORIES.indexOf(category))
        }
      >
        {CATEGORIES.map((option) => {
          const active = category === option;
          return (
            <button
              key={option}
              id={tabId(option)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="projects-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => onCategoryChange(option)}
              className={[
                "shrink-0 px-4 py-2.5 text-[9px] font-semibold tracking-[0.04em] transition-colors sm:px-5",
                active
                  ? "bg-[#12110F] text-white"
                  : "text-[#2A2825] hover:text-[#9D7942]",
              ].join(" ")}
            >
              {option.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 xl:justify-end">
        <label className="relative">
          <span className="sr-only">Sort projects</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as Sort)}
            className="h-[38px] min-w-[130px] appearance-none border border-[#CFC9C1] bg-[#F7F5F2] pl-3 pr-9 text-[9px] font-semibold tracking-[0.04em] text-[#252320] outline-none focus:border-[#9F7B43]"
          >
            <option value="newest">SORT BY: NEWEST</option>
            <option value="oldest">SORT BY: OLDEST</option>
            <option value="a-z">SORT BY: A–Z</option>
            <option value="z-a">SORT BY: Z–A</option>
          </select>

          <ChevronDown
            aria-hidden="true"
            size={14}
            strokeWidth={1.4}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          />
        </label>

        <div
          className="flex items-center"
          aria-label="Project view"
          role="group"
        >
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
            className={[
              "flex h-[38px] w-[38px] items-center justify-center border focus-visible:ring-2 focus-visible:ring-[#A9854D]",
              viewMode === "grid"
                ? "border-[#171614] bg-[#171614] text-white"
                : "border-[#CFC9C1] bg-[#F7F5F2] text-[#272522]",
            ].join(" ")}
          >
            <Grid2X2 size={15} strokeWidth={1.25} />
          </button>

          <button
            type="button"
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
            className={[
              "ml-2 flex h-[38px] w-[38px] items-center justify-center border focus-visible:ring-2 focus-visible:ring-[#A9854D]",
              viewMode === "list"
                ? "border-[#171614] bg-[#171614] text-white"
                : "border-[#CFC9C1] bg-[#F7F5F2] text-[#272522]",
            ].join(" ")}
          >
            <List size={16} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------  Card  ---------- */

function PortfolioCard({
  project,
  priority = false,
  variant = "grid",
}: {
  project: ProjectCardData;
  priority?: boolean;
  variant?: ViewMode;
}) {
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category;

  if (variant === "list") {
    return (
      <a
        href={`/projects/${project.slug}`}
        className="group grid grid-cols-[120px_1fr] gap-4 border border-[#DDD7CF] bg-[#F8F6F3] p-2 transition-colors hover:border-[#A48656] sm:grid-cols-[220px_1fr] sm:gap-6"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <ResponsiveImage
            src={project.image}
            alt={project.imageAlt}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center py-3 pr-3">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-[#9B783F]">
            {categoryLabel.toUpperCase()}
          </p>

          <h3 className="mt-2 font-serif text-[24px] leading-[1.05] text-[#1D1B18] sm:text-[28px]">
            {project.title}
          </h3>

          <p className="mt-2 text-[12px] text-[#59534B]">{project.location}</p>

          <span className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold tracking-[0.08em] text-[#9B783F]">
            VIEW PROJECT
            <ArrowRight
              size={13}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-[#24211E] outline-none focus-visible:ring-2 focus-visible:ring-[#A9854D] focus-visible:ring-offset-2"
    >
      <ResponsiveImage
        src={project.image}
        alt={project.imageAlt}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/0 transition-opacity duration-500 group-hover:from-black/95"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[8px] font-semibold tracking-[0.12em] text-[#C09A5A] sm:text-[9px]">
          {categoryLabel.toUpperCase()}
        </p>

        <h3 className="mt-2 max-w-[320px] font-serif text-[18px] leading-[1.05] sm:text-[20px]">
          {project.title}
        </h3>

        <p className="mt-1 font-serif text-[13px] text-white/90 sm:text-[14px]">
          {project.location}
        </p>

        <span className="mt-3 inline-flex items-center gap-2 text-[8px] font-semibold tracking-[0.09em] text-[#C09A5A] sm:text-[9px]">
          VIEW PROJECT
          <ArrowRight
            size={13}
            strokeWidth={1.3}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  );
}

/* ----------  Pagination  ---------- */

function PortfolioPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      aria-label="Projects pagination"
      className="flex items-center justify-center gap-2 py-8 sm:py-10"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="flex h-[36px] w-[36px] items-center justify-center border border-[#D1CBC3] text-[#47423C] transition-colors hover:border-[#9F7B43] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft size={15} strokeWidth={1.2} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <button
            key={number}
            type="button"
            aria-current={page === number ? "page" : undefined}
            onClick={() => onPageChange(number)}
            className={[
              "flex h-[36px] w-[36px] items-center justify-center border text-[10px] font-semibold",
              page === number
                ? "border-[#171614] bg-[#171614] text-white"
                : "border-[#D1CBC3] bg-[#F7F5F2] text-[#47423C] hover:border-[#9F7B43]",
            ].join(" ")}
          >
            {number}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="flex h-[36px] w-[36px] items-center justify-center border border-[#D1CBC3] text-[#47423C] transition-colors hover:border-[#9F7B43] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowRight size={15} strokeWidth={1.2} />
      </button>
    </nav>
  );
}

/* ----------  Empty state  ---------- */

function PortfolioEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      id="projects-panel"
      role="tabpanel"
      aria-labelledby={tabId("All Projects")}
      tabIndex={0}
      className="my-8 border border-[#D5CEC6] bg-[#F8F6F3] px-6 py-16 text-center"
    >
      <p className="font-serif text-2xl text-[#25221E]">No projects found.</p>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B655D]">
        Try another project category or return to the complete portfolio.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 bg-[#171614] px-5 py-3 text-[10px] font-semibold tracking-[0.08em] text-white"
      >
        VIEW ALL PROJECTS
      </button>
    </div>
  );
}

/* ----------  CTA  ---------- */

function ConsultationCta({ image }: { image: string }) {
  return (
    <section className="relative overflow-hidden bg-[#171716] text-white">
      <ResponsiveImage
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#171716]/55" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-11 sm:px-10 lg:px-16 lg:py-12">
        <div className="max-w-[580px]">
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#C5A36A]">
            HAVE A PROJECT IN MIND?
          </p>

          <h2 className="mt-3 max-w-[520px] font-serif text-[31px] leading-[0.98] tracking-[-0.02em] sm:text-[37px]">
            Let's Create Something
            <br />
            Extraordinary Together
          </h2>

          <p className="mt-3 max-w-[500px] text-[12px] leading-[1.55] text-white/80 sm:text-[13px]">
            Whether it's a home, office, or hospitality space, we'd love to
            bring your vision to life.
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