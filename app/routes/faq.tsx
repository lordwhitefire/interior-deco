import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { seo } from "~/utils/seo";
import { getFaqPageData } from "~/lib/content";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return seo({
    title: data?.seoTitle || "FAQ | Whitefire Interior",
    description:
      data?.seoDescription ||
      "Everything you need to know about our design process, pricing, timelines, consultations, and project-specific details.",
    path: "/faq",
  });
};

interface Category {
  id: string;
  title: string;
  cap: number;
  count: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const data = await getFaqPageData();

  const items: FaqItem[] = (data.items ?? [])
    .filter((i) => i.question && i.answer)
    .map((i) => ({
      id: i._id,
      question: i.question,
      answer: i.answer,
      category: i.category,
    }));

  const categoryOrder: string[] = (data.categories ?? [])
    .map((c) => c.title)
    .filter((title: string) => title !== "Service & Process");
  for (const item of items) {
    if (!categoryOrder.includes(item.category)) item.category = "General Questions";
  }

  const caps = [3, 4, 2, 4];
  const categories: Category[] = categoryOrder.map((title, index) => {
    const cap = caps[index] ?? 4;
    return {
      id: title,
      title,
      cap,
      count: Math.min(items.filter((i) => i.category === title).length, cap),
    };
  });

  return json({
    items,
    categories,
    hero: data.page.heroImage,
    heroImageAlt: data.page.heroImageAlt,
    sidebarImage: data.page.sidebarImage,
    sidebarImageAlt: data.page.sidebarImageAlt,
    ctaImage: data.page.ctaImage,
    ctaImageAlt: data.page.ctaImageAlt,
    seoTitle: data.page.seoTitle,
    seoDescription: data.page.seoDescription,
  });
};

export default function FaqRoute() {
  const {
    items,
    categories,
    hero,
    heroImageAlt,
    sidebarImage,
    sidebarImageAlt,
    ctaImage,
    ctaImageAlt,
  } = useLoaderData<typeof loader>();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const groups = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? items
        : items.filter((item) => item.category === activeCategory);
    const byCategory = new Map<string, FaqItem[]>();
    for (const item of filtered) {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category)!.push(item);
    }
    return categories
      .filter((category) => byCategory.has(category.title))
      .map((category) => ({
        category,
        items: byCategory.get(category.title)!.slice(0, category.cap),
      }));
  }, [items, categories, activeCategory]);

  const selectCategory = (key: string) => {
    setActiveCategory(key);
    setOpenItems(new Set());
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">

        <main>
          <FaqHero hero={hero} heroImageAlt={heroImageAlt} />

          <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 bg-[#F7F4EE] px-6 py-10 sm:px-8 md:grid-cols-[230px_1px_1fr] md:gap-[14px] md:py-12 lg:px-12">
            <div className="flex flex-col gap-8 md:pr-1">
              <FaqCategoryNavigation
                categories={categories}
                activeCategory={activeCategory}
                totalCount={categories.reduce((sum, category) => sum + category.count, 0)}
                onSelect={selectCategory}
              />
              <ContactPromptCard />
              <div className="hidden aspect-[4/5] overflow-hidden md:block">
                <ResponsiveImage
                  src={sidebarImage}
                  alt={sidebarImageAlt}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div aria-hidden="true" className="hidden w-px bg-[#d8d4ce] md:block" />

            <FaqContent groups={groups} openItems={openItems} onToggle={toggleItem} />
          </section>

          <ConsultationCTA image={ctaImage} imageAlt={ctaImageAlt} />
        </main>

        </div>
    </div>
  );
}

function FaqHero({ hero, heroImageAlt }: { hero?: string | null; heroImageAlt?: string }) {
  return (
    <section className="relative isolate min-h-[330px] overflow-hidden bg-[#0d0d0c]">
      {hero && (
        <ResponsiveImage
          src={hero}
          alt={heroImageAlt ?? "Whitefire Interior studio — frequently asked questions"}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,7,0.97)_0%,rgba(8,8,7,0.85)_30%,rgba(8,8,7,0.38)_68%,rgba(8,8,7,0.08)_100%)]"
      />

      <div className="mx-auto flex min-h-[330px] max-w-[1440px] items-start px-6 pb-[64px] pt-[104px] sm:px-10 lg:px-[62px]">
        <div className="max-w-[430px] text-white">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b48a4a]">
            FAQ
          </p>

          <h1 className="font-serif text-[40px] leading-[1.13] tracking-[-0.02em] sm:text-[44px]">
            Answers to Common
            <br />
            Questions
          </h1>

          <div className="my-6 h-px w-[52px] bg-[#b48a4a]" />

          <p className="max-w-[370px] text-[14px] leading-7 text-white/90 sm:text-[15px]">
            Everything you need to know about our process, pricing, and how we
            work with you to create beautiful spaces.
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqCategoryNavigation({
  categories,
  activeCategory,
  totalCount,
  onSelect,
}: {
  categories: Category[];
  activeCategory: string;
  totalCount: number;
  onSelect: (key: string) => void;
}) {
  return (
    <nav aria-label="FAQ categories" className="min-w-0">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f1f1f]">
        Categories
      </h2>

      <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
        <li>
          <button
            type="button"
            aria-pressed={activeCategory === "all"}
            onClick={() => onSelect("all")}
            className={[
              "flex min-h-[40px] w-full items-center justify-between gap-3 whitespace-nowrap px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#F7F4EE]",
              activeCategory === "all"
                ? "bg-[#e9e2d9] text-[#161616]"
                : "text-[#3a3836] hover:bg-[#f0ece6]",
            ].join(" ")}
          >
            All Questions
            <span className="text-[10px] text-[#6b665f]">{totalCount}</span>
          </button>
        </li>

        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => onSelect(category.id)}
              className={[
                "flex min-h-[40px] w-full items-center justify-between gap-3 whitespace-nowrap px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#F7F4EE]",
                activeCategory === category.id
                  ? "bg-[#e9e2d9] text-[#161616]"
                  : "text-[#3a3836] hover:bg-[#f0ece6]",
              ].join(" ")}
            >
              {category.title}
              <span className="text-[10px] text-[#6b665f]">{category.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ContactPromptCard() {
  return (
    <div className="bg-[#e9e2d9] px-[19px] py-[17px]">
      <h2 className="font-serif text-[18px] leading-[1.25] tracking-[-0.01em]">
        Still Have Questions?
      </h2>

      <p className="mt-2 text-[11px] leading-[1.75] text-[#3c3a38]">
        Our team is ready to help. Reach out to us and we'll be happy to answer
        anything on your mind.
      </p>

      <Link
        to="/contact"
        className="mt-3 inline-flex min-h-[40px] items-center gap-3 bg-[#2d2b2a] px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3d3a38] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#e9e2d9]"
      >
        CONTACT US
        <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </div>
  );
}

function FaqContent({
  groups,
  openItems,
  onToggle,
}: {
  groups: Array<{ category: Category; items: FaqItem[] }>;
  openItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  if (!groups.length) {
    return (
      <div className="flex min-h-[240px] items-center justify-center border border-[#d8d4ce]">
        <p className="text-[13px] text-[#5e5a56]">
          No questions in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {groups.map((group) => (
        <FaqSection
          key={group.category.id}
          category={group.category}
          items={group.items}
          openItems={openItems}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function FaqSection({
  category,
  items,
  openItems,
  onToggle,
}: {
  category: Category;
  items: FaqItem[];
  openItems: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <section aria-labelledby={`faq-group-${category.id}`}>
      <h2
        id={`faq-group-${category.id}`}
        className="mb-5 font-serif text-[22px] leading-tight tracking-[-0.01em]"
      >
        {category.title}
      </h2>

      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          open={openItems.has(item.id)}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </section>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <div className="border-b border-[#d8d4ce]">
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-[15px] text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b58a52]"
        >
          <span className="text-[13px] font-medium leading-[1.5] text-[#1f1f1f]">
            {item.question}
          </span>

          <span
            aria-hidden="true"
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#cbc4ba] text-[#171615]"
          >
            {open ? (
              <Minus size={13} strokeWidth={1.5} />
            ) : (
              <Plus size={13} strokeWidth={1.5} />
            )}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p className="pb-[17px] text-[12px] leading-[1.8] text-[#44413d]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function ConsultationCTA({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="grid min-h-[285px] bg-[#171717] lg:grid-cols-2">
      <div className="relative min-h-[230px] overflow-hidden">
        <ResponsiveImage
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/15" />
      </div>

      <div className="flex items-center px-7 py-10 text-white sm:px-10 lg:px-12">
        <div className="max-w-[470px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b48a4a]">
            READY TO START YOUR PROJECT?
          </p>

          <h2 className="mt-3 font-serif text-[26px] leading-[1.18] tracking-[-0.02em] sm:text-[29px]">
            Let's Create Something Beautiful Together
          </h2>

          <p className="mt-3 max-w-[390px] text-[13px] leading-6 text-white/85">
            Book a consultation with our team and take the first step towards
            your dream space.
          </p>

          <Link
            to="/contact"
            className="mt-5 inline-flex min-h-[43px] items-center gap-4 bg-[#b58a52] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c39b69] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#171717]"
          >
            SCHEDULE A CONSULTATION
            <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}