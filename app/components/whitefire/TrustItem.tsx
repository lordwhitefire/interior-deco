import { HeartHandshake, ShieldCheck, BriefcaseBusiness } from "lucide-react";

const iconMap = {
  personalized: HeartHandshake,
  quality: ShieldCheck,
  delivery: BriefcaseBusiness,
  satisfaction: HeartHandshake,
};

interface TrustItemProps {
  title: string;
  description: string;
  icon: "personalized" | "quality" | "delivery" | "satisfaction";
  index?: number;
}

export function TrustItem({
  title,
  description,
  icon,
  index = 0,
}: TrustItemProps) {
  const Icon = iconMap[icon];

  return (
    <div
      className={`flex gap-4 px-7 py-7 lg:px-10 ${
        index > 0 ? "border-t border-black/10 sm:border-l lg:border-t-0" : ""
      }`}
    >
      <span className="mt-0.5 shrink-0 text-[#A78352]">
        <Icon size={25} strokeWidth={1.1} />
      </span>
      <div>
        <h3 className="font-serif text-[14px] text-[#20201E]">
          {title}
        </h3>
        <p className="mt-1 text-[11px] leading-[1.5] text-[#5B574F]">
          {description}
        </p>
      </div>
    </div>
  );
}