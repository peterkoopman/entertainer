'use client';

import Nav from '@/components/Nav/Nav';
import Logo from '@/components/Logo/Logo';
import style from './Sidebar.module.css';
import SidebarUser from './SidebarUser/SidebarUser';
import { useContext } from 'react';
import { SidebarContext, SidebarContextType } from '@/context/SidebarContext';

const Sidebar = () => {
  const { isOpen, openSidebar, closeSidebar }: SidebarContextType =
    useContext<SidebarContextType>(SidebarContext);

  return (
    <div className={`${style.sidebar} ${isOpen ? '' : style.closed}`}>
      <div
        onClick={() => closeSidebar()}
        className={`${style.closeIcon} ${
          isOpen ? '' : style.closed
        } material-symbols-outlined`}>
        left_panel_close
      </div>
      <div
        onClick={() => openSidebar()}
        className={`${style.openIcon} ${
          isOpen ? '' : style.closed
        } material-symbols-outlined`}>
        left_panel_open
      </div>
      <Logo closed={!isOpen} />
      <Nav />
      <SidebarUser closed={!isOpen} />
    </div>
  );
};

export default Sidebar;
