// app/components/Services.tsx
import { Link } from "@remix-run/react";
import { useInView } from "react-intersection-observer";
import { CSSProperties } from "react";

type Service = {
  id: string;
  name: string;
  description: string;
};

type ServicesProps = { data: Service[] };

export default function Services({ data }: ServicesProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <>
      <style>{styles}</style>

      <section ref={ref} className="py-16 bg-neutral-100" aria-label="Services Section">
        <div className="mt-2 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
          {data.map((s, i) => (
            <ServiceCard key={s.id} service={s} visible={inView} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- single card ---------- */
function ServiceCard({
  service,
  visible,
  index,
}: {
  service: Service;
  visible: boolean;
  index: number;
}) {
  const delay = index * 0.12;

  return (
    <div
      className={`service-card ${visible ? "show" : ""}`}
      style={{ "--delay": `${delay}s` } as CSSProperties}
    >
  
<div className="group flex flex-col items-center bg-white
                px-6 py-10 sm:py-20 mx-4 sm:mx-0
                max-w-[18rem] sm:max-w-none
                rounded-lg shadow-lg justify-center
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">

  {/* title – smaller on mobile */}
  <h2 className="text-2xl sm:text-xl font-medium mb-3 sm:mb-4
                 group-hover:text-gray-800 transition-colors duration-300">
    {service.name}
  </h2>

  {/* description – tighter width & text on mobile */}
  <p className="text-lg sm:text-sm mb-4 w-11/12 sm:w-4/5 text-gray-600">
    {service.description}
  </p>

  {/* button – slightly smaller on mobile */}
  <Link to={`/services/${service.id}`}>
    <button className="flex gap-x-2 bg-gray-800 text-white
                       text-lg sm:text-sm font-medium
                       py-2 px-3 sm:py-2 sm:px-4
                       rounded-sm transition-all duration-300
                       group-hover:bg-gray-700 group-hover:scale-105">
      Read More
      <span className="mt-[0.3rem] sm:mt-[0.3rem]
                       icon-[solar--arrow-right-linear] w-4 h-4 sm:w-4 sm:h-4" />
    </button>
  </Link>
</div>
    </div>
  );
}

/* ---------- CSS ---------- */
const styles = `
  .service-card{
    opacity:0;
    transform:translateY(40px);
    transition:opacity .6s cubic-bezier(.215,.61,.355,1),
               transform .6s cubic-bezier(.215,.61,.355,1);
    transition-delay:var(--delay);
  }
  .service-card.show{
    opacity:1;
    transform:translateY(0);
  }
`;