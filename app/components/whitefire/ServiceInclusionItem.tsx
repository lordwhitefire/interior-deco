import {
  LayoutDashboard,
  CircleDot,
  Sofa,
  Sparkles,
  LampDesk,
  BriefcaseBusiness,
} from "lucide-react";

const iconMap = {
  layout: LayoutDashboard,
  materials: CircleDot,
  furniture: Sofa,
  styling: Sparkles,
  lighting: LampDesk,
  management: BriefcaseBusiness,
};

interface ServiceInclusionItemProps {
  title: string;
  description: string;
  icon:
    | "layout"
    | "materials"
    | "furniture"
    | "styling"
    | "lighting"
    | "management";
}

export function ServiceInclusionItem({
  title,
  description,
  icon,
}: ServiceInclusionItemProps) {
  const Icon = iconMap[icon];

  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-[#A78352]">
        <Icon size={24} strokeWidth={1.15} />
      </span>
      <div>
        <h3 className="font-serif text-[14px] text-[#26241F]">
          {title}
        </h3>
        <p className="mt-1 text-[11px] leading-[1.55] text-[#57534C]">
          {description}
        </p>
      </div>
    </div>
  );
}