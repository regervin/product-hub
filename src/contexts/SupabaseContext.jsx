import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Get environment variables with validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
  console.error('Missing VITE_SUPABASE_URL environment variable. Please set it in your .env file.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please set it in your .env file.');
}

// Create client only if we have valid credentials
const supabase = (supabaseUrl && supabaseUrl !== 'your_supabase_url' && 
                 supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key') 
                 ? createClient(supabaseUrl, supabaseAnonKey)
                 : null;

const SupabaseContext = createContext();

export function SupabaseProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase client could not be initialized. Please check your environment variables.');
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    }).catch(err => {
      console.error('Error getting session:', err);
      setError('Failed to connect to Supabase. Please check your credentials.');
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const value = {
    session,
    user: session?.user || null,
    supabase,
    loading,
    error,
    signIn: (email, password) => supabase?.auth.signInWithPassword({ email, password }),
    signUp: (email, password) => supabase?.auth.signUp({ email, password }),
    signOut: () => supabase?.auth.signOut(),
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
