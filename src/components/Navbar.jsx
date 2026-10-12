import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  User, 
  LayoutDashboard, 
  LogOut, 
  LogIn, 
  ShieldCheck 
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Firebase auth state listen karein
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Dropdown ke bahar click karne par use band karein
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Our Work', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-md border-b border-charcoal-light/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex flex-col group">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-warmbeige group-hover:text-woodgold transition-colors">
              PUNE WOODCRAFT
            </span>
            <span className="text-[10px] tracking-widest text-woodgold uppercase font-medium">
              Bespoke Carpentry & Furniture
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wider transition-colors duration-200 uppercase ${
                    isActive
                      ? 'text-woodgold font-semibold'
                      : 'text-warmbeige/80 hover:text-woodgold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Get Estimate + Profile Icon) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={siteConfig.getWhatsAppLink("Hello Pune WoodCraft, I would like to get a free estimate for my furniture project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-woodgold text-charcoal-dark hover:bg-woodgold-light transition-all duration-300 shadow-md hover:shadow-woodgold/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Get Free Estimate
            </a>

            {/* Profile Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 focus:outline-none ${
                  currentUser
                    ? 'bg-woodgold/20 border-woodgold text-woodgold hover:bg-woodgold/30 ring-2 ring-woodgold/20'
                    : 'bg-charcoal border-charcoal-light text-warmbeige/70 hover:text-woodgold hover:border-woodgold/50'
                }`}
                aria-label="Account Settings"
                title={currentUser ? `Logged in: ${currentUser.email}` : "Admin Portal"}
              >
                {currentUser ? (
                  <span className="font-serif font-bold text-xs uppercase">
                    {currentUser.email?.charAt(0) || 'A'}
                  </span>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {/* Profile Dropdown Popup */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl bg-charcoal-light border border-charcoal-light shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-3 border-b border-charcoal/60">
                        <div className="flex items-center gap-1.5 text-woodgold text-[11px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Owner Account</span>
                        </div>
                        <p className="text-xs font-medium text-warmbeige truncate mt-1">
                          {currentUser.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-warmbeige hover:text-woodgold hover:bg-charcoal transition-colors font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-woodgold" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-charcoal/60">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-300 hover:text-red-200 hover:bg-red-950/40 transition-colors font-medium text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-2">
                      <div className="px-3 py-2 text-[11px] text-warmbeige/60">
                        Owner login for live uploads
                      </div>
                      <Link
                        to="/admin/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl bg-charcoal hover:bg-woodgold hover:text-charcoal-dark text-warmbeige text-xs font-semibold transition-all"
                      >
                        <LogIn className="w-4 h-4 text-woodgold group-hover:text-charcoal-dark" />
                        <span>Owner Sign In</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Bar: Profile Icon + Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to={currentUser ? "/admin" : "/admin/login"}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                currentUser
                  ? 'bg-woodgold/20 border-woodgold text-woodgold'
                  : 'bg-charcoal border-charcoal-light text-warmbeige/70'
              }`}
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-warmbeige hover:text-woodgold p-2 rounded-md focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-charcoal-light border-b border-charcoal-dark px-6 pt-4 pb-8 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className="text-base font-medium text-warmbeige hover:text-woodgold transition-colors py-2 border-b border-charcoal/40"
              >
                {link.name}
              </Link>
            ))}

            {currentUser ? (
              <Link
                to="/admin"
                onClick={closeMobileMenu}
                className="text-base font-semibold text-woodgold py-2 border-b border-charcoal/40 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard ({currentUser.email?.split('@')[0]})
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={closeMobileMenu}
                className="text-base font-medium text-warmbeige/80 py-2 border-b border-charcoal/40 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Admin Portal Login
              </Link>
            )}
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-woodgold text-woodgold text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Call {siteConfig.phone}
            </a>
            <a
              href={siteConfig.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-woodgold text-charcoal-dark text-sm font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              Get Free Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}