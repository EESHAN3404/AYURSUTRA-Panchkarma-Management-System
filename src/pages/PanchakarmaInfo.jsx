import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Droplets, Wind, Feather, Activity, Shield, Sparkles } from 'lucide-react';

const PanchakarmaInfo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-sans selection:bg-[#4F7C5A] selection:text-white pb-20">
      {/* Custom Styles */}
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .dark-glass-panel {
          background: rgba(47, 79, 62, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-lg tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium">Return</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <span className="text-[#4F7C5A] font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">
            The Science of Purification
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-[#2F4F3E] leading-[1.1] tracking-tight mb-8">
            Understanding <br />
            <span className="font-script italic text-[#4F7C5A] font-normal">Panchakarma</span>
          </h1>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              The word <strong>Panchakarma</strong> is derived from Sanskrit, where <em>"Pancha"</em> means five and <em>"Karma"</em> means action or treatment. It represents the five foundational detoxification processes in Ayurveda.
            </p>
            <p>
              Unlike superficial detox diets or spa treatments, Panchakarma is a deep, cellular-level clinical therapy. It is designed to systematically unseat toxic buildup (<em>Ama</em>) from the body's deep tissues (<em>Dhatus</em>), mobilize them into the gastrointestinal tract, and permanently expel them from the body.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="/images/herbs.png"
            alt="Ayurvedic Preparation"
            className="rounded-[30px] shadow-2xl w-full h-[500px] object-cover"
          />
        </div>
      </section>

      {/* The 3 Phases of Panchakarma */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#2F4F3E] mb-6">
              The Three Phases of <span className="font-script italic text-[#4F7C5A] font-normal">Treatment</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Panchakarma is highly systematic. Attempting to expel toxins without proper preparation can damage the body's channels (<em>Srotas</em>). Therefore, the treatment is strictly divided into three clinical phases.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Phase 1 */}
            <div className="glass-panel p-10 rounded-[30px] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F7C5A]/5 rounded-full blur-2xl" />
              <span className="text-5xl font-display font-bold text-[#4F7C5A]/20 absolute right-8 top-8">01</span>
              <h3 className="text-2xl font-bold text-[#2F4F3E] mb-2">Purvakarma</h3>
              <h4 className="text-[#4F7C5A] font-semibold mb-6">The Preparatory Phase</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before the main therapies can begin, the body must be prepared to release toxins. This phase utilizes two main techniques:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F7C5A] mt-2 flex-shrink-0" />
                  <span><strong>Snehana (Oleation):</strong> Internal and external administration of medicated oils and ghee to loosen toxins bound to tissues.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F7C5A] mt-2 flex-shrink-0" />
                  <span><strong>Swedana (Fomentation):</strong> Therapeutic sweating to dilate channels, allowing the loosened toxins to flow into the digestive tract.</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="glass-panel p-10 rounded-[30px] shadow-lg relative overflow-hidden border-2 border-[#4F7C5A]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />
              <span className="text-5xl font-display font-bold text-[#D4AF37]/20 absolute right-8 top-8">02</span>
              <h3 className="text-2xl font-bold text-[#2F4F3E] mb-2">Pradhanakarma</h3>
              <h4 className="text-[#D4AF37] font-semibold mb-6">The Main Therapies</h4>
              <p className="text-gray-700 leading-relaxed">
                Once the toxins have successfully migrated to the GI tract, the physician determines which of the five main karmas (actions) will be used to expel them. This decision is based on the patient's specific Dosha imbalance, current strength, and disease pathology.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="glass-panel p-10 rounded-[30px] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
              <span className="text-5xl font-display font-bold text-blue-900/10 absolute right-8 top-8">03</span>
              <h3 className="text-2xl font-bold text-[#2F4F3E] mb-2">Paschatkarma</h3>
              <h4 className="text-blue-600 font-semibold mb-6">Post-Treatment Care</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                After intense detoxification, the digestive fire (Agni) is weak, and the body's tissues are vulnerable. This phase focuses on rejuvenation (<em>Rasayana</em>):
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong>Samsarjana Krama:</strong> A strict dietary regimen that slowly reintroduces solid foods to rebuild digestive strength.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong>Lifestyle Adjustment:</strong> Rest, specialized herbal tonics, and avoiding stress to allow tissues to rebuild optimally.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Main Actions in Detail */}
      <section className="py-24 bg-[#2F4F3E] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              The Five Principal <span className="font-script italic text-[#D4AF37] font-normal">Karmas</span>
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              These are the five distinct clinical procedures of Pradhanakarma. A patient rarely undergoes all five; treatments are prescribed selectively based on the specific Dosha that requires balancing.
            </p>
          </div>

          <div className="space-y-16">
            {/* 1. Vamana */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-full md:w-1/3">
                <img src="/images/vamana.jpg" alt="Vamana" className="rounded-3xl w-full h-64 object-cover" />
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">1. Vamana</h3>
                  <span className="px-4 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold tracking-wider">Targets Kapha</span>
                </div>
                <h4 className="text-xl text-[#D4AF37] mb-4">Therapeutic Emesis (Vomiting)</h4>
                <p className="text-white/80 leading-relaxed mb-4">
                  Vamana is utilized when there is congestion in the lungs causing repeated attacks of bronchitis, colds, coughs, or asthma. The objective is to induce vomiting to clear the excess Kapha (mucous) situated in the stomach and respiratory tract.
                </p>
                <p className="text-white/80 leading-relaxed">
                  <strong>Indications:</strong> Asthma, chronic allergies, obesity, chronic indigestion, edema, and certain psychological disorders.
                </p>
              </div>
            </div>

            {/* 2. Virechana */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-full md:w-2/3 order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">2. Virechana</h3>
                  <span className="px-4 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-semibold tracking-wider">Targets Pitta</span>
                </div>
                <h4 className="text-xl text-[#D4AF37] mb-4">Therapeutic Purgation</h4>
                <p className="text-white/80 leading-relaxed mb-4">
                  When excess bile (Pitta) is secreted and accumulated in the gallbladder, liver, and small intestine, it tends to result in rashes, skin inflammation, acne, chronic fever, and biliary vomiting. Virechana clears these toxins via the bowel.
                </p>
                <p className="text-white/80 leading-relaxed">
                  <strong>Indications:</strong> Jaundice, skin disorders (psoriasis, eczema), acid peptic disorders, chronic fevers, and liver/spleen enlargement.
                </p>
              </div>
              <div className="w-full md:w-1/3 order-1 md:order-2">
                <img src="/images/virechana.jpg" alt="Virechana" className="rounded-3xl w-full h-64 object-cover" />
              </div>
            </div>

            {/* 3. Basti */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-full md:w-1/3">
                <img src="/images/basti.jpg" alt="Basti" className="rounded-3xl w-full h-64 object-cover" />
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">3. Basti</h3>
                  <span className="px-4 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-semibold tracking-wider">Targets Vata</span>
                </div>
                <h4 className="text-xl text-[#D4AF37] mb-4">Medicated Enema</h4>
                <p className="text-white/80 leading-relaxed mb-4">
                  Considered the mother of all Panchakarma treatments, Basti cleanses the accumulated toxins from all three doshas but is highly effective for Vata disorders. It involves introducing herbal decoctions and medicated oils into the colon.
                </p>
                <p className="text-white/80 leading-relaxed">
                  <strong>Indications:</strong> Chronic constipation, sciatica, lower back pain, arthritis, gout, rheumatism, and neurological disorders.
                </p>
              </div>
            </div>

            {/* 4. Nasya */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-full md:w-2/3 order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">4. Nasya</h3>
                  <span className="px-4 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-semibold tracking-wider">Head & Neck</span>
                </div>
                <h4 className="text-xl text-[#D4AF37] mb-4">Nasal Administration</h4>
                <p className="text-white/80 leading-relaxed mb-4">
                  The nose is the doorway to the brain and consciousness. Nasya involves the instillation of medicated oils, juices, or powders through the nasal route to clear accumulated Kapha toxins from the head and neck region.
                </p>
                <p className="text-white/80 leading-relaxed">
                  <strong>Indications:</strong> Migraines, chronic sinus congestion, loss of smell, frozen shoulder, cervical spondylosis, and sleep apnea.
                </p>
              </div>
              <div className="w-full md:w-1/3 order-1 md:order-2">
                <img src="/images/shirodhara.png" alt="Nasya" className="rounded-3xl w-full h-64 object-cover" />
              </div>
            </div>

            {/* 5. Raktamokshana */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-full md:w-1/3">
                <img src="/images/raktamokshana.jpg" alt="Raktamokshana" className="rounded-3xl w-full h-64 object-cover" />
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">5. Raktamokshana</h3>
                  <span className="px-4 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold tracking-wider">Blood Purification</span>
                </div>
                <h4 className="text-xl text-[#D4AF37] mb-4">Therapeutic Bloodletting</h4>
                <p className="text-white/80 leading-relaxed mb-4">
                  A highly specialized surgical procedure used to extract impure blood from the system. Toxins absorbed into the bloodstream circulate throughout the body, manifesting primarily in the skin and joints.
                </p>
                <p className="text-white/80 leading-relaxed">
                  <strong>Indications:</strong> Severe eczema, psoriasis, chronic pigmentation, deep tissue inflammation, and recurrent abscesses.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clinical Evidence & Modern Context */}
      <section className="py-24 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-display font-bold text-[#2F4F3E] mb-6">
                Clinical Efficacy in the Modern World
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  In the modern era, chronic stress, processed diets, and environmental pollution lead to a continuous buildup of lipophilic (fat-soluble) toxins. Modern medicine often treats the symptoms, but Ayurveda seeks to eliminate the root cause.
                </p>
                <p>
                  Panchakarma provides a scientifically profound method for <strong>metabolic reset and cellular repair</strong>. By removing lipophilic toxins that disrupt the endocrine system, patients often experience significant reductions in inflammation, improved autonomic nervous system regulation, and a complete rejuvenation of digestive function.
                </p>
                <p className="font-semibold text-[#4F7C5A]">
                  It is a transition from surviving to thriving—re-establishing the body's natural state of equilibrium and vibrant health.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Zen stones" className="rounded-3xl w-full h-56 object-cover" />
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Ayurvedic herbs" className="rounded-3xl w-full h-56 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PanchakarmaInfo;
