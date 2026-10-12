import { siteConfig } from "./siteConfig";

export const servicesData = [
  {
    id: "modular-kitchen",
    title: "Modular Kitchen",
    description:
      "Ergonomic, moisture-resistant modular kitchens crafted on-site with soft-close hardware, custom pantry units, and premium finishes.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    get whatsappUrl() {
      return siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I am interested in a Modular Kitchen quotation for my home in Pune.");
    }
  },
  {
    id: "custom-wardrobes",
    title: "Custom Wardrobes",
    description:
      "Floor-to-ceiling sliding and hinged wardrobes designed for optimal internal storage, accessories trays, and seamless panel integration.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    get whatsappUrl() {
      return siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I would like to discuss custom wardrobe designs and pricing.");
    }
  },
  {
    id: "tv-units",
    title: "TV Units & Wall Panels",
    description:
      "Modern media consoles, acoustic louvered fluted panels, and floating wooden entertainment units with concealed wire management.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    get whatsappUrl() {
      return siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I am looking for TV unit and wooden wall panel designs in Pune.");
    }
  },
  {
    id: "beds-bedroom",
    title: "Beds & Bedroom Furniture",
    description:
      "Sturdy hydraulic storage beds, upholstered headboards, designer side tables, and integrated study desks built to fit exact room dimensions.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    get whatsappUrl() {
      return siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I would like an estimate for custom bed and bedroom furniture.");
    }
  },
  {
    id: "custom-storage",
    title: "Custom Storage Solutions",
    description:
      "Tailored shoe consoles, foyer partition units, hidden utility storage, and prayer units built to optimize compact urban living.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    get whatsappUrl() {
      return siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I need custom foyer/shoe rack storage solutions for my flat.");
    }
  },
  {
    id: "complete-home",
    title: "Complete Home Furniture",
    description:
      "Full turnkey woodwork execution for 1BHK, 2BHK, 3BHK, and villas. Coordinated veneers, laminates, and on-site finish matching your interiors.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    get whatsappUrl() {
      return siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I have a complete flat interior woodwork project in Pune and want an on-site visit.");
    }
  }
];