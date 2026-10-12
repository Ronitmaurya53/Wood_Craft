import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Modular Kitchen',
    area: siteConfig.serviceAreas[0],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Enter a valid 10-digit Indian phone number.';
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide brief details (at least 10 characters).';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build formatted message for instant WhatsApp forwarding
    const whatsappText = `*New Estimate Enquiry - Pune WoodCraft*%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Locality:* ${formData.area}%0A*Details:* ${formData.message}`;

    setSubmitted(true);

    // Open WhatsApp in a new tab after 1.5 seconds for instant transmission
    setTimeout(() => {
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappText}`, '_blank');
    }, 1200);
  };

  return (
    <div className="bg-charcoal-light/70 p-6 sm:p-10 rounded-2xl border border-charcoal-light/90 shadow-2xl">
      {submitted ? (
        <div className="text-center py-10 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-woodgold mx-auto animate-bounce" />
          <h3 className="font-serif text-2xl font-bold text-warmbeige">Thank You!</h3>
          <p className="text-sm text-warmbeige/80 max-w-md mx-auto">
            Your enquiry has been prepared. Redirecting to WhatsApp to send your specifications directly to our master carpenter...
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-woodgold underline uppercase tracking-wider pt-4"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-warmbeige/75 font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`w-full px-4 py-3 rounded-lg bg-charcoal border ${
                errors.name ? 'border-red-500' : 'border-charcoal-light'
              } text-warmbeige placeholder-warmbeige/30 focus:border-woodgold focus:outline-none transition-colors text-sm`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-warmbeige/75 font-semibold mb-2">
                Phone Number (10 digits) *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={`w-full px-4 py-3 rounded-lg bg-charcoal border ${
                  errors.phone ? 'border-red-500' : 'border-charcoal-light'
                } text-warmbeige placeholder-warmbeige/30 focus:border-woodgold focus:outline-none transition-colors text-sm`}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="service" className="block text-xs uppercase tracking-wider text-warmbeige/75 font-semibold mb-2">
                Service Required
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-charcoal border border-charcoal-light text-warmbeige focus:border-woodgold focus:outline-none transition-colors text-sm"
              >
                <option value="Modular Kitchen">Modular Kitchen</option>
                <option value="Custom Wardrobes">Custom Wardrobes</option>
                <option value="TV Units & Wall Panels">TV Units & Wall Panels</option>
                <option value="Beds & Bedroom Furniture">Beds & Bedroom Furniture</option>
                <option value="Complete Home Furniture">Complete Home Furniture</option>
                <option value="Other Custom Carpentry">Other Custom Carpentry</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="area" className="block text-xs uppercase tracking-wider text-warmbeige/75 font-semibold mb-2">
              Locality in Pune
            </label>
            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-charcoal border border-charcoal-light text-warmbeige focus:border-woodgold focus:outline-none transition-colors text-sm"
            >
              {siteConfig.serviceAreas.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
              <option value="Other Pune Location">Other Area in Pune</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-warmbeige/75 font-semibold mb-2">
              Project Description / Room Dimensions *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe what you require: flat size (e.g. 2BHK in Baner), rough dimensions, materials preferred, or target timeline..."
              className={`w-full px-4 py-3 rounded-lg bg-charcoal border ${
                errors.message ? 'border-red-500' : 'border-charcoal-light'
              } text-warmbeige placeholder-warmbeige/30 focus:border-woodgold focus:outline-none transition-colors text-sm resize-none`}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-widest bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-all duration-300 shadow-md hover:shadow-woodgold/20"
          >
            <Send className="w-4 h-4" />
            Submit & Forward to WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}