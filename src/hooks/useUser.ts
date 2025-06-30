// hooks/useUser.ts
'use client'; // This hook is intended for Client Components

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client'; // Adjust path as needed

interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  tax_no: string;
  withholding_tax: boolean;
  gst_registered: boolean;
  created_at: string;
  updated_at: string;
}

export interface UseUserResult {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async (currentUser: User | null) => {
      setLoading(true);
      setUser(currentUser);
      setProfile(null);

      if (currentUser) {
        const { data: profileData, error: profileError } = await supabase
          .from('userprofile')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError.message);
        } else if (profileData) {
          setProfile(profileData as UserProfile);
        }
      }

      setLoading(false);
    };

    // Initial fetch
    supabase.auth.getUser().then(({ data: { user } }) => {
      fetchUser(user);
    });

    // Listen for Auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]); // Re-run if supabase client instance changes (unlikely for a singleton client)

  return { user, profile, loading };
}
