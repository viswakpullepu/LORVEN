import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../components/Logo';
import { ArrowRight, ChevronRight, Share2, Shield, TrendingUp, Network, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-900/60 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-xl md:text-2xl font-black text-amber-500 tracking-tighter uppercase font-display italic">Lorven</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Strategy', 'Growth', 'Insights', 'Advisory', 'Network'].map((item) => (
              <a key={item} href="#capabilities" className="font-display text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-400 transition-all duration-300">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 mr-4 bg-black/50 px-3 py-1.5 rounded border border-white/5">
              <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
              <span className="font-display text-[7px] uppercase tracking-[0.3em] text-zinc-500">Node_Alpha_Signal</span>
            </div>
            
            <Link to="/login" className="hidden sm:block font-display text-[10px] uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors mr-4">
              Secure Access
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/register" className="hidden sm:block">
              <button className="bg-amber-500 text-black px-6 py-2 rounded-sm font-display text-[10px] uppercase tracking-widest font-black hover:bg-white transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                Consult
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-zinc-900 border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {['Strategy', 'Growth', 'Insights', 'Advisory', 'Network'].map((item) => (
                  <a 
                    key={item} 
                    href="#capabilities" 
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-xs uppercase tracking-[0.3em] text-zinc-400 py-2"
                  >
                    {item}
                  </a>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <Link to="/login" className="font-display text-xs uppercase tracking-[0.3em] text-amber-500 py-2">Secure Access</Link>
                <Link to="/register" className="bg-amber-500 text-black p-4 text-center font-display text-xs uppercase tracking-[0.3em] font-black mt-2">
                  Initialize Console
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        {/* Marquee */}
        <div className="bg-zinc-950 py-4 border-y border-white/5 overflow-hidden whitespace-nowrap">
          <div className="flex gap-12 animate-marquee inline-block">
            {['SYNERGY_X', 'DELTA_V', 'QUANTUM_CAPITAL', 'INTEL_CORP', 'LORVEN_GLOBAL', 'SYSTEM_ALPHA', 'TECH_SOLUTIONS', 'GLOBAL_LEADERS', 'INFRA_STRUCTURE'].map((p) => (
              <span key={p} className="font-display text-[9px] uppercase tracking-[0.6em] text-zinc-700">
                {p} <span className="text-amber-500/30 ml-4">//</span>
              </span>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden px-10 py-20">
          <div className="absolute inset-0 z-0">
            <img src={IMAGES.HERO_BG} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Background" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col gap-6 md:gap-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-display text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-400">Strategic Resolution Unit</span>
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase italic">
                Precision Strategy<br />
                <span className="text-amber-500 not-italic">Engineered.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Instituting high-yield strategic architecture for the global vanguard. We translate market complexity into absolute execution.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link to="/register">
                  <button className="bg-amber-500 text-black px-10 py-5 rounded-sm font-display text-xs uppercase tracking-[0.3em] font-black hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(245,158,11,0.15)]">
                    Initialize Setup
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </button>
                </Link>
                <Link to="/login">
                  <button className="border border-white/10 text-white px-10 py-5 rounded-sm font-display text-xs uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all duration-500 text-center">
                    Client Portal
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-surface-container-lowest/50 backdrop-blur-xl p-8 flex items-center justify-center">
                <img src={IMAGES.HERO_VISUAL} alt="Core" className="w-full h-full object-contain mix-blend-screen animate-float drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capability Architecture */}
        <section id="capabilities" className="py-20 md:py-32 px-6 md:px-10 bg-black relative border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 max-w-2xl"
            >
              <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase italic leading-none">
                Capability<br />Architecture
              </h2>
              <p className="text-zinc-500 font-display text-[10px] md:text-xs uppercase tracking-[0.4em]">Dimensional strategy for linear markets.</p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6"
            >
              {/* Large Feature Card */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="md:col-span-2 md:row-span-2 rounded-sm bg-zinc-900/50 border border-white/5 p-8 md:p-12 relative overflow-hidden group"
              >
                <div className="absolute inset-0 z-0">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full -mr-48 -mt-48 transition-all duration-700 group-hover:bg-amber-500/10" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-500">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-6 max-w-md">
                    <h3 className="font-display text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter">Asset Pipeline Generation</h3>
                    <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">
                      Proprietary algorithmic identification of hidden market alpha, structuring robust pipelines that ignore conventional constraints.
                    </p>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="self-start mt-4 text-amber-500 font-display text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2 hover:text-white transition-all"
                    >
                      Review Models <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Card 1 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                whileHover={{ y: -5 }} 
                className="rounded-sm bg-zinc-900/30 p-8 border border-white/5 relative overflow-hidden group"
              >
                <div className="flex flex-col h-full justify-between gap-8">
                  <div className="w-8 h-8 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white uppercase italic mb-3">Risk Shell</h3>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                      Multi-layered defensive architectures designed to isolate exposure and stabilize growth.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Card 2 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                whileHover={{ y: -5 }} 
                className="rounded-sm bg-zinc-900/30 p-8 border border-white/5 relative overflow-hidden group"
              >
                <div className="flex flex-col h-full justify-between gap-8">
                  <div className="w-8 h-8 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white uppercase italic mb-3">Yield Engine</h3>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                      Scalable integration frameworks optimized for immediate market penetration and yield.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Strategic Dominance Section */}
        <section className="py-24 md:py-40 px-6 md:px-10 bg-[#050505] relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="font-display text-amber-500/50 text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-4">Final Resolution</div>
              <h2 className="font-display text-4xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.95]">
                Stop Surveying.<br />
                <span className="text-amber-500 not-italic">Start Dominating.</span>
              </h2>
              <p className="text-zinc-500 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mt-4">
                Lorven isn't a consultancy—it's an <span className="text-white">execution factory</span>. We deliver absolute outcomes for those who refuse the median.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-3 gap-px w-full bg-white/5 border border-white/10 p-px"
            >
              {[
                { label: "Complexity", val: "Resolved", color: "text-amber-500", icon: Shield },
                { label: "Ambition", val: "Scale", color: "text-white", icon: TrendingUp },
                { label: "Results", val: "Absolute", color: "text-amber-500", icon: Network }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-950 py-12 md:py-20 flex flex-col items-center gap-6 group hover:bg-zinc-900 transition-all duration-700 cursor-default">
                  <stat.icon className="w-8 h-8 text-zinc-900 group-hover:text-amber-500/40 transition-all duration-700 group-hover:scale-110" />
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-display text-zinc-600 group-hover:text-amber-500 transition-colors uppercase">{stat.label}</span>
                    <span className={`text-4xl md:text-6xl font-display font-black uppercase tracking-tighter ${stat.color}`}>{stat.val}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-10"
            >
               <Link to="/register" className="w-full sm:w-auto">
                 <button className="w-full group relative px-12 md:px-20 py-6 md:py-8 bg-amber-500 text-black font-display font-black uppercase tracking-[0.2em] text-lg md:text-xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(245,158,11,0.2)]">
                   <span className="relative z-10 transition-colors group-hover:text-black">Secure Dominance</span>
                   <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500" />
                 </button>
               </Link>
               <div className="flex items-center gap-4 text-zinc-800 font-display text-[8px] md:text-[10px] uppercase tracking-[0.4em]">
                 <span className="w-8 md:w-16 h-px bg-zinc-900" />
                 Limited Priority Availability
                 <span className="w-8 md:w-16 h-px bg-zinc-900" />
               </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-zinc-950">
        <div className="flex flex-col items-center py-12 px-8 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full justify-center border-b border-outline-variant/20 pb-8">
            {['Terms', 'Privacy', 'Global Growth', 'Investor Relations'].map(link => (
              <a key={link} href="#" className="font-display text-sm text-zinc-600 hover:text-amber-500 transition-colors whitespace-nowrap">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-display text-sm text-zinc-600">© Lorven Enterprise Strategy</span>
            <div className="w-4 h-4 opacity-10 hover:opacity-100 transition-opacity flex items-center justify-center cursor-default">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
