'use client';

import SidebarState from '@/context/SidebarContext';
import { redirect } from 'next/navigation';

export default function Home() {
  // TODO: determine whether user is logged in. Redirect to dsahboard or login page
  return (
    <SidebarState>
      <div>{redirect('/dashboard')}</div>
    </SidebarState>
  );
}
