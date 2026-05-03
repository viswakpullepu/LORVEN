import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../components/Logo';
import { ArrowRight, ChevronRight, Share2, Shield, TrendingUp, Network, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <span className="text-xl md:text-2xl font-normal text-primary tracking-widest uppercase font-display">Lorven</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Expertise', 'Wealth', 'Insights', 'Advisory', 'Global'].map((item) => (
              <a key={item} href="#capabilities" className="font-sans text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all duration-300">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden sm:block font-sans text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
              Client Portal
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/register" className="hidden sm:block">
              <button className="bg-primary text-on-primary px-8 py-2.5 font-sans text-[11px] uppercase tracking-widest font-semibold hover:bg-white transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(212,175,55,0.15)] rounded-sm">
                Inquire
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
              className="md:hidden bg-surface border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {['Expertise', 'Wealth', 'Insights', 'Advisory', 'Global'].map((item) => (
                  <a 
                    key={item} 
                    href="#capabilities" 
                    onClick={() => setIsMenuOpen(false)}
                    className="font-sans text-xs uppercase tracking-[0.3em] text-on-surface-variant py-2"
                  >
                    {item}
                  </a>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <Link to="/login" className="font-sans text-xs uppercase tracking-[0.3em] text-primary py-2">Client Portal</Link>
                <Link to="/register" className="bg-primary text-on-primary p-4 text-center font-sans text-xs uppercase tracking-[0.3em] font-semibold mt-2 rounded-sm">
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6 md:px-10 py-16 md:py-20">
          <div className="absolute inset-0 z-0">
            <img src={IMAGES.HERO_BG} className="w-full h-full object-cover opacity-20 mix-blend-luminosity" alt="Background" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 items-center max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-primary">Private Wealth Advisory</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.1] text-white">
                Mastering the Art of <br />
                <span className="text-primary italic">Strategic Wealth.</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                Providing exclusive advisory and sophisticated asset management for a discerning global clientele. Experience unparalleled growth and preservation.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-8">
                <Link to="/register">
                  <button className="w-full sm:w-auto bg-primary text-on-primary px-8 sm:px-12 py-4 sm:py-5 rounded-sm font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
                    Begin Journey
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capability Architecture */}
        <section id="capabilities" className="py-24 md:py-40 px-6 md:px-10 bg-surface-container-lowest relative border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 items-center text-center max-w-3xl mx-auto"
            >
              <p className="text-primary font-sans text-[10px] md:text-xs uppercase tracking-[0.4em]">Our Expertise</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-normal text-white leading-tight">
                Architects of <span className="italic text-primary">Enduring Legacy</span>
              </h2>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Feature Card 1 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="bg-surface-container-low border border-white/5 p-10 md:p-12 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 rounded-sm"
              >
                <div className="flex flex-col h-full gap-8">
                  <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl text-white">Asset Protection</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                      Bespoke structures designed to safeguard your wealth across generations and jurisdictions, ensuring absolute peace of mind.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="bg-surface-container-low border border-white/5 p-10 md:p-12 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 rounded-sm"
              >
                <div className="absolute inset-0 z-0">
                   <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
                </div>
                <div className="relative z-10 flex flex-col h-full gap-8">
                  <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl text-white">Strategic Growth</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                      Curated investment portfolios leveraging proprietary global insights to deliver exceptional, risk-adjusted returns over time.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="bg-surface-container-low border border-white/5 p-10 md:p-12 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 rounded-sm"
              >
                <div className="flex flex-col h-full gap-8">
                  <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    <Network className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl text-white">Global Network</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                      Unprecedented access to an elite ecosystem of private opportunities, co-investments, and global market leaders.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 md:py-40 px-6 md:px-10 bg-background relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0 flex justify-center items-center">
             <div className="w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-6 items-center"
            >
              <Logo size={48} className="text-primary mb-6" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-white leading-tight">
                An Invitation to <br />
                <span className="italic text-primary">Excellence.</span>
              </h2>
              <p className="text-on-surface-variant text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed mt-4">
                Join a select group of visionaries. Discover what it means to have a true partner in wealth generation and preservation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
               <Link to="/register">
                 <button className="w-full sm:w-auto group relative px-8 sm:px-12 md:px-16 py-4 sm:py-5 bg-primary text-on-primary font-sans font-semibold uppercase tracking-[0.2em] text-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] rounded-sm">
                   <span className="relative z-10">Request Consultation</span>
                 </button>
               </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-surface-container-lowest">
        <div className="flex flex-col items-center py-16 px-8 max-w-7xl mx-auto gap-10">
          <Logo size={32} className="text-primary/50" />
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full justify-center">
            {['Terms of Service', 'Privacy Policy', 'Legal Disclaimer', 'Contact Us'].map(link => (
              <a key={link} href="#" className="font-sans text-xs uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors whitespace-nowrap">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between w-full pt-8 border-t border-white/5">
            <span className="font-sans text-xs text-on-surface-variant/40">© {new Date().getFullYear()} Lorven. All rights reserved.</span>
            <div className="w-2 h-2 rounded-full bg-primary/20" />
          </div>
        </div>
      </footer>
    </div>
  );
}
