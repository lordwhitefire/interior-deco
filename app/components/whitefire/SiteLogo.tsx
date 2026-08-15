interface SiteLogoProps {
  variant?: "home" | "about";
}

export function SiteLogo({ variant = "home" }: SiteLogoProps) {
  if (variant === "about") {
    return (
      <a
        href="/"
        aria-label="Whitefire Interior home"
        className="group flex shrink-0 items-center gap-2.5"
      >
        <span
          aria-hidden="true"
          className="font-serif text-[32px] leading-none text-[#B08A5A]"
        >
          W
        </span>

        <span className="flex flex-col leading-none">
          <span className="font-sans text-[13px] font-medium tracking-[0.22em] text-white">
            WHITEFIRE
          </span>
          <span className="mt-1 text-[7px] tracking-[0.42em] text-white/75">
            INTERIOR
          </span>
        </span>
      </a>
    );
  }

  return (
    <a href="/" className="shrink-0" aria-label="Whitefire Interior home">
      <div className="flex items-center gap-3">
        <span className="font-serif text-3xl leading-none text-[#C3A56E]">
          W
        </span>
        <span className="leading-none">
          <span className="block text-[13px] font-medium tracking-[0.22em]">
            WHITEFIRE
          </span>
          <span className="mt-1 block text-[7px] tracking-[0.28em] text-white/60">
            INTERIOR
          </span>
        </span>
      </div>
    </a>
  );
}
