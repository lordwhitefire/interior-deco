// app/routes/services.$slug.tsx
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/* ----------  components  ---------- */
import ServiceSingleBanner from "~/components/ServiceSingleBanner";
import SetTheTrendSection from "~/components/SetTheTrendSection";
import ClientShowcaseForServicesSingle from "~/components/logo1";
import MapSection from "~/components/MapSection";
import InteriorSection from "~/components/InteriorSection";
import LoveDesignSection from "~/components/LoveDesignSection";
import SuccessStats from "~/components/SuccessStats";
import Join from "~/components/Join";

/* ----------  inline Sanity  ---------- */
const sanityClient = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});
const builder = imageUrlBuilder(sanityClient);
const urlFor = (src: any) => builder.image(src).url();

/* ----------  Meta  ---------- */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Not found" }];
  return [
    { title: `${data.service.title} | Interior-Deco` },
    { name: "description", content: data.service.shortDesc },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

/* ----------  Loader  ---------- */
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw redirect("/service");

  const [service, clients, projects, stats, articles, joinDoc] = await Promise.all([
    /* 0. current service page */
    sanityClient.fetch(
      groq`*[_type == "serviceCard" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        shortDesc,
        trendHeader,
        trendParagraphs[],
        videoUrl,
        videoPoster,
        interiorHeadline,
        interiorText,
        interiorGallery[],
        loveDesignHeadline,
        loveDesignText,
        loveDesignImages[]
      }`,
      { slug }
    ),

    /* 1. global sections */
    sanityClient.fetch(groq`*[_type == "client"]|order(id asc){id,name,logo}`),
    sanityClient.fetch(groq`*[_type == "project"]|order(id asc){id,title,type,description,image,category,features,budget,timeline,link}`),
    sanityClient.fetch(groq`*[_type == "successStats"][0]{stats}`),
    sanityClient.fetch(groq`*[_type == "article"]|order(date desc){_id,title,slug,excerpt,category,author,date,readTime,image,featured,tags}`),
    sanityClient.fetch(groq`*[_type == "join"][0]{headline,subline,placeholder,buttonText,privacy,successMsg}`)
  ]);

  if (!service) throw new Response("Service not found", { status: 404 });

  /* normalise images */
  service.videoPoster = urlFor(service.videoPoster);
  service.interiorGallery = service.interiorGallery.map(urlFor);
  service.loveDesignImages = service.loveDesignImages.map(urlFor);
  /* 👇 pick 2 at random 👇 */
  service.loveDesignImages = service.loveDesignImages
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const clientShowcaseData = clients.map((c: any) => ({
    id: parseInt(c.id),
    name: c.name,
    logo: urlFor(c.logo),
    alt: c.name,
  }));


  const successStatsData = stats?.stats?.map((s: any) => ({
    id: s.id,
    number: s.number,
    suffix: s.suffix || '',
    label: s.label,
    icon: s.icon,
    color: s.color,
  })) || [];

  const articleData = articles.map((a: any) => ({
    id: a._id,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    author: a.author,
    date: a.date,
    readTime: a.readTime,
    image: urlFor(a.image),
    featured: a.featured,
    tags: a.tags || [],
    slug: a.slug.current,
  }));

  const joinData = joinDoc || {
    headline: 'Stay Ahead of the Curve',
    subline: 'Get exclusive design tips, early access to new collections, and special offers delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Join Now',
    privacy: 'No spam, unsubscribe anytime.',
    successMsg: 'Welcome! Check your inbox for confirmation.',
  };

  return json({
    service,
    clientShowcaseData,
    successStatsData,
    joinData,
  });
}

/* ----------  Component  ---------- */
export default function ServiceSingleRoute() {
  const {
    service,
    clientShowcaseData,
    successStatsData,
    joinData,
  } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-0">
      <ServiceSingleBanner   slug={service.slug.current} />
      <SetTheTrendSection    data={service} />
      <ClientShowcaseForServicesSingle data={clientShowcaseData} />
      <MapSection            videoUrl={service.videoUrl} poster={service.videoPoster} />
      <InteriorSection       data={service} />
      <LoveDesignSection     data={service} />
      <SuccessStats          data={successStatsData} />
      <Join                  data={joinData} />
    </div>
  );
}