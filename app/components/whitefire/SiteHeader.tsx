import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { SiteLogo } from "./SiteLogo";

interface SiteHeaderProps {
  activePath?: string;
  showSearch?: boolean;
}

const aboutLinks = [
  ["HOME", "/"],
  ["ABOUT", "/about"],
  ["SERVICES", "/services"],
  ["PROJECTS", "/projects"],
  ["BLOG", "/blog"],
  ["TEAM", "/team"],
  ["TESTIMONIALS", "/testimonials"],
  ["FAQ", "/faq"],
  ["CONTACT", "/contact"],
] as const;

export function SiteHeader({
  activePath = "/",
  showSearch = true,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/10 text-white backdrop-blur-[2px]">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 md:px-10 xl:px-[66px]">
        <SiteLogo variant="about" />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-7"
        >
          {aboutLinks.map(([label, href]) => {
            const active = href === activePath;
            const services = label === "SERVICES";

            return (
              <a
                key={label}
                href={href}
                className={`relative flex h-[68px] items-center gap-1 text-[10px] font-medium tracking-[0.08em] transition-colors ${
                  active ? "text-[#B08A5A]" : "text-white/90 hover:text-white"
                }`}
              >
                {label}
                {services && (
                  <span aria-hidden="true" className="text-[9px]">
                    ⌄
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-[13px] left-0 h-px w-full bg-[#B08A5A]" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="/contact"
            className="border border-[#B08A5A]/80 px-5 py-2.5 text-[10px] font-medium tracking-[0.1em] text-white transition-colors hover:bg-[#B08A5A] hover:text-[#11100F]"
          >
            GET IN TOUCH
          </a>

          {showSearch && (
            <a
              href="/search"
              aria-label="Search"
              className="text-white transition-colors hover:text-[#B08A5A]"
            >
              <Search size={17} strokeWidth={1.2} />
            </a>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="lg:hidden"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#11100F]/95 px-6 py-5 backdrop-blur-md lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {aboutLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/10 py-4 text-[11px] tracking-[0.12em] ${
                  href === activePath ? "text-[#B08A5A]" : "text-white"
                }`}
              >
                {label}
              </a>
            ))}

            <a
              href="/contact"
              className="mt-5 border border-[#B08A5A] px-5 py-3 text-center text-[10px] tracking-[0.12em] text-white"
            >
              GET IN TOUCH
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}