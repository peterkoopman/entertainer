'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import SidebarState from '@/context/SidebarContext';
import MobileFooter from '@/components/MobileFooter/MobileFooter';
import './appPages.css';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarState>
      <div className="sidebar-layout">
        <Sidebar />
        <main>{children}</main>
        <MobileFooter />
      </div>
    </SidebarState>
  );
}
