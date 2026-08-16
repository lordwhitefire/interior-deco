import type { MetaFunction } from "@remix-run/node";
import { seo } from "~/utils/seo";

export const meta: MetaFunction = () => {
  return seo({
    title: "Privacy Policy | Whitefire Interior",
    description:
      "How Whitefire Interior handles the information you share with us — simply and transparently.",
    path: "/privacy",
  });
};

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you sign up for our newsletter, we store your email address and the date you subscribed.",
      "When you use the contact form, we store the details you provide: your name, email address, phone number (if given), subject, and message.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "Newsletter emails are used to send you design inspiration, project updates, and occasional announcements — nothing else.",
      "Contact form details are used solely to respond to your enquiry.",
    ],
  },
  {
    heading: "Where it's stored",
    body: [
      "Both are stored in Sanity, the content platform that powers this website. We don't transfer or sell your information to anyone.",
    ],
  },
  {
    heading: "What we don't do",
    body: [
      "This site sets no cookies and runs no analytics or tracking scripts. We don't share, sell, or rent your details to third parties.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "Unsubscribe from the newsletter at any time — every email includes an unsubscribe note, and you can simply reply asking to be removed.",
      "To have your contact details or subscription removed, email us at the address below and we'll delete them.",
    ],
  },
];

export default function PrivacyRoute() {
  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <main className="px-6 py-16 sm:px-8 lg:px-20 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9A7A4A]">
              Privacy Policy
            </p>
            <h1 className="mt-4 font-serif text-[36px] leading-[1.05] text-[#211F1B] sm:text-[44px]">
              How we handle your information
            </h1>
            <p className="mt-5 text-sm leading-6 text-[#37332E] sm:text-[15px]">
              This website collects very little, stores it carefully, and
              shares it with no one. This page explains it in plain
              language.
            </p>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-[24px] leading-[1.1] text-[#211F1B]">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-2">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-6 text-[#37332E]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="font-serif text-[24px] leading-[1.1] text-[#211F1B]">
                  Contact
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#37332E]">
                  Questions about this policy, or requests to view or delete
                  your data, can be sent to{" "}
                  <a
                    href="mailto:hello@whitefireinterior.com"
                    className="text-[#9A7A4A] underline underline-offset-2 hover:text-[#7c6138]"
                  >
                    hello@whitefireinterior.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
