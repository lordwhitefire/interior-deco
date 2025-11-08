// app/routes/teams.tsx
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true
});

const teamQuery = `
  *[_type == "staff"] | order(order asc) {
    _id,
    fullName,
    slug,
    role,
    "photoUrl": photo.asset->url
  }[0...8]
`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const list = await sanity.fetch(teamQuery);
  return json({ list });
};

export const meta: MetaFunction = () => {
  const title = "Our Team – Interior Decorators Inc.";
  const desc = "Meet the interior-design professionals who bring your spaces to life.";
  const img = "https://cdn.sanity.io/images/pzhistba/production/69b892cbda831e1a4e16764fd630bd8ebf6670e8-1600x896.jpg?w=2000&fit=max&auto=format";
  const url = "https://interior-deco-kappa.vercel.app/team";

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

export default function TeamRoute() {
  const { list } = useLoaderData<typeof loader>();

  const bannerImage = "https://cdn.sanity.io/images/pzhistba/production/6b240296001bfa91f6dc19d5f24464db59a1aa4c-1600x896.jpg?h=600&fit=crop&auto=format";

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={bannerImage}
          alt="Our Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">Our Team</h1>
            <p className="text-lg mt-2 opacity-90">Designers, thinkers, creators</p>
          </div>
        </div>
      </div>

      {/* TEAM GRID */}
      <main className="max-w-7xl mx-auto px-6 mt-12 py-12">

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((m) => (
          <a
            key={m._id}
            href={`/teams/${m.slug.current}`}
            className="group block"
          >
            <img
              src={`${m.photoUrl}?auto=format&w=600&h=600&fit=crop&crop=focalpoint`}
              alt={m.fullName}
              className="w-full h-64 object-cover rounded-full group-hover:scale-105 transition"
            />
            <h3 className="mt-4 text-xl font-semibold">{m.fullName}</h3>
            <p className="text-sm text-gray-600">{m.role}</p>
          </a>
        ))}
      </div>
    </main>
    </div>
  );
}