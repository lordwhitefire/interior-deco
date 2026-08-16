import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import {
  ChevronRight,
  Clock3,
  Instagram,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "~/components/whitefire/SiteHeader";
import { SiteFooter } from "~/components/whitefire/SiteFooter";
import sitepages from "~/data/sitepages.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact | Whitefire Interior" },
    {
      name: "description",
      content:
        "Get in touch with the Whitefire Interior team. We'd love to hear from you about your next interior design project.",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = Object.fromEntries(formData.entries());
  console.log("Contact form submission:", submission);
  return json({ ok: true });
};

const CONTACT_INFO = {
  addressLines: ["101 Prinsengracht, Suite 3A", "1016 EA Amsterdam, Netherlands"],
  phone: "+31 20 8765 4321",
  email: "hello@whitefireinterior.com",
  hoursLines: ["Monday – Friday: 9:00 AM – 6:00 PM", "Saturday: By Appointment", "Sunday: Closed"],
};

// Reused Google Maps embed (same mechanism as the existing real
// contactInfo.googleMapsEmbedUrl — no API key). Points at the Amsterdam studio.
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=101+Prinsengracht,+Amsterdam,+Netherlands&z=15&output=embed";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactRoute() {
  return (
    <div className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
        <SiteHeader activePath="/contact" />

        <main>
          <ContactHero />

          <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 py-10 sm:px-8 md:grid-cols-[1fr_1px_1fr] md:gap-[14px] md:py-12 lg:px-12">
            <ContactFormSection />
            <div aria-hidden="true" className="hidden w-px bg-[#d8d4ce] md:block" />
            <ContactInformation />
          </section>

          <StudioMapSection />
          <WorkWithUs />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

function ContactHero() {
  return (
    <section className="relative isolate min-h-[330px] overflow-hidden bg-[#0d0d0c]">
      <img
        src={sitepages.contact.hero.src}
        alt={sitepages.contact.hero.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,7,0.97)_0%,rgba(8,8,7,0.85)_30%,rgba(8,8,7,0.38)_68%,rgba(8,8,7,0.08)_100%)]"
      />

      <div className="mx-auto flex min-h-[330px] max-w-[1440px] items-start px-6 py-[64px] sm:px-10 lg:px-[62px]">
        <div className="max-w-[430px] text-white">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b48a4a]">
            LET'S CREATE SOMETHING EXTRAORDINARY
          </p>

          <h1 className="font-serif text-[40px] leading-[1.13] tracking-[-0.02em] sm:text-[44px]">
            We'd Love to Hear
            <br />
            From You
          </h1>

          <div className="my-6 h-px w-[52px] bg-[#b48a4a]" />

          <p className="max-w-[370px] text-[14px] leading-7 text-white/90 sm:text-[15px]">
            Whether you're dreaming of a full home renovation or a single-room
            refresh, our team is ready to bring your vision to life.
          </p>
        </div>
      </div>
    </section>
  );
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function ContactFormSection() {
  const actionData = useActionData<typeof action>();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const setValue = (field: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Name is required.";
    if (!values.email.trim()) nextErrors.email = "Email address is required.";
    else if (!EMAIL_PATTERN.test(values.email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!values.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!values.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) event.preventDefault();
  };

  useEffect(() => {
    if (actionData?.ok) {
      setValues({ fullName: "", email: "", phone: "", subject: "", message: "" });
    }
  }, [actionData]);

  return (
    <div id="contact-form" className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#a8783e]">
        GET IN TOUCH
      </p>

      <h2 className="mt-3 font-serif text-[26px] leading-tight tracking-[-0.02em] sm:text-[29px]">
        Send Us a Message
      </h2>

      <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-[#292929]">
        Fill out the form below and our team will get back to you as soon as
        possible.
      </p>

      <Form
        method="post"
        noValidate
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-[17px] sm:grid-cols-2"
      >
        <FormField
          label="Full Name *"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={setValue("fullName")}
          error={errors.fullName}
        />
        <FormField
          label="Email Address *"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={setValue("email")}
          error={errors.email}
        />
        <FormField
          label="Phone Number"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={setValue("phone")}
          className="sm:col-span-2"
        />
        <FormField
          label="Subject *"
          type="text"
          value={values.subject}
          onChange={setValue("subject")}
          error={errors.subject}
          className="sm:col-span-2"
        />
        <FormField
          label="Message *"
          type="textarea"
          value={values.message}
          onChange={setValue("message")}
          error={errors.message}
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex min-h-[43px] items-center gap-4 bg-[#2d2b2a] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3d3a38] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#F7F4EE]"
          >
            SEND MESSAGE
            <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <p className="mt-4 flex items-start gap-2 text-[10px] leading-[1.6] text-[#6b665f]">
            <LockKeyhole size={13} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0" />
            Your information is safe with us. We'll never share your details
            with anyone.
          </p>

          {actionData?.ok && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 border border-[#c9bfb2] bg-[#efebe7] px-4 py-3 text-[12px] text-[#1f1f1f]"
            >
              Thank you. Your message has been received.
            </p>
          )}
        </div>
      </Form>
    </div>
  );
}

function FormField({
  label,
  type,
  value,
  onChange,
  error,
  autoComplete,
  className = "",
}: {
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  className?: string;
}) {
  const errorId = `error-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const shared = [
    "w-full border bg-[#f7f5f1] px-[15px] text-[12px] text-[#171615] transition-colors focus:border-[#b58a52] focus:outline-none",
    error ? "border-[#a45a4a]" : "border-[#d8d4cc]",
  ].join(" ");

  return (
    <div className={className}>
      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#3a3836]">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${shared} min-h-[96px] py-3`}
        />
      ) : (
        <input
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${shared} h-[42px]`}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-[10px] text-[#a44b3f]">
          {error}
        </p>
      )}
    </div>
  );
}

const INFO_ROWS = [
  { id: "address", icon: MapPin, label: "Studio Address", lines: CONTACT_INFO.addressLines },
  { id: "phone", icon: Phone, label: "Phone Number", lines: [CONTACT_INFO.phone] },
  { id: "email", icon: Mail, label: "Email Address", lines: [CONTACT_INFO.email] },
  { id: "hours", icon: Clock3, label: "Studio Hours", lines: CONTACT_INFO.hoursLines },
];

function ContactInformation() {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#a8783e]">
        CONTACT INFORMATION
      </p>

      <h2 className="mt-3 font-serif text-[26px] leading-tight tracking-[-0.02em] sm:text-[29px]">
        Let's Connect
      </h2>

      <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-[#292929]">
        We're here to help. Reach out through any of the channels below and
        let's start creating something beautiful together.
      </p>

      <div className="mt-7 space-y-5">
        {INFO_ROWS.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.id} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[#cbc4ba] text-[#a8793f]"
              >
                <Icon size={19} strokeWidth={1.4} />
              </span>

              <div className="pt-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#3a3836]">
                  {row.label}
                </p>
                {row.lines.map((line) => (
                  <p key={line} className="mt-0.5 text-[12px] leading-[1.7] text-[#171615]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#3a3836]">
          FOLLOW US
        </p>

        <div className="mt-3 flex items-center gap-[14px]">
          <SocialLink href="#" label="Instagram">
            <Instagram size={16} strokeWidth={1.4} />
          </SocialLink>
          <SocialLink href="#" label="Pinterest">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2.5a9.5 9.5 0 0 0-3.44 18.33c-.09-.78-.16-1.98.03-2.83l1.22-5.18s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.48-.25 1.04.52 1.89 1.55 1.89 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.25-4.37-4.25a4.53 4.53 0 0 0-4.72 4.54c0 .9.35 1.86.78 2.38.09.1.1.2.07.31l-.29 1.17c-.05.19-.15.23-.35.14-1.32-.61-2.14-2.54-2.14-4.09 0-3.33 2.42-6.39 6.98-6.39 3.66 0 6.51 2.61 6.51 6.1 0 3.64-2.29 6.57-5.47 6.57-1.07 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.91-.88 2.05-1.31 2.75a9.5 9.5 0 1 0 2.96-18.52Z" />
            </svg>
          </SocialLink>
          <SocialLink href="#" label="LinkedIn">
            <Linkedin size={16} strokeWidth={1.4} />
          </SocialLink>
        </div>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2d2b2a] text-white transition-colors hover:bg-[#b58a52] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#F7F4EE]"
    >
      {children}
    </a>
  );
}

function StudioMapSection() {
  return (
    <section aria-labelledby="map-heading" className="relative">
      <h2 id="map-heading" className="sr-only">
        Our Studio Location
      </h2>

      <div className="relative h-[420px] w-full md:h-[460px]">
        <iframe
          src={MAP_EMBED_URL}
          title="Map showing Whitefire Interior studio at 101 Prinsengracht, Amsterdam"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 -top-6 hidden h-16 w-16 rounded-full bg-[#E8E2D8]/30 blur-2xl md:block"
        />

        <div className="pointer-events-none absolute left-1/2 top-[46%] hidden -translate-x-1/2 md:block">
          <div className="relative flex h-[54px] w-[54px] items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#b58a52]/35"
            />
            <span
              aria-hidden="true"
              className="absolute inset-[10px] rounded-full bg-[#b58a52]"
            />
            <span className="relative z-10 font-serif text-[19px] font-semibold text-white">
              W
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 md:inset-x-auto md:right-8 md:top-8 md:bottom-auto md:flex md:w-[310px] md:flex-col md:items-end">
          <div className="bg-[#1d1c1b] px-[23px] py-[19px] text-white shadow-lg">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#b48a4a]">
              VISIT OUR STUDIO
            </p>

            <h3 className="mt-2.5 font-serif text-[19px] leading-[1.2] tracking-[-0.01em]">
              101 Prinsengracht
              <br />
              Amsterdam
            </h3>

            <p className="mt-3 text-[10px] leading-[1.7] text-white/80">
              {CONTACT_INFO.addressLines.join(", ")}
            </p>

            <a
              href="#contact-form"
              className="mt-4 inline-flex min-h-[36px] items-center gap-3 bg-[#b58a52] px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c39b69] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#1d1c1b]"
            >
              BOOK APPOINTMENT
              <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkWithUs() {
  return (
    <section className="bg-[#171717] px-6 py-12 sm:px-10 lg:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-[430px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b48a4a]">
            WORK WITH US
          </p>

          <h2 className="mt-3 font-serif text-[26px] leading-[1.18] tracking-[-0.02em] text-white sm:text-[29px]">
            Have a Project in Mind?
          </h2>

          <p className="mt-3 text-[13px] leading-6 text-white/80">
            From concept to completion, we partner with you to create spaces
            that reflect your style and elevate your everyday.
          </p>
        </div>

        <a
          href="#contact-form"
          className="inline-flex min-h-[43px] items-center gap-4 border border-[#b58a52] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#b58a52] focus:outline-none focus:ring-2 focus:ring-[#b58a52] focus:ring-offset-2 focus:ring-offset-[#171717]"
        >
          SCHEDULE A CONSULTATION
          <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}