
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ShiningText from './ShiningText';
// Fix: Import motion and AnimatePresence from framer-motion as they were used but not defined
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const LOGO_URL = "/logo.svg";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const isDarkView = currentView === 'contact' || currentView === 'expertise';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 px-6 lg:px-16 ${
        isScrolled 
          ? "py-4 bg-white/90 backdrop-blur-2xl shadow-xl" 
          : "pt-24 pb-12 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-12 h-12 overflow-hidden rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-500 shadow-lg">
            <img src={LOGO_URL} alt="Chify Seal" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tighter leading-none ${isScrolled || isDarkView ? 'text-gray-900' : 'text-white'}`}>
              CHIFY<span className="text-pink-500">REHAB</span>
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-black transition-all text-xs uppercase tracking-[0.2em] hover:text-pink-500 relative py-2 group ${
                currentView === link.id 
                  ? 'text-pink-500' 
                  : (isScrolled || isDarkView ? 'text-gray-900' : 'text-white/90')
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-1 bg-pink-500 transition-all duration-300 ${currentView === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-600/20 active:scale-95 btn-shimmer"
          >
            Emergency Intake
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden p-3 rounded-2xl backdrop-blur-md transition-all ${isScrolled || isDarkView ? 'bg-blue-50 text-blue-600' : 'bg-white/10 text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-white z-[60] flex flex-col p-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex items-center gap-4">
                <img src={LOGO_URL} className="w-10 h-10 rounded-xl" alt="Chify Logo" />
                <span className="text-xl font-black tracking-tighter text-gray-900">CHIFY<span className="text-pink-500">REHAB</span></span>
              </div>
              <button className="text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={40} />
              </button>
            </div>
            
            <div className="flex flex-col gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-6xl font-black text-left transition-colors ${
                    currentView === link.id ? 'text-pink-500' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-20">
               <button 
                onClick={() => handleNavClick('contact')}
                className="w-full bg-blue-600 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl shadow-blue-600/20 active:scale-95 btn-shimmer"
              >
                Intake Request
              </button>
              <div className="mt-12 text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
                CBD, Abuja, Nigeria
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
