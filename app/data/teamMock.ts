import staffData from "./team/staff.json";

export const teamMembers = Object.values(staffData.members)
  .sort((a, b) => a.order - b.order);

export const shownMembers = teamMembers.filter((member) => member.order <= 5);

export const memberBySlug = (slug: string) =>
  teamMembers.find((member) => member.slug === slug);

export const teamHero = staffData.teamHero;

export const intro = {
  eyebrow: "MEET THE TEAM",
  title: "Expertise. Creativity. Collaboration.",
  description:
    "We believe great design is the result of collaboration, curiosity, and attention to detail. Get to know the talented individuals who bring our vision to life.",
};

export const values = [
  {
    id: "client-centered",
    title: "Client-Centered",
    description:
      "We listen, collaborate, and tailor every project to your lifestyle and needs.",
    icon: "users-round",
  },
  {
    id: "thoughtful-design",
    title: "Thoughtful Design",
    description:
      "Every detail is intentional, balancing beauty, function, and timeless appeal.",
    icon: "pencil-ruler",
  },
  {
    id: "quality-integrity",
    title: "Quality & Integrity",
    description:
      "We are committed to quality craftsmanship and honest, transparent communication.",
    icon: "shield-check",
  },
  {
    id: "sustainable-approach",
    title: "Sustainable Approach",
    description:
      "We source responsibly and design with longevity and the environment in mind.",
    icon: "leaf",
  },
] as const;

export const projectCta = {
  eyebrow: "LET'S WORK TOGETHER",
  title: "Have a Project in Mind?",
  description:
    "We'd love to hear about your project and help you create a space that inspires.",
  image: staffData.cta,
  buttonLabel: "SCHEDULE A CONSULTATION",
  buttonHref: "/contact",
};

export const profileFixture = {
  headline: "Designing with intention.\nCreating spaces that feel like home.",
  paragraphs: [
    "With a strong foundation in architecture and a refined eye for detail, this designer brings creativity, functionality, and a thoughtful approach to every project.",
    "Specializing in warm, layered interiors that reflect each client's lifestyle and personality—transforming ideas into timeless spaces that inspire.",
  ],
  facts: [
    {
      key: "education",
      label: "Education",
      values: [
        "Bachelor of Architecture, CEPT University",
        "Diploma in Interior Design, NID Ahmedabad",
      ],
      icon: "graduation-cap",
    },
    {
      key: "expertise",
      label: "Expertise",
      values: ["Residential Design, Space Planning, Material & Finishes, Styling"],
      icon: "medal",
    },
    {
      key: "experience",
      label: "Experience",
      values: ["8+ Years"],
      icon: "star",
    },
    {
      key: "location",
      label: "Location",
      values: ["Amsterdam, Netherlands"],
      icon: "map-pin",
    },
  ],
} as const;

export const approachFixture = {
  headline: "Every space has a story.\nI'm here to help you tell yours.",
  description:
    "A collaborative approach, listening closely to understand your needs and aspirations—then designing spaces that are as functional as they are beautiful.",
  steps: [
    {
      id: "listen",
      title: "Listen",
      description: "Understanding your lifestyle, needs, and vision.",
      icon: "users",
    },
    {
      id: "design",
      title: "Design",
      description: "Crafting thoughtful concepts tailored to you.",
      icon: "pencil",
    },
    {
      id: "refine",
      title: "Refine",
      description: "Perfecting every detail for a cohesive result.",
      icon: "armchair",
    },
    {
      id: "deliver",
      title: "Deliver",
      description: "Bringing your space to life with care and precision.",
      icon: "sprout",
    },
  ],
} as const;

export const consultationCta = {
  eyebrow: "LET'S CREATE SOMETHING BEAUTIFUL",
  headline: "Have a project in mind?",
  description: "Let's collaborate to create a space that inspires you every day.",
  image: staffData.consultationCta,
  buttonLabel: "SCHEDULE A CONSULTATION",
  buttonHref: "/contact",
};