
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
  Clock, 
  HeartPulse, 
  BrainCircuit, 
  Baby,
  Trophy,
  Globe,
  Star,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Minus,
  Quote,
  Zap,
  Shield,
  Clock4
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
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    details: ['Stroke Recovery', 'Brain Injury Care', 'Spinal Support', 'Robotic Assistance']
  },
  { 
    title: 'Pediatric Care', 
    desc: 'Specialized therapy for developmental delays and childhood physical challenges.', 
    longDesc: 'Children are not just small adults. Our pediatric specialists use play-based therapy to help children reach developmental milestones, overcome physical limitations, and participate fully in school and play.',
    icon: <Baby className="text-pink-500" />,
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    details: ['Developmental Screening', 'Sensory Integration', 'Play Therapy', 'Parent Training']
  },
  { 
    title: 'Occupational Therapy', 
    desc: 'Helping you regain the skills needed for daily living and work tasks.', 
    longDesc: 'We focus on "occupations"—the activities that give life meaning. Our OTs work with you to modify environments and develop skills for self-care, productivity, and leisure, ensuring you can live life to its fullest.',
    icon: <Users className="text-blue-500" />,
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    details: ['Daily Living Skills', 'Ergonomic Assessment', 'Adaptive Equipment', 'Home Modification']
  },
  { 
    title: 'Speech & Language', 
    desc: 'Comprehensive evaluation and treatment of communication and swallowing disorders.', 
    longDesc: 'Our speech-language pathologists provide expert care for individuals with communication difficulties, voice disorders, and swallowing problems (dysphagia). We use the latest diagnostic tools to create effective treatment plans.',
    icon: <Stethoscope className="text-pink-500" />,
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    details: ['Articulation Therapy', 'Swallowing Safety', 'Cognitive Support', 'Voice Coaching']
  },
  { 
    title: 'Sports Recovery', 
    desc: 'High-performance rehabilitation for athletes to return to peak condition.', 
    longDesc: 'Return to the field faster and stronger. Our sports medicine team focuses on biomechanics and performance optimization to not only heal injuries but prevent future ones.',
    icon: <Activity className="text-blue-500" />,
    img: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
    details: ['Athletic Screening', 'Performance Training', 'Injury Prevention', 'Rapid Recovery']
  }
];

type ViewState = 'home' | 'about' | 'services' | 'expertise' | 'contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[0] | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const openService = (service: typeof SERVICES_DATA[0]) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'about':
        return <AboutFullView onNavigate={setCurrentView} />;
      case 'services':
        return <ServicesFullView onNavigate={setCurrentView} openService={openService} />;
      case 'expertise':
        return <ExpertiseFullView onNavigate={setCurrentView} />;
      case 'contact':
        return <ContactFullView onNavigate={setCurrentView} />;
      default:
        return <HomeLandingView onNavigate={setCurrentView} openService={openService} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
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

// --- Home Components ---

const HomeLandingView: React.FC<{ onNavigate: (v: ViewState) => void, openService: (s: any) => void }> = ({ onNavigate, openService }) => (
  <>
    <HeroSlider />
    
    {/* Trust / Partner Banner */}
    <div className="py-12 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-400 text-xs font-black uppercase tracking-[0.3em] mb-10">Trusted by Global Healthcare Leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {['HealthLink', 'SafeGuard', 'MediGroup', 'Vanguard', 'GlobalCare'].map((p) => (
            <span key={p} className="text-2xl font-black text-gray-400 select-none cursor-default">{p}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { label: 'Patient Recoveries', value: 15000, suffix: '+', icon: <HeartPulse className="text-pink-500 mx-auto mb-4" size={32} /> },
          { label: 'Specialists', value: 120, suffix: '+', icon: <Users className="text-blue-500 mx-auto mb-4" size={32} /> },
          { label: 'Centers Nationally', value: 45, suffix: '', icon: <Globe className="text-pink-500 mx-auto mb-4" size={32} /> },
          { label: 'Years Excellence', value: 25, suffix: '', icon: <Trophy className="text-blue-500 mx-auto mb-4" size={32} /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-5xl font-black text-gray-900 mb-2">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Quick About & Why Us */}
    <section className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">World Class Care</h4>
            <ShiningText as="h2" text="Pioneering the Future of Human Recovery" className="text-4xl md:text-6xl mb-8 leading-tight" />
            <p className="text-gray-600 text-xl mb-10 leading-relaxed font-light">
              Since 1999, Chify Rehabilitation has redefined the standards of therapeutic care. We don't just help you walk; we help you rediscover your potential.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-pink-500 flex-shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">Fast Results</h5>
                  <p className="text-sm text-gray-500">Accelerated recovery plans optimized by AI diagnostics.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">Safety First</h5>
                  <p className="text-sm text-gray-500">HIPAA compliant and high safety clinical protocols.</p>
                </div>
              </div>
            </div>
            <button onClick={() => onNavigate('about')} className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
              Explore Our Vision <ChevronRight size={20} />
            </button>
          </motion.div>
          
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80" className="rounded-[4rem] shadow-2xl relative z-10 border-[12px] border-white" alt="Clinical Center" />
            <div className="absolute top-1/2 right-0 translate-x-12 -translate-y-1/2 p-10 bg-white rounded-[2rem] shadow-2xl z-20 hidden lg:block border border-gray-100">
              <div className="flex items-center gap-2 mb-2 text-yellow-500">
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
              </div>
              <p className="text-2xl font-black text-gray-900 mb-1">4.9/5</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* The Recovery Path (Process) Section */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h4 className="text-pink-500 font-black uppercase tracking-widest text-sm mb-4">Patient Journey</h4>
          <ShiningText as="h2" text="Your Path to Healing" className="text-4xl md:text-5xl mb-6" />
          <p className="text-gray-500 text-lg">We follow a rigorous 4-step process to ensure every patient receives the best clinical outcome.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-100 -z-10 hidden md:block" />
          {[
            { step: '01', title: 'Consultation', desc: 'Expert evaluation and movement diagnostics.' },
            { step: '02', title: 'Plan Design', desc: 'Personalized therapy roadmap tailored to your life.' },
            { step: '03', title: 'Treatment', desc: 'Advanced therapy sessions with our specialists.' },
            { step: '04', title: 'Victory', desc: 'Final evaluation and return to full activity.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center text-2xl font-black text-blue-600 mx-auto mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Quick Services Section */}
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-2">Departments</h4>
            <ShiningText as="h2" text="Our Core Disciplines" className="text-4xl md:text-5xl" />
          </div>
          <button onClick={() => onNavigate('services')} className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-all">
            Browse All Services <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {SERVICES_DATA.slice(0, 3).map((service, i) => (
            <div 
              key={i} 
              onClick={() => openService(service)} 
              className="group cursor-pointer bg-white p-12 rounded-[3rem] hover:bg-blue-600 transition-all duration-700 shadow-xl shadow-gray-200/50 hover:shadow-blue-600/20"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-gray-500 group-hover:text-blue-100 mb-8 leading-relaxed">{service.desc}</p>
              <div className="text-blue-600 font-black group-hover:text-white flex items-center gap-2 transition-all group-hover:gap-4">
                Clinical Roadmap <ChevronRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-20 items-center">
          <div className="lg:col-span-2">
            <h4 className="text-pink-500 font-black uppercase tracking-widest text-sm mb-4">Patient Voice</h4>
            <ShiningText as="h2" text="Stories of Resilience" className="text-4xl md:text-5xl mb-8" />
            <p className="text-gray-600 text-lg mb-10 font-light">
              Real stories from real patients who reclaimed their independence through our specialized clinical care.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900">4,000+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">5-Star Reviews</p>
              </div>
              <div className="w-px h-12 bg-gray-100" />
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900">98%</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Success Rate</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
            {[
              { 
                name: 'James Harrison', 
                role: 'Post-Op Recovery', 
                text: 'The robotic therapy sessions at Chify were life-changing. I was back on my feet 3 weeks faster than expected.',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              },
              { 
                name: 'Elena Wright', 
                role: 'Sports Rehab', 
                text: 'As a marathon runner, precision is everything. Their AI gait analysis pinpointed my issues perfectly.',
                img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
              }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative"
              >
                <Quote className="text-blue-200 absolute top-8 right-8" size={40} />
                <div className="flex items-center gap-4 mb-8">
                  <img src={t.img} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt={t.name} />
                  <div>
                    <h5 className="font-bold text-gray-900">{t.name}</h5>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-light italic">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="py-32 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-20 opacity-5">
        <HeartPulse size={400} />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm mb-4">Common Questions</h4>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Expert Answers</h2>
        </div>
        
        <div className="space-y-6">
          {[
            { q: 'Do I need a physician referral?', a: 'While we welcome referrals, many insurance plans allow direct access to our specialists. Contact us to verify your coverage.' },
            { q: 'What should I wear to my first session?', a: 'Wear comfortable, loose-fitting clothing that allows for easy movement of the affected area.' },
            { q: 'How long does a typical session last?', a: 'Standard therapy sessions last between 45 and 60 minutes, depending on your personalized plan.' },
            { q: 'Do you accept major insurance?', a: 'Yes, Chify Rehabilitation is in-network with most major insurance providers including Medicare and private plans.' },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA Banner */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-7xl font-black mb-8">Ready to Reclaim Your Life?</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 font-light max-w-3xl mx-auto">Join the 15,000+ patients who found their way back to health at Chify.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button onClick={() => onNavigate('contact')} className="bg-white text-pink-600 px-12 py-5 rounded-full font-black text-xl hover:shadow-2xl transition-all active:scale-95">
                Book My Free Intake
              </button>
              <button className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/20 transition-all">
                Call Us Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex justify-between items-center text-left hover:bg-white/5 transition-all"
      >
        <span className="text-xl font-bold">{question}</span>
        {isOpen ? <Minus className="text-pink-500" /> : <Plus className="text-blue-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 pb-8 text-gray-400 leading-relaxed font-light"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Full Page Components (Keeping them intact from previous version) ---

const AboutFullView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
    <div className="max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </button>
      
      <ShiningText as="h1" text="About Chify Rehabilitation" className="text-5xl md:text-7xl mb-12 leading-tight" />
      
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-gray-900">Our Heritage of Healing</h2>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            Founded by a group of visionary physiotherapists and technologists in 1999, Chify began with a simple mission: to bridge the gap between clinical research and patient care.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we are one of the world's most recognized names in rehabilitation, serving over 15,000 patients annually across 45 state-of-the-art facilities. Our approach integrates the latest neuro-scientific breakthroughs with human-centered empathy.
          </p>
        </div>
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" className="rounded-[3rem] shadow-2xl" alt="Hospital Hall" />
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
          <div>
            <h3 className="text-4xl font-black mb-4">Integrity</h3>
            <p className="text-blue-100">Absolute transparency in our medical protocols and outcomes.</p>
          </div>
          <div>
            <h3 className="text-4xl font-black mb-4">Innovation</h3>
            <p className="text-blue-100">Relentless pursuit of the next breakthrough in human mobility.</p>
          </div>
          <div>
            <h3 className="text-4xl font-black mb-4">Inclusion</h3>
            <p className="text-blue-100">World-class care accessible to individuals from all walks of life.</p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-16">Global Leadership Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: 'Dr. Sarah Chify', role: 'Founder & Medical Director', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=400&q=80' },
            { name: 'Marcus Thorne', role: 'Head of Neuro-Rehabilitation', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80' },
            { name: 'Elena Rodriguez', role: 'Chief of Patient Experience', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80' },
          ].map((member, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl mb-6 shadow-lg">
                <img src={member.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={member.name} />
              </div>
              <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
              <p className="text-blue-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ServicesFullView: React.FC<{ onNavigate: (v: ViewState) => void, openService: (s: any) => void }> = ({ onNavigate, openService }) => (
  <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-24">
        <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <ShiningText as="h1" text="Our Specialized Departments" className="text-5xl md:text-7xl mb-8" />
        <p className="text-gray-600 text-xl font-light">Chify Rehabilitation offers a comprehensive ecosystem of care. Explore our distinct departments below.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SERVICES_DATA.map((service, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            onClick={() => openService(service)}
            className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100"
          >
            <div className="h-64 overflow-hidden relative">
              <img src={service.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={service.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-white font-bold flex items-center gap-2">View Full Clinical Roadmap <ChevronRight size={18} /></span>
              </div>
            </div>
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Dept ID: 0{i+1}</span>
              </div>
              <h3 className="text-2xl font-black mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-8">{service.desc}</p>
              <div className="space-y-3">
                {service.details.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 size={16} className="text-pink-500" /> {d}
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
        <motion.div initial={{ opacity: 0, scale: 0.95 }}>
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <ShiningText as="h1" text="Clinical Technology & AI" className="text-5xl md:text-7xl mb-8 leading-tight" />
          <p className="text-gray-600 text-xl leading-relaxed mb-10 font-light">
            We operate at the intersection of medical science and deep technology. Our research labs develop the tools that define the future of human mobility.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50 rounded-3xl">
              <h4 className="text-3xl font-black text-blue-600 mb-2">50+</h4>
              <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">Active Patents</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-3xl">
              <h4 className="text-3xl font-black text-pink-600 mb-2">12</h4>
              <p className="text-sm font-bold text-pink-400 uppercase tracking-widest">Research Labs</p>
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1579154235602-3c2c2aa5d72f?auto=format&fit=crop&w=1200&q=80" className="rounded-[4rem] shadow-2xl relative z-10" alt="Tech" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
        </div>
      </div>

      <div className="space-y-24">
        {[
          { 
            title: 'Exoskeleton Integration', 
            text: 'We utilize robotic exoskeletons to help paralyzed patients stand and walk, inducing neural pathways to rebuild through repetitive motion.',
            img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
          },
          { 
            title: 'VR-Cognitive Therapy', 
            text: 'Virtual Reality environments allow patients to practice complex motor tasks in safe, controlled, and immersive scenarios, speeding up neurological recovery.',
            img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80'
          },
          { 
            title: 'AI Gait Analysis', 
            text: 'Computer vision algorithms analyze a patient\'s walk in real-time, identifying millimetric imbalances that the human eye misses, allowing for perfect corrective plans.',
            img: 'https://images.unsplash.com/photo-1526232761682-d26e4fca6042?auto=format&fit=crop&w=800&q=80'
          }
        ].map((item, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 !== 0 ? 'order-2' : ''}>
              <h3 className="text-3xl font-black mb-6">{item.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{item.text}</p>
            </div>
            <img src={item.img} className="rounded-3xl shadow-xl h-96 object-cover" alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactFullView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <div className="pt-32 pb-24 bg-gray-900 min-h-screen text-white">
    <div className="max-w-7xl mx-auto px-6">
      <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </button>
      
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <ShiningText as="h1" text="Contact Global Support" className="text-5xl md:text-7xl mb-12" />
          <p className="text-gray-400 text-xl mb-16 leading-relaxed">
            Our global response team is available 24/7 for emergency intake and clinical inquiries. Find our primary hubs below or send a secure message.
          </p>
          
          <div className="space-y-12">
            {[
              { city: 'San Francisco (Global HQ)', address: '123 Healing Way, Medical District', phone: '+1 (415) 555-0199' },
              { city: 'London (European Hub)', address: '45 Care Street, Westminster', phone: '+44 20 7946 0958' },
              { city: 'Singapore (Asia Pacific)', address: '88 Recovery Blvd, Health City', phone: '+65 6789 0123' },
            ].map((hub, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-pink-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">{hub.city}</h4>
                  <p className="text-gray-500 mb-2">{hub.address}</p>
                  <p className="text-blue-400 font-bold">{hub.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 lg:p-16 text-gray-900 shadow-2xl">
          <h3 className="text-3xl font-black mb-8">Clinical Inquiry Form</h3>
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Patient Name</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Enter name..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Contact</label>
                <input type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="email@address.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Case Category</label>
              <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all appearance-none">
                <option>New Patient Admission</option>
                <option>Provider Referral</option>
                <option>Clinical Research Partnership</option>
                <option>Career Inquiry</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Medical Summary</label>
              <textarea className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 transition-all h-40 resize-none" placeholder="Please describe the condition briefly..."></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20">
              Submit Secure Inquiry
            </button>
            <p className="text-center text-xs text-gray-400 font-medium">Your data is protected by global HIPAA & GDPR standards.</p>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const Footer: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-white pt-32 pb-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-12 h-12 bg-pink-500 rounded-[1.25rem] flex items-center justify-center text-white">
            <HeartPulse size={28} />
          </div>
          <span className="text-3xl font-black tracking-tighter">CHIFY<span className="text-pink-500">REHAB</span></span>
        </div>
        <p className="text-gray-400 leading-relaxed text-lg font-light mb-10">Restoring human potential through a unique blend of empathy and advanced robotics.</p>
      </div>

      <div>
        <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Pathways</h4>
        <ul className="space-y-6 text-gray-400 font-medium">
          <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home Landing</button></li>
          <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Our History</button></li>
          <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Service Roadmap</button></li>
          <li><button onClick={() => onNavigate('expertise')} className="hover:text-white transition-colors">Expertise Labs</button></li>
          <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Hub</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Global Hubs</h4>
        <ul className="space-y-6 text-gray-400 font-medium">
          <li>San Francisco</li>
          <li>London</li>
          <li>Singapore</li>
          <li>Dubai</li>
          <li>Sydney</li>
        </ul>
      </div>

      <div>
        <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Updates</h4>
        <p className="text-gray-400 mb-8 font-light">Join 10k+ professionals getting our clinical newsletter.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="email@address.com" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex-1 focus:ring-1 focus:ring-pink-500" />
          <button className="bg-blue-600 px-6 rounded-2xl hover:bg-blue-700 transition-colors"><ChevronRight /></button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-xs font-black uppercase tracking-widest">
      <p>&copy; {new Date().getFullYear()} Chify Health Group. All Rights Reserved.</p>
      <div className="flex gap-10">
        <a href="#" className="hover:text-white">Privacy</a>
        <a href="#" className="hover:text-white">Legal</a>
        <a href="#" className="hover:text-white">Cookies</a>
      </div>
    </div>
  </footer>
);

export default App;
