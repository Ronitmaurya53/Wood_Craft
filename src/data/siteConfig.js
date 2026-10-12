export const siteConfig = {
  brandName: "PUNE WOODCRAFT",
  tagline: "Crafting Homes, One Detail at a Time.",
  description:
    "Custom furniture, modular kitchens, and complete on-site carpentry solutions, thoughtfully crafted across Pune.",
  
  // Real contact setup (Change number here only)
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // 12-digit Indian number without spaces/symbols
  email: "contact@punewoodcraft.in",
  city: "Pune, Maharashtra",
  
  // Service Areas in Pune (Easily configurable)
  serviceAreas: [
    "Kothrud",
    "Baner",
    "Wakad",
    "Aundh",
    "Hinjawadi",
    "Viman Nagar",
    "Kalyani Nagar",
    "Magarpatta",
    "Hadapsar",
    "Bavdhan",
    "Pimple Saudagar",
    "Koregaon Park"
  ],

  socials: {
    instagram: "https://instagram.com/punewoodcraft_placeholder",
    facebook: "https://facebook.com/punewoodcraft_placeholder",
  },

  // Helper to generate encoded WhatsApp link
  getWhatsAppLink(customMessage) {
    const defaultMsg =
      "Hello Pune WoodCraft, I am interested in custom furniture work in Pune. I would like to discuss my requirements and get an estimate.";
    const message = customMessage || defaultMsg;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
};