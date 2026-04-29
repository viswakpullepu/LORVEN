import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  ChevronLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Zap,
  Layout,
  Briefcase,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export default function AssetPipeline() {
  const navigate = useNavigate();

  const initiatives = [
    { 
      id: '01', 
      title: "Project Aethelgard", 
      stage: "NEURAL_INTEGRATION", 
      date: "SEPT 2026", 
      status: "PLANNING",
      desc: "Deployment of proprietary neural decision engines across your Tier-1 operational nodes."
    },
    { 
      id: '02', 
      title: "Quantum Growth", 
      stage: "PHASE_DELTA", 
      date: "NOV 2026", 
      status: "INITIALIZING",
      desc: "Multi-vector scaling operation targeting established European markets through algorithmic positioning."
    },
    { 
      id: '03', 
      title: "Horizon 2027", 
      stage: "ASSET_DECOUPLING", 
      date: "JAN 2027", 
      status: "QUEUED",
      desc: "Strategic shift in asset allocation to maximize liquidity while maintaining market dominance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl px-10 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => navigate('/portal')}
          >
            <ChevronLeft className="w-5 h-5 text-amber-500 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display text-xl font-black uppercase tracking-tighter italic group-hover:text-amber-500 transition-colors">ASSET_PIPELINE</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="font-display text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black">Future_Directives_V3</span>
             <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col gap-16">
        <header className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="w-16 h-px bg-amber-500" />
            <span className="font-display text-xs uppercase tracking-[0.5em] text-amber-500">Shared Strategic Roadmap</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
          >
            Growth<br />
            <span className="text-zinc-800 not-italic">Acceleration.</span>
          </motion.h1>
          <p className="text-zinc-500 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed mt-4 italic uppercase tracking-tighter">
            Your asset trajectory is currently in a state of high-yield expansion. All upcoming directives are synchronized for maximal impact.
          </p>
        </header>

        {/* Initiative List */}
        <section className="flex flex-col gap-8">
           <div className="flex items-center justify-between">
              <h2 className="font-display text-xs uppercase tracking-[0.4em] text-zinc-700 font-black">Pipeline_Initiatives</h2>
              <div className="h-px flex-1 mx-8 bg-white/5" />
           </div>

           <div className="flex flex-col gap-12 mt-4">
              {initiatives.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group flex flex-col lg:flex-row gap-8 lg:items-center p-12 bg-zinc-900/40 border border-white/5 rounded-[3rem] hover:border-amber-500/30 transition-all duration-700 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="font-display text-[120px] font-black italic tracking-tighter leading-none">{item.id}</span>
                  </div>

                  <div className="flex flex-col gap-6 lg:w-1/3 relative z-10">
                     <div className="flex items-center gap-4">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span className="font-display text-sm font-black uppercase tracking-[0.2em] text-zinc-500">{item.date}</span>
                     </div>
                     <h3 className="font-display text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white group-hover:text-amber-500 transition-colors duration-500">
                       {item.title}
                     </h3>
                     <div className={`w-fit px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                       item.status === 'PLANNING' ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-500'
                     }`}>
                       {item.status}
                     </div>
                  </div>

                  <div className="lg:flex-1 relative z-10">
                     <span className="font-display text-[10px] uppercase font-black tracking-[0.4em] text-zinc-700 block mb-4">Stage: {item.stage}</span>
                     <p className="text-zinc-500 text-lg leading-relaxed font-medium group-hover:text-zinc-300 transition-colors uppercase tracking-tight">
                        {item.desc}
                     </p>
                  </div>

                  <div className="lg:w-48 flex justify-end relative z-10">
                     <button className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-500 shadow-2xl group-hover:border-amber-500/50">
                        <ArrowRight className="w-8 h-8" />
                     </button>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Supporting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { label: "Directives", value: "12", icon: Briefcase },
             { label: "Efficiency", value: "98%", icon: Zap },
             { label: "Templates", value: "420+", icon: Layout },
             { label: "Yield_Scale", value: "6.2x", icon: TrendingUp }
           ].map((stat, i) => (
             <div key={i} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-zinc-900/60 transition-colors">
                <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:rotate-6 transition-transform">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                   <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 block mb-1">{stat.label}</span>
                   <span className="font-display text-2xl font-black italic tracking-tighter text-white">{stat.value}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Global Synchronization Banner */}
        <section className="bg-amber-500 p-16 rounded-[3rem] text-black flex flex-col md:flex-row items-center justify-between gap-12 group hover:scale-[1.01] transition-transform duration-1000">
           <div className="flex-1 flex flex-col gap-6">
              <h2 className="font-display text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.85] italic">Ready for<br />Next Phase.</h2>
              <p className="text-black/60 text-lg md:text-xl font-black uppercase tracking-tighter max-w-xl leading-snug">
                Your account is currently synchronized with the Global Execution Pipeline. All nodes are ready for next-phase expansion operations.
              </p>
           </div>
           <div className="shrink-0">
              <div className="relative">
                 <div className="absolute inset-0 bg-white blur-[40px] opacity-20 animate-ping" />
                 <div className="w-32 h-32 bg-black text-amber-500 rounded-full flex items-center justify-center relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500">
                   <CheckCircle2 className="w-16 h-16" />
                 </div>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}
