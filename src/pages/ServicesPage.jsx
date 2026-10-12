import React from 'react';
import { Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import ServiceCard from '../components/ServiceCard';

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-woodgold/10 border border-woodgold/30">
          <Sparkles className="w-3.5 h-3.5 text-woodgold" />
          <span className="text-xs uppercase tracking-widest text-woodgold font-semibold">
            On-Site Custom Woodwork
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-warmbeige">
          Our Carpentry & Furniture Services
        </h1>
        <p className="text-sm sm:text-base text-warmbeige/75 leading-relaxed">
          From full flat turnkey woodwork to tailored modular kitchens and wardrobes in Pune. Every item is fabricated using marine-grade plywood and branded hardware directly at your flat.
        </p>
      </div>

      {/* Grid of All Services */}
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

      {/* Material & Quality Standards Box */}
      <div className="bg-charcoal-light/60 border border-charcoal-light rounded-2xl p-8 sm:p-12 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-warmbeige text-center">
          Material Standards & Transparency
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-woodgold font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Certified Plywood</span>
            </div>
            <p className="text-xs text-warmbeige/70 leading-relaxed">
              IS:710 Marine Grade BWP/BWR ply for kitchens and bathrooms, IS:303 MR grade for dry bedroom storage.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-woodgold font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Branded Hardware</span>
            </div>
            <p className="text-xs text-warmbeige/70 leading-relaxed">
              Standard soft-close hinges, tandem runners, and heavy-duty channels from trusted brands like Blum, Hafele, and Hettich.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-woodgold font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Finishes of Choice</span>
            </div>
            <p className="text-xs text-warmbeige/70 leading-relaxed">
              0.8mm to 1mm laminates, anti-fingerprint acrylics, PU polished veneers, or textured fluted profiles.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-charcoal text-center">
          <a
            href={siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I would like to consult on materials and get a quote for my project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Discuss Materials on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}