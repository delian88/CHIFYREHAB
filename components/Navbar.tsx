
import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 px-6 lg:px-12 ${
        isScrolled 
          ? "py-4 bg-white/80 backdrop-blur-xl shadow-lg" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
            <Heart size={24} fill="white" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
            CHIFY<span className="text-pink-500">REHAB</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors hover:text-pink-500 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-200"
          >
            Emergency Reach
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-blue-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} className={isScrolled ? "text-blue-600" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          <button 
            className="absolute top-6 right-6 text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-3xl font-bold text-gray-800 hover:text-pink-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Request Appointment
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
