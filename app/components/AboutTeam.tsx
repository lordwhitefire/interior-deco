import React from "react";
import type { TeamMember } from "~/types/about"; // see snippet below

type Props = { members: TeamMember[] };

export const AboutTeam: React.FC<Props> = ({ members }) => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="max-w-6xl mx-auto px-6">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 font1">
        Meet the People Behind the Spaces
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((m) => (
          <div
            key={m.name}
            className="bg-white rounded-2xl shadow p-6 text-center"
          >
            <img
              src={m.src}
              alt={m.alt}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              loading="lazy"
              width={128}
              height={128}
            />
            <h4 className="font-bold text-gray-900">{m.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{m.title}</p>
            <div className="flex justify-center gap-3">
              {m.twitter && (
                <a href={m.twitter} aria-label="Twitter" className="icon-[basil--twitter-solid] w-5 h-5 text-gray-500 hover:text-customColor2" />
              )}
              {m.linkedin && (
                <a href={m.linkedin} aria-label="LinkedIn" className="icon-[basil--linkedin-solid] w-5 h-5 text-gray-500 hover:text-customColor2" />
              )}
              {m.instagram && (
                <a href={m.instagram} aria-label="Instagram" className="icon-[basil--instagram-solid] w-5 h-5 text-gray-500 hover:text-customColor2" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);