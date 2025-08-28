'use client';

import { useState, useEffect } from 'react';
import { fetchProfile } from './actions';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
// import { useUser } from '@/hooks/useUser';
// import Link from 'next/link';
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

const getUser = async () => {
  const user = await fetchProfile('c17f9dd9-dbe3-4496-856a-1de66321c676');
  return user;
};

export default function AccountPage() {
  const [skills, setSkills] = useState<Skill[] | null>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({});

  // load initial data and avatar preview. Add avatar url to hidden field
  useEffect(() => {
    getUser().then((data) => {
      setUserDetails(data || {});
    });
  }, []);
  // load selected skills
  useEffect(() => {
    fetchSkills(userDetails?.id).then((data) => {
      setSkills(data);
    });
  }, [userDetails]);

  // if (loading && !user) {
  //   return <h1>Loading...</h1>;
  // }
  // Send non-logged in users to the login screen
  // if (!user) {
  //   return (
  //     <div>
  //       <h2>
  //         Please <Link href="/login">log in</Link> to view the dashboard
  //       </h2>
  //     </div>
  //   );
  // }

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
