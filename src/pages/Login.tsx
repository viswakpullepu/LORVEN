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
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants';
import { signInWithGoogle, signInWithMembership } from '../lib/supabase';

type LoginMode = 'client' | 'staff';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<LoginMode>('client');
  const [credentials, setCredentials] = useState({ membership: '', password: '' });
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await (await import('../lib/supabase')).getSupabase().auth.getUser();
      if (user) {
        navigate('/portal');
      }
    };
    checkUser();
  }, [navigate]);

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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // Redirect happens automatically in signInWithGoogle
    } catch (err: any) {
      setError('Google Sign-In failed. Please try again.');
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
          <div className="flex bg-black/50 p-1 rounded-xl border border-white/5 relative z-10">
            <button 
              onClick={() => setMode('client')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${mode === 'client' ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <User className="w-3.5 h-3.5" />
              Client
            </button>
            <button 
              onClick={() => setMode('staff')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${mode === 'staff' ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'client' ? (
              <motion.div 
                key="client"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 md:gap-8 py-2 md:py-4"
              >
                <div className="text-center flex flex-col gap-3">
                  <h1 className="font-display text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight">Client Portal</h1>
                  <p className="text-zinc-500 font-display text-[9px] uppercase tracking-[0.3em] opacity-80 leading-relaxed">Authorized access to strategic repository</p>
                </div>

                <button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-4 bg-white text-zinc-900 font-display font-black text-[11px] uppercase tracking-widest py-4 md:py-5 px-6 rounded-sm transition-all hover:bg-zinc-100 active:scale-95 disabled:opacity-50 group shadow-xl"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                     <path d="M5.84 14.09c-.22-.66-.35-1.43-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Login with Google
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-700 font-black italic">End-to-End Secure</span>
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
                  <h1 className="font-display text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight">Staff Terminal</h1>
                  <p className="text-zinc-500 font-display text-[9px] uppercase tracking-[0.3em] opacity-80 leading-relaxed">Intelligence Operation Control Unit</p>
                </div>

                <form onSubmit={handleStaffLogin} className="flex flex-col gap-5 md:gap-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs p-4 rounded text-center tracking-wide"
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-display text-zinc-600 text-[9px] tracking-[0.3em] uppercase ml-1">Membership String</label>
                    <div className="relative group/input">
                      <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                      <input 
                        className="w-full bg-black/40 text-white font-display text-sm pl-12 pr-4 py-4 md:py-5 border border-white/5 rounded-sm transition-all focus:border-amber-500/30 focus:bg-black/60 focus:outline-none placeholder:text-zinc-800" 
                        placeholder="LX-000-XXX" 
                        type="text" 
                        value={credentials.membership}
                        onChange={(e) => setCredentials(prev => ({ ...prev, membership: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-display text-zinc-600 text-[9px] tracking-[0.3em] uppercase ml-1">Universal Key</label>
                    <div className="relative group/input">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                      <input 
                        className="w-full bg-black/40 text-white font-display text-sm pl-12 pr-4 py-4 md:py-5 border border-white/5 rounded-sm transition-all focus:border-amber-500/30 focus:bg-black/60 focus:outline-none placeholder:text-zinc-800" 
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
                    className="mt-2 bg-amber-500 text-black font-display font-black text-[11px] uppercase tracking-[0.2em] py-4 md:py-5 px-6 w-full rounded-sm hover:bg-white transition-all shadow-[0_10px_30px_rgba(245,158,11,0.15)] flex justify-center items-center gap-3 group active:scale-95 disabled:opacity-50"
                    type="submit"
                  >
                    {loading ? 'Validating...' : 'Engage Uplink'}
                    {!loading && <LogIn className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-2 border-t border-white/5 pt-4">
            <p className="font-body-md text-on-surface-variant text-[10px] uppercase tracking-widest opacity-40">
              Authorized access only • v4.2
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
