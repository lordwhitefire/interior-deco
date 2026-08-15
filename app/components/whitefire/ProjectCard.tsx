import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title?: string;
  image: string;
  href: string;
  alt: string;
}

export function ProjectCard({ title, image, href, alt }: ProjectCardProps) {
  return (
    <a
      href={href}
      className="group min-w-[82vw] snap-start overflow-hidden sm:min-w-0"
    >
      <img
        src={image}
        alt={alt}
        className="aspect-[1.6/1] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        loading="lazy"
      />
      {title && (
        <div className="mt-3">
          <h3 className="font-serif text-[14px] text-[#20201E]">{title}</h3>
        </div>
      )}
    </a>
  );
}