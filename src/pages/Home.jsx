import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  MessageSquare, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  Clock, 
  Layers 
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { faqsData } from '../data/faqs';
import ServiceCard from '../components/ServiceCard';
import PortfolioModal from '../components/PortfolioModal';
import ContactForm from '../components/ContactForm';

export default function Home({ customProjects }) {
  const list = customProjects || projectsData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = ['All', 'Kitchen', 'Wardrobes', 'Bedroom', 'Living Room', 'Complete Home'];

 const filteredProjects = activeCategory === 'All'
  ? list
  : list.filter((p) => p.category === activeCategory);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">

      {/* SECTION B: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background with High-End Ambient Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Custom wooden furniture and architectural interiors in Pune"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/95 via-charcoal/80 to-charcoal-dark/95" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal-dark/40 to-charcoal-dark" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-woodgold/10 border border-woodgold/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-woodgold" />
            <span className="text-xs uppercase tracking-widest text-woodgold font-semibold">
              Custom Furniture • Pune
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-warmbeige leading-tight max-w-4xl mx-auto">
            Crafting Homes, One Detail at a Time.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-warmbeige/80 max-w-2xl mx-auto leading-relaxed font-light">
            Custom furniture, modular kitchens, and complete home furniture solutions, thoughtfully crafted for your space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-all duration-300 shadow-xl shadow-woodgold/10"
            >
              <MessageSquare className="w-4 h-4" />
              Get Free Estimate
            </a>
            <a
              href="#our-work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-warmbeige/30 text-warmbeige hover:border-woodgold hover:text-woodgold transition-colors backdrop-blur-sm"
            >
              Explore Our Work
            </a>
          </div>

          {/* Value Badges */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-charcoal-light/60 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-woodgold shrink-0" />
              <span className="text-xs text-warmbeige/80">Exact On-Site Dimensions</span>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-woodgold shrink-0" />
              <span className="text-xs text-warmbeige/80">Marine Ply & Branded Fittings</span>
            </div>
            <div className="flex items-center gap-3 col-span-2 md:col-span-1">
              <ShieldCheck className="w-5 h-5 text-woodgold shrink-0" />
              <span className="text-xs text-warmbeige/80">Zero Showroom Overhead</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">Specialized Carpentry</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige">
            Bespoke Furniture Solutions
          </h2>
          <p className="text-sm text-warmbeige/70 max-w-2xl mx-auto">
            From tailored storage for compact Pune apartments to luxury whole-home turnkey woodwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              whatsappUrl={service.whatsappUrl}
            />
          ))}
        </div>
      </section>

      {/* SECTION D: WHY CHOOSE US */}
      <section className="bg-charcoal-dark py-20 border-y border-charcoal-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">The Direct Carpenter Advantage</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige leading-tight">
                No Intermediaries. Direct Craftsmanship at Your Location.
              </h2>
              <p className="text-sm text-warmbeige/75 leading-relaxed">
                By operating directly at your home instead of maintaining an expensive commercial showroom, we pass pure material quality and fair carpenter rates directly to you.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Custom designs tailored to your layout",
                    desc: "Every inch of storage is calculated against your specific room corners and beam offsets."
                  },
                  {
                    title: "On-site measurement and consultation",
                    desc: "We visit your Pune home with catalogs, evaluate finishes, and discuss realistic timelines."
                  },
                  {
                    title: "Transparent material selection",
                    desc: "Choose your own plywood grades, laminates, acrylics, and branded hardware like Blum or Hafele."
                  },
                  {
                    title: "Clear, itemized quotations",
                    desc: "Straightforward estimates without hidden showroom surcharges or marketing fees."
                  },
                  {
                    title: "Direct accountability & fine detailing",
                    desc: "Work executed by master carpenters dedicated to clean edges and aligned cabinetry."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="mt-1 w-5 h-5 rounded-full bg-woodgold/20 flex items-center justify-center text-woodgold shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-warmbeige">{item.title}</h4>
                      <p className="text-xs text-warmbeige/65 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-woodgold/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1000&q=80"
                alt="Carpenter fine detailing furniture woodworking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-charcoal/90 backdrop-blur-md border border-charcoal-light">
                <p className="text-xs text-woodgold font-semibold uppercase tracking-wider">Service Guarantee</p>
                <p className="text-xs text-warmbeige/80 mt-1">
                  On-site execution ensures perfect leveling across uneven walls and floor contours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: OUR WORK / PORTFOLIO */}
      <section id="our-work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">Gallery & Concepts</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige">
            Selected Project Inspirations
          </h2>
          <p className="text-sm text-warmbeige/70 max-w-xl mx-auto">
            Browse through custom kitchen and furniture concepts built for Pune living. Click any design to preview specifications.
          </p>
          <p className="text-xs text-woodgold/80 italic pt-1">
            (Notice: Sample portfolio visual concepts for reference before on-site commission.)
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-woodgold text-charcoal-dark shadow-md'
                  : 'bg-charcoal-light text-warmbeige/70 hover:text-warmbeige hover:bg-charcoal-light/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-charcoal-light border border-charcoal-light hover:border-woodgold/50 transition-all duration-300 shadow-md relative"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-1 bg-charcoal-light">
                <div className="flex justify-between items-center text-xs text-woodgold">
                  <span>{project.category}</span>
                  <span className="text-warmbeige/60">{project.area}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-warmbeige group-hover:text-woodgold transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Lightbox Modal */}
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </section>

      {/* SECTION F: HOW IT WORKS */}
      <section className="bg-charcoal-dark py-20 border-y border-charcoal-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">Transparent Process</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige">
              How We Work With You
            </h2>
            <p className="text-sm text-warmbeige/70 max-w-xl mx-auto">
              A hassle-free, four-stage journey from your first chat to flawless handover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Contact on WhatsApp",
                desc: "Send your room photos, basic ideas, or Pinterest inspiration directly to our WhatsApp."
              },
              {
                step: "02",
                title: "Discuss Scope",
                desc: "We discuss your budget, preferred materials, and preliminary configuration options."
              },
              {
                step: "03",
                title: "Site Visit & Measure",
                desc: "We visit your Pune flat or home to record laser-accurate dimensions and wall checks."
              },
              {
                step: "04",
                title: "Quote & Build",
                desc: "Receive an itemized quote. Upon approval, our carpenters commence on-site crafting."
              }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-charcoal border border-charcoal-light flex flex-col justify-between">
                <div className="font-serif text-4xl font-bold text-woodgold/30 mb-4">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-warmbeige">{step.title}</h3>
                  <p className="text-xs text-warmbeige/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: CUSTOMER REVIEWS (PLACEHOLDERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige">
            Client Experiences
          </h2>
          <p className="text-sm text-warmbeige/70 max-w-lg mx-auto">
            Reviews will be showcased here as residential projects are completed across Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              text: "“Prompt on-site visit for our Baner apartment. The carpenter understood our specific wardrobe internal partition requirements and delivered clean laminates.”",
              author: "Verified Pune Homeowner",
              location: "Baner, Pune"
            },
            {
              text: "“Unlike big turnkey showroom brands who charge huge markups, Pune WoodCraft provided direct material suggestions and transparent pricing.”",
              author: "Verified Resident",
              location: "Wakad, Pune"
            },
            {
              text: "“Crafted our hydraulic bed and sliding wardrobe directly at the flat. Perfect alignment against uneven plastering.”",
              author: "Verified Resident",
              location: "Kothrud, Pune"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-charcoal-light/60 border border-charcoal-light space-y-4">
              <p className="text-xs text-warmbeige/80 italic leading-relaxed">
                {item.text}
              </p>
              <div className="pt-2 border-t border-charcoal flex justify-between items-center text-xs">
                <span className="font-semibold text-warmbeige">{item.author}</span>
                <span className="text-woodgold">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION H: SERVICE AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-charcoal-dark border border-woodgold/20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-woodgold">
            <MapPin className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-semibold">Service Coverage</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warmbeige">
            Where We Work Across Pune
          </h2>

          <p className="text-sm text-warmbeige/75 max-w-xl mx-auto">
            We provide direct on-site consultation and woodworking execution across these key localities:
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {siteConfig.serviceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-full text-xs font-medium bg-charcoal text-warmbeige border border-charcoal-light hover:border-woodgold/50 transition-colors"
              >
                {area}
              </span>
            ))}
          </div>

          <p className="text-xs text-warmbeige/50 pt-2">
            Located outside these areas? Reach out to check if on-site scheduling is available for your flat.
          </p>
        </div>
      </section>

      {/* SECTION I: FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">Common Queries</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-charcoal-light/70 border border-charcoal-light overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base font-semibold text-warmbeige">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-woodgold transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-warmbeige/80 border-t border-charcoal/60 leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION J: CONTACT / ESTIMATE FORM */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-woodgold font-semibold">Get in Touch</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbeige">
              Book an On-Site Consultation or Request an Estimate
            </h2>
            <p className="text-sm text-warmbeige/75 leading-relaxed">
              Have architectural drawings, rough measurements, or ideas you saved? Connect with us via WhatsApp or fill out the enquiry form to arrange an on-site visit.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-charcoal-light border border-charcoal-light">
                <div className="p-3 rounded-full bg-woodgold/10 text-woodgold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-warmbeige/60 uppercase">Direct Phone</p>
                  <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold text-warmbeige hover:text-woodgold">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-charcoal-light border border-charcoal-light">
                <div className="p-3 rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-warmbeige/60 uppercase">WhatsApp Inquiry</p>
                  <a
                    href={siteConfig.getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-woodgold hover:underline"
                  >
                    Send photos & details on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-charcoal-light border border-charcoal-light">
                <div className="p-3 rounded-full bg-woodgold/10 text-woodgold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-warmbeige/60 uppercase">Operational Hub</p>
                  <p className="text-sm font-semibold text-warmbeige">
                    {siteConfig.city} (On-Site Client Locations)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

    </div>
  );
}