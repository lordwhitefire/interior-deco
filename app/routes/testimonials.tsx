// app/routes/testimonials.tsx
import React from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true
});

const builder = imageUrlBuilder(sanity);

const testimonialsQuery = `
  *[_type == "testimonial"] | order(date desc) {
    _id,
    clientName,
    clientLocation,
    rating,
    review,
    date,
    "clientImageUrl": clientImage.asset->url
  }
`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const allTestimonials = await sanity.fetch(testimonialsQuery);
  const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 6);
  return json({ testimonials: selected });
};

export const meta: MetaFunction = () => {
  const title = "Client Testimonials – Interior Decorators Inc.";
  const desc  = "Real stories from clients who transformed their spaces.";
  const img   = "https://cdn.sanity.io/images/pzhistba/production/ce1888b3419fb1b157c21b34acd2ee1c78a82ce3-1600x896.jpg?w=2000&fit=max&auto=format";
  const url   = "https://interior-deco-kappa.vercel.app/testimonials";

  return [
    { title },
    { name: "description", content: desc },
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    // open-graph
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:site_name", content: "Interior Decorators Inc." },

    // twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: img },
  ];
};

export default function TestimonialsRoute() {
  const { testimonials } = useLoaderData<typeof loader>();

  const bannerImage = "https://cdn.sanity.io/images/pzhistba/production/f104fed083d01a99d9f761c39126817a3db840a3-1600x896.jpg?h=600&fit=crop&auto=format";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO BANNER */}
      <div className="relative h-96 overflow-hidden">
        <img src={bannerImage} alt="Client Testimonials" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">Client Stories</h1>
            <p className="text-xl text-white/90">Real people. Real homes. Real transformations.</p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS GRID */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
  {/* Rating Stars */}
  <div className="flex mb-4">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`text-2xl ${i < t.rating ? "text-amber-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>

  {/* Review Text – clamped inline */}
  {(() => {
    const limit = 160;
    const [open, setOpen] = React.useState(false);
    const isLong = t.review.length > limit;
    return (
      <p className="text-gray-700 italic mb-6 leading-relaxed">
        “{open ? t.review : `${t.review.slice(0, limit)}${isLong ? '…' : ''}`}”
        {isLong && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="ml-2 text-green-700 underline hover:no-underline"
          >
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
    );
  })()}

  {/* Client Info */}
  <div className="flex items-center gap-4">
    {t.clientImageUrl ? (
      <img
        src={builder.image(t.clientImageUrl).width(80).height(80).fit('crop').crop('center').auto('format').url()}
        alt={t.clientName}
        className="w-14 h-14 rounded-full object-cover"
      />
    ) : (
      <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-dashed border-gray-300" />
    )}
    <div>
      <h3 className="font-semibold text-lg">{t.clientName}</h3>
      <p className="text-sm text-gray-500">{t.clientLocation} • {formatDate(t.date)}</p>
    </div>
  </div>
</div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready to write your own story?</p>
          <a href="/contact" className="inline-block bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition">
            Start Your Project
          </a>
        </div>
      </main>
    </div>
  );
}