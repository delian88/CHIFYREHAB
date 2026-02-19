
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ShiningText from './components/ShiningText';
import ChatBot from './components/ChatBot';
import Counter from './components/Counter';
import ServiceModal from './components/ServiceModal';
import { motion } from 'framer-motion';
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
  Star
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

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[0] | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const openService = (service: typeof SERVICES_DATA[0]) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSlider />

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

      {/* About Section - "Full" Detail */}
      <section id="about" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-60" />
              <img 
                src="https://images.unsplash.com/photo-1581056344415-3abb773d7f51?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Rehab Facility" 
                className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white"
              />
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="font-black text-2xl">4.9/5</span>
                </div>
                <div className="text-sm text-gray-500 font-medium">Average Patient Rating</div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-blue-600 font-black tracking-[0.2em] uppercase mb-4 text-sm">Our Legacy</h4>
              <ShiningText as="h2" text="Global Leaders in Human Performance" className="text-4xl md:text-6xl mb-8 leading-[1.1]" />
              <p className="text-gray-600 text-xl mb-10 leading-relaxed font-light">
                Founded in 1999, Chify Rehabilitation has grown from a local clinic to a national powerhouse of healing. We combine the warmth of personalized care with the precision of future-tech.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div>
                  <h5 className="font-bold text-gray-900 text-lg mb-3">Our Mission</h5>
                  <p className="text-gray-500 leading-relaxed">To restore hope and physical capability through relentless innovation and empathy.</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-lg mb-3">Our Core Values</h5>
                  <p className="text-gray-500 leading-relaxed">Transparency, Excellence, Compassion, and Integrity guide every patient interaction.</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-5 rounded-full font-bold shadow-xl transition-all transform hover:scale-105 active:scale-95">
                  View Our History
                </button>
                <a href="#contact" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-700 transition-colors">
                  Contact Specialist
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - "Full" Detail functionality */}
      <section id="services" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h4 className="text-pink-500 font-black tracking-[0.2em] uppercase mb-4 text-sm">Clinical Excellence</h4>
            <ShiningText as="h2" text="Tailored Rehabilitation Programs" className="text-4xl md:text-6xl mb-8" />
            <p className="text-gray-500 text-xl font-light">We offer specialized departments for every stage of your recovery journey, led by board-certified doctors and therapists.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES_DATA.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                onClick={() => openService(service)}
                className="group cursor-pointer relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-white font-bold flex items-center gap-2">Read Full Details <ChevronRight size={18} /></span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.details.slice(0, 2).map((d, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">{d}</span>
                    ))}
                    <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1">+ More</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Counting Experience */}
      <section id="expertise" className="py-32 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-700/30 skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h4 className="text-pink-400 font-black tracking-[0.2em] uppercase mb-4 text-sm">Industry Authority</h4>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]">25 Years of Scientific Innovation</h2>
              <p className="text-blue-100 text-xl mb-12 font-light leading-relaxed">
                Our expertise is backed by decades of clinical data and research. We don't just follow protocols; we define them for the industry.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Advanced Robotics', p: 'Integrating exoskeleton technology for paralysis recovery.' },
                  { title: 'AI Diagnostics', p: 'Precision movement tracking using computer vision.' },
                  { title: 'Tele-Health 2.0', p: 'Complete home-based monitoring and remote therapy.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center font-black flex-shrink-0">0{i+1}</div>
                    <div>
                      <h5 className="font-bold text-xl mb-2">{item.title}</h5>
                      <p className="text-blue-100/80">{item.p}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Clinical Trials', val: 80, s: '+' },
                { label: 'Board Members', val: 12, s: '' },
                { label: 'Partnerships', val: 150, s: '+' },
                { label: 'Patents Held', val: 5, s: '' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] text-center shadow-2xl transform hover:-translate-y-2 transition-transform">
                  <div className="text-4xl font-black text-blue-600 mb-2">
                    <Counter target={stat.val} suffix={stat.s} />
                  </div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
                </div>
              ))}
              <div className="col-span-2 bg-pink-500 p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2">Join Our Elite Team</h3>
                  <p className="text-pink-100 mb-6 text-sm">We are always looking for visionary therapists.</p>
                  <button className="bg-white text-pink-500 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">Apply Now</button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - "Full" Experience */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-900 rounded-[4rem] overflow-hidden shadow-2xl grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-blue-600 p-12 lg:p-20 text-white relative">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <HeartPulse size={200} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-10 relative z-10">Get In Touch</h2>
              <div className="space-y-10 relative z-10">
                <div className="flex gap-6 items-start">
                  <MapPin className="text-pink-400 flex-shrink-0" size={28} />
                  <div>
                    <h5 className="font-bold text-lg mb-2">Primary Headquarters</h5>
                    <p className="text-blue-100 opacity-80 leading-relaxed">Medical District Central, Health Tower, Level 4-12, San Francisco, CA 94103</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <Phone className="text-pink-400 flex-shrink-0" size={28} />
                  <div>
                    <h5 className="font-bold text-lg mb-2">Emergency Intake</h5>
                    <p className="text-blue-100 opacity-80 leading-relaxed">24/7 Hotline: (800) 999-REHAB<br />Local: (415) 555-0199</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <Mail className="text-pink-400 flex-shrink-0" size={28} />
                  <div>
                    <h5 className="font-bold text-lg mb-2">Email Support</h5>
                    <p className="text-blue-100 opacity-80 leading-relaxed">care@chifyrehab.org<br />intake@chifyrehab.org</p>
                  </div>
                </div>
                <div className="pt-10 flex gap-4">
                  {['FB', 'TW', 'IG', 'LI'].map(s => (
                    <div key={s} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black border border-white/20 hover:bg-white hover:text-blue-600 transition-all cursor-pointer">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12 lg:p-20 bg-white">
              <div className="max-w-xl mx-auto">
                <h3 className="text-3xl font-black text-gray-900 mb-4">Request a Consultation</h3>
                <p className="text-gray-500 mb-12">Submit your details and a patient coordinator will reach out within 2 hours to discuss your personalized recovery path.</p>
                
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-black uppercase tracking-widest text-gray-400">Your Name</label>
                      <input type="text" className="w-full border-b-2 border-gray-100 py-4 focus:outline-none focus:border-blue-600 transition-colors text-lg font-medium" placeholder="Alexander Graham" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black uppercase tracking-widest text-gray-400">Email Address</label>
                      <input type="email" className="w-full border-b-2 border-gray-100 py-4 focus:outline-none focus:border-blue-600 transition-colors text-lg font-medium" placeholder="alex@company.com" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400">Specialty Required</label>
                    <select className="w-full border-b-2 border-gray-100 py-4 focus:outline-none focus:border-blue-600 transition-colors text-lg font-medium bg-transparent">
                      <option>Orthopedic Physical Therapy</option>
                      <option>Neurological Rehabilitation</option>
                      <option>Pediatric Specialty Care</option>
                      <option>Sports Injury & Performance</option>
                      <option>General Occupational Therapy</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400">Your Story / Message</label>
                    <textarea className="w-full border-b-2 border-gray-100 py-4 focus:outline-none focus:border-blue-600 transition-colors text-lg font-medium h-32 resize-none" placeholder="Briefly describe your current condition..."></textarea>
                  </div>
                  
                  <div className="pt-8 flex flex-col sm:flex-row items-center gap-8">
                    <button className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-full font-black text-lg shadow-xl hover:bg-blue-700 hover:scale-105 transition-all active:scale-95">
                      Send Secure Message
                    </button>
                    <div className="flex items-center gap-3 text-gray-400">
                      <ShieldCheck size={20} className="text-blue-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">HIPAA Compliant Secure Channel</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-10">
              <div className="w-12 h-12 bg-pink-500 rounded-[1.25rem] flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                <HeartPulse size={28} />
              </div>
              <span className="text-3xl font-black tracking-tighter">
                CHIFY<span className="text-pink-500">REHAB</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-light mb-10">The national standard in rehabilitative medicine. Restoring human potential since 1999.</p>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h5 className="font-black text-xs uppercase tracking-[0.2em] text-pink-500 mb-4">Patient Portal</h5>
              <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all">Secure Login</button>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Pathways</h4>
            <ul className="space-y-6 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-pink-500" /> Clinical Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-pink-500" /> Patient Admissions</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-pink-500" /> Provider Referrals</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-pink-500" /> Careers & Fellowship</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-pink-500" /> Facility Network</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Departments</h4>
            <ul className="space-y-6 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Neuro-Science Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Performance Orthopedics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cognitive Wellness</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pediatric Institute</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Geriatric Specialty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-500">Join Our Circle</h4>
            <p className="text-gray-400 mb-8 font-light">Get high-performance health tips and breakthrough medical updates monthly.</p>
            <form className="relative">
              <input type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-white" />
              <button className="absolute right-2 top-2 bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition-colors">
                <ChevronRight size={24} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm font-medium uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Chify Health Group. Global Excellence in Rehab.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Legal Policy</a>
            <a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a>
          </div>
        </div>
      </footer>

      {/* Modals & Floating Elements */}
      <ChatBot />
      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

export default App;
