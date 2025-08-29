// hooks/useUser.ts
'use client'; // This hook is intended for Client Components

import { useState, useEffect } from 'react';
import { fetchProfile } from '@/app/(appPages)/account/actions';

interface User {
  id: string;
  full_name: string;
  email: string;
  emailverified: boolean;
  pwhash: string;
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
  loading: boolean;
}

const currentUser = {
  id: 'c17f9dd9-dbe3-4496-856a-1de66321c676',
  full_name: 'Cornelus P Koopman',
  email: 'peter@scribbledesign.co.nz',
  emailverified: true,
  pwhash: 'password',
  avatar_url: 'avatar.jpg',
  phone: '021 247 3480',
  address: '23a Gledstane Rd, Stanmore Bay',
  city: 'Auckland',
  country: 'NZ',
  tax_no: '40-986-464',
  withholding_tax: false,
  gst_registered: true,
  created_at: '2025-08-21 00:16:59.086014+00',
  updated_at: '2025-08-21 00:16:59.086014+00',
};

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (currentUser: User | null) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        try {
          const user = await fetchProfile(currentUser.id);
          setUser(user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }

      setLoading(false);
    };

    // TODO: Initial fetch
    fetchUser(currentUser);

    // TODO: Listen for Auth state changes
  }, []); // Re-run if supabase client instance changes (unlikely for a singleton client)

  return { user, loading };
}
