import boldPatterns from "./blogs/bold-patterns-balanced-spaces-in-kitchens.json";
import neutralTones from "./blogs/neutral-tones-lasting-impressions.json";
import naturalMaterials from "./blogs/the-return-of-natural-materials.json";
import bedroomRetreat from "./blogs/creating-a-restful-retreat-bedroom-design-tips.json";
import spaBathrooms from "./blogs/spa-worthy-bathrooms-at-home.json";
import styleShelves from "./blogs/how-to-style-shelves-like-a-designer.json";
import meta from "./blogs/meta.json";

export interface BlogImage {
  src: string;
  alt: string;
}

export interface ArticleSection {
  number: number;
  title: string;
  paragraphs: string[];
  images?: BlogImage[];
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: BlogImage;
  heroImage: BlogImage;
  leadImage: BlogImage;
  intro: string[];
  sections: ArticleSection[];
  featured?: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface ArticleAuthor {
  name: string;
  bio: string;
}

export const articles: Article[] = [
  boldPatterns as Article,
  neutralTones as Article,
  naturalMaterials as Article,
  bedroomRetreat as Article,
  spaBathrooms as Article,
  styleShelves as Article,
];

export const blogHero: BlogImage = meta.blogHero;

export const categories: BlogCategory[] = meta.categories;

export const featuredArticle = articles[0];

export const philosophy = meta.philosophy;

export const author: ArticleAuthor = meta.author;

const toPost = (article: Article) => ({
  slug: article.slug,
  title: article.title,
  date: article.date,
  image: article.image,
});

export const recentPosts = [naturalMaterials, bedroomRetreat, spaBathrooms, styleShelves].map(
  (article) => toPost(article as Article)
);

export const articleBySlug = (slug: string) =>
  articles.find((article) => article.slug === slug);

export const adjacentPosts = (article: Article) => {
  const i = articles.indexOf(article);
  const nextPost = toPost(articles[(i + 1) % articles.length]);
  const previousPost = toPost(articles[(i - 1 + articles.length) % articles.length]);
  return { previousPost, nextPost };
};