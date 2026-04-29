import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { TriangleAlert } from 'lucide-react';

export type UserRole = 'admin' | 'client';

interface Profile {
  id: string;
  email: string | null;
  role: UserRole;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await getSupabase()
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // PGRST116 is single() not found. 
        if (error.code === 'PGRST116' || error.message?.includes('JSON object requested')) {
          const { data: { user: userData } } = await getSupabase().auth.getUser();
          if (userData) {
            const { data: newProfile, error: createError } = await getSupabase()
              .from('profiles')
              .insert([{ id: userData.id, email: userData.email, role: 'client' }])
              .select()
              .single();
            
            if (createError) {
              return { id: userData.id, email: userData.email, role: 'client', created_at: new Date().toISOString() };
            }
            return newProfile;
          }
        }
        return null;
      }
      return data;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      const { data: { session } } = await getSupabase().auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      }
      
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = getSupabase().auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await getSupabase().auth.signOut();
    setUser(null);
    setProfile(null);
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 text-center overflow-hidden font-sans">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-md w-full flex flex-col items-center gap-8 relative z-10">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <TriangleAlert className="w-10 h-10" />
          </div>
          
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-4xl font-black text-white uppercase italic tracking-tighter">Engine Error.</h1>
            <p className="text-zinc-500 font-display text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-[280px]">
              Required environmental vectors are missing from the current deployment instance.
            </p>
          </div>

          <div className="w-full p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] flex flex-col gap-6 text-left">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-black italic">
              <span>Missing_Credentials:</span>
              <span className="text-red-500/60">REQUIRED_INITIALIZATION</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors" />
                <code className="font-mono text-[10px] text-zinc-400 group-hover:text-white transition-colors">VITE_SUPABASE_URL</code>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors" />
                <code className="font-mono text-[10px] text-zinc-400 group-hover:text-white transition-colors">VITE_SUPABASE_ANON_KEY</code>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5">
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest leading-relaxed">
                Add these to your Vercel/environment dashboard to activate the Lorven Core.
              </p>
            </div>
          </div>

          <p className="text-zinc-800 text-[9px] uppercase tracking-[0.5em] font-black italic">
            "Absolute execution requires valid telemetry."
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
