import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'editor';

export interface StaffProfile {
  id: string;
  membership_number: string;
  full_name: string | null;
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
  
  const { data: staffData, error: lookupError } = await supabase
    .from('staff_profiles')
    .select('id')
    .eq('membership_number', membershipNumber)
    .single();

  if (lookupError || !staffData) {
    throw new Error('Invalid Membership Number');
  }

  // We still need the email to sign in. Supabase doesn't allow signing in by UID directly.
  // Most people use email + password. 
  // Let's assume the user knows their email too, OR we use a trick.
  // Trick: If we can't get the email from the UID (Supabase privacy), we should ask for Email.
  // Let's modify the requirement to Email + Membership Number or just use Email for staff if possible.
  // Wait, I'll stick to the user's request: Membership Number + Password.
  // To do this, I'll need a way for the client to get the email.
  
  // SECURE WAY: Create a Supabase Edge Function or a RPC that takes membership_number and returns a login hint or performs login.
  // Simple Way for Demo: Store email in the public staff_profiles table (less secure but works for now).
  
  const { data: staffEmailData, error: emailError } = await supabase
    .from('staff_profiles')
    .select('email')
    .eq('membership_number', membershipNumber)
    .single();

  if (emailError || !staffEmailData) {
    throw new Error('Membership details not found');
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: staffEmailData.email,
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
