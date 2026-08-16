import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link, useSearchParams } from "@remix-run/react";
import {
  ArrowRight,
  Search,
} from "lucide-react";
import { SiteHeader } from "~/components/whitefire/SiteHeader";
import { SiteFooter } from "~/components/whitefire/SiteFooter";
import { seo } from "~/utils/seo";
import {
  articles,
  blogHero,
  categories,
  featuredArticle,
  philosophy,
  type Article,
  type BlogCategory,
} from "~/data/blogMock";

export const meta: MetaFunction = () => {
  return seo({
    title: "Blog | Whitefire Interior",
    description:
      "Design inspiration, interior trends, and expert advice from Whitefire Interior for creating timeless, thoughtful spaces.",
    path: "/blog",
    image: blogHero.src,
  });
};

const PAGE_SIZE = 6;
const TOTAL_PAGES = 3;

export default function BlogRoute() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const page = Math.min(
    Math.max(Number(searchParams.get("page") ?? "1"), 1),
    TOTAL_PAGES
  );

  const filtered = articles.filter((article) => {
    if (category !== "all" && article.categorySlug !== category) return false;
    if (query.trim()) {
      const normalized = query.toLowerCase();
      return [article.title, article.excerpt, article.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    }
    return true;
  });

  const visible = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <SiteHeader activePath="/blog" />

        <main>
          <BlogHero />

          <section
            aria-labelledby="latest-articles-heading"
            className="bg-[#F7F4EE]"
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-10 lg:px-[68px] lg:py-12">
              <div className="min-w-0">
                <h2
                  id="latest-articles-heading"
                  className="mb-7 font-serif text-[30px] leading-none text-[#171615]"
                >
                  Latest Articles
                </h2>

                <BlogArticleGrid articles={visible} />

                <BlogPagination
                  currentPage={page}
                  query={query}
                  category={category}
                />
              </div>

              <aside className="space-y-7" aria-label="Blog sidebar">
                <BlogSearch initialQuery={query} />

                <BlogCategories
                  categories={categories}
                  activeCategory={category}
                />

                <FeaturedPostCard article={featuredArticle} />

                <NewsletterCTA />
              </aside>
            </div>
          </section>

          <BlogPhilosophyCTA />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

/* ----------  Hero  ---------- */

function BlogHero() {
  return (
    <section className="relative flex min-h-[350px] items-end overflow-hidden bg-[#111] pt-[68px] lg:min-h-[390px]">
      <img
        src={blogHero.src}
        alt={blogHero.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.7)_33%,rgba(0,0,0,0.18)_75%,rgba(0,0,0,0.12)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-8 lg:px-[72px] lg:pb-[60px]">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.17em] text-[#C09A54]">
          OUR BLOG
        </p>

        <h1 className="max-w-[620px] font-serif text-[42px] leading-[0.98] text-white sm:text-[50px] lg:text-[62px]">
          Design Inspiration & Expert Insights
        </h1>

        <p className="mt-5 max-w-[390px] text-[13px] leading-6 text-white/85 sm:text-[14px]">
          Ideas, trends, and timeless advice to help you create beautiful,
          meaningful spaces.
        </p>
      </div>
    </section>
  );
}

/* ----------  Article cards  ---------- */

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group overflow-hidden border border-[#DDD8D0] bg-[#FAF8F4]">
      <Link to={`/blog/${article.slug}`} className="block focus:outline-none">
        <div className="overflow-hidden">
          <img
            src={article.image.src}
            alt={article.image.alt}
            loading="lazy"
            className="aspect-[1.45/1] w-full object-cover transition duration-500 group-hover:scale-[1.025] group-focus-within:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9B7540]">
            {article.category}
          </p>

          <h3 className="mt-2 font-serif text-[20px] leading-[1.12] text-[#201E1B]">
            {article.title}
          </h3>

          <p className="mt-3 text-[12px] leading-[1.7] text-[#5B5751]">
            {article.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.13em] text-[#403D38]">
            <time dateTime={article.date}>{article.date}</time>
            <span aria-hidden="true">•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function BlogArticleGrid({ articles: items }: { articles: Article[] }) {
  if (!items.length) {
    return (
      <div className="border border-[#DDD8D0] bg-[#FAF8F4] px-6 py-12 text-center">
        <h3 className="font-serif text-2xl">No articles found</h3>
        <p className="mt-2 text-sm text-[#5B5751]">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

/* ----------  Sidebar  ---------- */

function BlogSearch({ initialQuery }: { initialQuery: string }) {
  return (
    <Form method="get" role="search" className="relative">
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>

      <input
        id="blog-search"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search articles..."
        className="h-10 w-full border border-[#D9D4CC] bg-transparent px-3 pr-11 text-[11px] text-[#25231F] outline-none transition placeholder:text-[#9A968F] focus:border-[#A98446] focus:ring-1 focus:ring-[#A98446]"
      />

      <button
        type="submit"
        aria-label="Submit article search"
        className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[#403D38] hover:text-[#A98446]"
      >
        <Search size={14} strokeWidth={1.4} />
      </button>
    </Form>
  );
}

function BlogCategories({
  categories: items,
  activeCategory,
}: {
  categories: BlogCategory[];
  activeCategory: string;
}) {
  return (
    <section aria-labelledby="blog-categories-heading">
      <h2
        id="blog-categories-heading"
        className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9B7540]"
      >
        Categories
      </h2>

      <div className="divide-y divide-[#E2DDD5]">
        {items.map((category) => (
          <Link
            key={category.slug}
            to={
              category.slug === "all"
                ? "/blog"
                : `/blog?category=${category.slug}`
            }
            aria-current={
              activeCategory === category.slug ? "page" : undefined
            }
            className={[
              "flex items-center justify-between py-2 text-[10px] transition-colors",
              activeCategory === category.slug
                ? "font-medium text-[#9B7540]"
                : "text-[#35322E] hover:text-[#9B7540]",
            ].join(" ")}
          >
            <span>{category.name}</span>
            <span className="text-[#77716A]">{category.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedPostCard({ article }: { article: Article }) {
  return (
    <article className="border border-[#DDD8D0] bg-[#FAF8F4]">
      <Link to={`/blog/${article.slug}`} className="group block">
        <div className="overflow-hidden">
          <img
            src={article.image.src}
            alt={article.image.alt}
            loading="lazy"
            className="aspect-[1.45/1] w-full object-cover transition duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="p-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#9B7540]">
            {article.category}
          </p>

          <h3 className="mt-2 font-serif text-[18px] leading-[1.15]">
            {article.title}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.11em] text-[#403D38]">
            <time dateTime={article.date}>{article.date}</time>
            <span aria-hidden="true">•</span>
            <span>{article.readTime}</span>
          </div>

          <span className="mt-4 inline-flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9B7540]">
            Read article
            <ArrowRight size={11} strokeWidth={1.3} />
          </span>
        </div>
      </Link>
    </article>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    window.setTimeout(() => {
      setStatus("success");
    }, 450);
  }

  return (
    <section className="bg-[#181716] p-5 text-white">
      <h2 className="font-serif text-[24px] leading-none">Stay Inspired</h2>

      <p className="mt-3 text-[10px] leading-[1.7] text-white/75">
        Subscribe to our newsletter for the latest design inspiration and
        expert insights delivered to your inbox.
      </p>

      {status === "success" ? (
        <p
          role="status"
          className="mt-5 border border-[#B99658]/40 px-3 py-3 text-[10px] leading-5 text-[#D1B77E]"
        >
          Thank you. You’re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Your email address"
            className="h-9 w-full border border-white/15 bg-transparent px-3 text-[10px] text-white outline-none placeholder:text-white/40 focus:border-[#B99658] focus:ring-1 focus:ring-[#B99658]"
            aria-invalid={status === "error"}
            aria-describedby={
              status === "error" ? "newsletter-error" : undefined
            }
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 flex h-9 w-full items-center justify-center bg-[#B99658] text-[9px] font-semibold uppercase tracking-[0.13em] text-[#171615] transition hover:bg-[#C5A86E] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>

          {status === "error" && (
            <p
              id="newsletter-error"
              role="alert"
              className="mt-2 text-[9px] text-[#D6A7A0]"
            >
              Please enter a valid email address.
            </p>
          )}
        </form>
      )}

      <p className="mt-4 text-[9px] leading-5 text-white/55">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </section>
  );
}

/* ----------  Pagination  ---------- */

function BlogPagination({
  currentPage,
  query,
  category,
}: {
  currentPage: number;
  query: string;
  category: string;
}) {
  function href(page: number) {
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (category && category !== "all") {
      params.set("category", category);
    }

    params.set("page", String(page));

    return `/blog?${params.toString()}`;
  }

  const pages = [1, 2, 3];

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {pages.map((page) => (
        <Link
          key={page}
          to={href(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={[
            "flex h-9 min-w-9 items-center justify-center border px-3 text-[9px] uppercase tracking-[0.08em]",
            currentPage === page
              ? "border-[#171615] bg-[#171615] text-white"
              : "border-[#D9D4CC] bg-transparent text-[#35322E] hover:border-[#A98446] hover:text-[#A98446]",
          ].join(" ")}
        >
          {page}
        </Link>
      ))}

      <span
        aria-hidden="true"
        className="flex h-9 min-w-9 items-center justify-center border border-[#D9D4CC] px-3 text-[9px] text-[#77716A]"
      >
        ...
      </span>

      {currentPage < TOTAL_PAGES && (
        <Link
          to={href(currentPage + 1)}
          className="flex h-9 items-center gap-2 border border-[#D9D4CC] px-4 text-[9px] font-medium uppercase tracking-[0.1em] text-[#35322E] hover:border-[#A98446] hover:text-[#A98446]"
        >
          Next
          <ArrowRight size={11} strokeWidth={1.3} />
        </Link>
      )}
    </nav>
  );
}

/* ----------  Philosophy CTA  ---------- */

function BlogPhilosophyCTA() {
  return (
    <section className="bg-[#F7F4EE]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:h-[200px] lg:grid-cols-[46%_54%]">
        <div className="h-[200px] overflow-hidden lg:h-full">
          <img
            src={philosophy.image.src}
            alt={philosophy.image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-7 py-9 sm:px-10 lg:px-[62px] lg:py-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#9B7540]">
            {philosophy.eyebrow}
          </p>

          <h2 className="mt-2 max-w-[580px] font-serif text-[25px] leading-[1.08] sm:text-[28px]">
            {philosophy.title}
          </h2>

          <p className="mt-3 max-w-[590px] text-[11px] leading-[1.7] text-[#57534D]">
            {philosophy.body}
          </p>

          <Link
            to={philosophy.href}
            className="mt-4 inline-flex w-fit items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9B7540] hover:text-[#6F5127]"
          >
            Learn more about us
            <ArrowRight size={11} strokeWidth={1.3} />
          </Link>
        </div>
      </div>
    </section>
  );
}