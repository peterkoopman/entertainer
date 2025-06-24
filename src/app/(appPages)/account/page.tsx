'use client';

import { useUser } from '@/hooks/useUser';
import Link from 'next/link';

export default function AccountPage() {
  const { user, profile, loading } = useUser();
  const userDetails = { ...user, ...profile };

  if (loading && !user) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return (
      <div>
        <h2>
          Please <Link href="/login">log in</Link> to view the dashboard
        </h2>
      </div>
    );
  }

  return <h1>My account - {userDetails?.full_name}</h1>;
}
