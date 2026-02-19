
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logo URL from user provided image
  const LOGO_URL = "https://img.js.design/assets/static/f5e386457007e1554625b1854497e246.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Expertise', id: 'expertise' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const isDarkView = currentView === 'contact';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 px-6 lg:px-12 ${
        isScrolled 
          ? "py-4 bg-white/80 backdrop-blur-xl shadow-lg" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <img src={LOGO_URL} alt="Chify Logo" className="w-full h-full object-cover" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled || isDarkView ? 'text-blue-600' : 'text-white'}`}>
            CHIFY<span className="text-pink-500">REHAB</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-bold transition-all text-sm uppercase tracking-widest hover:text-pink-500 relative py-1 group ${
                currentView === link.id 
                  ? 'text-pink-500' 
                  : (isScrolled || isDarkView ? 'text-gray-700' : 'text-white/90')
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-pink-500 transition-all duration-300 ${currentView === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            Emergency Reach
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 rounded-xl bg-gray-100/10 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} className={isScrolled || isDarkView ? "text-blue-600" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-[60] flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-500">
          <button 
            className="absolute top-8 right-8 text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={40} />
          </button>
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-5xl font-black transition-colors ${
                  currentView === link.id ? 'text-pink-500' : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="mt-6 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl active:scale-95"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
