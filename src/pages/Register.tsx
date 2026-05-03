import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { User, Mail, Building, Globe, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import Logo from '../components/Logo';
import { getSupabase } from '../lib/supabase';

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    region: 'North America',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Just record the inquiry, admin will add client manually to Auth
      await getSupabase()
        .from('consultation_requests')
        .insert([
          { ...formData, created_at: new Date().toISOString() }
        ]);
        
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission Error:', err);
      setError(err.message || 'An error occurred submitting your inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface-container border border-white/5 p-12 rounded-sm shadow-2xl max-w-lg flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-normal text-white font-display">Inquiry Received</h1>
          <p className="text-on-surface-variant text-lg font-light">
            Your consultation request has been securely logged. An advisory partner will contact you shortly to arrange a private consultation.
          </p>
          <Link to="/" className="mt-4 bg-primary text-on-primary px-8 py-3 rounded-sm font-sans uppercase text-xs tracking-widest font-semibold hover:bg-white transition-colors">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex z-10">
        
        {/* Left side - Branding (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center border-r border-white/5 bg-surface-container-lowest/50 backdrop-blur-sm p-12"
        >
          <div className="max-w-md flex flex-col gap-10">
            <Logo size={80} />
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-5xl font-normal text-white leading-tight">
                Exclusive <span className="italic text-primary">Partnership.</span>
              </h2>
              <p className="text-on-surface-variant font-sans text-sm md:text-base font-light leading-relaxed max-w-sm">
                Request a private consultation to explore bespoke wealth management and institutional strategy.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-4">
              {[
                "Bespoke Wealth Architecture",
                "Private Market Access",
                "Generational Legacy Planning"
              ].map((feature, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 + (i * 0.1) }}
                   className="flex items-center gap-4 text-on-surface-variant font-sans text-[10px] uppercase tracking-[0.3em]"
                >
                  <div className="w-4 h-px bg-primary" />
                  {feature}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right side - Form (Full width on mobile) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 lg:p-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm flex flex-col gap-10 md:gap-12"
          >
            <div className="lg:hidden flex flex-col items-center gap-6">
               <Logo size={60} />
               <div className="h-px w-12 bg-white/10" />
            </div>
            
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h1 className="font-display text-3xl md:text-4xl font-normal text-white tracking-tight leading-none">Inquire.</h1>
              <p className="text-on-surface-variant font-sans text-[10px] uppercase tracking-[0.4em] font-light">Request a private consultation.</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] p-4 rounded-sm text-center font-sans uppercase tracking-wider"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-7 text-left">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col gap-2.5">
                <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Full Name</label>
                <div className="relative group/input">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface-container-low border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:bg-surface-container focus:outline-none transition-all font-sans text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-2.5">
                <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Email Address</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-surface-container-low border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:bg-surface-container focus:outline-none transition-all font-sans text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col gap-2.5">
                <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Direct Line</label>
                <div className="relative group/input">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                  <input 
                    type="tel" 
                    required
                    placeholder="+1 000 000 0000"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-surface-container-low border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:bg-surface-container focus:outline-none transition-all font-sans text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col gap-2.5">
                <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Organization</label>
                <div className="relative group/input">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                  <input 
                    type="text" 
                    required
                    placeholder="Company or Family Office"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-surface-container-low border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:bg-surface-container focus:outline-none transition-all font-sans text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col gap-2.5">
                <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Region</label>
                <div className="relative group/input">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                  <select 
                    className="w-full bg-surface-container-low border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white focus:border-primary/50 focus:bg-surface-container focus:outline-none transition-all appearance-none font-sans text-sm tracking-tight"
                    value={formData.region}
                    onChange={e => setFormData({...formData, region: e.target.value})}
                  >
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Middle East</option>
                    <option>Asia Pacific</option>
                    <option>Latin America</option>
                  </select>
                </div>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="mt-6 bg-primary text-on-primary font-sans font-semibold text-[11px] uppercase tracking-[0.3em] py-5 rounded-sm shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:bg-white transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                ) : (
                  <>
                    Submit Request
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-center">
               <p className="text-[9px] font-sans text-on-surface-variant/50 uppercase tracking-[0.4em] leading-relaxed">
                 Lorven Private Wealth. <br className="md:hidden" />
                 Already a client? <Link to="/login" className="text-primary hover:text-white transition-colors font-semibold">Client Login</Link>
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
