import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function WhatsAppButton() {
  return (
    <aside aria-label="Quick contact" className="contents">
      <a
        href={siteConfig.getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pune WoodCraft on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="text-sm font-semibold tracking-wide pr-1 hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}