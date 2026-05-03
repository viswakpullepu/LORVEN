import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../components/Logo';
import { 
  BadgeCheck, 
  Key, 
  ArrowRight,
  User,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import { signInWithEmail, signInWithMembership } from '../lib/supabase';
import { useAuth } from '../components/AuthContext';

type LoginMode = 'client' | 'staff';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<LoginMode>('client');
  const [credentials, setCredentials] = useState({ membership: '', password: '' });
  const [clientCredentials, setClientCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState(location.state?.registered ? 'Account initialized successfully. Engage your portal below.' : '');

  const { profile, loading: authLoading } = (window as any)._authContext || {}; // We'll use useAuth inside the component

  const { user, profile: authProfile, loading: authContextLoading } = useAuth();

  React.useEffect(() => {
    if (!authContextLoading && user) {
      // If profile is still null but user is authenticated, we assume client role for now
      // This prevents getting stuck on the login page
      if (authProfile?.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/portal');
      }
    }
  }, [user, authProfile, authContextLoading, navigate]);

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithMembership(credentials.membership, credentials.password);
      navigate('/portal');
    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmail(clientCredentials.email, clientCredentials.password);
      navigate('/portal');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${IMAGES.LOGIN_BG})` }}
      >
        <div className="absolute inset-0 bg-background/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>

      <main className="relative z-10 w-full max-w-[440px] px-6 py-6 md:py-8 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col gap-6 md:gap-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-2"
          >
            <Logo size={50} />
          </motion.div>

          {/* Mode Switcher */}
          <div className="flex bg-surface-container p-1 rounded-xl border border-white/5 relative z-10">
            <button 
              onClick={() => setMode('client')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 ${mode === 'client' ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-on-surface-variant hover:text-white'}`}
            >
              <User className="w-3.5 h-3.5" />
              Client
            </button>
            <button 
              onClick={() => setMode('staff')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 ${mode === 'staff' ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-on-surface-variant hover:text-white'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff
            </button>
          </div>

          <AnimatePresence mode="wait">
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] p-4 rounded-xl text-center tracking-widest font-black uppercase"
              >
                {successMsg}
              </motion.div>
            )}

            {mode === 'client' ? (
              <motion.div 
                key="client"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 md:gap-8"
              >
                <div className="text-center flex flex-col gap-3">
                  <h1 className="font-display text-2xl md:text-3xl font-normal text-white tracking-tight">Client Portal</h1>
                  <p className="text-on-surface-variant font-sans text-[10px] uppercase tracking-[0.3em] font-light leading-relaxed">Authorized access to strategic repository</p>
                </div>

                <form onSubmit={handleClientLogin} className="flex flex-col gap-5 md:gap-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs p-4 rounded-sm text-center tracking-wide"
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-on-surface-variant text-[10px] tracking-[0.2em] uppercase ml-1">Email Address</label>
                    <div className="relative group/input">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                      <input 
                        className="w-full bg-surface-container-low text-white font-sans text-sm pl-12 pr-4 py-4 md:py-5 border border-white/5 rounded-sm transition-all focus:border-primary/50 focus:bg-surface-container focus:outline-none placeholder:text-on-surface-variant/50" 
                        placeholder="client@example.com" 
                        type="email" 
                        value={clientCredentials.email}
                        onChange={(e) => setClientCredentials(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-on-surface-variant text-[10px] tracking-[0.2em] uppercase ml-1">Password</label>
                    <div className="relative group/input">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                      <input 
                        className="w-full bg-surface-container-low text-white font-sans text-sm pl-12 pr-4 py-4 md:py-5 border border-white/5 rounded-sm transition-all focus:border-primary/50 focus:bg-surface-container focus:outline-none placeholder:text-on-surface-variant/50" 
                        placeholder="••••••••••••" 
                        type="password"
                        value={clientCredentials.password}
                        onChange={(e) => setClientCredentials(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="mt-2 bg-primary text-on-primary font-sans font-semibold text-[11px] uppercase tracking-[0.2em] py-4 md:py-5 px-6 w-full rounded-sm hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex justify-center items-center gap-3 group active:scale-95 disabled:opacity-50"
                    type="submit"
                  >
                    {loading ? 'Authenticating...' : 'Secure Login'}
                    {!loading && <LogIn className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />}
                  </button>
                </form>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[9px] uppercase tracking-[0.4em] text-on-surface-variant/50 font-sans font-light">End-to-End Secure</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="staff"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 md:gap-8"
              >
                <div className="text-center flex flex-col gap-3">
                  <h1 className="font-display text-2xl md:text-3xl font-normal text-white tracking-tight">Staff Terminal</h1>
                  <p className="text-on-surface-variant font-sans text-[9px] uppercase tracking-[0.3em] font-light leading-relaxed">Intelligence Operation Control Unit</p>
                </div>

                <form onSubmit={handleStaffLogin} className="flex flex-col gap-5 md:gap-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs p-4 rounded-sm text-center tracking-wide"
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Membership String</label>
                    <div className="relative group/input">
                      <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                      <input 
                        className="w-full bg-surface-container-low text-white font-sans text-sm pl-12 pr-4 py-4 md:py-5 border border-white/5 rounded-sm transition-all focus:border-primary/30 focus:bg-surface-container focus:outline-none placeholder:text-on-surface-variant/50" 
                        placeholder="LX-000-XXX" 
                        type="text" 
                        value={credentials.membership}
                        onChange={(e) => setCredentials(prev => ({ ...prev, membership: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-on-surface-variant text-[9px] tracking-[0.3em] uppercase ml-1">Universal Key</label>
                    <div className="relative group/input">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors w-4 h-4" />
                      <input 
                        className="w-full bg-surface-container-low text-white font-sans text-sm pl-12 pr-4 py-4 md:py-5 border border-white/5 rounded-sm transition-all focus:border-primary/30 focus:bg-surface-container focus:outline-none placeholder:text-on-surface-variant/50" 
                        placeholder="••••••••••••" 
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="mt-2 bg-primary text-on-primary font-sans font-semibold text-[11px] uppercase tracking-[0.2em] py-4 md:py-5 px-6 w-full rounded-sm hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex justify-center items-center gap-3 group active:scale-95 disabled:opacity-50"
                    type="submit"
                  >
                    {loading ? 'Validating...' : 'Engage Uplink'}
                    {!loading && <LogIn className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-2 border-t border-white/5 pt-4 flex flex-col gap-3">
            <p className="font-sans font-light text-on-surface-variant text-[9px] uppercase tracking-widest opacity-40">
              Authorized access only • v4.2
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:support@lorven.institutional" className="font-sans text-[9px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-white transition-colors font-semibold">Contact Support</a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
