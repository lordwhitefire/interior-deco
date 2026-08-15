import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export function Breadcrumbs({ items, dark = false }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-[11px] ${
        dark ? "text-white/80" : "text-[#9C794A]"
      }`}
    >
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          {index > 0 && (
            <ChevronRight
              size={12}
              className={dark ? "text-white/45" : "text-[#9C794A]/70"}
            />
          )}
          {item.href ? (
            <a
              href={item.href}
              className={dark
                ? "hover:text-white transition-colors"
                : "hover:text-[#B18A55] transition-colors"}
            >
              {item.label}
            </a>
          ) : (
            <span className={dark ? "text-white/60" : "text-[#5C5750]"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}