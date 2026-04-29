import React, { useState } from 'react';
/*
  SQL SETUP PRE-REQUISITE:
  If you encounter table or policy existence errors, run this in your Supabase SQL Editor:
  
  -- Create the table if it doesn't exist
  CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    company TEXT NOT NULL,
    region TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Enable RLS
  ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

  -- Drop existing policy if needed and recreate
  DROP POLICY IF EXISTS "Enable insert for all" ON consultation_requests;
  CREATE POLICY "Enable insert for all" ON consultation_requests FOR INSERT WITH CHECK (true);
*/
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Building, Globe, ArrowRight, CheckCircle2, Phone, Key } from 'lucide-react';
import Logo from '../components/Logo';
import { getSupabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    region: 'Maharashtra',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // 1. Sign up the user in Supabase Auth
      // Note: In a real app, you'd collect a password too.
      // For this implementation, we'll assume the user uses Google Login or we add a password field.
      // Since it's a request for "Signup", I'll add a password field to the form or use a default one for demo.
      // To keep it robust, I'll add a password field to the UI first.
      
      const password = (e.target as any).password.value;
      
      const { data: authData, error: authError } = await getSupabase().auth.signUp({
        email: formData.email,
        password: password,
        options: {
          data: {
            full_name: formData.name,
            company: formData.company,
            region: formData.region,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Insert into profiles (the trigger should handle this, but we'll do it as fallback)
        await getSupabase()
          .from('profiles')
          .upsert([
            { 
              id: authData.user.id, 
              email: authData.user.email,
              role: 'client' 
            }
          ]);
        
        // We also still insert into consultation_requests for lead tracking
        await getSupabase()
          .from('consultation_requests')
          .insert([
            { ...formData, created_at: new Date().toISOString() }
          ]);
          
        // Auto-login or redirect to login
        navigate('/login', { state: { registered: true } });
      }

    } catch (err: any) {
      console.error('Supabase Error:', err);
      setError(err.message || 'An error occurred during indexing. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900 border border-white/10 p-12 rounded-2xl shadow-2xl max-w-lg flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-on-surface uppercase tracking-tighter">Request Received</h1>
          <p className="text-on-surface-variant text-lg">
            Your consultation request has been initialized. A Lorven strategist will contact you shortly to authorize your pipeline credentials.
          </p>
          <Link to="/" className="mt-4 bg-primary text-on-primary px-8 py-3 rounded font-label-caps tracking-widest hover:bg-primary-container transition-colors">
            Return to Terminal
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-zinc-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex z-10">
        
        {/* Left side - Branding (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center border-r border-white/5 bg-zinc-900/10 backdrop-blur-sm p-12"
        >
          <div className="max-w-md flex flex-col gap-10">
            <Logo size={100} />
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                Exclusive Strategic<br /> Partnership.
              </h2>
              <p className="text-zinc-500 font-display text-sm md:text-lg leading-relaxed max-w-sm">
                Registering for a Lorven consultation is the primary vector for institutional transformation.
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-4">
              {[
                "Algorithmic Advantage Identification",
                "Dynamic Risk Architecture",
                "Global Performance Networks",
                "Real-time Strategic Telemetry"
              ].map((feature, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 + (i * 0.1) }}
                   className="flex items-center gap-4 text-zinc-400 font-display text-[10px] uppercase tracking-[0.3em]"
                >
                  <div className="w-2 h-px bg-amber-500" />
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
              <h1 className="font-display text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Initialization.</h1>
              <p className="text-zinc-500 font-display text-[10px] uppercase tracking-[0.4em]">Establish your enterprise profile.</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] p-4 rounded text-center font-display uppercase tracking-wider"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-7 text-left">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col gap-2.5">
                <label className="font-display text-zinc-600 text-[9px] tracking-[0.4em] uppercase ml-1">Principal Name</label>
                <div className="relative group/input">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="text" 
                    required
                    placeholder="Principal Identifier"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-zinc-800 focus:border-amber-500/30 focus:outline-none transition-all font-display text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-2.5">
                <label className="font-display text-zinc-600 text-[9px] tracking-[0.4em] uppercase ml-1">Strategic Email</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@enterprise.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-zinc-800 focus:border-amber-500/30 focus:outline-none transition-all font-display text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col gap-2.5">
                <label className="font-display text-zinc-600 text-[9px] tracking-[0.4em] uppercase ml-1">Direct Line</label>
                <div className="relative group/input">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 00000 00000"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-zinc-800 focus:border-amber-500/30 focus:outline-none transition-all font-display text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex flex-col gap-2.5">
                <label className="font-display text-zinc-600 text-[9px] tracking-[0.4em] uppercase ml-1">Terminal Password</label>
                <div className="relative group/input">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-zinc-900 border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-zinc-800 focus:border-amber-500/30 focus:outline-none transition-all font-display text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col gap-2.5">
                <label className="font-display text-zinc-600 text-[9px] tracking-[0.4em] uppercase ml-1">Enterprise Unit</label>
                <div className="relative group/input">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="text" 
                    required
                    placeholder="Company Entity"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white placeholder:text-zinc-800 focus:border-amber-500/30 focus:outline-none transition-all font-display text-sm tracking-tight"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col gap-2.5">
                <label className="font-display text-zinc-600 text-[9px] tracking-[0.4em] uppercase ml-1">Operational Region</label>
                <div className="relative group/input">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <select 
                    className="w-full bg-zinc-900 border border-white/5 rounded-sm px-12 py-4 md:py-5 text-white focus:border-amber-500/30 focus:outline-none transition-all appearance-none font-display text-sm tracking-tight"
                    value={formData.region}
                    onChange={e => setFormData({...formData, region: e.target.value})}
                  >
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                    <option>Delhi NCR</option>
                    <option>Tamil Nadu</option>
                    <option>Gujarat</option>
                    <option>Telangana</option>
                    <option>West Bengal</option>
                    <option>Uttar Pradesh</option>
                    <option>Others (India)</option>
                  </select>
                </div>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="mt-6 bg-amber-500 text-black font-display font-black text-[11px] uppercase tracking-[0.3em] py-5 rounded-sm shadow-[0_20px_50px_rgba(245,158,11,0.15)] hover:bg-white transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    Initialize Pipeline
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="text-center">
               <p className="text-[9px] font-display text-zinc-600 uppercase tracking-[0.4em] leading-relaxed">
                 Authorized by Lorven security protocols. <br className="md:hidden" />
                 Already secured? <Link to="/login" className="text-amber-500 hover:text-white transition-colors italic font-black">Engage Portal</Link>
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
