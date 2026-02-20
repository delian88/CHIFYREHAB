
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ShiningText from './components/ShiningText';
import ChatBot from './components/ChatBot';
import Counter from './components/Counter';
import ServiceModal from './components/ServiceModal';
import SafeImage, { LOGO_URL } from './components/SafeImage';
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
    <div className="min-h-screen bg-white selection:bg-pink-100 selection:text-pink-600">
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
                <p className="font-black text-gray-900 text-xs uppercase tracking-wider mb-1">System Update</p>
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
          transition={{ duration: 0.5 }}
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
          { label: 'Successful Outcomes', value: 15000, suffix: '+', icon: <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white transform hover:scale-110 transition-transform"><img src={LOGO_URL} className="w-full h-full object-cover" alt="Chify Seal" /></div> },
          { label: 'Leading Specialists', value: 120, suffix: '+', icon: <Users className="text-blue-500 mx-auto mb-6" size={40} /> },
          { label: 'National Centers', value: 45, suffix: '', icon: <Globe className="text-pink-500 mx-auto mb-6" size={40} /> },
          { label: 'Excellence Awards', value: 25, suffix: '', icon: <Trophy className="text-blue-500 mx-auto mb-6" size={40} /> },
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
            <div className="text-6xl font-black text-gray-900 mb-2">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="py-32 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">The Chify Advantage</h4>
          <ShiningText as="h2" text="Pioneering Human Potential Recovery" className="text-5xl md:text-7xl mb-8 leading-tight" />
          <p className="text-gray-600 text-xl mb-10 leading-relaxed font-light">
            Founded in Abuja, Chify Rehabilitation is West Africa's beacon for neurological and physical excellence. We don't just treat symptoms; we engineer pathways back to the life you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={() => onNavigate('contact')} className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 btn-shimmer">
              Book a Consultation
            </button>
            <button onClick={() => onNavigate('expertise')} className="border-2 border-pink-500 text-pink-500 px-12 py-5 rounded-full font-black text-lg hover:bg-pink-50 transition-all">
              Our Research Labs
            </button>
          </div>
        </motion.div>
        
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
          <SafeImage src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80" className="rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] relative z-10 border-[16px] border-white" alt="Chify Clinical Care" />
          <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-gray-100">
             <div className="flex items-center gap-3 mb-2">
                <Star fill="#f59e0b" stroke="none" size={16} />
                <Star fill="#f59e0b" stroke="none" size={16} />
                <Star fill="#f59e0b" stroke="none" size={16} />
                <Star fill="#f59e0b" stroke="none" size={16} />
                <Star fill="#f59e0b" stroke="none" size={16} />
             </div>
             <p className="font-black text-gray-900">Top-Tier Clinic</p>
             <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Abuja Medical Board</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h4 className="text-pink-500 font-black uppercase tracking-widest text-sm mb-4">Core Competencies</h4>
          <ShiningText as="h2" text="Specialized Clinical Pathways" className="text-4xl md:text-5xl" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {SERVICES_DATA.slice(0, 3).map((service, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => openService(service)} 
              className="group cursor-pointer bg-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-pink-200 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-pink-600 transition-colors">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed font-light">{service.desc}</p>
              <div className="text-blue-600 font-black flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Clinical Details <ChevronRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <img src={LOGO_URL} className="w-[500px] grayscale" alt="Faded Brand Identity" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm mb-6">Patient Advocacy</h4>
        <h2 className="text-5xl md:text-7xl font-black mb-12">Healing is a Journey. <br/><span className="text-pink-500">We Walk it With You.</span></h2>
        <p className="text-gray-400 text-xl mb-20 leading-relaxed font-light">
          Recovery isn't just about physical therapy; it's about emotional support and technical precision. At Chify, we provide both.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {[
            { q: 'Is Chify Rehab open 24/7?', a: 'Our Abuja triage center is available 24/7 for critical stroke and trauma admissions. Regular outpatient services are 7 AM - 9 PM.' },
            { q: 'Do you accept global insurance?', a: 'Yes, Chify is a preferred provider for over 50 international and local HMOs including major global carriers.' }
          ].map((faq, i) => (
            <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h5 className="font-bold text-lg mb-4 text-blue-300">{faq.q}</h5>
              <p className="text-gray-500 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const AboutFullView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <div className="pt-64 pb-24 px-6 bg-white min-h-screen">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> Back to Home
      </button>
      <ShiningText as="h1" text="Our Heritage of Excellence" className="text-6xl md:text-8xl mb-16 leading-tight" />
      <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
        <div className="space-y-10">
          <p className="text-2xl text-gray-600 leading-relaxed font-light">
            Founded in 1999, Chify Rehabilitation was born from a vision to revolutionize healthcare in West Africa. We bridged the gap between advanced medical tech and patient-first care.
          </p>
          <p className="text-gray-500 leading-relaxed text-lg">
            Today, we are Nigeria's most recognized name in specialized therapy, leading research in neuromodulation and robotic gait diagnostics at our Abuja CBD headquarters.
          </p>
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Shield size={32} />
             </div>
             <div>
                <p className="font-black text-gray-900">Certified Excellence</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">ISO 9001:2015 Registered</p>
             </div>
          </div>
        </div>
        <div className="relative">
           <div className="absolute inset-0 bg-blue-600 rounded-[4rem] translate-x-6 translate-y-6 -z-10" />
           <SafeImage src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" className="rounded-[4rem] shadow-2xl" alt="Hospital Facility" />
        </div>
      </div>
    </div>
  </div>
);

const ServicesFullView: React.FC<{ onNavigate: (v: ViewState) => void, openService: (s: any) => void }> = ({ onNavigate, openService }) => (
  <div className="pt-64 pb-24 px-6 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <ShiningText as="h1" text="Departmental Overview" className="text-6xl md:text-8xl mb-8" />
        <p className="text-gray-600 text-2xl font-light">Precision-engineered care roadmaps for every stage of recovery.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {SERVICES_DATA.map((service, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }} 
            onClick={() => openService(service)} 
            className="group cursor-pointer bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
          >
            <div className="h-72 overflow-hidden relative">
              <SafeImage src={service.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={service.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                <span className="text-white font-black text-lg flex items-center gap-3">View Full Clinical Roadmap <ChevronRight /></span>
              </div>
            </div>
            <div className="p-12 flex-1">
              <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-3xl font-black mb-6">{service.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">{service.desc}</p>
              <div className="space-y-4">
                {service.details.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-blue-500" /> {d}
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
  <div className="pt-64 pb-24 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <ShiningText as="h1" text="Clinical R&D Hub" className="text-6xl md:text-8xl mb-10 leading-tight" />
          <p className="text-gray-600 text-2xl leading-relaxed mb-12 font-light">
            We operate at the nexus of neuroscience and digital engineering. Our Abuja-based laboratories are developing the tools that define the next generation of human recovery.
          </p>
          <div className="grid grid-cols-2 gap-10">
            <div className="p-10 bg-blue-50 rounded-[2.5rem] border border-blue-100">
              <h4 className="text-5xl font-black text-blue-600 mb-2">50+</h4>
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Active Patents</p>
            </div>
            <div className="p-10 bg-pink-50 rounded-[2.5rem] border border-pink-100">
              <h4 className="text-5xl font-black text-pink-600 mb-2">12</h4>
              <p className="text-xs font-black text-pink-400 uppercase tracking-widest">Specialized Labs</p>
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <SafeImage src="https://images.unsplash.com/photo-1579154235602-3c2c2aa5d72f?auto=format&fit=crop&w=1200&q=80" className="rounded-[4rem] shadow-2xl relative z-10" alt="Tech Excellence" />
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-pink-100 rounded-full blur-[100px] opacity-40 -z-10" />
        </div>
      </div>
      
      {/* Detailed Technical Sections */}
      <div className="space-y-40 py-20">
        {[
          { title: 'Exoskeleton Integration', desc: 'Custom-fit robotic frames designed to retrain neural pathways in paralyzed patients.', icon: <Cpu />, img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800' },
          { title: 'AI Neuromodulation', desc: 'Utilizing machine learning to optimize brain stimulation protocols for faster stroke recovery.', icon: <ZapOff />, img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800' }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col md:flex-row gap-20 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1">
              <div className="text-pink-600 mb-10 p-5 bg-pink-50 rounded-3xl inline-block">{React.cloneElement(item.icon as React.ReactElement, { size: 48 })}</div>
              <h3 className="text-5xl font-black mb-8">{item.title}</h3>
              <p className="text-gray-500 text-xl leading-relaxed font-light">{item.desc}</p>
              <button className="mt-12 flex items-center gap-3 text-blue-600 font-black hover:gap-6 transition-all">
                Download Technical Whitepaper <ChevronRight />
              </button>
            </div>
            <div className="flex-1 w-full">
              <SafeImage src={item.img} className="rounded-[4rem] shadow-2xl w-full h-[500px] object-cover" alt={item.title} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const ContactFullView: React.FC<{ onNavigate: (v: ViewState) => void, onNotify: (msg: string) => void }> = ({ onNavigate, onNotify }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', focus: 'Immediate Care', urgency: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNotify("Emergency request processed. An Abuja triage specialist will contact you in under 15 minutes.");
      setFormData({ name: '', phone: '', focus: 'Immediate Care', urgency: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-64 pb-24 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-white mb-16 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <ShiningText as="h1" text="Contact Global Support" className="text-6xl md:text-8xl mb-12" />
          <p className="text-gray-400 text-2xl mb-20 leading-relaxed font-light">Our coordination hub in the Abuja CBD is ready to assist you. 24/7 specialized triage support.</p>
          <div className="space-y-16">
            <div className="flex gap-10 group">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-pink-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <MapPin size={40} />
              </div>
              <div>
                <h4 className="text-3xl font-black mb-3">Abuja Headquarters</h4>
                <p className="text-gray-500 text-lg mb-2">Plot 1234, Health Plaza, Central District, Abuja</p>
                <p className="text-pink-500 font-black text-xl">+234 800 123 4567</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-[4rem] p-16 text-gray-900 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <img src={LOGO_URL} className="w-40" alt="Brand Seal Background" />
          </div>
          <h3 className="text-4xl font-black mb-12 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border border-gray-100">
              <img src={LOGO_URL} className="w-full h-full object-cover" alt="Brand Mini Logo" />
            </div>
            Secure Patient Intake
          </h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Patient Full Name</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-blue-600 outline-none font-medium transition-all" placeholder="Enter name..." />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Mobile Contact</label>
                <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-blue-600 outline-none font-medium transition-all" placeholder="+234 ..." />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Nature of Request</label>
              <textarea name="urgency" value={formData.urgency} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-3xl px-8 py-6 focus:ring-2 focus:ring-blue-600 h-40 outline-none font-medium resize-none transition-all" placeholder="How can our clinical team help?" />
            </div>
            <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/20 btn-shimmer">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Initiate Clinical Triage"}
            </button>
            <div className="text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">HIPAA & GDPR Compliant Channel</p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-10 flex justify-between items-center text-left transition-all">
        <span className="text-2xl font-black">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} className="text-pink-500">
          <Plus size={32} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-10 pb-10 text-gray-400 text-lg leading-relaxed font-light">
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-white pt-40 pb-20 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40">
      <div className="col-span-1">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-xl">
            <img src={LOGO_URL} alt="Brand Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-4xl font-black tracking-tighter">CHIFY<span className="text-pink-500">REHAB</span></span>
        </div>
        <p className="text-gray-400 text-xl leading-relaxed font-light">Nigeria's premier rehabilitation hub. Redefining clinical excellence since 1999.</p>
      </div>
      <div>
        <h4 className="text-xl font-black mb-12 uppercase tracking-[0.3em] text-blue-500">Navigation</h4>
        <ul className="space-y-8 text-gray-400 text-lg font-medium">
          {['home', 'about', 'services', 'expertise', 'contact'].map(v => (
            <li key={v}><button onClick={() => onNavigate(v as ViewState)} className="hover:text-white capitalize transition-colors">{v}</button></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-black mb-12 uppercase tracking-[0.3em] text-blue-500">Headquarters</h4>
        <ul className="space-y-8 text-gray-400 text-lg font-medium">
          <li className="flex items-start gap-4 text-white">
            <div className="w-6 h-6 rounded-full overflow-hidden mt-1 shadow-glow flex-shrink-0">
              <img src={LOGO_URL} className="w-full h-full object-cover" alt="Mini Seal" />
            </div>
            CBD, Abuja, FCT, Nigeria
          </li>
          <li className="flex items-center gap-4">
            <Phone size={24} className="text-pink-500" /> +234 800 123 4567
          </li>
          <li className="flex items-center gap-4">
            <Mail size={24} className="text-pink-500" /> clinic@chifyrehab.ng
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-black mb-12 uppercase tracking-[0.3em] text-blue-500">Join Our Circle</h4>
        <p className="text-gray-400 mb-10 text-lg font-light">Get our clinical research and health updates direct to your inbox.</p>
        <div className="flex gap-3">
          <input type="email" placeholder="Email address..." className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 flex-1 outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium" />
          <button className="bg-blue-600 px-8 rounded-2xl hover:bg-blue-700 transition-colors"><ChevronRight /></button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] gap-10">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rounded-full overflow-hidden opacity-30">
          <img src={LOGO_URL} className="w-full h-full object-cover" alt="Brand Footer Seal" />
        </div>
        <p>&copy; {new Date().getFullYear()} Chify Health Group Nigeria. All Rights Reserved.</p>
      </div>
      <div className="flex gap-12">
         <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
         <a href="#" className="hover:text-white transition-colors">Legal Terms</a>
      </div>
    </div>
  </footer>
);

export default App;
