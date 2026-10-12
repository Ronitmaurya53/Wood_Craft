import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

export default function ServiceCard({ title, description, image, whatsappUrl }) {
  return (
    <article className="group bg-charcoal-light/70 rounded-2xl overflow-hidden border border-charcoal-light hover:border-woodgold/40 transition-all duration-300 flex flex-col h-full shadow-lg hover:-translate-y-1">
      <div className="relative h-56 sm:h-64 overflow-hidden bg-charcoal-dark">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/30 to-transparent" />
        <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-woodgold px-2.5 py-1 bg-charcoal/80 rounded backdrop-blur-sm border border-woodgold/20">
          Handcrafted
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-warmbeige group-hover:text-woodgold transition-colors">
            {title}
          </h3>
          <p className="text-sm text-warmbeige/75 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-charcoal/80 flex items-center justify-between">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-woodgold hover:text-woodgold-light group-hover:underline transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Enquire via WhatsApp
            <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}