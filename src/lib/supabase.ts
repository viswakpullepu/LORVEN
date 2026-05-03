import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * DATABASE SETUP INSTRUCTIONS (SUPABASE SQL EDITOR):
 * 
 * -- 1. Create Profiles Table
 * CREATE TABLE profiles (
 *   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 *   email TEXT,
 *   membership_number TEXT UNIQUE, -- Added for staff login
 *   role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 2. Set Up Handle New User Trigger
 * -- (Keep this as is or modify to auto-assign membership numbers if needed)
 * 
 * -- 3. Enable RLS
 * ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
 * 
 * -- 4. RLS Policies
 * CREATE POLICY "Users can view own profile" 
 *   ON profiles FOR SELECT 
 *   USING (auth.uid() = id);
 * 
 * -- ALLOW LOOKUP BY MEMBERSHIP (Required for Staff Login)
 * -- This allows the login function to find your email by your membership ID
 * CREATE POLICY "Allow membership lookup"
 *   ON profiles FOR SELECT
 *   USING (true); 
 * 
 * -- Admins can view all profiles
 * CREATE POLICY "Admins can view all profiles" 
 *   ON profiles FOR ALL 
 *   USING (
 *     EXISTS (
 *       SELECT 1 FROM profiles 
 *       WHERE id = auth.uid() AND role = 'admin'
 *     )
 *   );
 */

export type UserRole = 'admin' | 'client';

export interface Profile {
  id: string;
  email: string | null;
  membership_number?: string | null;
  role: UserRole;
  created_at: string;
}

let supabaseInstance: SupabaseClient | null = null;

// Safe environment variable logging and validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Configuration Check:', {
  url: supabaseUrl ? 'Configured' : 'Missing',
  key: supabaseAnonKey ? 'Configured' : 'Missing'
});

if (import.meta.env.DEV) {
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey);
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  if (!isSupabaseConfigured) {
    const errorMsg = 'Supabase credentials are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the Settings menu.';
    console.error(errorMsg);
    
    if (import.meta.env.DEV) {
      throw new Error(errorMsg);
    }
    
    // In production, we return a dummy client or handle via isSupabaseConfigured check in UI
    // To prevent total crash, we'll return a proxy that logs errors on every call if someone ignores isSupabaseConfigured
    return new Proxy({} as SupabaseClient, {
      get: () => {
        console.error('Attempted to use Supabase without configuration.');
        return () => Promise.reject(new Error('Supabase not configured'));
      }
    });
  }

  supabaseInstance = createClient(supabaseUrl!, supabaseAnonKey!);
  return supabaseInstance;
}

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signInWithMembership = async (membershipNumber: string, password: string) => {
  const supabase = getSupabase();
  
  // 1. First find the email associated with this membership number
  // We search for the profile that has this unique membership string
  const { data: profileData, error: lookupError } = await supabase
    .from('profiles')
    .select('email')
    .eq('membership_number', membershipNumber)
    .single();

  if (lookupError || !profileData || !profileData.email) {
    console.error('Membership lookup failed:', lookupError);
    throw new Error('Invalid Membership Number');
  }

  // 2. Perform standard Supabase Auth login using the found email
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: profileData.email,
    password: password
  });

  if (authError) throw authError;
  return authData;
};

export const updatePassword = async (newPassword: string) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
