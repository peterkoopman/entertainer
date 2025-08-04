'use client';

import SidebarState from '@/context/SidebarContext';
import AvatarState from '@/context/AvatarContext';
import { FormProvider } from '@/context/FormSaveContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import MobileFooter from '@/components/MobileFooter/MobileFooter';
import './PagesLayout.css';

const PagesLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarState>
      <AvatarState>
        <FormProvider>
          <div className="sidebar-layout">
            <Sidebar />
            <main>{children}</main>
            <MobileFooter />
          </div>
        </FormProvider>
      </AvatarState>
    </SidebarState>
  );
};

export default PagesLayout;
