export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1440px] bg-[#151514] px-6 py-10 text-white shadow-[0_0_0_1px_rgba(25,22,18,0.08)] sm:px-8 lg:px-12">
      <div className="mx-auto text-center">
        <p className="font-serif text-xl">Whitefire Interior</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
          Interior Design Studio
        </p>
        <a
          href="/privacy"
          className="mt-5 inline-block text-[10px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white/70"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
