import ResponsiveImage from "~/components/whitefire/ResponsiveImage";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  PinIcon,
  UserRound,
  X,
} from "lucide-react";
import { Breadcrumbs } from "~/components/whitefire/Breadcrumbs";
import { CREATOR, JsonLd, seo } from "~/utils/seo";
import {
  getBlogArticleData,
  getBlogCategories,
  getBlogRecentPosts,
} from "~/lib/content";
import { NewsletterForm } from "~/components/whitefire/NewsletterForm";
import { handleNewsletterAction, NewsletterActionData } from "~/lib/forms";

const AUTHOR = {
  name: "Whitefire Interior",
  bio: "A luxury interior design studio creating timeless, functional, and beautiful spaces.",
};

export interface BlogArticleImage {
  src: string;
  alt: string;
}

export interface BlogArticleSection {
  number: string;
  title: string;
  paragraphs: string[];
  images?: { src: string; alt: string }[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categorySlug: string;
  featured: boolean;
  image: BlogArticleImage;
  heroImage: BlogArticleImage;
  leadImage: BlogArticleImage;
  intro: string[];
  sections: BlogArticleSection[];
  metaTitle: string;
  metaDescription: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  const data = await getBlogArticleData(slug ?? "");

  if (!data) {
    throw new Response("Article not found", { status: 404 });
  }

  const [categories, recentPosts] = await Promise.all([
    getBlogCategories(),
    getBlogRecentPosts(3),
  ]);

  return json({
    article: data.article as BlogArticle,
    previousPost: data.previousPost,
    nextPost: data.nextPost,
    categories,
    recentPosts,
    author: AUTHOR,
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const article = data?.article;
  return seo({
    title: article
      ? `${article.title} | Whitefire Interior`
      : "Article | Whitefire Interior",
    description:
      article?.excerpt ??
      "Discover how to use statement patterns with intention to create kitchen spaces that feel dynamic, balanced, timeless, and uniquely yours.",
    path: article ? `/blog/${article.slug}` : "/blog",
    image: article?.image?.src,
  });
};

type PostLink = {
  slug: string;
  title: string;
  date: string;
  image: { src: string; alt: string };
};

type BlogDetailData = {
  article: BlogArticle;
  previousPost: PostLink | null;
  nextPost: PostLink | null;
  categories: { slug: string; name: string; count: number }[];
  recentPosts: PostLink[];
  author: { name: string; bio: string };
};

export default function BlogDetailRoute() {
  const { article, previousPost, nextPost, categories, recentPosts, author } =
    useLoaderData<typeof loader>() as BlogDetailData;

  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#1F1D1A]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: new Date(article.date).toISOString(),
            dateModified: new Date(article.date).toISOString(),
            image: article.image?.src,
            author: {
              "@type": "Person",
              name: CREATOR.name,
              url: CREATOR.linkedin,
              email: CREATOR.email,
            },
            publisher: {
              "@type": "Organization",
              name: "Whitefire Interior",
              url: "https://interior-deco-kappa.vercel.app",
            },
          }}
        />

        <main>
          <BlogDetailHero article={article} author={author} />

          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 py-8 sm:px-8 md:py-12 lg:grid-cols-[minmax(0,2.15fr)_minmax(280px,0.95fr)] lg:gap-14 lg:px-0">
            <article className="min-w-0">
              <ResponsiveImage
                src={article.leadImage.src}
                alt={article.leadImage.alt}
                className="aspect-[16/8] w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />

              <BlogArticleBody article={article} />

              <ShareBar title={article.title} />

              {previousPost && nextPost && (
                <PreviousNextPosts
                  previousPost={previousPost}
                  nextPost={nextPost}
                />
              )}
            </article>

            <BlogSidebar categories={categories} recentPosts={recentPosts} author={author} />
          </div>
        </main>

        </div>
    </div>
  );
}

/* ----------  Hero  ---------- */

function BlogDetailHero({ article, author }: { article: BlogArticle; author: { name: string; bio: string } }) {
  return (
    <section className="relative min-h-[350px] overflow-hidden bg-black text-white">
      <ResponsiveImage
        src={article.heroImage.src}
        alt={article.heroImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_32%,rgba(0,0,0,0.22)_74%,rgba(0,0,0,0.15)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[350px] max-w-[1320px] flex-col justify-end px-6 pb-7 pt-24 sm:px-8 lg:px-0">
        <div className="mb-6">
          <Breadcrumbs
            dark
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: article.category },
            ]}
          />
        </div>

        <div className="max-w-[590px]">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C39A52]">
            {article.category}
          </p>

          <h1 className="font-serif text-[39px] leading-[1.04] tracking-[-0.025em] sm:text-[46px] lg:text-[51px]">
            {article.title}
          </h1>

          <p className="mt-3 max-w-[550px] text-[13px] leading-[1.55] text-white/90 sm:text-[14px]">
            {article.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-[#C39A52]" />
              {article.date}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-[#C39A52]" />
              {article.readTime}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5 text-[#C39A52]" />
              By {author.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------  Article body  ---------- */

function BlogArticleBody({ article }: { article: BlogArticle }) {
  return (
    <div className="pt-5">
      {article.intro.map((paragraph) => (
        <p
          key={paragraph}
          className="text-[14px] leading-[1.7] text-[#33302C]"
        >
          {paragraph}
        </p>
      ))}

      <div className="mt-4 space-y-5">
        {article.sections.map((section) => (
          <section key={section.number}>
            <h2 className="font-serif text-[18px] leading-tight text-[#211F1B]">
              {section.number}. {section.title}
            </h2>

            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-2 text-[14px] leading-[1.7] text-[#33302C]"
              >
                {paragraph}
              </p>
            ))}

            {section.images && section.images.length > 0 && (
              <div
                className={[
                  "mt-3 grid gap-1.5",
                  section.images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3",
                ].join(" ")}
              >
                {section.images.map((image) => (
                  <ResponsiveImage
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[1.5/1] w-full object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

/* ----------  Share bar  ---------- */

function ShareBar({ title }: { title: string }) {
  const encodedTitle = encodeURIComponent(title);

  const items = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.href : ""
      )}`,
      icon: <Facebook className="h-3.5 w-3.5" />,
    },
    {
      label: "Save on Pinterest",
      href: `https://pinterest.com/pin/create/button/?description=${encodedTitle}`,
      icon: <PinIcon className="h-3.5 w-3.5" />,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}`,
      icon: <X className="h-3.5 w-3.5" />,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/`,
      icon: <Linkedin className="h-3.5 w-3.5" />,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}`,
      icon: <Mail className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="mt-7 border-y border-[#D9D4CC] py-3.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="mr-2 text-[10px] text-[#625C54]">
          Share this article
        </span>

        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex h-7 w-7 items-center justify-center border border-[#D5D0C8] text-[#39352F] transition-colors hover:border-[#A98343] hover:text-[#A98343] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98343]"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ----------  Previous / next  ---------- */

function PreviousNextPosts({
  previousPost,
  nextPost,
}: {
  previousPost: PostLink;
  nextPost: PostLink;
}) {
  return (
    <nav
      aria-label="Article navigation"
      className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2"
    >
      <Link
        to={`/blog/${previousPost.slug}`}
        className="group flex items-center gap-3"
      >
        <ResponsiveImage
          src={previousPost.image.src}
          alt={previousPost.image.alt}
          className="h-[54px] w-[68px] object-cover"
          loading="lazy"
        />

        <span className="min-w-0">
          <span className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#967442]">
            <ChevronLeft className="h-3 w-3" />
            Previous Post
          </span>
          <span className="mt-1 block font-serif text-[13px] leading-[1.25] text-[#282521] group-hover:text-[#967442]">
            {previousPost.title}
          </span>
        </span>
      </Link>

      <Link
        to={`/blog/${nextPost.slug}`}
        className="group flex items-center justify-end gap-3 text-right"
      >
        <span className="min-w-0">
          <span className="flex items-center justify-end gap-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#967442]">
            Next Post
            <ChevronRight className="h-3 w-3" />
          </span>
          <span className="mt-1 block font-serif text-[13px] leading-[1.25] text-[#282521] group-hover:text-[#967442]">
            {nextPost.title}
          </span>
        </span>

        <ResponsiveImage
          src={nextPost.image.src}
          alt={nextPost.image.alt}
          className="h-[54px] w-[68px] object-cover"
          loading="lazy"
        />
      </Link>
    </nav>
  );
}

/* ----------  Sidebar  ---------- */

function BlogSidebar({
  categories,
  recentPosts,
  author,
}: {
  categories: { slug: string; name: string; count: number }[];
  recentPosts: PostLink[];
  author: { name: string; bio: string };
}) {
  return (
    <aside className="lg:pt-2">
      <section>
        <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#987441]">
          About the Author
        </p>

        <div className="flex gap-4">
          <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center bg-[#171717] p-3">
            <span className="font-serif text-3xl text-[#C39A52]">W</span>
          </div>

          <div>
            <h2 className="font-serif text-[15px] text-[#25221F]">
              {author.name}
            </h2>
            <p className="mt-1 text-[11px] leading-[1.55] text-[#5D5851]">
              {author.bio}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-[#272521]">
          <a href="#" aria-label="Instagram">
            <Instagram className="h-3.5 w-3.5" strokeWidth={1.6} />
          </a>
          <a href="#" aria-label="Pinterest">
            <PinIcon className="h-3.5 w-3.5" strokeWidth={1.6} />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="h-3.5 w-3.5" strokeWidth={1.6} />
          </a>
        </div>
      </section>

      <div className="my-7 border-t border-[#D9D4CC]" />

      <section>
        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#987441]">
          Categories
        </p>

        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href={`/blog?category=${category.slug}`}
                className="flex items-center justify-between text-[11px] text-[#34312D] transition-colors hover:text-[#987441]"
              >
                <span>{category.name}</span>
                <span>{category.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="my-7 border-t border-[#D9D4CC]" />

      <section>
        <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#987441]">
          Recent Posts
        </p>

        <div className="space-y-3.5">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex gap-3"
            >
              <ResponsiveImage
                src={post.image.src}
                alt={post.image.alt}
                className="h-[56px] w-[66px] shrink-0 object-cover"
                loading="lazy"
              />

              <div className="min-w-0">
                <h3 className="font-serif text-[13px] leading-[1.25] text-[#282521] group-hover:text-[#987441]">
                  {post.title}
                </h3>
                <p className="mt-1 text-[9px] text-[#6A645D]">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="my-7 border-t border-[#D9D4CC]" />

      <BlogNewsletterCard />
    </aside>
  );
}

function BlogNewsletterCard() {
  const actionData =
    useActionData<typeof action>() as NewsletterActionData | undefined;

  return (
    <section className="bg-[#171717] px-5 py-6 text-white">
      <h2 className="font-serif text-[25px]">Stay Inspired</h2>

      <p className="mt-2 text-[11px] leading-[1.55] text-white/75">
        Subscribe to our newsletter for the latest design inspiration and
        expert insights delivered to your inbox.
      </p>

      <div className="mt-4">
        <NewsletterForm variant="sidebar" actionData={actionData} />
      </div>

      <p className="mt-3 text-[9px] leading-[1.5] text-white/55">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </section>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return handleNewsletterAction(request, "blog-newsletter");
}