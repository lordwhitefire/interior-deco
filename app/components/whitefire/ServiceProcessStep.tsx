import {
  MessageCircle,
  Compass,
  CheckSquare,
  Sofa,
  Star,
} from "lucide-react";

const iconMap = {
  discover: MessageCircle,
  design: Compass,
  plan: CheckSquare,
  execute: Sofa,
  reveal: Star,
};

interface ServiceProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: "discover" | "design" | "plan" | "execute" | "reveal";
  isLast?: boolean;
}

export function ServiceProcessStep({
  number,
  title,
  description,
  icon,
  isLast = false,
}: ServiceProcessStepProps) {
  const Icon = iconMap[icon];

  return (
    <div className="relative flex flex-col items-center text-center md:px-5">
      {!isLast && (
        <span
          className="absolute left-[calc(50%+28px)] right-[calc(-50%+28px)] top-[40px] hidden border-t border-dotted border-[#B6A98F] md:block"
        />
      )}

      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1D1D1B] text-white">
        <Icon size={24} strokeWidth={1.2} />
      </div>

      <span className="mt-3 text-[10px] font-semibold tracking-[0.08em] text-[#25231F]">
        {number}
      </span>

      <h3 className="mt-1 font-serif text-[15px] text-[#20201E]">
        {title}
      </h3>

      <p className="mt-2 max-w-[165px] text-[11px] leading-[1.55] text-[#5B574F]">
        {description}
      </p>
    </div>
  );
}