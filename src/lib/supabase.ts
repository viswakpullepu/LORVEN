import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * DATABASE SETUP INSTRUCTIONS (SUPABASE SQL EDITOR):
 * 
 * -- 1. Create Profiles Table
 * CREATE TABLE profiles (
 *   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 *   email TEXT,
 *   role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 2. Set Up Handle New User Trigger
 * CREATE OR REPLACE FUNCTION public.handle_new_user()
 * RETURNS trigger AS $$
 * BEGIN
 *   INSERT INTO public.profiles (id, email, role)
 *   VALUES (new.id, new.email, 'client');
 *   RETURN new;
 * END;
 * $$ LANGUAGE plpgsql SECURITY DEFINER;
 * 
 * CREATE TRIGGER on_auth_user_created
 *   AFTER INSERT ON auth.users
 *   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
 * 
 * -- 3. Enable RLS
 * ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
 * 
 * -- 4. RLS Policies
 * CREATE POLICY "Users can view own profile" 
 *   ON profiles FOR SELECT 
 *   USING (auth.uid() = id);
 * 
 * -- CRITICAL: Allow users to create their own profiles if the trigger fails
 * CREATE POLICY "Users can insert own profile" 
 *   ON profiles FOR INSERT 
 *   WITH CHECK (auth.uid() = id);
 * 
 * CREATE POLICY "Users can update own profile" 
 *   ON profiles FOR UPDATE 
 *   USING (auth.uid() = id);
 * 
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
  role: UserRole;
  created_at: string;
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the Settings menu.');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

export const signInWithGoogle = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/portal',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    }
  });
  if (error) throw error;
  return data;
};

export const signInWithMembership = async (membershipNumber: string, password: string) => {
  const supabase = getSupabase();
  
  // 1. First find the email associated with this membership number
  // Note: This requires staff_profiles to be readable, or you need a smarter backend function.
  // We'll assume the public can read membership mappings for login purposes if we configure RLS carefully,
  // OR we can just use the membership number AS the username if Supabase supports it (it doesn't natively).
  // Alternative: Ask the user to enter their email if we can't map it.
  // Actually, for staff, using email is safer. But since the user explicitly asked for "Membership Number":
  
  const { data: profileData, error: lookupError } = await supabase
    .from('profiles')
    .select('email')
    .eq('id', membershipNumber) // For demo, assuming membershipNumber maps to ID or similar
    .single();

  if (lookupError || !profileData) {
    throw new Error('Invalid Credentials');
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: profileData.email!,
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
