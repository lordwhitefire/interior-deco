// app/components/ContactDetails.tsx
import type { SerializeFrom } from "@remix-run/node";

type Contact = {
  phones?: string[];
  emails?: string[];
  officeAddress?: string;
  socialLinks?: string[];
};

type Props = { data: Contact };

export default function ContactDetails({ data }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-l-2 border-stone-300 pl-6">
        <h3 className="font-serif text-2xl text-stone-800 mb-2">Get in Touch</h3>
        <p className="text-stone-600 text-sm">We'd love to hear about your project</p>
      </div>

      {/* Contact Methods */}
      <div className="space-y-6">
        {/* Phones */}
        {data.phones?.map((phone) => (
          <div key={phone} className="group flex items-start space-x-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 transition-colors group-hover:bg-stone-200">
              <span className="icon-[icon-park-outline--phone-telephone] text-stone-600 w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wide">Phone</p>
              <a 
                href={`tel:${phone.replace(/\s/g, "")}`} 
                className="text-stone-800 hover:text-stone-600 transition-colors text-sm font-medium"
              >
                {phone}
              </a>
            </div>
          </div>
        ))}

        {/* Emails */}
        {data.emails?.map((email) => (
          <div key={email} className="group flex items-start space-x-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 transition-colors group-hover:bg-stone-200">
              <span className="icon-[ic--outline-email] text-stone-600 w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wide">Email</p>
              <a 
                href={`mailto:${email}`} 
                className="text-stone-800 hover:text-stone-600 transition-colors text-sm font-medium"
              >
                {email}
              </a>
            </div>
          </div>
        ))}

        {/* Address */}
        {data.officeAddress && (
          <div className="group flex items-start space-x-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 transition-colors group-hover:bg-stone-200">
              <span className="icon-[ion--earth-outline] text-stone-600 w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wide">Studio</p>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {data.officeAddress}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
  {data.socialLinks && data.socialLinks.length > 0 && (
  <div className="pt-6 border-t border-stone-200">
    <p className="text-xs text-stone-500 uppercase tracking-wide mb-4">Follow Us</p>
    <div className="flex space-x-3">
      {data.socialLinks.map((url) => {
        // Determine which icon to use based on URL
        const getSocialIcon = (url: string) => {
          if (url.includes('facebook') || url.includes('fb.com')) {
            return 'icon-[basil--facebook-solid]';
          } else if (url.includes('twitter') || url.includes('x.com')) {
            return 'icon-[mdi--twitter]';
          } else if (url.includes('instagram')) {
            return 'icon-[ri--instagram-line]';
          } else if (url.includes('linkedin')) {
            return 'icon-[ri--linkedin-fill]';
          } else if (url.includes('pinterest')) {
            return 'icon-[ri--pinterest-line]';
          } else if (url.includes('youtube')) {
            return 'icon-[ri--youtube-line]';
          } else {
            return 'icon-[ri--external-link-line]'; // fallback
          }
        };

        const getAriaLabel = (url: string) => {
          if (url.includes('facebook')) return 'Facebook profile';
          if (url.includes('twitter') || url.includes('x.com')) return 'Twitter profile';
          if (url.includes('instagram')) return 'Instagram profile';
          if (url.includes('linkedin')) return 'LinkedIn profile';
          if (url.includes('pinterest')) return 'Pinterest profile';
          if (url.includes('youtube')) return 'YouTube channel';
          return 'Social profile';
        };

        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-all duration-200 hover:scale-105"
            aria-label={getAriaLabel(url)}
          >
            <span className={`${getSocialIcon(url)} text-stone-600 w-5 h-5`} />
          </a>
        );
      })}
    </div>
  </div>
)}

      {/* Studio Hours */}
      <div className="pt-4 border-t border-stone-100">
        <p className="text-xs text-stone-500 uppercase tracking-wide mb-2">Studio Hours</p>
        <div className="text-stone-600 text-sm space-y-1">
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p className="text-stone-400">Sunday: By appointment</p>
        </div>
      </div>
    </div>
  );
}