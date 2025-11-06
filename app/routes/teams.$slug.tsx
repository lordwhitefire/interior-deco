// app/routes/teams.$slug.tsx
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true
});

const staffQuery = `
  *[_type == "staff" && slug.current == $slug][0] {
    _id,
    fullName,
    role,
    bio,
    "photoUrl": photo.asset->url,
    social,
    metaTitle,
    metaDescription,
    order
  }
`;

const neighboursQuery = `
{
  "prev": *[_type == "staff" && order < $order] | order(order desc) [0] { fullName, slug },
  "next": *[_type == "staff" && order > $order] | order(order asc)  [0] { fullName, slug }
}
`;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug;
  if (!slug) throw new Response("Not found", { status: 404 });

  const member = await sanity.fetch(staffQuery, { slug });
  if (!member) throw new Response("Not found", { status: 404 });

  const neighbours = await sanity.fetch(neighboursQuery, { order: member.order });

  return json({ member, neighbours });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.member) return [{ title: "Team Member Not Found" }];
  const { member } = data;
  return [
    { title: member.metaTitle || `${member.fullName} – ${member.role}` },
    { name: "description", content: member.metaDescription || member.bio?.[0]?.children?.[0]?.text || "Meet our team member." },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export default function StaffDetailRoute() {
  const { member, neighbours } = useLoaderData<typeof loader>();

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 mt-20 gap-10 items-center">
        <img src={`${member.photoUrl}?auto=format&w=800`} alt={member.fullName} className="rounded-2xl object-cover w-full h-auto" />
        <div>
          <h1 className="text-4xl font-serif">{member.fullName}</h1>
          <p className="text-green-700 uppercase tracking-wide mt-2">{member.role}</p>

          <div className="mt-6 prose prose-gray max-w-none">
            {member.bio && <PortableText value={member.bio} components={{ block: ({ children }) => <p className="mb-4">{children}</p> }} />}
          </div>

          <div className="mt-6 flex gap-4">
            {member.social?.map((s: any) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-700 capitalize">
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Next / Prev micro-nav */}
      <nav className="mt-16 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          {neighbours.prev ? (
            <Link to={`/teams/${neighbours.prev.slug.current}`} className="flex items-center gap-2 text-gray-700 hover:text-green-700">
              <span>←</span>
              <span>{neighbours.prev.fullName}</span>
            </Link>
          ) : (
            <span className="text-gray-400">← Previous</span>
          )}
        </div>

        <Link to="/team" className="text-gray-700 hover:text-green-700">
          Back to team
        </Link>

        <div className="flex items-center gap-3">
          {neighbours.next ? (
            <Link to={`/teams/${neighbours.next.slug.current}`} className="flex items-center gap-2 text-gray-700 hover:text-green-700">
              <span>{neighbours.next.fullName}</span>
              <span>→</span>
            </Link>
          ) : (
            <span className="text-gray-400">Next →</span>
          )}
        </div>
      </nav>
    </main>
  );
}

function PortableText({ value, components }: any) {
  return (
    <>
      {value.map((block: any, i: number) => {
        if (block._type === "block") {
          const text = block.children.map((c: any) => c.text || "").join("");
          return <div key={i}>{components.block({ children: text })}</div>;
        }
        return null;
      })}
    </>
  );
}