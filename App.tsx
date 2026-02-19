
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ShiningText from './components/ShiningText';
import ChatBot from './components/ChatBot';
import Counter from './components/Counter';
import ServiceModal from './components/ServiceModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  Activity, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Minus,
  Quote,
  Zap,
  Shield,
  Loader2,
  Bell,
  Waves,
  ZapOff,
  Dna,
  Cpu,
  Trophy,
  Globe,
  BrainCircuit,
  Baby
} from 'lucide-react';

const LOGO_URL = "https://img.js.design/assets/static/f5e386457007e1554625b1854497e246.png";

// Reusable Image component with Brand Logo fallback for broken images
const SafeImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  return (
    <img 
      src={error ? LOGO_URL : src} 
      alt={alt} 
      className={`${className} ${error ? 'object-contain p-8 bg-gray-50' : 'object-cover'}`}
      onError={() => setError(true)}
    />
  );
};

const SERVICES_DATA = [
  { 
    title: 'Physical Therapy', 
    desc: 'Specialized movement analysis and manual therapy to resolve pain and dysfunction.', 
    longDesc: 'Our physical therapy department utilizes evidence-based practices to help patients regain mobility, strength, and function. We treat everything from post-operative orthopedic cases to chronic pain syndromes using a mix of manual techniques and advanced equipment.',
    icon: <Activity className="text-pink-500" />,
    img: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=800',
    details: ['Gait Training', 'Manual Therapy', 'Post-Op Recovery', 'Pain Management']
  },
  { 
    title: 'Neurological Rehab', 
    desc: 'Focused care for stroke, brain injury, and spinal cord condition recovery.', 
    longDesc: 'Recovery from neurological injury requires a specialized, multidisciplinary approach. Our neuro-rehab program focuses on neuroplasticity, helping patients relearn skills and adapt to changes in their nervous system with cutting-edge robotic assistance.',
    icon: <BrainCircuit className="text-blue-500" />,
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    details: ['Stroke Recovery', 'Brain Injury Care', 'Spinal Support', 'Robotic Assistance']
  },
  { 
    title: 'Pediatric Care', 
    desc: 'Specialized therapy for developmental delays and childhood physical challenges.', 
    longDesc: 'Children are not just small adults. Our pediatric specialists use play-based therapy to help children reach developmental milestones, overcome physical limitations, and participate fully in school and play.',
    icon: <Baby className="text-pink-500" />,
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    details: ['Developmental Screening', 'Sensory Integration', 'Play Therapy', 'Parent Training']
  },
  { 
    title: 'Occupational Therapy', 
    desc: 'Helping you regain the skills needed for daily living and work tasks.', 
    longDesc: 'We focus on "occupations"—the activities that give life meaning. Our OTs work with you to modify environments and develop skills for self-care, productivity, and leisure, ensuring you can live life to its fullest.',
    icon: <Users className="text-blue-500" />,
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    details: ['Daily Living Skills', 'Ergonomic Assessment', 'Adaptive Equipment', 'Home Modification']
  },
  { 
    title: 'Speech & Language', 
    desc: 'Comprehensive evaluation and treatment of communication and swallowing disorders.', 
    longDesc: 'Our speech-language pathologists provide expert care for individuals with communication difficulties, voice disorders, and swallowing problems (dysphagia). We use the latest diagnostic tools to create effective treatment plans.',
    icon: <Stethoscope className="text-pink-500" />,
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    details: ['Articulation Therapy', 'Swallowing Safety', 'Cognitive Support', 'Voice Coaching']
  },
  { 
    title: 'Sports Recovery', 
    desc: 'High-performance rehabilitation for athletes to return to peak condition.', 
    longDesc: 'Return to the field faster and stronger. Our sports medicine team focuses on biomechanics and performance optimization to not only heal injuries but prevent future ones.',
    icon: <Activity className="text-blue-500" />,
    img: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=800&q=80',
    details: ['Athletic Screening', 'Performance Training', 'Injury Prevention', 'Rapid Recovery']
  }
];

type ViewState = 'home' | 'about' | 'services' | 'expertise' | 'contact';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[0] | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const openService = (service: typeof SERVICES_DATA[0]) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'about': return <AboutFullView onNavigate={setCurrentView} />;
      case 'services': return <ServicesFullView onNavigate={setCurrentView} openService={openService} />;
      case 'expertise': return <ExpertiseFullView onNavigate={setCurrentView} />;
      case 'contact': return <ContactFullView onNavigate={setCurrentView} onNotify={addToast} />;
      default: return <HomeLandingView onNavigate={setCurrentView} openService={openService} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      {/* Notifications */}
      <div className="fixed top-24 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white border-l-4 border-blue-600 rounded-2xl shadow-2xl p-6 flex items-start gap-4 min-w-[320px] max-w-md relative overflow-hidden"
            >
              <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                <Bell size={24} />
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-900 text-xs uppercase tracking-wider mb-1">Clinic Alert</p>
                <p className="text-gray-600 font-medium leading-relaxed">{toast.message}</p>
              </div>
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-1 bg-pink-500"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>

      <Footer onNavigate={setCurrentView} />
      <ChatBot />
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

// --- View Sub-Components ---

const HomeLandingView: React.FC<{ onNavigate: (v: ViewState) => void, openService: (s: any) => void }> = ({ onNavigate, openService }) => (
  <>
    <HeroSlider />
    
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { label: 'Patient Victories', value: 15000, suffix: '+', icon: <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-2xl shadow-pink-500/30 transform hover:scale-110 transition-transform logo-glow border-4 border-pink-50 bg-white"><img src={LOGO_URL} className="w-full h-full object-cover" alt="Clinic Brand" /></div> },
          { label: 'Specialists', value: 120, suffix: '+', icon: <Users className="text-blue-500 mx-auto mb-4" size={32} /> },
          { label: 'Facilities', value: 45, suffix: '', icon: <Globe className="text-pink-500 mx-auto mb-4" size={32} /> },
          { label: 'Years Leading', value: 25, suffix: '', icon: <Trophy className="text-blue-500 mx-auto mb-4" size={32} /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            {stat.icon}
            <div className="text-5xl font-black text-gray-900 mb-2">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="py-32 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">The Chify Promise</h4>
          <ShiningText as="h2" text="Redefining the Standards of Recovery" className="text-4xl md:text-6xl mb-8 leading-tight" />
          <p className="text-gray-600 text-xl mb-10 leading-relaxed font-light">
            We merge clinical precision with deep human empathy. Our facilities in Abuja and beyond are equipped with the latest diagnostic AI to ensure your roadmap to health is as unique as you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={() => onNavigate('about')} className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              Our Clinical Vision <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
        
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
          <SafeImage src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80" className="rounded-[4rem] shadow-2xl relative z-10 border-[12px] border-white" alt="Chify Facility" />
        </div>
      </div>
    </section>

    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h4 className="text-pink-500 font-black uppercase tracking-widest text-sm mb-4">Our Expertise</h4>
          <ShiningText as="h2" text="Specialized Clinical Departments" className="text-4xl md:text-5xl" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {SERVICES_DATA.slice(0, 3).map((service, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              onClick={() => openService(service)} 
              className="group cursor-pointer bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 hover:border-blue-200 transition-all"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-2xl font-black mb-4">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">{service.desc}</p>
              <div className="text-blue-600 font-black flex items-center gap-2">
                Learn More <ChevronRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5">
        <img src={LOGO_URL} className="w-[400px] grayscale" alt="Faded Logo" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm mb-4">Patient FAQ</h4>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Expert Answers</h2>
        </div>
        <div className="space-y-6">
          {[
            { q: 'Is Chify Rehab open 24/7?', a: 'Our Abuja headquarters maintains emergency staff 24/7 for stroke and trauma intake. Scheduled sessions run from 7 AM to 8 PM daily.' },
            { q: 'Do you accept international insurance?', a: 'Yes, we work with several global carriers. Contact our patient advocacy team for verification.' }
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  </>
);

const AboutFullView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>
      <ShiningText as="h1" text="Our Legacy of Excellence" className="text-5xl md:text-7xl mb-12 leading-tight" />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            Founded in 1999, Chify Rehabilitation was born from a vision to revolutionize healthcare in West Africa. We bridged the gap between advanced medical tech and patient-first care.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Today, we are a global name in specialized therapy, leading research in neuromodulation and biomechanics at our Abuja R&D center.
          </p>
        </div>
        <SafeImage src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" className="rounded-[3rem] shadow-2xl" alt="Hospital Hall" />
      </div>
    </div>
  </div>
);

const ServicesFullView: React.FC<{ onNavigate: (v: ViewState) => void, openService: (s: any) => void }> = ({ onNavigate, openService }) => (
  <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <ShiningText as="h1" text="Our Specialized Departments" className="text-5xl md:text-7xl mb-8" />
        <p className="text-gray-600 text-xl font-light">Comprehensive care roadmaps for every stage of recovery.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SERVICES_DATA.map((service, i) => (
          <motion.div key={i} whileHover={{ y: -10 }} onClick={() => openService(service)} className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
            <div className="h-64 overflow-hidden relative">
              <SafeImage src={service.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={service.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-white font-bold flex items-center gap-2">View Roadmap <ChevronRight size={18} /></span>
              </div>
            </div>
            <div className="p-10">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{service.desc}</p>
              <div className="space-y-3">
                {service.details.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-pink-500" /> {d}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const ExpertiseFullView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <div className="pt-32 pb-24 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <ShiningText as="h1" text="Clinic Tech & AI" className="text-5xl md:text-7xl mb-8 leading-tight" />
          <p className="text-gray-600 text-xl leading-relaxed mb-10 font-light">
            We operate West Africa's most advanced rehab laboratory. From robotic gait correction to AI-powered speech diagnostics, we bring the future of medicine to Abuja.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50 rounded-3xl">
              <h4 className="text-3xl font-black text-blue-600 mb-2">50+</h4>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Patents</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-3xl">
              <h4 className="text-3xl font-black text-pink-600 mb-2">12</h4>
              <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Research Labs</p>
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <SafeImage src="https://images.unsplash.com/photo-1579154235602-3c2c2aa5d72f?auto=format&fit=crop&w=1200&q=80" className="rounded-[4rem] shadow-2xl relative z-10" alt="Tech Center" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
        </div>
      </div>
      
      {/* High Tech Sections */}
      <div className="space-y-32 py-20">
        {[
          { title: 'Exoskeleton Integration', desc: 'Robotic mobility suits for severe spinal recovery.', icon: <Cpu />, img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800' },
          { title: 'Neural Diagnostics', desc: 'High-frequency brain mapping for neuro-plasticity.', icon: <ZapOff />, img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800' }
        ].map((item, i) => (
          <div key={i} className={`flex flex-col md:flex-row gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <div className="text-blue-600 mb-6">{React.cloneElement(item.icon as React.ReactElement, { size: 40 })}</div>
              <h3 className="text-3xl font-black mb-6">{item.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
            </div>
            <div className="flex-1">
              <SafeImage src={item.img} className="rounded-[3rem] shadow-xl w-full h-[400px]" alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactFullView: React.FC<{ onNavigate: (v: ViewState) => void, onNotify: (msg: string) => void }> = ({ onNavigate, onNotify }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', focus: 'General Consultation', urgency: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNotify("Emergency request logged. Our Abuja team will contact you within 15 minutes.");
      setFormData({ name: '', phone: '', focus: 'General Consultation', urgency: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-32 pb-24 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
        <div>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <ShiningText as="h1" text="Contact Our Hub" className="text-5xl md:text-7xl mb-12" />
          <p className="text-gray-400 text-xl mb-16 leading-relaxed">Our specialist triage team is based in the Abuja CBD. Available 24/7 for critical care coordination.</p>
          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-pink-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all logo-glow">
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">Abuja HQ</h4>
                <p className="text-gray-500 mb-2">Plot 1234, Health Plaza, CBD, Abuja, Nigeria</p>
                <p className="text-blue-400 font-bold">+234 800 123 4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 text-gray-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <img src={LOGO_URL} className="w-32" alt="Brand Background" />
          </div>
          <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0 border border-gray-100 logo-glow">
              <img src={LOGO_URL} className="w-full h-full object-cover" alt="Brand Logo" />
            </div>
            Intake Request
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
              <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Enter name..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mobile Number</label>
              <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="+234 ..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Brief Note</label>
              <textarea name="urgency" value={formData.urgency} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 h-32 outline-none" placeholder="How can we help?" />
            </div>
            <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Initiate Consultation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-8 flex justify-between items-center text-left hover:bg-white/5 transition-all">
        <span className="text-xl font-bold">{question}</span>
        {isOpen ? <Minus className="text-pink-500" /> : <Plus className="text-blue-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-gray-400 leading-relaxed font-light">
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-white pt-32 pb-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-white rounded-[1.25rem] overflow-hidden flex items-center justify-center shadow-lg logo-glow">
            <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-3xl font-black tracking-tighter">CHIFY<span className="text-pink-500">REHAB</span></span>
        </div>
        <p className="text-gray-400 leading-relaxed font-light">Leading clinical rehabilitation across Nigeria since 1999.</p>
      </div>
      <div>
        <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Navigation</h4>
        <ul className="space-y-6 text-gray-400 font-medium">
          {['home', 'about', 'services', 'expertise', 'contact'].map(v => (
            <li key={v}><button onClick={() => onNavigate(v as ViewState)} className="hover:text-white capitalize">{v}</button></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Contact</h4>
        <ul className="space-y-6 text-gray-400 font-medium">
          <li className="flex items-start gap-2 text-white">
            <div className="w-5 h-5 rounded-full overflow-hidden mt-1 logo-glow">
              <img src={LOGO_URL} className="w-full h-full object-cover" alt="Mini Logo" />
            </div>
            CBD, Abuja, Nigeria
          </li>
          <li className="flex items-center gap-2">
            <Phone size={16} className="text-pink-500" /> +234 800 123 4567
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Stay Updated</h4>
        <div className="flex gap-2">
          <input type="email" placeholder="Email..." className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex-1 outline-none" />
          <button className="bg-blue-600 px-6 rounded-2xl"><ChevronRight /></button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-white/5 flex justify-between items-center text-gray-500 text-[10px] font-black uppercase tracking-widest">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 rounded-full overflow-hidden opacity-50 logo-glow">
          <img src={LOGO_URL} className="w-full h-full object-cover" alt="Mini Branding" />
        </div>
        <p>&copy; {new Date().getFullYear()} Chify Health Group. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default App;
