'use client';

import Nav from '@/components/Nav/Nav';
import Logo from '@/components/Logo/Logo';
import style from './Sidebar.module.css';
import SidebarUser from './SidebarUser/SidebarUser';
import { useState } from 'react';

const Sidebar = () => {
  const [closed, setClosed] = useState(false);
  // TODO: put closed into Context API so we can persisit the state when we change pages
  return (
    <div className={`${style.sidebar} ${closed ? style.closed : ''}`}>
      <div
        onClick={() => setClosed(true)}
        className={`${style.closeIcon} ${
          closed ? style.closed : ''
        } material-symbols-outlined`}>
        left_panel_close
      </div>
      <div
        onClick={() => setClosed(false)}
        className={`${style.openIcon} ${
          closed ? style.closed : ''
        } material-symbols-outlined`}>
        left_panel_open
      </div>
      <Logo closed={closed} />
      <Nav />
      <SidebarUser />
    </div>
  );
};

export default Sidebar;
