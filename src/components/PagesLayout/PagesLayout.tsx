'use client';

import SidebarState from '@/context/SidebarContext';
import AvatarState from '@/context/AvatarContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import MobileFooter from '@/components/MobileFooter/MobileFooter';
import './PagesLayout.css';

const PagesLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarState>
      <AvatarState>
        <div className="sidebar-layout">
          <Sidebar />
          <main>{children}</main>
          <MobileFooter />
        </div>
      </AvatarState>
    </SidebarState>
  );
};

export default PagesLayout;
