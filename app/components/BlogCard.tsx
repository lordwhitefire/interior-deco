import { Link } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";

/* ---------- mini-builder inside the component ---------- */
const builder = imageUrlBuilder({
  projectId: "pzhistba",
  dataset: "production",
});

type Props = {
  card: {
    slug: string;
    title: string;
    excerpt: string;
    publishDate: string;
    category: string;
    cover: any; // Sanity asset
  };
};

export default function BlogCard({ card }: Props) {
  return (
    <article className="group">
      <Link to={`/blogs/${card.slug}`}>
        <img
          src={builder.image(card.cover).width(600).url()}
          alt={card.title}
          className="w-full h-48 object-cover rounded-xl group-hover:shadow-xl transition"
        />
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            {new Date(card.publishDate).toLocaleDateString()} · {card.category}
          </p>
          <h3 className="font-semibold mt-1 group-hover:underline">{card.title}</h3>
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{card.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}