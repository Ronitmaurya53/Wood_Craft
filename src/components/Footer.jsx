import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-warmbeige/80 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-wider text-warmbeige">
              {siteConfig.brandName}
            </h3>
            <p className="text-sm leading-relaxed text-warmbeige/70">
              Personalized on-site carpentry, luxury wardrobes, and modular kitchens in Pune. We build durable, handcrafted woodwork fitted directly at your residence.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Instagram SVG */}
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center text-warmbeige hover:text-woodgold hover:border-woodgold border border-charcoal-light transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center text-warmbeige hover:text-woodgold hover:border-woodgold border border-charcoal-light transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-widest text-woodgold uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-woodgold transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-woodgold transition-colors">Our Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-woodgold transition-colors">Project Work</Link></li>
              <li><Link to="/contact" className="hover:text-woodgold transition-colors">Book Site Visit</Link></li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-widest text-woodgold uppercase">
              Service Areas (Pune)
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {siteConfig.serviceAreas.slice(0, 8).map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 rounded bg-charcoal text-warmbeige/70 border border-charcoal-light"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="text-xs text-warmbeige/50 italic">
              On-site measurements & consultation available across all listed areas.
            </p>
          </div>

          {/* Col 4: Contact Directly */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-widest text-woodgold uppercase">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-woodgold shrink-0" />
                <span>On-Site Service across Pune, MH</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-woodgold shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-woodgold">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={siteConfig.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-woodgold hover:underline"
                >
                  Direct WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-light/40 flex flex-col sm:flex-row justify-between items-center text-xs text-warmbeige/50 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <p>Handcrafted Custom Furniture • Direct Carpenter Pricing</p>
        </div>
      </div>
    </footer>
  );
}