'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import Link from 'next/link';
import { fetchSkills } from './actions';
import UserAccountForm from './UserAccountForm';

export interface UserDetails {
  id?: string;
  full_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  tax_no?: string;
  avatar_url?: string;
  withholding_tax?: boolean;
  gst_registered?: boolean;
  skillset?: string[];
}

export interface Skill {
  id: number;
  name: string | null;
}

export default function AccountPage() {
  const { user, profile, loading } = useUser();

  const [skills, setSkills] = useState<Skill[] | null>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    id: user?.id,
    email: user?.email,
    ...profile,
  });

  // load initial data and avatar preview. Add avatar url to hidden field
  useEffect(() => {
    setUserDetails({ ...user, ...profile });
  }, [user, profile]);
  // load selected skills
  useEffect(() => {
    fetchSkills(user?.id).then((data) => {
      setSkills(data);
    });
  }, [user, profile]);

  if (loading && !user) {
    return <h1>Loading...</h1>;
  }
  // Send non-logged in users to the login screen
  if (!user) {
    return (
      <div>
        <h2>
          Please <Link href="/login">log in</Link> to view the dashboard
        </h2>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <h2>My account</h2>
      <p>Manage your user profile</p>
      <UserAccountForm
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        selectedSkills={skills}
        setSelectedSkills={setSkills}
      />
    </ThemeProvider>
  );
}
