'use client';

import { createContext, ReactNode, useState } from 'react';

export interface SidebarContextType {
  isOpen: boolean;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
);

function SidebarState({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarState;
