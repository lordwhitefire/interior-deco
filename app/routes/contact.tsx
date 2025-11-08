// app/routes/contact.tsx
import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";
import ContactForm from "~/components/ContactForm";
import ContactDetails from "~/components/ContactDetails"; // optional, keep yours

/* ---------- SANITY ---------- */
const sanity = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: false,
});
const builder = imageUrlBuilder(sanity);

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await sanity.fetch(
    groq`*[_type == "contactInfo"][0]{
      bannerHeading,
      bannerImage,
      heading,
      subtext,
      phones,
      emails,
      officeAddress,
      googleMapsEmbedUrl,
      officeHours,
      socialLinks
    }`
  );

  // FALLBACK (always works even if Sanity is empty)
  const fallback = {
    bannerHeading: "Contact Us",
    bannerImage: null, // we'll use a fallback URL
    heading: "Let’s create your dream space",
    subtext: "We’d love to hear about your project.",
    phones: ["+1 555 123 4567"],
    emails: ["hello@interiordeco.com"],
    officeAddress: "123 Design Street, Creative City 90210",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25987368715491!3d40.697670064237676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1652969999999",
    officeHours: ["Mon – Fri  09:00 – 18:00", "Saturday  10:00 – 15:00"],
    socialLinks: [],
  };

  return json({ contact: data || fallback });
}

/* ---------- ACTION ---------- */
export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const _action = form.get("_action");

  if (_action === "sendMessage") {
    const name = (form.get("name") as string)?.trim();
    const email = (form.get("email") as string)?.trim();
    const phone = (form.get("phone") as string)?.trim();
    const message = (form.get("message") as string)?.trim();

    if (!name || !email || !message)
      return json({ error: "Name, email and message are required." }, { status: 400 });

    // TODO: send to email, Slack, Sanity, etc.
    console.log({ name, email, phone, message });

    return json({ success: true });
  }

  return json({ error: "Unknown action" }, { status: 400 });
}

/* ---------- META ---------- */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = "Contact – Interior Deco";
  const description = data?.contact.subtext || "Get in touch with our interior-design team.";
  const img = "https://cdn.sanity.io/images/pzhistba/production/contact-hero.jpg?h=630&fit=max";
  const url = "https://interior-deco-kappa.vercel.app/contact";

  return [
    { title },
    { name: "description", content: description },
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    // open-graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:site_name", content: "Interior Decorators Inc." },

    // twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
};

/* ---------- UI ---------- */
export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  // Fallback image URL (Unsplash high-res interior shot)
  const fallbackBannerUrl =
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=60";
  const bannerUrl = contact.bannerImage
    ? builder.image(contact.bannerImage).width(1600).url()
    : fallbackBannerUrl;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      {/* 1.  BANNER SECTION  (curved overlay)  ––––––––––––––––––––– */}
      <section className="relative">
        <div
          className="h-60 bg-cover mt-20 bg-center contact-banner"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        />
        <div className="absolute inset-0 flex justify-center items-end">
          <div className="bg-white py-8 px-16 rounded-t-[1rem] flex flex-col items-center">
            <h2 className="text-3xl font-bold font1">{contact.bannerHeading}</h2>
            <p className="text-center text-gray-700 mt-1">home / contact</p>
          </div>
        </div>
      </section>

      {/* 2.  HERO SECTION  (untouched gradient)  –––––––––––––––––––– */}
      <section className="bg-gradient-to-b from-stone-100 to-transparent px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">{contact.heading}</h1>
          <p className="mt-4 text-lg text-stone-600 max-w-xl mx-auto">{contact.subtext}</p>
        </div>
      </section>

      {/* 3.  CONTENT  (info + form / map)  –––––––––––––––––––––––––– */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-12">
          <ContactDetails data={contact} />
          <ContactForm />
        </div>

        <div className="h-[28rem] md:h-auto md:sticky md:top-24 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office location"
          />
        </div>
      </section>
    </main>
  );
}