import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

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

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8 p-12 bg-white/5 border border-white/10 rounded-lg backdrop-blur-xl">
          <div className="space-y-4">
            <h1 className="font-display text-2xl text-white tracking-tight">Configuration Required</h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Connectivity credentials for the neural uplink are missing. 
              Please verify <code className="bg-white/5 px-2 py-1 rounded text-amber-500">VITE_SUPABASE_URL</code> and <code className="bg-white/5 px-2 py-1 rounded text-amber-500">VITE_SUPABASE_ANON_KEY</code> in your environment parameters.
            </p>
          </div>
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 text-[10px] uppercase tracking-widest font-black">
              System Inactive
            </div>
          </div>
        </div>
      </div>
    );
  }

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await getSupabase()
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // PGRST116 is single() not found. 
        // JSON object requested message can occur in some versions of PostgREST
        if (error.code === 'PGRST116' || error.message?.includes('JSON object requested')) {
          // Profile doesn't exist, try to create it
          const { data: { user: userData } } = await getSupabase().auth.getUser();
          if (userData) {
            console.log('Attempting to create missing profile for:', userData.email);
            const { data: newProfile, error: createError } = await getSupabase()
              .from('profiles')
              .insert([
                { 
                  id: userData.id, 
                  email: userData.email,
                  role: 'client' 
                }
              ])
              .select()
              .single();
            
            if (createError) {
              console.error('Failed to create profile (may be RLS):', createError);
              // Fallback: return a mock profile object so the app doesn't block them 
              // strictly for the UI's purpose.
              return { id: userData.id, email: userData.email, role: 'client', created_at: new Date().toISOString() };
            }
            return newProfile;
          }
        }
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Profile fetch catch:', err);
      return null;
    }
  };

  useEffect(() => {
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
    await getSupabase().auth.signOut();
    setUser(null);
    setProfile(null);
  };

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
