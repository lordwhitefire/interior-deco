interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p
          className={`mb-3 text-[10px] font-medium uppercase tracking-[0.24em] ${
            light ? "text-[#B08A5A]" : "text-[#9A7A4A]"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-serif text-3xl leading-[1.08] sm:text-4xl lg:text-[42px] ${
          light ? "text-white" : "text-[#1B1A18]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-sm leading-[1.6] ${
            light ? "text-white/75" : "text-[#69645D]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
