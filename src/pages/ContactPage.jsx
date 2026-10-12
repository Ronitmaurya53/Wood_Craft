import React from 'react';
import { Phone, MessageSquare, MapPin, Sparkles, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-woodgold/10 border border-woodgold/30">
          <Sparkles className="w-3.5 h-3.5 text-woodgold" />
          <span className="text-xs uppercase tracking-widest text-woodgold font-semibold">
            On-Site Consultation
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-warmbeige">
          Book a Free Site Visit in Pune
        </h1>
        <p className="text-sm sm:text-base text-warmbeige/75 leading-relaxed">
          We visit your flat, carry laminate catalogs, assess wall alignments, and discuss your custom woodworking vision.
        </p>
      </div>

      {/* Main Grid: Details + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Information & Operational Details */}
        <div className="space-y-6">
          <div className="bg-charcoal-light/60 p-6 sm:p-8 rounded-2xl border border-charcoal-light space-y-6">
            <h2 className="font-serif text-xl font-bold text-warmbeige">
              Direct Communication
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-woodgold/10 text-woodgold mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-warmbeige/60 uppercase font-semibold">Phone Support</p>
                  <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="text-base font-bold text-warmbeige hover:text-woodgold">
                    {siteConfig.phone}
                  </a>
                  <p className="text-xs text-warmbeige/50 mt-0.5">Mon – Sun: 9:00 AM – 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#25D366]/10 text-[#25D366] mt-1">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-warmbeige/60 uppercase font-semibold">WhatsApp Chat</p>
                  <a
                    href={siteConfig.getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-woodgold hover:underline"
                  >
                    Click to Open WhatsApp
                  </a>
                  <p className="text-xs text-warmbeige/50 mt-0.5">Fastest response for sharing flat layouts & drawings</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-woodgold/10 text-woodgold mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-warmbeige/60 uppercase font-semibold">Service Model</p>
                  <p className="text-sm font-semibold text-warmbeige">
                    On-Site Across Pune, Maharashtra
                  </p>
                  <p className="text-xs text-warmbeige/50 mt-0.5">
                    No physical showroom visit required; we meet at your residence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Area Coverage List */}
          <div className="bg-charcoal-light/40 p-6 rounded-2xl border border-charcoal-light space-y-3">
            <h3 className="font-serif text-sm font-semibold text-woodgold uppercase tracking-wider">
              Primary Service Localities
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {siteConfig.serviceAreas.map((area) => (
                <span key={area} className="px-3 py-1 rounded bg-charcoal text-warmbeige/80 border border-charcoal-light">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}