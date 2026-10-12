import React, { useState, useEffect } from 'react';
import { X, MapPin, MessageSquare, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function PortfolioModal({ project, onClose }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setCurrentImgIndex(0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  // Multi-image list ya single fallback
  const gallery = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-dark/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-charcoal rounded-2xl max-w-4xl w-full border border-woodgold/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-charcoal/80 text-warmbeige hover:text-woodgold border border-charcoal-light transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Image Display with Arrows */}
        <div className="relative bg-black flex items-center justify-center h-80 sm:h-96 w-full overflow-hidden select-none">
          <img
            src={gallery[currentImgIndex]}
            alt={`${project.title} - ${currentImgIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                type="button"
                className="absolute left-3 p-2 rounded-full bg-charcoal/80 text-warmbeige hover:text-woodgold border border-charcoal-light transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                type="button"
                className="absolute right-3 p-2 rounded-full bg-charcoal/80 text-warmbeige hover:text-woodgold border border-charcoal-light transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-charcoal/80 border border-charcoal-light text-[11px] text-warmbeige/90 flex items-center gap-1.5">
                <Images className="w-3.5 h-3.5 text-woodgold" />
                <span>{currentImgIndex + 1} / {gallery.length}</span>
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Selector Strip */}
        {gallery.length > 1 && (
          <div className="flex gap-2 p-3 bg-charcoal-dark overflow-x-auto border-b border-charcoal-light">
            {gallery.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentImgIndex(idx)}
                className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImgIndex === idx ? 'border-woodgold scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={thumb} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Project Details */}
        <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wider text-woodgold font-semibold bg-charcoal-light px-2.5 py-1 rounded">
              {project.category}
            </span>
            <div className="flex items-center text-xs text-warmbeige/70 gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-woodgold" />
              <span>{project.area}</span>
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-warmbeige">
            {project.title}
          </h3>

          <p className="text-sm text-warmbeige/80 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-charcoal-light">
            <a
              href={siteConfig.getWhatsAppLink(`Hello Pune WoodCraft, I like the "${project.title}" project work. Can we discuss similar carpentry for my home?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Discuss This Work on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}