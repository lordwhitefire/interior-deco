const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "app", "data", "services");

const SERVICES = [
  {
    slug: "interior-design",
    heroAlt: "Warm luxury living room with a beige linen sectional, walnut cabinetry and a stone fireplace.",
    inclusionsAlt: "Styled master bedroom seating area with built-in shelving, ceramics and framed art.",
    gallery: [
      { title: "Classic Family Living Room", alt: "Classic living room with a deep green velvet sofa and dark wood shelving" },
      { title: "Contemporary Kitchen-Living", alt: "Contemporary kitchen-living space with a quartz island and oak dining table" },
      { title: "Serene Master Bedroom", alt: "Serene master bedroom with a tufted linen headboard and brass sconces" },
      { title: "Architectural Reading Room", alt: "Architectural reading room with an arched alcove and built-in bookshelves" },
    ],
  },
  {
    slug: "space-planning",
    heroAlt: "Open-plan kitchen and dining layout with a waterfall stone island and sculptural pendant light.",
    inclusionsAlt: "Re-planned dining area with built-in cabinetry, glass fronts and custom banquette seating.",
    gallery: [
      { title: "Open-Plan Kitchen Remodel", alt: "Open-plan kitchen remodel with a large island separating cooking and dining zones" },
      { title: "Living Room Reconfiguration", alt: "Living room reconfiguration with a floating sofa arrangement and media wall" },
      { title: "Home Office Transformation", alt: "Home office transformation with a built-in desk wall and storage cabinetry" },
      { title: "Compact Studio Fit-Out", alt: "Compact studio fit-out with multifunctional furniture and maximized storage" },
    ],
  },
  {
    slug: "custom-furniture",
    heroAlt: "Custom walnut cabinetry wall with brass hardware, display niches and floating shelves.",
    inclusionsAlt: "Custom kitchen cabinetry with premium wood finishes, brass handles and open shelves.",
    gallery: [
      { title: "Bespoke Kitchen Cabinetry", alt: "Bespoke kitchen cabinetry with hand-finished oak fronts and brass accents" },
      { title: "Custom Media Wall", alt: "Custom media wall with a floating console, integrated fireplace and shelving" },
      { title: "Built-in Wardrobes", alt: "Built-in wardrobe wall with sliding oak doors and integrated lighting" },
      { title: "Handcrafted Dining Table", alt: "Handcrafted live-edge oak dining table with sculpted steel legs" },
    ],
  },
  {
    slug: "renovation",
    heroAlt: "Renovated kitchen with quartz countertops, custom cabinetry and a statement island.",
    inclusionsAlt: "Renovated living space with custom millwork, herringbone flooring and fresh plaster walls.",
    gallery: [
      { title: "Full Kitchen Renovation", alt: "Full kitchen renovation with a quartz waterfall island and brass fixtures" },
      { title: "Living Room Remodel", alt: "Living room remodel with custom millwork and a fireplace feature wall" },
      { title: "Bathroom Renovation", alt: "Bathroom renovation with stone cladding and a walk-in shower" },
      { title: "Bedroom Renovation", alt: "Bedroom renovation with a dark accent wall and integrated wardrobes" },
    ],
  },
  {
    slug: "styling-decor",
    heroAlt: "Curated living room with a beige linen sofa, textured art and styled coffee table.",
    inclusionsAlt: "Styled console vignette with framed art, ceramic vases and sculptural objects.",
    gallery: [
      { title: "Living Room Restyle", alt: "Living room restyle with throw pillows, textured art and layered rugs" },
      { title: "Bedroom Styling", alt: "Bedroom styling with layered linen bedding and decorative cushions" },
      { title: "Dining Table Styling", alt: "Styled dining table with a ceramic centerpiece and dried branches" },
      { title: "Entryway Styling", alt: "Styled entryway with a console table, round mirror and gallery wall" },
    ],
  },
  {
    slug: "material-selection",
    heroAlt: "Curated material palette with stone samples, oak veneers and textured textiles.",
    inclusionsAlt: "Material library with stone slabs, wood veneer boards and fabric swatches.",
    gallery: [
      { title: "Stone Kitchen", alt: "Kitchen with a book-matched marble island and honed stone backsplash" },
      { title: "Oak Living Room Flooring", alt: "Living room with wide-plank oak flooring and limewash walls" },
      { title: "Marble Bathroom", alt: "Bathroom with marble wall slabs, brass fittings and an oak vanity" },
      { title: "Timber Ceiling Living Space", alt: "Living space with a timber-slatted ceiling and stone feature wall" },
    ],
  },
  {
    slug: "lighting-design",
    heroAlt: "Layered warm interior lighting with sconces grazing a textured plaster wall.",
    inclusionsAlt: "Ambient lighting vignette with a sculptural wall sconce casting warm light.",
    gallery: [
      { title: "Living Room Layered Lighting", alt: "Living room with recessed ceiling lights and picture lights over art" },
      { title: "Kitchen Task Lighting", alt: "Kitchen with under-cabinet task lights and pendants over the island" },
      { title: "Bedroom Ambient Lighting", alt: "Bedroom with wall-mounted reading lamps and headboard cove light" },
      { title: "Gallery Hallway Lighting", alt: "Hallway with picture lights on a gallery wall and a statement pendant" },
    ],
  },
  {
    slug: "project-management",
    heroAlt: "Delivered turnkey project, completed styled living space with coordinated finishes.",
    inclusionsAlt: "Delivered project detail with a finished console, styled decor and fresh flowers.",
    gallery: [
      { title: "Full Home Delivery", alt: "Full home interior delivered on time with coordinated furniture and decor" },
      { title: "Apartment Fit-Out", alt: "Apartment fit-out with space-efficient furniture and coordinated lighting" },
      { title: "Office Interior", alt: "Boutique office interior with custom desks and acoustic panels" },
      { title: "Villa Project", alt: "Villa interior with a double-height living space and statement staircase" },
    ],
  },
];

let updated = 0;
for (const s of SERVICES) {
  const file = path.join(DIR, `${s.slug}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.hero.image = `services-hero-${s.slug}.jpg`;
  data.hero.imageAlt = s.heroAlt;
  data.inclusionsImage = `services-inclusions-${s.slug}.jpg`;
  data.inclusionsImageAlt = s.inclusionsAlt;
  data.gallery = s.gallery.map((g, i) => ({
    title: g.title,
    image: `services-gallery-${s.slug}-${String(i + 1).padStart(2, "0")}.jpg`,
    imageAlt: g.alt,
    href: "/projects",
  }));
  data.cta.image = "about_closing_dark_banner_table_vase.jpg";
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  updated++;
}
console.log(`Updated ${updated} service JSON files`);
