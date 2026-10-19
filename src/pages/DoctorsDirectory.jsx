import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, Star, Clock, Calendar, 
  Award, Shield, CheckCircle2, ChevronRight, Stethoscope, 
  MapPin, Phone, Mail, X, ArrowRight, Leaf
} from 'lucide-react';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Ananya Deshmukh',
    title: 'Head of Panchakarma & Clinical Lifestyle',
    qual: 'BAMS, MD Ayurveda',
    institution: 'Kerala Ayurveda University',
    spec: 'Panchakarma Detox',
    focus: 'Gut Health & Metabolic Reset',
    exp: '12 Years',
    rating: 4.9,
    reviewsCount: 142,
    status: 'Available Today',
    nextSlot: '11:30 AM',
    fee: '₹800',
    languages: ['English', 'Hindi', 'Marathi'],
    image: '/images/doctor_ananya.jpg',
    therapies: ['Virechana', 'Vamana', 'Shirodhara'],
    bio: 'Dr. Ananya specializes in chronic inflammatory disorders, deep tissue gut reset protocols, and precision Virechana therapies. She is renowned for bridging 5,000-year-old classical Charaka Samhita wisdom with modern biochemical diagnostics to deliver measurable patient recoveries.'
  },
  {
    id: 2,
    name: 'Dr. Vikram Sharma',
    title: 'Senior Shalya Tantra & Marma Specialist',
    qual: 'BAMS, MS Ayurveda (Shalya Tantra)',
    institution: 'Faculty of Ayurveda, IMS BHU Varanasi',
    spec: 'Joints & Spine',
    focus: 'Marma Therapy & Musculoskeletal Care',
    exp: '18 Years',
    rating: 5.0,
    reviewsCount: 210,
    status: 'Available Tomorrow',
    nextSlot: '10:00 AM',
    fee: '₹950',
    languages: ['English', 'Hindi', 'Punjabi'],
    image: '/images/doctor_vikram.jpg',
    therapies: ['Basti', 'Kati Basti', 'Janu Basti', 'Kizhi'],
    bio: 'A veteran clinical specialist in non-invasive management of cervical spondylosis, lumbar disc issues, arthritis, and sports injuries. Dr. Vikram integrates targeted oil pooling (Kati Basti) with classical pressure-point Marma manipulation to restore pain-free biomechanics.'
  },
  {
    id: 3,
    name: 'Dr. Priya Nambiar',
    title: 'Senior Consultant — Kayachikitsa & Detox',
    qual: 'BAMS, MD Kayachikitsa',
    institution: 'Govt. Ayurveda College, Thiruvananthapuram',
    spec: 'Internal Medicine',
    focus: 'Autoimmune & Chronic Disorders',
    exp: '9 Years',
    rating: 4.9,
    reviewsCount: 98,
    status: 'Available Today',
    nextSlot: '03:00 PM',
    fee: '₹800',
    languages: ['English', 'Hindi', 'Malayalam'],
    image: '/images/doctor_priya.jpg',
    therapies: ['Raktamokshana', 'Vamana', 'Takradhara'],
    bio: 'Dr. Priya is an authority on complex Pitta-Kapha disorders, autoimmune skin diseases like psoriasis and eczema, and liver rejuvenation. Her clinical treatment plans focus on blood purification (Raktamokshana) and targeted botanical bioavailability.'
  },
  {
    id: 4,
    name: 'Dr. Suresh Patel',
    title: 'Director of Pulse Diagnosis & Rasayana',
    qual: 'BAMS, MD Panchakarma',
    institution: 'Gujarat Ayurved University, Jamnagar',
    spec: 'Nadi Pariksha',
    focus: 'Holistic Pulse Analysis & Rejuvenation',
    exp: '22 Years',
    rating: 5.0,
    reviewsCount: 340,
    status: 'Available Today',
    nextSlot: '02:00 PM',
    fee: '₹1,200',
    languages: ['English', 'Hindi', 'Gujarati'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    therapies: ['Basti', 'Nadi Pariksha', 'Rasayana Therapy'],
    bio: 'Dr. Suresh is a revered master of Nadi Pariksha (classical eight-fold pulse assessment). He evaluates subtle dosha imbalances before they manifest as chronic disease, creating bespoke Rasayana plans that stimulate cellular longevity and deep vitality.'
  },
  {
    id: 5,
    name: 'Dr. Meera Iyer',
    title: 'Specialist — Dravyaguna & Cranial Health',
    qual: 'BAMS, MD Dravyaguna',
    institution: 'Government Ayurvedic Medical College, Mysore',
    spec: 'Cranial & ENT',
    focus: 'Migraine, Sinus & Stress Management',
    exp: '14 Years',
    rating: 4.8,
    reviewsCount: 115,
    status: 'Available Tomorrow',
    nextSlot: '11:00 AM',
    fee: '₹850',
    languages: ['English', 'Hindi', 'Tamil'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    therapies: ['Nasya', 'Shirodhara', 'Karna Poorana'],
    bio: 'Expert in cranial pathways, allergic rhinitis, and nervous system rebalancing. Dr. Meera utilizes medicated herbal oils administered through nasal passages (Nasya) and rhythmic forehead oil pouring (Shirodhara) to treat chronic migraines, sinusitis, and sleep disorders.'
  },
  {
    id: 6,
    name: 'Dr. Rajeshwari Varma',
    title: 'Consultant — Stri Roga & Women\'s Health',
    qual: 'BAMS, MD (Prasuti & Stri Roga)',
    institution: 'National Institute of Ayurveda, Jaipur',
    spec: 'Women\'s Health',
    focus: 'Hormonal Harmony & Fertility Care',
    exp: '16 Years',
    rating: 4.9,
    reviewsCount: 185,
    status: 'Available Today',
    nextSlot: '04:30 PM',
    fee: '₹900',
    languages: ['English', 'Hindi', 'Bengali'],
    image: 'https://images.unsplash.com/photo-1594824436951-7f12bc20ac38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    therapies: ['Uttara Basti', 'Abhyanga', 'Yonidhavana'],
    bio: 'Dedicated to women\'s clinical wellness, Dr. Rajeshwari has successfully treated hundreds of patients with PCOD, endometriosis, post-partum fatigue, and menopausal transitions through customized biological detox and calming herbal remedies.'
  }
];

const specialties = [
  'All Specialties',
  'Panchakarma Detox',
  'Joints & Spine',
  'Internal Medicine',
  'Nadi Pariksha',
  'Cranial & ENT',
  'Women\'s Health'
];

const DoctorsDirectory = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSpecialty = 
      selectedSpecialty === 'All Specialties' || doc.spec === selectedSpecialty;
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qual.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#17211D] font-sans selection:bg-[#B69A5A] selection:text-white">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F1E8]/95 backdrop-blur-md py-4 border-b border-[#173F35]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#173F35] hover:text-[#B69A5A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="p-2 rounded-full border border-[#173F35]">
              <Leaf className="w-5 h-5 text-[#173F35]" />
            </div>
            <span className="text-2xl font-serif font-semibold tracking-wide text-[#173F35]">
              AyurSutra
            </span>
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#173F35] text-[#F5F1E8] hover:bg-[#B69A5A] transition-all duration-300 shadow-md"
          >
            Book Consultation
          </button>
        </div>
      </nav>

      {/* 2. HERO HEADER */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-b from-[#173F35] to-[#122A23] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B69A5A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#E6C987] text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
              <Shield className="w-4 h-4 text-[#B69A5A]" /> 100% Certified BAMS & MD Ayurvedic Physicians
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-normal leading-tight mb-6">
              Our Clinical <br />
              <span className="italic text-[#B69A5A]">Practitioners & Vaidyas</span>
            </h1>
            <p className="text-white/80 text-lg lg:text-xl font-light leading-relaxed">
              Every Panchakarma treatment is directly monitored by accredited Ayurvedic doctors. Discover our specialized faculty, their clinical expertise, and real-time consultation availability.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/15">
            <div>
              <p className="text-3xl lg:text-4xl font-serif text-[#B69A5A]">15+</p>
              <p className="text-xs uppercase tracking-widest text-white/60 mt-1">Senior Clinicians</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-serif text-[#B69A5A]">100%</p>
              <p className="text-xs uppercase tracking-widest text-white/60 mt-1">MD / BAMS Certified</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-serif text-[#B69A5A]">25k+</p>
              <p className="text-xs uppercase tracking-widest text-white/60 mt-1">Patient Consultations</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-serif text-[#B69A5A]">4.9 / 5</p>
              <p className="text-xs uppercase tracking-widest text-white/60 mt-1">Clinical Satisfaction</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SEARCH & SPECIALTY FILTER BAR */}
      <section className="py-8 bg-white border-b border-[#173F35]/10 sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-[#F5F1E8]/50 text-sm focus:outline-none focus:border-[#173F35] transition-colors"
            />
          </div>

          {/* Specialty Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedSpecialty === spec
                    ? 'bg-[#173F35] text-white shadow-md'
                    : 'bg-[#F5F1E8] text-[#17211D]/70 hover:bg-[#173F35]/10 hover:text-[#173F35]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DOCTORS GRID */}
      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#173F35]/60">
            Showing <span className="text-[#173F35] font-bold">{filteredDoctors.length}</span> Ayurvedic Specialists
          </p>
          {selectedSpecialty !== 'All Specialties' && (
            <button
              onClick={() => setSelectedSpecialty('All Specialties')}
              className="text-xs text-[#B69A5A] hover:underline font-semibold"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#173F35]/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Portrait Header */}
                <div className="relative h-[340px] overflow-hidden bg-[#17211D]">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#173F35] shadow-md border border-white/50">
                    {doc.status}
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white flex items-center gap-1.5 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-[#B69A5A] text-[#B69A5A]" />
                    <span className="font-bold">{doc.rating}</span>
                    <span className="text-white/60">({doc.reviewsCount})</span>
                  </div>

                  {/* Fee Pill */}
                  <div className="absolute bottom-4 right-4 bg-[#173F35]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#E6C987] font-semibold border border-[#B69A5A]/30">
                    Consult: {doc.fee}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#B69A5A] uppercase tracking-wider mb-1">
                    <span>{doc.spec}</span>
                    <span>{doc.exp}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#173F35] mb-1 group-hover:text-[#B69A5A] transition-colors">
                    {doc.name}
                  </h3>
                  
                  <p className="text-xs font-medium text-gray-500 mb-3">
                    {doc.qual} • {doc.institution}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {doc.bio}
                  </p>

                  {/* Therapies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {doc.therapies.map((therapy) => (
                      <span
                        key={therapy}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F5F1E8] text-[#173F35] font-medium border border-[#173F35]/10"
                      >
                        {therapy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-[#173F35] bg-[#F5F1E8] hover:bg-[#173F35] hover:text-white rounded-xl transition-colors text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#B69A5A] hover:bg-[#9c844d] rounded-xl transition-colors shadow-md text-center"
                >
                  Book Slot
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
            <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-gray-700 mb-2">No practitioners found</h3>
            <p className="text-sm text-gray-500 mb-6">Try clearing your specialty filter or searching for another keyword.</p>
            <button
              onClick={() => { setSelectedSpecialty('All Specialties'); setSearchQuery(''); }}
              className="px-6 py-2.5 bg-[#173F35] text-white text-xs font-bold uppercase tracking-widest rounded-full"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 5. CLINICAL STANDARDS BANNER */}
      <section className="py-20 bg-[#173F35] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#B69A5A]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2 text-white">Verified Ayurvedic Credentials</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Every doctor holds state council registration, BAMS degrees from premier institutes, and postgraduate specializations in classical Panchakarma.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#B69A5A]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2 text-white">Dedicated 45-Min Consultations</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  We don't rush. Consultations include pulse diagnosis, tongue analysis (Jihva Pariksha), Prakriti dosha mapping, and bespoke prescription formulation.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#B69A5A]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2 text-white">Digital Health Record Tracking</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Your daily treatment vitals, dietary adjustments, and therapist progress notes are unified on our platform for continuous medical oversight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOCTOR PROFILE DETAIL MODAL */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
            
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-[#173F35]/20 shadow-md"
              />
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B69A5A]">
                  {selectedDoctor.spec} • {selectedDoctor.exp} Experience
                </span>
                <h2 className="text-3xl font-serif text-[#173F35] mt-1 mb-1">
                  {selectedDoctor.name}
                </h2>
                <p className="text-xs text-gray-500 mb-2">
                  {selectedDoctor.qual} — {selectedDoctor.institution}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-xs">
                  <span className="flex items-center gap-1 font-bold text-[#173F35]">
                    <Star className="w-3.5 h-3.5 fill-[#B69A5A] text-[#B69A5A]" />
                    {selectedDoctor.rating} ({selectedDoctor.reviewsCount} reviews)
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-green-700 font-semibold">{selectedDoctor.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-6">
              <div>
                <h4 className="font-serif text-lg text-[#173F35] mb-2 font-semibold">Clinical Biography</h4>
                <p>{selectedDoctor.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F5F1E8] p-4 rounded-2xl">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">Next Available Slot</span>
                  <p className="font-semibold text-[#173F35]">{selectedDoctor.nextSlot}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">Consultation Fee</span>
                  <p className="font-semibold text-[#173F35]">{selectedDoctor.fee}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">Languages Spoken</span>
                  <p className="font-medium text-gray-700">{selectedDoctor.languages.join(', ')}</p>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#173F35] mb-2 font-semibold">Key Panchakarma Therapies Administered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.therapies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-[#173F35]/10 text-[#173F35] font-semibold text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="w-1/3 py-3 border border-gray-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="w-2/3 py-3 bg-[#B69A5A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#9c844d] transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Book With {selectedDoctor.name} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. FOOTER */}
      <footer className="bg-[#17211D] text-white/70 py-12 border-t border-white/10 text-center text-xs">
        <p>© 2026 AyurSutra Clinical Panchakarma Management. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default DoctorsDirectory;
