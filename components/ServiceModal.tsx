
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import ShiningText from './ShiningText';
import SafeImage from './SafeImage';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    desc: string;
    img: string;
    details: string[];
    longDesc: string;
  } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] relative shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="text-gray-800" size={24} />
            </button>

            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <SafeImage src={service.img} alt={service.title} className="w-full h-full" />
              </div>
              <div className="p-8 lg:p-16">
                <ShiningText as="h2" text={service.title} className="text-4xl mb-6" />
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {service.longDesc}
                </p>
                <div className="space-y-4">
                  <h4 className="font-bold text-blue-600 uppercase tracking-widest text-sm">Key Features</h4>
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-pink-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all">
                    Schedule This Service
                  </button>
                  <button onClick={onClose} className="border border-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
