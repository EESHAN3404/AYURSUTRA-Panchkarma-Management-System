import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser } from '../utils/storage';
import { 
  ArrowRight, ChevronRight, FileText, CheckCircle2, 
  Circle, Clock, Leaf, Shield, User, Play, Download, 
  Search, Activity, Calendar, Bell, Stethoscope, ArrowUpRight 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBookAppointmentClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash === '#experience' || location.pathname === '/experience' || location.pathname === '/reviews') {
      setTimeout(() => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location]);

  const therapies = [
    { 
      id: '01', name: 'Vamana', purpose: 'Therapeutic Emesis', duration: '1-2 Days',
      for: 'Kapha imbalances, respiratory issues, asthma, allergies, skin diseases.',
      prep: 'Internal oleation for 3-7 days followed by therapeutic sweating.',
      img: '/images/vamana.jpg'
    },
    { 
      id: '02', name: 'Virechana', purpose: 'Therapeutic Purgation', duration: '1 Day',
      for: 'Pitta imbalances, liver disorders, acid peptic disorders, chronic fever.',
      prep: 'Internal oleation (Snehapana) and sweating (Swedana).',
      img: '/images/virechana.jpg'
    },
    { 
      id: '03', name: 'Basti', purpose: 'Medicated Enema', duration: '8-30 Days',
      for: 'Vata disorders, arthritis, sciatica, neurological ailments, chronic back pain.',
      prep: 'Local massage and steam therapy on the abdomen and lower back.',
      img: '/images/basti.jpg'
    },
    { 
      id: '04', name: 'Nasya', purpose: 'Nasal Administration', duration: '7-14 Days',
      for: 'Migraines, sinus issues, cervical spondylosis, sleep apnea, loss of smell.',
      prep: 'Facial massage with warm oil followed by herbal steam.',
      img: '/images/shirodhara.png'
    },
    { 
      id: '05', name: 'Raktamokshana', purpose: 'Blood Purification', duration: '1 Session',
      for: 'Severe eczema, psoriasis, recurrent abscesses, deep tissue inflammation.',
      prep: 'Assessment of blood clotting parameters and patient strength.',
      img: '/images/raktamokshana.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#17211D] font-sans selection:bg-[#B69A5A] selection:text-white overflow-x-hidden">
      
      {/* CSS Reset & Fonts for Premium Editorial Look */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        
        .text-outline-gold {
          color: transparent;
          -webkit-text-stroke: 1px rgba(182, 154, 90, 0.4);
        }
        
        .text-outline-forest {
          color: transparent;
          -webkit-text-stroke: 1px rgba(23, 63, 53, 0.15);
        }

        .premium-shadow {
          box-shadow: 0 20px 40px rgba(23, 63, 53, 0.08);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
          
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* 1. NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#F5F1E8]/95 backdrop-blur-md py-4 border-b border-[#173F35]/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className={`p-2 rounded-full border ${isScrolled ? 'border-[#173F35]' : 'border-white/30'}`}>
              <Leaf className={`w-5 h-5 ${isScrolled ? 'text-[#173F35]' : 'text-white'}`} />
            </div>
            <span className={`text-2xl font-serif font-semibold tracking-wide ${isScrolled ? 'text-[#173F35]' : 'text-white'}`}>
              AyurSutra
            </span>
          </div>

          {/* Desktop Links */}
          <div className={`hidden lg:flex items-center space-x-10 text-sm font-medium tracking-wide uppercase ${isScrolled ? 'text-[#17211D]' : 'text-white/90'}`}>
            <a 
              href="#experience" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#B69A5A] transition-colors cursor-pointer"
            >
              The Experience
            </a>
            <a href="#therapies" className="hover:text-[#B69A5A] transition-colors">Therapies</a>
            <a href="#doctors" className="hover:text-[#B69A5A] transition-colors">Doctors</a>
            <a href="#journey" className="hover:text-[#B69A5A] transition-colors">Your Journey</a>
            <span onClick={() => navigate('/about-panchakarma')} className="cursor-pointer hover:text-[#B69A5A] transition-colors">About</span>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/login')}
              className={`text-sm font-medium tracking-wide uppercase hover:text-[#B69A5A] transition-colors ${isScrolled ? 'text-[#17211D]' : 'text-white'}`}
            >
              Login
            </button>
            <button 
              onClick={handleBookAppointmentClick}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                isScrolled 
                ? 'bg-[#173F35] text-[#F5F1E8] hover:bg-[#17211D]' 
                : 'bg-white text-[#173F35] hover:bg-[#F5F1E8]'
              }`}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/herbs.png" 
            alt="Ayurvedic Treatment" 
            className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17211D]/80 via-[#173F35]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211D]/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full pt-20">
          <div className="max-w-3xl">
            <span className="text-[#B69A5A] text-sm font-semibold tracking-[0.3em] uppercase mb-6 block flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#B69A5A]" />
              The AyurSutra Experience
            </span>
            
            <h1 className="text-6xl sm:text-7xl lg:text-[90px] font-serif text-white leading-[1.05] tracking-tight mb-8">
              Ancient Wisdom. <br/>
              <span className="font-serif italic font-normal text-white/90">Personalized Healing.</span>
            </h1>
            
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl mb-12">
              A bespoke Panchakarma journey guided by experienced Ayurvedic practitioners. Designed entirely around your body, your needs, and your progress.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={handleBookAppointmentClick}
                className="w-full sm:w-auto px-10 py-4 bg-[#B69A5A] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#9c844d] transition-colors rounded-none"
              >
                Begin Your Journey
              </button>
              <button 
                onClick={() => navigate('/about-panchakarma')}
                className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#173F35] transition-colors rounded-none flex items-center justify-center gap-2"
              >
                Explore Panchakarma <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editorial Stats - Integrated elegantly */}
          <div className="absolute bottom-12 right-12 hidden lg:flex gap-16 text-white border-l border-white/20 pl-12">
            <div>
              <p className="font-serif text-4xl mb-1 text-[#B69A5A]">15+</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Years of Practice</p>
            </div>
            <div>
              <p className="font-serif text-4xl mb-1 text-[#B69A5A]">500+</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Patient Journeys</p>
            </div>
            <div>
              <p className="font-serif text-4xl mb-1 text-[#B69A5A]">100%</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Personalized Care</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 left-12 w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent hidden lg:block" />
      </section>

      {/* 3. INTRODUCTION / BRAND STORY */}
      <section id="about" className="py-32 lg:py-48 relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 relative z-10">
              <span className="text-[#6F8F78] text-xs font-bold tracking-[0.2em] uppercase mb-8 block flex items-center gap-3">
                <Leaf className="w-4 h-4" /> The Philosophy
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif text-[#173F35] leading-tight mb-8">
                Where ancient Ayurvedic wisdom <br/>
                <span className="italic font-normal text-[#6F8F78]">meets modern patient care.</span>
              </h2>
              <div className="space-y-6 text-[#17211D]/70 text-lg font-light leading-relaxed">
                <p>
                  Panchakarma is not a mere spa retreat; it is a rigorous, deeply clinical detoxification process that requires precision, expertise, and daily medical oversight.
                </p>
                <p>
                  At AyurSutra, we merge the absolute authenticity of the 5,000-year-old Charaka Samhita with a sophisticated digital management system, ensuring your treatment is flawlessly coordinated from your first consultation to your final follow-up.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4 border-t border-[#173F35]/10 pt-8">
                <div className="w-12 h-12 rounded-full border border-[#B69A5A] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#B69A5A]" />
                </div>
                <span className="font-serif text-xl text-[#173F35] italic">Rooted in Tradition. Managed with Precision.</span>
              </div>
            </div>

            {/* Right Images (Asymmetric Editorial) */}
            <div className="lg:col-span-7 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#6F8F78]/5 rounded-full blur-3xl -z-10" />
              <div className="relative h-[700px] w-full flex items-end justify-end">
                {/* Main Large Image */}
                <img 
                  src="/images/steam.png" 
                  alt="Ayurvedic Steam Therapy" 
                  className="w-[80%] h-[90%] object-cover absolute top-0 right-0 shadow-2xl"
                />
                {/* Secondary Offset Image */}
                <img 
                  src="/images/potli.png" 
                  alt="Herbal Potli" 
                  className="w-[45%] h-[50%] object-cover absolute bottom-0 left-0 border-8 border-[#F5F1E8] shadow-2xl z-20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PANCHAKARMA EXPERIENCE (Interactive Layout) */}
      <section id="therapies" className="py-32 bg-[#173F35] text-[#F5F1E8] relative overflow-hidden">
        {/* Huge decorative text */}
        <div className="absolute -top-20 -right-20 pointer-events-none opacity-[0.03]">
          <h2 className="text-[250px] font-serif font-bold text-outline-forest leading-none">THE<br/>FIVE</h2>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="mb-20">
            <span className="text-[#B69A5A] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">The Core Treatments</span>
            <h2 className="text-5xl lg:text-7xl font-serif leading-tight">
              The <span className="italic">Panchakarma</span> Experience
            </h2>
          </div>

          {/* Therapies Grid - Displayed One by One in Stylish Shapes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
            {therapies.map((therapy) => (
              <div
                key={therapy.id}
                onClick={handleBookAppointmentClick}
                className="group relative flex flex-col items-center bg-[#112922]/60 hover:bg-[#112922] border border-white/10 hover:border-[#B69A5A]/60 rounded-3xl p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
              >
                {/* Stylish Shape Image Container (Architectural Arch Window) */}
                <div className="w-full aspect-[4/5] rounded-t-[72px] rounded-b-2xl overflow-hidden bg-black/40 border border-[#B69A5A]/30 group-hover:border-[#B69A5A] transition-colors duration-500 relative mb-4 shadow-xl">
                  <img 
                    src={therapy.img} 
                    alt={therapy.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Badge */}
                  <span className="absolute top-3.5 left-3.5 bg-[#173F35]/90 backdrop-blur-md text-[#B69A5A] text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#B69A5A]/30">
                    {therapy.id}
                  </span>
                </div>

                {/* Minimalist Stylish Text */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A5A] font-bold text-center block mb-1">
                  {therapy.purpose}
                </span>
                
                <h3 className="text-2xl font-serif text-white group-hover:text-[#B69A5A] transition-colors text-center mb-2">
                  {therapy.name}
                </h3>

                <span className="text-[11px] text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-center inline-block mb-3">
                  {therapy.duration}
                </span>

                <p className="text-white/50 text-xs text-center line-clamp-2 leading-relaxed px-1">
                  {therapy.for}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-16 text-center">
            <button 
              onClick={handleBookAppointmentClick}
              className="px-10 py-4 bg-[#B69A5A] text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#173F35] transition-all rounded-full shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
            >
              Book Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. YOUR TREATMENT JOURNEY (Clinic Process) */}
      <section id="journey" className="py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[#6F8F78] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">End-to-End Care</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#173F35] mb-6">
              Your Complete <span className="italic">Treatment Journey</span>
            </h2>
            <p className="text-[#17211D]/60 text-lg font-light">
              We manage every aspect of your care through our integrated clinical platform, ensuring seamless coordination from your first consultation to your final recovery.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-[40px] lg:left-0 lg:top-12 lg:right-0 lg:h-[1px] lg:w-full h-full w-[1px] bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-[#173F35]/20 to-transparent" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { step: '01', title: 'Consultation & Assessment', desc: 'In-depth pulse diagnosis (Nadi Pariksha) and Dosha evaluation with our experts.', icon: <User className="w-5 h-5 text-[#B69A5A]" /> },
                { step: '02', title: 'Prescription & Diet', desc: 'A customized digital treatment plan and exact dietary guidelines assigned to your portal.', icon: <FileText className="w-5 h-5 text-[#B69A5A]" /> },
                { step: '03', title: 'Treatment Sessions', desc: 'Daily therapeutic administration overseen by doctors, tracked in real-time.', icon: <Activity className="w-5 h-5 text-[#B69A5A]" /> },
                { step: '04', title: 'Follow-up & Recovery', desc: 'Post-treatment rejuvenation plans (Paschatkarma) to stabilize your new health.', icon: <CheckCircle2 className="w-5 h-5 text-[#B69A5A]" /> }
              ].map((item, i) => (
                <div key={i} className="relative pl-24 lg:pl-0 lg:text-center group">
                  <div className="absolute left-0 top-0 lg:relative lg:mx-auto lg:mb-8 w-24 h-24 lg:w-24 lg:h-24 bg-[#F5F1E8] rounded-full flex items-center justify-center border border-[#173F35]/10 group-hover:border-[#B69A5A] group-hover:scale-110 transition-all duration-500 z-10">
                    <div className="absolute top-2 left-2 text-[#173F35]/10 font-serif text-5xl font-bold -z-10">{item.step}</div>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-serif text-[#173F35] mb-3 mt-4 lg:mt-0">{item.title}</h4>
                  <p className="text-[#17211D]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. MULTI-SESSION PANCHAKARMA CONCEPT & PATIENT DASHBOARD PREVIEW */}
      <section className="py-32 bg-[#F5F1E8] border-t border-[#173F35]/5">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Text */}
            <div>
              <span className="text-[#B69A5A] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">The Digital Platform</span>
              <h2 className="text-4xl lg:text-6xl font-serif text-[#173F35] leading-tight mb-8">
                One Treatment.<br/>
                <span className="italic text-[#6F8F78]">Many Milestones.</span>
              </h2>
              <p className="text-[#17211D]/70 text-lg font-light leading-relaxed mb-10">
                Panchakarma is an evolving process spanning multiple days. Our proprietary patient dashboard visualizes your entire timeline, tracks daily milestones, and keeps you seamlessly connected to your doctor's instructions.
              </p>
              
              {/* Progress UI Mockup inside text column */}
              <div className="mb-10 p-6 bg-white border border-[#173F35]/10 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h5 className="font-serif text-[#173F35] text-lg">Treatment Progress</h5>
                    <p className="text-xs text-[#6F8F78] uppercase tracking-wider mt-1">Day 8 of 14</p>
                  </div>
                  <span className="text-3xl font-light text-[#173F35]">57%</span>
                </div>
                <div className="w-full h-1 bg-[#F5F1E8] rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[#173F35] w-[57%]" />
                </div>
                <div className="flex justify-between text-xs text-[#17211D]/50">
                  <span>8 Sessions Completed</span>
                  <span>Next: Tomorrow, 10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Right: Timeline UI Mockup */}
            <div className="relative">
              <div className="absolute top-10 -right-10 w-full h-full bg-[#173F35]/5 blur-3xl rounded-full -z-10" />
              <div className="glass-panel p-10 premium-shadow">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#173F35]/10">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#B69A5A]" />
                    <span className="font-serif text-xl text-[#173F35]">Virechana Timeline</span>
                  </div>
                  <span className="text-xs font-bold bg-[#173F35] text-white px-3 py-1 rounded-full">ACTIVE</span>
                </div>
                
                <div className="space-y-6">
                  {/* Item 1 */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-[#6F8F78]" /></div>
                    <div>
                      <p className="text-sm font-bold text-[#17211D]">Day 01 — Initial Consultation</p>
                      <p className="text-xs text-[#17211D]/50 mt-1">Completed on Oct 12</p>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-[#6F8F78]" /></div>
                    <div>
                      <p className="text-sm font-bold text-[#17211D]">Day 02-04 — Abhyanga & Swedana</p>
                      <p className="text-xs text-[#17211D]/50 mt-1">Completed on Oct 15</p>
                    </div>
                  </div>
                  {/* Item 3 (Current) */}
                  <div className="flex items-start gap-4 relative">
                    <div className="absolute -left-[19px] top-3 w-10 h-[1px] bg-[#B69A5A]" />
                    <div className="mt-1"><Circle className="w-5 h-5 text-[#B69A5A] fill-[#B69A5A]/20" /></div>
                    <div>
                      <p className="text-sm font-bold text-[#173F35]">Day 05 — Virechana Procedure</p>
                      <p className="text-xs text-[#B69A5A] font-medium mt-1">Today, 09:00 AM</p>
                    </div>
                  </div>
                  {/* Item 4 (Upcoming) */}
                  <div className="flex items-start gap-4 opacity-50">
                    <div className="mt-1"><Circle className="w-5 h-5 text-[#17211D]" /></div>
                    <div>
                      <p className="text-sm font-bold text-[#17211D]">Day 06-08 — Recovery & Diet</p>
                      <p className="text-xs text-[#17211D] mt-1">Scheduled</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PERSONALIZED PRESCRIPTION & DIET SECTION */}
      <section className="py-32 bg-[#17211D] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#173F35]/20 skew-x-12 transform translate-x-32" />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">
              Your Care, <span className="italic text-[#B69A5A]">Prescribed For You.</span>
            </h2>
            <p className="text-white/60 text-lg font-light">
              No two bodies are alike. Through the AyurSutra platform, your doctors assign highly specific digital prescriptions and diet regimens tailored strictly to your current Dosha imbalance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Prescription UI Mockup */}
            <div className="bg-white text-[#17211D] rounded-sm p-8 shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-[#B69A5A] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1">Digital Rx</div>
              
              <div className="border-b border-[#173F35]/10 pb-6 mb-6 flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-2xl text-[#173F35]">AyurSutra Clinical Rx</h4>
                  <p className="text-sm text-[#6F8F78] mt-1">Dr. Ananya Deshmukh</p>
                </div>
                <Stethoscope className="w-8 h-8 text-[#173F35]/20" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#17211D]/50 mb-1">Patient</p>
                  <p className="font-bold">Aarav Sharma • 34 YRS</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#17211D]/50 mb-2">Doctor's Notes</p>
                  <p className="text-sm italic text-[#17211D]/70 bg-[#F5F1E8] p-4 border-l-2 border-[#173F35]">
                    "Patient exhibiting high Pitta aggravation. Initiate Virechana protocol. Strictly avoid spicy and fermented foods during preparation phase."
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#17211D]/50 mb-2">Medication</p>
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="font-semibold">Mahatiktaka Ghrita</span>
                    <span className="text-[#6F8F78]">30ml • Empty Stomach</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-8 w-full py-3 bg-[#17211D] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#173F35] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>

            {/* Diet Plan UI Mockup */}
            <div className="bg-[#F5F1E8] text-[#17211D] rounded-sm p-8 shadow-2xl mt-12 lg:mt-0 lg:translate-y-12 relative">
              <div className="border-b border-[#173F35]/10 pb-6 mb-6 flex justify-between items-center">
                <h4 className="font-serif text-2xl text-[#173F35]">Today's Diet Plan</h4>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-[#17211D]/50">Phase</p>
                  <p className="text-sm font-bold text-[#173F35]">Samsarjana Krama</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { time: 'Morning', icon: '🌅', meal: 'Warm herbal water with cumin' },
                  { time: 'Breakfast', icon: '🥣', meal: 'Liquid rice gruel (Peya)' },
                  { time: 'Lunch', icon: '🍚', meal: 'Thick rice gruel (Vilepi) with mild ginger' },
                  { time: 'Evening', icon: '☕', meal: 'Warm coriander infusion' },
                  { time: 'Dinner', icon: '🍲', meal: 'Light vegetable soup (Yusha)' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 shadow-sm">
                    <div className="w-8 text-center text-xl">{item.icon}</div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#17211D]/50">{item.time}</p>
                      <p className="text-sm font-bold text-[#17211D] mt-0.5">{item.meal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. DIGITAL HEALTH RECORD & COMMUNICATION */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Communication Notifications Mock */}
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-[#F5F1E8] rounded-full blur-3xl opacity-50" />
              <div className="relative flex flex-col gap-4 h-full justify-center">
                {[
                  { title: 'Appointment Confirmed', time: 'Just now', icon: <Calendar className="w-4 h-4 text-[#173F35]" /> },
                  { title: 'New Prescription Uploaded', time: '2 hours ago', icon: <FileText className="w-4 h-4 text-[#173F35]" /> },
                  { title: 'Payment Receipt Generated', time: 'Yesterday', icon: <Download className="w-4 h-4 text-[#173F35]" /> },
                  { title: 'Session 3 Completed', time: 'Yesterday', icon: <CheckCircle2 className="w-4 h-4 text-[#173F35]" /> }
                ].map((notif, i) => (
                  <div key={i} className={`bg-white border border-[#173F35]/10 p-4 shadow-lg flex items-center gap-4 transform transition-transform hover:-translate-y-1 w-[80%] ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="w-10 h-10 rounded-full bg-[#F5F1E8] flex items-center justify-center flex-shrink-0">
                      {notif.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#17211D]">{notif.title}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#17211D]/50 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div>
              <span className="text-[#6F8F78] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Automated & Connected</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#173F35] mb-6 leading-tight">
                Every Session.<br/>
                <span className="italic">One Complete Record.</span>
              </h2>
              <p className="text-[#17211D]/70 text-lg font-light leading-relaxed mb-8">
                AyurSutra automatically logs your entire medical history. From doctor observations and vitals to completed sessions and dietary changes, everything is preserved in your digital health record.
              </p>
              <ul className="space-y-4">
                {[
                  'Automated email notifications and reminders',
                  'Downloadable PDF prescriptions & diet plans',
                  'Instant payment receipts and invoices',
                  'Centralized history accessible to all your doctors'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#17211D]">
                    <div className="w-1.5 h-1.5 bg-[#B69A5A] rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 10. DOCTOR / PRACTITIONER SECTION */}
      <section id="doctors" className="py-32 bg-[#F5F1E8]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-[#B69A5A] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Medical Expertise</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#173F35]">
                Our Clinical <span className="italic text-[#6F8F78]">Practitioners</span>
              </h2>
            </div>
            <button 
              onClick={() => navigate('/doctors')}
              className="text-sm font-bold uppercase tracking-widest text-[#173F35] border-b border-[#173F35] pb-1 hover:text-[#B69A5A] hover:border-[#B69A5A] transition-colors cursor-pointer"
            >
              View All Doctors
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { 
                name: 'Dr. Ananya Deshmukh', 
                qual: 'BAMS, MD Ayurveda', 
                spec: 'Panchakarma & Lifestyle', 
                exp: '12 Years', 
                status: 'Available Today',
                image: '/images/doctor_ananya.jpg'
              },
              { 
                name: 'Dr. Vikram Sharma', 
                qual: 'BAMS, MS Shalya Tantra', 
                spec: 'Joints & Marma Therapy', 
                exp: '18 Years', 
                status: 'Available Tomorrow',
                image: '/images/doctor_vikram.jpg'
              },
              { 
                name: 'Dr. Priya Nambiar', 
                qual: 'BAMS, MD Kayachikitsa', 
                spec: 'Internal Medicine & Detox', 
                exp: '9 Years', 
                status: 'Fully Booked',
                image: '/images/doctor_priya.jpg'
              }
            ].map((doc, i) => (
              <div 
                key={i} 
                onClick={() => navigate('/doctors')} 
                className="group cursor-pointer"
              >
                <div className="w-full h-[420px] bg-[#17211D] mb-6 overflow-hidden rounded-2xl relative shadow-xl border border-[#173F35]/10">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#173F35] shadow-md border border-white/50">
                    {doc.status}
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-[#173F35] mb-1 group-hover:text-[#B69A5A] transition-colors">{doc.name}</h3>
                <p className="text-xs uppercase tracking-widest text-[#17211D]/60 mb-3">{doc.qual}</p>
                <div className="flex justify-between items-center border-t border-[#173F35]/10 pt-4 mt-4 text-sm">
                  <span className="font-medium text-[#173F35]">{doc.spec}</span>
                  <span className="text-[#6F8F78] font-semibold">{doc.exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. THE EXPERIENCE & PATIENT REVIEWS */}
      <section id="experience" className="py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173F35]/10 text-[#173F35] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="text-[#B69A5A]">★★★★★</span> 4.9/5 Clinical Rating • 350+ Verified Reviews
            </div>
            <h2 className="text-4xl lg:text-6xl font-serif text-[#173F35] mb-6 leading-tight">
              The Patient <span className="italic text-[#6F8F78]">Experience</span>
            </h2>
            <p className="text-[#17211D]/70 text-lg font-light leading-relaxed">
              Read authentic healing stories, clinical results, and verified patient reviews from people who restored their balance with AyurSutra.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Featured Story */}
            <div className="lg:col-span-8 bg-[#173F35] text-[#F5F1E8] p-12 lg:p-20 relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <img src="/images/herbs.png" alt="bg" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[#B69A5A] text-xs font-bold tracking-[0.2em] uppercase block">
                    Featured Journey
                  </span>
                  <div className="text-[#B69A5A] text-sm tracking-widest">★★★★★</div>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8">
                  "14 days. A completely personalized Panchakarma journey that reset my entire metabolic system."
                </h3>
                <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-12 max-w-2xl">
                  After years of battling chronic inflammation and digestive distress, the structured medical approach at AyurSutra gave me clarity. The daily dashboard tracking and precise diet plans made the rigorous detox feel deeply supported and scientifically sound.
                </p>
                <div className="flex items-center gap-6 border-t border-white/20 pt-8">
                  <div className="w-16 h-16 rounded-full bg-white/10 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Patient" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white tracking-wide uppercase text-sm">Rajesh Kumar</p>
                    <p className="text-[#B69A5A] text-xs uppercase tracking-widest mt-1">Virechana Therapy • 14 Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Secondary Story */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-8">
              <div className="p-8 bg-[#F5F1E8] rounded-2xl border border-[#173F35]/10 shadow-sm">
                <div className="text-[#B69A5A] text-sm tracking-widest mb-3">★★★★★</div>
                <h4 className="font-serif text-xl text-[#173F35] mb-3 italic">
                  "The digital prescriptions and daily updates kept me completely informed."
                </h4>
                <p className="text-[#17211D]/70 text-sm leading-relaxed mb-6">
                  I appreciated that it wasn't just a spa treatment. It was a real clinical process managed elegantly through their platform.
                </p>
                <p className="font-bold text-[#17211D] text-xs uppercase tracking-widest">
                  Priya S. — Basti Therapy
                </p>
              </div>
              
              <div className="p-8 bg-[#F5F1E8] rounded-2xl border border-[#173F35]/10 shadow-sm">
                <div className="text-[#B69A5A] text-sm tracking-widest mb-3">★★★★★</div>
                <h4 className="font-serif text-xl text-[#173F35] mb-3 italic">
                  "A level of professionalism rarely seen in traditional wellness."
                </h4>
                <p className="text-[#17211D]/70 text-sm leading-relaxed mb-6">
                  The therapists were incredibly knowledgeable and the pulse diagnosis correctly pinpointed my dosha imbalances right from day one.
                </p>
                <p className="font-bold text-[#17211D] text-xs uppercase tracking-widest">
                  Amit P. — Nasya Therapy
                </p>
              </div>
            </div>

          </div>

          {/* Additional Verified Patient Reviews Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ananya Iyer",
                role: "Vamana & Basti • 21 Days",
                comment: "The precision of treatment tracking and attentive medical supervision made this life-changing. My chronic asthma and skin flare-ups have reduced drastically.",
                date: "Verified Patient • Sept 2026",
                stars: "★★★★★"
              },
              {
                name: "Dr. Vikram K.",
                role: "Virechana Therapy • 10 Days",
                comment: "As an allopathic physician myself, I was deeply impressed by the clinical rigor, pulse diagnosis, and digital health records maintained throughout my care.",
                date: "Verified Patient • Aug 2026",
                stars: "★★★★★"
              },
              {
                name: "Meera Nair",
                role: "Shirodhara & Nasya • 7 Days",
                comment: "Completely relieved my recurrent migraines and insomnia. The doctors are compassionate and the daily progress tracking gave me immense confidence.",
                date: "Verified Patient • July 2026",
                stars: "★★★★★"
              }
            ].map((review, i) => (
              <div key={i} className="bg-[#F5F1E8] border border-[#173F35]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#B69A5A] text-sm tracking-widest">{review.stars}</span>
                  <span className="text-[11px] text-[#173F35]/60 uppercase tracking-wider font-medium">{review.date}</span>
                </div>
                <p className="text-[#17211D]/80 text-sm leading-relaxed mb-4 italic">
                  "{review.comment}"
                </p>
                <div className="border-t border-[#173F35]/10 pt-3">
                  <p className="font-bold text-[#173F35] text-sm">{review.name}</p>
                  <p className="text-xs text-[#B69A5A] font-medium">{review.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. APPOINTMENT CTA (Cinematic) */}
      <section className="relative py-40 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#17211D]">
          <img 
            src="/images/shirodhara.png" 
            alt="Consultation" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-8">
          <h2 className="text-5xl lg:text-7xl font-serif text-white mb-8 leading-tight">
            Your journey begins <br/>
            <span className="italic text-[#B69A5A]">with a conversation.</span>
          </h2>
          <p className="text-xl text-white/80 font-light mb-12 max-w-2xl mx-auto">
            Speak with an Ayurvedic practitioner today and discover a treatment journey designed entirely around you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleBookAppointmentClick}
              className="w-full sm:w-auto px-10 py-4 bg-[#B69A5A] text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#173F35] transition-colors rounded-none"
            >
              Book Consultation
            </button>
            <button 
              onClick={() => document.getElementById('doctors').scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-none"
            >
              Meet Our Doctors
            </button>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-[#17211D] text-[#F5F1E8] py-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full border border-white/20">
                  <Leaf className="w-5 h-5 text-[#B69A5A]" />
                </div>
                <span className="text-2xl font-serif font-semibold tracking-wide">
                  AyurSutra
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                An end-to-end digital platform for managing personalized Panchakarma treatment journeys. Rooted in authentic Ayurveda, engineered for modern clinical excellence.
              </p>
            </div>

            {/* Links 1 */}
            <div>
              <h5 className="text-[#B69A5A] text-xs font-bold uppercase tracking-widest mb-6">Platform</h5>
              <ul className="space-y-4 text-sm text-white/70">
                <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Patient Login</button></li>
                <li><button onClick={handleBookAppointmentClick} className="hover:text-white transition-colors">Book Appointment</button></li>
                <li><button onClick={() => navigate('/doctors')} className="hover:text-white transition-colors">Our Doctors</button></li>
                <li><a href="#" className="hover:text-white transition-colors">The Therapies</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h5 className="text-[#B69A5A] text-xs font-bold uppercase tracking-widest mb-6">Support</h5>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Patient Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Clinic</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Clinic Info */}
            <div>
              <h5 className="text-[#B69A5A] text-xs font-bold uppercase tracking-widest mb-6">Clinic</h5>
              <ul className="space-y-4 text-sm text-white/70">
                <li>Wagholi, Pune, India</li>
                <li>+91 98765 43210</li>
                <li>clinical@ayursutra.com</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest">
            <p>© 2026 AyurSutra Clinical Management.</p>
            <p>Designed for Healthcare Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
