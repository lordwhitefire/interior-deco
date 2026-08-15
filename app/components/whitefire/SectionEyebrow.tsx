import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  light?: boolean;
}

export function SectionEyebrow({ children, light = false }: SectionEyebrowProps) {
  return (
    <p
      className={`text-[10px] font-medium uppercase tracking-[0.2em] ${
        light ? "text-[#B08A5A]" : "text-[#9A7950]"
      }`}
    >
      {children}
    </p>
  );
}
