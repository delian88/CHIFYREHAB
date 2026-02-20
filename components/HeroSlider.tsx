
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShiningText from './ShiningText';
import SafeImage from './SafeImage';
import { Slide } from '../types';

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600',
    title: 'Precision in Physical Therapy',
    subtitle: 'Restoring movement and enhancing life through specialized care.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=1600',
    title: 'Holistic Occupational Wellness',
    subtitle: 'Empowering you to perform daily activities with confidence.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    title: 'Advanced Neurological Care',
    subtitle: 'Dedicated support for recovery from stroke, injury, or illness.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1526232761682-d26e4fca6042?auto=format&fit=crop&q=80&w=1600',
    title: 'Pediatric Rehabilitation',
    subtitle: 'Nurturing growth and development in every child.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1600',
    title: 'Compassionate Elder Care',
    subtitle: 'Maintaining independence and dignity through therapeutic support.'
  }
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <SafeImage 
            src={slides[current].image} 
            alt={slides[current].title} 
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center pt-48 px-6 lg:px-24">
        <div className="max-w-4xl">
          <motion.div
            key={`title-${current}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "backOut" }}
          >
            <ShiningText 
              as="h1" 
              text={slides[current].title} 
              className="text-5xl md:text-8xl mb-8 leading-[1.1]"
            />
          </motion.div>
          <motion.p
            key={`subtitle-${current}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white text-xl md:text-3xl mb-12 leading-relaxed font-light max-w-2xl"
          >
            {slides[current].subtitle}
          </motion.p>
          <motion.div
            key={`cta-${current}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap gap-6"
          >
            <a 
              href="#contact" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              Start Recovery
            </a>
            <a 
              href="#services" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-10 py-5 rounded-full font-bold text-lg transition-all"
            >
              Explore Programs
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              current === idx ? "w-12 bg-pink-500" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="custom-shape-divider-bottom-1678123456">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C0,46.35,166.4,120,321.39,56.44Z" className="shape-fill"></path>
          </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
