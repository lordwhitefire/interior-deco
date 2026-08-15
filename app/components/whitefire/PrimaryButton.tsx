import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  href: string;
  variant?: "filled" | "outline";
}

export function PrimaryButton({
  children,
  href,
  variant = "filled",
}: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[42px] items-center justify-center px-6 text-[10px] font-medium tracking-[0.12em] transition-all ${
        variant === "filled"
          ? "bg-[#9A7950] text-white hover:bg-[#B08A5A]"
          : "border border-[#B08A5A] text-white hover:bg-[#B08A5A] hover:text-[#11100F]"
      }`}
    >
      {children}
    </a>
  );
}
