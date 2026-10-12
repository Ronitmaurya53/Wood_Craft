import React, { useState } from 'react';
import { Sparkles, MapPin, MessageSquare } from 'lucide-react';
import { projectsData } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import PortfolioModal from '../components/PortfolioModal';

export default function PortfolioPage({ customProjects }) {
  const list = customProjects || projectsData;
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Kitchen', 'Wardrobes', 'Bedroom', 'Living Room', 'Complete Home'];

 const filteredProjects = activeCategory === 'All'
    ? list
    : list.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 sm:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-woodgold/10 border border-woodgold/30">
          <Sparkles className="w-3.5 h-3.5 text-woodgold" />
          <span className="text-xs uppercase tracking-widest text-woodgold font-semibold">
            Project Concepts & Showcase
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-warmbeige">
          Our Work Portfolio
        </h1>
        <p className="text-sm sm:text-base text-warmbeige/75 leading-relaxed">
          Explore our custom furniture and carpentry designs tailored for modern Pune apartments.
        </p>
        <p className="text-xs text-woodgold/80 italic">
          *Notice: Design and architectural reference gallery. Actual woodwork is customized on-site.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-woodgold text-charcoal-dark shadow-md'
                : 'bg-charcoal-light text-warmbeige/70 hover:text-warmbeige hover:bg-charcoal-light/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-charcoal-light border border-charcoal-light hover:border-woodgold/40 transition-all duration-300 shadow-lg"
          >
            <div className="h-64 sm:h-72 overflow-hidden bg-charcoal-dark">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-woodgold font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-warmbeige/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-woodgold" />
                  {project.area}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-warmbeige group-hover:text-woodgold transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-warmbeige/70 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8">
        <a
          href={siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I have photos of a custom design I want made. Can we discuss?")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-all shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          Send Your Custom Design Reference
        </a>
      </div>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}